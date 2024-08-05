export const createOrder = async (input: {
  card_hash: string;
  items: { product_id: number; quantity: number }[];
}): Promise<any> => {};

export const OrderService = {
  createOrder,
};
