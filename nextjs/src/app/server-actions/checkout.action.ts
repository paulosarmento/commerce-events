"use server";

import { redirect } from "next/navigation";
import { clearCart, getCart } from "../service/CartService";
import { createOrder } from "../service/OrderService";

export async function checkoutAction(formData: FormData) {
  const cart = getCart();
  let order;
  try {
    order = await createOrder({
      card_hash: formData.get("card_hash") as string,
      items: cart.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    });
    clearCart();
  } catch (e) {
    console.error(e);
    return {
      error: { message: "O pagamento não foi aprovado." },
    };
  }

  redirect(`/checkout/${order.id}/success`);
}
