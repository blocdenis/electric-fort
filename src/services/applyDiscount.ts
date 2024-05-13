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
