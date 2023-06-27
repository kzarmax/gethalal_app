import images from './images';

export default function cardLogo(brand) {
  const brandName = brand.toLowerCase();
  switch (brandName) {
    case 'visa':
      return images.visa_card_logo;
    case 'mastercard':
      return images.master_card_logo;
    case 'american_express':
      return images.american_express_logo;
  }
}
