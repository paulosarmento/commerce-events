// pages/api/add-to-cart.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { addToCart } from "../service/CartService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { product_id, quantity } = req.body;
      if (typeof product_id !== "number" || typeof quantity !== "number") {
        return res.status(400).json({ message: "Invalid input" });
      }

      await addToCart({
        product_id,
        quantity,
      });
      res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
