export const sanitizer = r => r;

function getProductMetaData(metaItems) {
  let metaData = [];
  metaItems.forEach(item => {
    switch (item.key) {
      case '_manufacture_country':
      case '_free_shipping':
      case '_unit_base':
      case '_unit_product':
      case '_unit_price':
      case '_unit_price_sale':
        metaData.push({
          id: item.id,
          key: item.key,
          value: item.value,
        });
        break;
    }
  });
  return metaData;
}

export function normalizeProduct(product, categoryIds) {
  return {
    _id: product.id,
    name: product.name,
    date_created: new Date(product.date_created),
    date_modified: new Date(product.date_modified),
    type: product.type,
    status: product.status,
    description: product.description,
    short_description: product.short_description,
    sku: product.sku,
    price: product.price,
    regular_price: product.regular_price,
    sale_price: product.sale_price,
    on_sale: product.on_sale,
    purchasable: product.purchasable,
    total_sales: product.total_sales,
    downloadable: product.downloadable,
    tax_status: product.tax_status,
    tax_class: product.tax_class,

    manage_stock: product.manage_stock,
    stock_quantity: product.stock_quantity,
    low_stock_amount: product.low_stock_amount,

    backorders: product.backorders,
    backorders_allowed: product.backorders_allowed,
    backordered: product.backordered,

    sold_individually: product.sold_individually,
    wight: product.wight,
    dimensions: product.dimensions,

    shipping_required: product.shipping_required,
    shipping_taxable: product.shipping_taxable,
    shipping_class: product.shipping_class,
    shipping_class_id: product.shipping_class_id,
    reviews_allowed: product.reviews_allowed,

    average_rating: product.average_rating,
    rating_count: product.rating_count,

    parent_id: product.parent_id,
    category_ids: categoryIds,
    categories: product.categories,
    tags: product.tags,
    images: product.images.map(image => ({
      id: image.id,
      name: image.name,
      alt: image.alt,
      src: encodeURIComponent(image.src),
    })),

    attributes: product.attributes,
    default_attributes: product.default_attributes,
    variations: product.variations,
    menu_order: product.menu_order,
    price_html: product.price_html,
    related_ids: product.related_ids,
    meta_data: getProductMetaData(product.meta_data),
    lang: product.lang,
    unit: product.unit,
    unit_price: product.unit_price,
    mini_desc: product.mini_desc,
    free_shipping: product.free_shipping,
    service: product.service,
    used_good: product.used_good,
  };
}

export function getObjectFromModel(product) {
  return {
    id: product._id,
    name: product.name,
    date_created: product.date_created,
    date_modified: product.date_modified,
    type: product.type,
    status: product.status,
    description: product.description,
    short_description: product.short_description,
    sku: product.sku,
    price: product.price,
    regular_price: product.regular_price,
    sale_price: product.sale_price,
    on_sale: product.on_sale,
    purchasable: product.purchasable,
    total_sales: product.total_sales,
    downloadable: product.downloadable,
    tax_status: product.tax_status,
    tax_class: product.tax_class,

    manage_stock: product.manage_stock,
    stock_quantity: product.stock_quantity,
    low_stock_amount: product.low_stock_amount,

    backorders: product.backorders,
    backorders_allowed: product.backorders_allowed,
    backordered: product.backordered,

    sold_individually: product.sold_individually,
    wight: product.wight,
    dimensions: product.dimensions,

    shipping_required: product.shipping_required,
    shipping_taxable: product.shipping_taxable,
    shipping_class: product.shipping_class,
    shipping_class_id: product.shipping_class_id,
    reviews_allowed: product.reviews_allowed,

    average_rating: product.average_rating,
    rating_count: product.rating_count,

    parent_id: product.parent_id,
    category_ids: product.category_ids,
    categories: product.categories,
    tags: product.tags,
    images: product.images,

    attributes: product.attributes,
    default_attributes: product.default_attributes,
    variations: product.variations,
    menu_order: product.menu_order,
    price_html: product.price_html,
    related_ids: product.related_ids,
    meta_data: product.meta_data,
    lang: product.lang,
    unit: product.unit,
    unit_price: product.unit_price,
    mini_desc: product.mini_desc,
    free_shipping: product.free_shipping,
    service: product.service,
    used_good: product.used_good,
  };
}
