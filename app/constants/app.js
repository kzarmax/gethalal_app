/**
 * hosokawa
 * 2021/11/8
 */
import I18n from '../i18n';
import {
  COLOR_ERROR_100,
  COLOR_ERROR_900,
  COLOR_GREEN_100,
  COLOR_GREEN_900,
  COLOR_WARNING_100,
  COLOR_WARNING_900,
} from './colors';

export const SERVER_BASE_URL = 'https://gethalal.de';
export const SERVER_API_BASE_URL = 'https://gethalal.de/wp-json';
//export const SERVER_API_BASE_URL = 'https://dev.gethalal.de/new/wp-json';

export const WHATSAPP_LINK = 'whatsapp://send?phone=4915906589860';
export const WHATSAPP_SITE_LINK = 'https://wa.me/4915906589860';
export const TELEGRAM_LINK = 'tg://resolve?domain=gethalalde';
export const TELEGRAM_SITE_LINK = 'https://t.me/gethalalde';
export const EMAIL_LINK = 'mailto:wecare@gethalal.de';

export const ORDER_STATE_PENDING = 'pending';
export const ORDER_STATE_PROCESSING = 'processing';
export const ORDER_STATE_ON_HOLDING = 'on-hold';
export const ORDER_STATE_SHIPPING = 'shipping';
export const ORDER_STATE_COMPLETED = 'completed';
export const ORDER_STATE_CANCEL = 'cancelled';
export const ORDER_STATE_FAILED = 'failed';
export const ORDER_STATE_REFUNDED = 'refunded';

export const UPCOMING_ORDER_STATUSES = [
  ORDER_STATE_PENDING,
  ORDER_STATE_PROCESSING,
  ORDER_STATE_ON_HOLDING,
  ORDER_STATE_SHIPPING,
];
export const HISTORY_ORDER_STATUSES = [
  ORDER_STATE_COMPLETED,
  ORDER_STATE_CANCEL,
  ORDER_STATE_FAILED,
  ORDER_STATE_REFUNDED,
];

export const ORDER_STATES = {
  [ORDER_STATE_PENDING]: {
    id: ORDER_STATE_PENDING,
    background: COLOR_WARNING_100,
    color: COLOR_WARNING_900,
    title: I18n.t('Pending'),
  },
  [ORDER_STATE_PROCESSING]: {
    id: ORDER_STATE_PROCESSING,
    background: COLOR_WARNING_100,
    color: COLOR_WARNING_900,
    title: I18n.t('In_progress'),
  },
  [ORDER_STATE_ON_HOLDING]: {
    id: ORDER_STATE_ON_HOLDING,
    background: COLOR_WARNING_100,
    color: COLOR_WARNING_900,
    title: I18n.t('On_hold'),
  },
  [ORDER_STATE_COMPLETED]: {
    id: ORDER_STATE_COMPLETED,
    background: COLOR_GREEN_100,
    color: COLOR_GREEN_900,
    title: I18n.t('Completed'),
  },
  [ORDER_STATE_CANCEL]: {
    id: ORDER_STATE_CANCEL,
    background: COLOR_ERROR_100,
    color: COLOR_ERROR_900,
    title: I18n.t('Cancelled'),
  },
  [ORDER_STATE_FAILED]: {
    id: ORDER_STATE_FAILED,
    background: COLOR_ERROR_100,
    color: COLOR_ERROR_900,
    title: I18n.t('Failed'),
  },
};

export const SHIPMENTS_ORDER_STATUS_DRAFT = 'draft';
export const SHIPMENTS_ORDER_STATUS_PROCESSING = 'processing';
export const SHIPMENTS_ORDER_STATUS_SHIPPED = 'shipped';
export const SHIPMENTS_ORDER_STATUS_DELIVERED = 'delivered';

