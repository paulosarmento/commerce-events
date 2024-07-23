export type Category = {
  id: number;
  name: string;
};

export type Product = {
  manage_stock: any;
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category_id: string;
  type: string;
  quantity: number;
  attributes: Attribute[];
  stock_quantity: number;
  images: any[];
  image: string;
  price_html: string;
  purchasable: boolean;
};

export type Attribute = {
  id: string;
  name: string;
  type: string;
  value: string;
  option: string;
  options: string[];
};

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export type Order = {
  id: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  created_at: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
};
