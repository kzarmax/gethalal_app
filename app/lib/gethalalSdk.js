import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import {sanitizedRaw} from '@nozbe/watermelondb/RawRecord';
import {Q} from '@nozbe/watermelondb';

import {PER_PAGE_PRODUCTS, SERVER_API_BASE_URL} from '../constants/app';
import {JWT_ACCESS_TOKEN} from '../constants/keys';
import {removeTags} from '../utils/string';
import I18n from '../i18n';
import db from './database';
import {store as reduxStore} from './createStore';
import protectedFunction from '../utils/protectedFunction';
import {normalizeProduct} from './database/utils';
import {setProductsLastUpdated} from '../actions/product';

const GethalalSdk = {
  GET_SHIPPING_ZONES: '/wc/v2/shipping/zones',
  GET_COUPONS_ENDPOINT: '/wc/v2/coupons',
  GET_CUSTOMERS_ENDPOINT: '/wc/v2/customers',
  GET_CATEGORIES_ENDPOINT: '/wc/v2/products/categories',
  GET_PRODUCTS_ENDPOINT: '/wc/v3/products',
  GET_ORDERS_ENDPOINT: '/wc/v3/orders',
  GET_ADDRESSES_ENDPOINT: '/wc/v2/addresses',
  GET_COUNTRIES: '/wc/v2/get_countries',
  GET_PAYMENT_GATEWAYS_ENDPOINT: '/wc/v2/payment_gateways',
  GET_PAYMENT_METHODS: '/wc/v2/payment_methods',
  GET_POSTCODE: '/wc/v2/get_postcode',
  GET_REORDER_ITEMS: '/wc/v2/get_reorder_items',
  SET_ADDRESS_ENDPOINT: '/wc/v2/address',
  SET_DEFAULT_ADDRESS: '/wc/v2/set_default_address',
  SET_PAYMENT_METHOD: '/wc/v2/payment_method',
  SET_DEFAULT_PAYMENT_METHOD: '/wc/v2/set_default_payment_method',
  SET_POSTCODE: '/wc/v2/set_postcode',
  GET_TAXES: '/wc/v3/taxes',
  CREATE_ORDER: '/wc/v2/create_order',
  STRIPE_PAY: '/wc/v2/stripe_payment',
  PAYPAL_PAY: '/wc/v2/paypal_payment',
  REMOVE_PAYMENT_METHOD: '/wc/v2/remove_payment_method',
  REMOVE_ADDRESS: '/wc/v2/remove_address',
  CANCEL_ORDER: '/wc/v2/cancel_order',
  FORGOT_PASSWORD: '/wc/v2/forgot_password',
  CHECK_OTPCODE: '/wc/v2/check_otp',
  RESET_PASSWORD: '/wc/v2/reset_password',

  cached_token: undefined,

  categoryMap: {},

  cached_products: {},

  setToken(token) {
    this.cached_token = token;
  },

  getQueryString(params) {
    return Object.keys(params)
      .reduce((result, key) => {
        return [
          ...result,
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
        ];
      }, [])
      .join('&');
  },

  getAPICall(endpoint, params = {}) {
    return new Promise(async (resolve, reject) => {
      let apiUrl = `${SERVER_API_BASE_URL}${endpoint}`;

      params.lang = I18n.locale;
      apiUrl += '?' + this.getQueryString(params);

      console.log('GET API CALL', apiUrl);

      let headers = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'Content-Type': 'application/json',
      };
      if (this.cached_token) {
        headers.Authorization = `Bearer ${this.cached_token}`;
      }

      const result = await RNFetchBlob.fetch('GET', apiUrl, headers)
        .then(response => {
          return response.json();
        })
        .catch(e => {
          console.log('Get Call Error', e);
          return null;
        });
      if (!result) {
        reject('Get API Call failed');
      }
      console.log('Get API Call success', result);
      resolve(result);
    });
  },

  postAPICall(endpoint, params = {}, hasCustomerKey = false) {
    return new Promise(async (resolve, reject) => {
      const apiUrl = `${SERVER_API_BASE_URL}${endpoint}`;
      console.log('POST API CALL', endpoint);

      params.lang = I18n.locale;

      let options = {
        method: 'POST',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      // if(hasCustomerKey){
      //     params['consumer_key'] = CUSTOMER_KEY;
      //     params['consumer_secret'] = CUSTOMER_SECRET;
      // }

      // console.log('cached token', this.cached_token);
      if (this.cached_token) {
        options.headers.Authorization = `Bearer ${this.cached_token}`;
      }

      const result = await fetch(apiUrl, options)
        .then(response => {
          return response.json();
        })
        .catch(e => {
          console.log('POST Call Error', e);
          return null;
        });
      if (!result) {
        reject('POST API Call failed');
      }
      console.log('POST API Call success', result);
      resolve(result);
    });
  },

  signInWithEmail(email, password) {
    return new Promise(async (resolve, reject) => {
      const result = await this.postAPICall('/jwt-auth/v1/token', {
        username: email,
        password,
      }).catch(e => {
        console.log('Sign In Error', e);
        return {error: true, message: e.message};
      });
      if (!result.token) {
        reject(result);
      }
      console.log('Sign In success', result);
      this.cached_token = result.token;
      resolve(result);
    });
  },

  signInWithToken() {
    return new Promise(async (resolve, reject) => {
      const result = await this.postAPICall(
        '/jwt-auth/v1/token/validate',
      ).catch(e => {
        console.log('token validate Error', e);
        return null;
      });
      if (!result) {
        reject('auth failed');
      }
      console.log('token validate success', result);
      this.cached_token = result.token;
      resolve(true);
    });
  },

  logout() {
    return new Promise(async (resolve, reject) => {
      this.setToken(undefined);
      await AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
      resolve(true);
    });
  },

  getProducts(category_id) {
    return new Promise(async (resolve, reject) => {
      if (!category_id) {
        resolve(false);
        return;
      }

      let params = {
        category: category_id,
        status: 'publish',
        per_page: PER_PAGE_PRODUCTS,
      };

      // Check Last Updated Date
      let lastUpdated = reduxStore.getState().product.lastUpdated;
      if (lastUpdated) {
        params.modified_after = new Date(lastUpdated).toISOString();
      }

      console.log('fetch products ', category_id, lastUpdated);

      // Fetch API
      const result = await this.getAPICall(
        this.GET_PRODUCTS_ENDPOINT,
        params,
      ).catch(e => {
        console.log('api Error', e);
        return {code: 400, message: 'API ERROR'};
      });
      if (result.code) {
        console.error('error', result.message);
        return resolve(false);
      }

      // Update Database
      await this.updateProducts(result);

      // Set Last Updated Date
      result.forEach(p => {
        if (!lastUpdated || lastUpdated < p.date_modified) {
          lastUpdated = p.date_modified;
        }
      });

      if (lastUpdated) {
        reduxStore.dispatch(setProductsLastUpdated(lastUpdated));
      }

      // Return Success
      resolve(true);
    });
  },

  updateProducts(products) {
    try {
      if (products && products.length) {
        return db.write(async () => {
          const productCollection = db.collections.get('products');

          const productIds = products.map(p => p.id);
          let allProducts = await productCollection
            .query(Q.where('_id', Q.oneOf(productIds)))
            .fetch();

          // filter products
          let productsToCreate = products.filter(
            p => !allProducts.find(dp => p.id === dp._id),
          );
          let productsToUpdate = allProducts.filter(dp =>
            products.find(p => dp._id === p.id),
          );
          let productsToRemove = allProducts.filter(
            dp => !products.find(p => dp._id === p.id),
          );

          // Create
          productsToCreate = productsToCreate.map(product =>
            productCollection.prepareCreate(
              protectedFunction(p => {
                p._raw = sanitizedRaw(
                  {id: `${product.id}`},
                  productCollection.schema,
                );

                Object.assign(
                  p,
                  normalizeProduct(
                    product,
                    this.getAllProductCategoryIds(product),
                  ),
                );
              }),
            ),
          );

          // Update
          productsToUpdate = productsToUpdate.map(product => {
            if (product._hasPendingUpdate) {
              console.log(product);
              return;
            }
            const newProduct = products.find(e => e.id === product._id);
            return product.prepareUpdate(
              protectedFunction(p => {
                Object.assign(
                  p,
                  normalizeProduct(
                    newProduct,
                    this.getAllProductCategoryIds(product),
                  ),
                );
              }),
            );
          });

          productsToRemove = productsToRemove.map(product =>
            product.prepareDestroyPermanently(),
          );

          console.log(
            'db:',
            productsToCreate,
            productsToUpdate,
            productsToRemove,
          );
          const allRecords = [
            ...productsToCreate,
            ...productsToUpdate,
            ...productsToRemove,
          ];
          try {
            await db.batch(...allRecords);
          } catch (e) {
            console.log('batch error', e);
          }

          return allRecords.length;
        });
      }
    } catch (e) {
      console.log('Update Products Error: ', e);
    }
  },

  // Fetch All Products
  async fetchAllProducts() {
    return new Promise(async (resolve, reject) => {
      let params = {
        status: 'publish',
        per_page: PER_PAGE_PRODUCTS,
        order: 'asc',
        orderby: 'date',
        offset: 0,
      };

      const locale = I18n.locale;

      // Check Last Updated Date
      let lastUpdated = reduxStore.getState().product.lastUpdated;
      let lastUpdatedDate = lastUpdated[locale];
      console.log('fetch products ', lastUpdatedDate);

      if (lastUpdatedDate) {
        params.modified_after = new Date(lastUpdatedDate).toISOString();
      }

      let products = [];
      do {
        // Fetch API
        const result = await this.getAPICall(
          this.GET_PRODUCTS_ENDPOINT,
          params,
        ).catch(e => {
          console.log('api Error', e);
          return {code: 400, message: 'API ERROR'};
        });

        if (result.code) {
          console.error('error', result.message);
          break;
        }

        // Set Last Updated Date

        result.forEach(p => {
          if (
            p.date_modified &&
            (!lastUpdatedDate || lastUpdatedDate < p.date_modified)
          ) {
            lastUpdatedDate = p.date_modified;
          }
        });

        products = products.concat(result);

        // Ended Fetch
        if (result.length < PER_PAGE_PRODUCTS) {
          break;
        }

        params.offset += PER_PAGE_PRODUCTS;
      } while (1);

      console.log('fetch products', products.length);

      // Update Database
      await this.updateProducts(products);

      // Set Last Updated Time
      if (lastUpdatedDate) {
        let updated = {};
        updated[locale] = lastUpdatedDate;
        reduxStore.dispatch(setProductsLastUpdated(updated));
      }

      // Return More
      resolve(true);
    });
  },

  getAllCategoryIds(categories, category_id) {
    if (this.categoryMap[category_id]) {
      return this.categoryMap[category_id];
    }

    const category = categories.find(c => c.id === category_id);
    if (!category) {
      return [];
    }

    if (category.parent) {
      const parentCategoryIds = this.getAllCategoryIds(
        categories,
        category.parent,
      );
      this.categoryMap[category_id] = [category.id, ...parentCategoryIds];
      return this.categoryMap[category_id];
    }
    return [category.id];
  },

  getAllProductCategoryIds(product) {
    const categories = reduxStore.getState().product.categories;
    const productCategoryIds = product.categories?.map(c => c.id) ?? [];
    let allCategoryIds = [];
    productCategoryIds.forEach(
      id =>
        (allCategoryIds = allCategoryIds.concat(
          this.getAllCategoryIds(categories, id),
        )),
    );
    return allCategoryIds;
  },

  // socialLogin(socialCredential){
  //     return new Promise(async (resolve, reject) => {
  //         const userInfos = await firebase.firestore().collection(this.TBL_USER).get();
  //         let userInfo = null;
  //         userInfos.forEach(doc => {
  //             if (doc.data().email === socialCredential.email) {
  //                 userInfo = doc.data();
  //             }
  //         });
  //         console.log('userInfo', userInfo);
  //         if(userInfo){
  //             resolve(userInfo);
  //         } else {
  //             userInfo = {
  //                 userId: socialCredential.uid,
  //                 type: 100, // User: 100
  //                 firstName: socialCredential.firstName,
  //                 lastName: socialCredential.lastName,
  //                 email: socialCredential.email,
  //                 avatar: socialCredential.avatar,
  //                 address: '',
  //                 interests: "",
  //                 age: 0,
  //                 bio: '',
  //                 ratingTotal: 0,
  //                 ratingCount: 0,
  //                 isBanned: false,
  //                 token: '',
  //                 qbId: 0,
  //                 friends: [],
  //                 activities: [],
  //                 outdoor: [],
  //             }
  //             const userDoc = await firestore().collection(this.TBL_USER).add(userInfo);
  //             resolve({
  //                 id: userDoc.id,
  //                 ...userInfo
  //             });
  //         }
  //     });
  // },

  signUp(user) {
    return new Promise(async (resolve, reject) => {
      const {email, password} = user;
      const result = await this.postAPICall('/wc/v2/register', {
        email,
        password,
      })
        .then(res => {
          if (res.success) {
            resolve(true);
          } else {
            reject(removeTags(res.error));
          }
        })
        .catch(err => {
          console.log('error', err);
          reject(err);
        });
    });
  },

  getUser() {
    return new Promise(async (resolve, reject) => {
      const result = await this.postAPICall('/wp/v2/users/me').catch(e => {
        console.log('api Error', e);
        return null;
      });
      if (!result || result.code) {
        reject('api failed');
      }
      console.log('api success', result);
      resolve(result);
    });
  },

  updateUser(id, data) {
    return new Promise(async (resolve, reject) => {
      const result = await this.postAPICall(`/wp/v2/users/${id}`, data).catch(
        e => {
          console.log('api Error', e);
          return null;
        },
      );
      if (!result) {
        reject('api failed');
      }
      console.log('api success', result);
      resolve(result);
    });
  },

  fetchData(endpoint, params) {
    return new Promise(async (resolve, reject) => {
      const result = await this.getAPICall(`${endpoint}`, params).catch(e => {
        console.log('api Error', e);
        return null;
      });
      if (!result) {
        reject('api failed');
      } else {
        if (result.code) {
          console.error('api failed', result.message);
          // TODO Error
          resolve(null);
        } else {
          console.log('api success', result);
          resolve(result);
        }
      }
    });
  },

  fetchSingleData(endpoint, id) {
    return new Promise(async (resolve, reject) => {
      const result = await this.getAPICall(`${endpoint}/${id}`, {}).catch(e => {
        console.log('api Error', e);
        return null;
      });
      if (!result) {
        reject('api failed');
      }
      console.log('api success', result);
      resolve(result);
    });
  },
};

export default GethalalSdk;