export const SHIPMENTS_ORDER_STATES = {
  [SHIPMENTS_ORDER_STATUS_DRAFT]: {
    id: SHIPMENTS_ORDER_STATUS_DRAFT,
    background: COLOR_GREEN_100,
    color: COLOR_GREEN_900,
    title: I18n.t('Placed'),
  },
  [SHIPMENTS_ORDER_STATUS_PROCESSING]: {
    id: SHIPMENTS_ORDER_STATUS_PROCESSING,
    background: COLOR_GREEN_100,
    color: COLOR_GREEN_900,
    title: I18n.t('Preparing'),
  },
  [SHIPMENTS_ORDER_STATUS_SHIPPED]: {
    id: SHIPMENTS_ORDER_STATUS_SHIPPED,
    background: COLOR_GREEN_100,
    color: COLOR_GREEN_900,
    title: I18n.t('Shipping'),
  },
  [SHIPMENTS_ORDER_STATUS_DELIVERED]: {
    id: SHIPMENTS_ORDER_STATUS_DELIVERED,
    background: COLOR_GREEN_100,
    color: COLOR_GREEN_900,
    title: I18n.t('Delivered'),
  },
};

export const ACTION_SHEET_ADD_CARD = 0;

export const DELIVERY_CYCLES = [
  {id: 0, text: I18n.t('Once_time')},
  {id: 1, text: I18n.t('Weekly')},
  {id: 2, text: I18n.t('Monthly')},
];

export const DELIVERY_TIMES = [
  {id: 0, text: I18n.t('11-12 AM')},
  {id: 1, text: I18n.t('1-2 PM')},
  {id: 2, text: I18n.t('3-4 PM')},
  {id: 3, text: I18n.t('5-6 PM')},
];

//
export const CUSTOMER_KEY = 'ck_ba90c397c5dd13d7c1cf40d227e65faca158adaa';
export const CUSTOMER_SECRET = 'cs_ca9385080eca7091312b5caeaa217811e867b5a3';
export const IS_PRODUCTION = true;
export const BRAINTREE_TOKEN = 'sandbox_s9fjs728_r9kzb6jtvc8nvj6w';

export const STRIPE_PUBLISHABLE_KEY = IS_PRODUCTION
  ? 'pk_live_51Jqf47JHYkHyvbVsQOr2jSZcFpgTUEEZ0g3uIY0d5Vhjbfiaf9qDsigFQqSkKkqSViXqhw4Tre2j3n8huGQIrQDb00pMQWJNlD'
  : 'pk_test_51Jqf47JHYkHyvbVsy9BEcUKW8inogbY3XQ1osbEH36wEbZ3Jco4cPzmRAQDl8ionBuku8GrqyzgpHGn0VK5flfJE00y22y3tAr';

export const MERCHANT_ID = '';
export const PAYPAL_CLIENT_ID = IS_PRODUCTION
  ? 'AWePcvOCLDJYGCtHglfn9FVdjREvFT2kSFNrYCRdN2VdKhTOyqIKO1H502P9VsvaBYfq2Xn6SBo6UEWD'
  : 'AZNE3KzHefYDSJZltNULL0MXoa09RFvVslP1tFblE6X8bSsE5tZWE8MX504KNKTFmbxEJ9AjiBySHj3K';

// Hosokawa Test
// export const PAYPAL_CLIENT_ID =
//   'AYHEu9hiSKHVcBwwU2yIdAgJyoJ4yEZLlZ98y25Pd8l_vYklNLEYCO0A-bmkUkulx3D-drmmI-EjW7al';

export function getTermsUrl(locale) {
  switch (locale) {
    case 'ar':
      return 'https://gethalal.de/ar/terms-and-conditions/';
    case 'de':
      return 'https://gethalal.de/de/terms-and-conditions/';
    default:
      return 'https://gethalal.de/en/terms-and-conditions/';
  }
}

export function getPrivacyUrl(locale) {
  switch (locale) {
    case 'ar':
      return 'https://gethalal.de/ar/data-security/';
    case 'de':
      return 'https://gethalal.de/de/data-security/';
    default:
      return 'https://gethalal.de/en/data-security/';
  }
}

export function getAboutUsUrl(locale) {
  switch (locale) {
    case 'ar':
      return 'https://gethalal.de/ar/about-us/';
    case 'de':
      return 'https://gethalal.de/de/about-us/';
    default:
      return 'https://gethalal.de/en/about-us/';
  }
}

export const PER_PAGE_CATEGORIES = 100;
export const PER_PAGE_PRODUCTS = 100;
