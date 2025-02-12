export const applyDiscount = (total: number, discount: number) => {
  return total - (total * discount) / 100;
};
