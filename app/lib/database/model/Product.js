import {Model} from '@nozbe/watermelondb';
import {field, json, date} from '@nozbe/watermelondb/decorators';
import {sanitizer} from '../utils';

export default class Product extends Model {
  static table = 'products';

  @field('_id') _id;
  @field('name') name;
  @date('date_created') date_created;
  @date('date_modified') date_modified;
  @field('type') type;
  @field('status') status;
  @field('description') description;
  @field('short_description') short_description;
  @field('sku') sku;
  @field('price') price;
  @field('regular_price') regular_price;
  @field('sale_price') sale_price;
  @field('on_sale') on_sale;
  @field('purchasable') purchasable;
  @field('total_sales') total_sales;
  @field('downloadable') downloadable;
  @field('tax_status') tax_status;
  @field('tax_class') tax_class;

  @field('manage_stock') manage_stock;
  @field('stock_quantity') stock_quantity;
  @field('low_stock_amount') low_stock_amount;

  @field('backorders') backorders;
  @field('backorders_allowed') backorders_allowed;
  @field('backordered') backordered;

  @field('sold_individually') sold_individually;
  @field('wight') wight;
  @field('dimensions', sanitizer) dimensions;

  @field('shipping_required') shipping_required;
  @field('shipping_taxable') shipping_taxable;
  @field('shipping_class') shipping_class;
  @field('shipping_class_id') shipping_class_id;
  @field('reviews_allowed') reviews_allowed;

  @field('average_rating') average_rating;
  @field('rating_count') rating_count;

  @field('parent_id') parent_id;
  @json('category_ids', sanitizer) category_ids;
  @json('categories', sanitizer) categories;
  @field('tags') tags;
  @json('images', sanitizer) images;
  @json('attributes', sanitizer) attributes;
  @json('default_attributes', sanitizer) default_attributes;
  @json('variations', sanitizer) variations;
  @field('menu_order') menu_order;
  @field('price_html') price_html;
  @json('related_ids', sanitizer) related_ids;
  @json('meta_data', sanitizer) meta_data;
  @field('lang') lang;
  @field('unit') unit;
  @json('unit_price', sanitizer) unit_price;
  @field('mini_desc') mini_desc;
  @field('free_shipping') free_shipping;
  @field('service') service;
  @field('used_good') used_good;
}
