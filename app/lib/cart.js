const GethalalCart = {
  getShippingLabel(shippingMethod, taxes) {
    const shippingCost = this.getShippingCost(shippingMethod, taxes);
    if (shippingCost > 0) {
      return shippingMethod.title + ' ' + shippingCost.toFixed(2) + ' €';
    }
    return shippingMethod.title;
  },

  getShippingCost(shippingMethod, taxes) {
    if (
      shippingMethod.settings &&
      shippingMethod.settings.cost &&
      shippingMethod.settings.cost.value
    ) {
      let total = Number(shippingMethod.settings.cost.value);
      taxes.forEach(tax => {
        total += (total * tax.rate) / 100;
      });
      return total;
    }
    return 0;
  },
};

export default GethalalCart;
