export const applyDiscount = (total: number) => {
  let discount = 0;

  if (total >= 50000 && total < 100000) {
    discount = 0.02;
  } else if (total >= 100000 && total < 200000) {
    discount = 0.05;
  } else if (total >= 200000) {
    discount = 0.1;
  }

  return total - total * discount;
};
export const discounts = (total: number) => {
  if (total >= 50000 && total < 100000) {
    return 2;
  } else if (total >= 100000 && total < 200000) {
    return 5;
  } else if (total >= 200000) {
    return 10;
  } else {
    return 0;
  }
};
