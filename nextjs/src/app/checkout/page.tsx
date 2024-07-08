import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CheckoutForm } from "./CheckoutForm";
import { redirect } from "next/navigation";
import { Total } from "../components/Total";

const products = [
  {
    id: "1",
    name: "Camisa",
    description: "Camisa branca",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
  {
    id: "2",
    name: "Calça",
    description: "Calça jeans",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
];

const cart = {
  items: [
    {
      product_id: "1",
      quantity: 2,
      total: 200,
    },
    {
      product_id: "2",
      quantity: 1,
      total: 100,
    },
  ],
  total: 1000,
};

async function CheckoutPage() {
  if (cart.items.length === 0) {
    return redirect("/my-cart");
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ color: "white" }}>
        Checkout
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={6}>
          <CheckoutForm />
        </Grid2>
        <Grid2 xs={0} md={1}>
          <Divider orientation="vertical" />
        </Grid2>
        <Grid2 xs={12} md={5}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Resumo do pedido
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Produto</TableCell>
                <TableCell sx={{ color: "white" }}>Qtd.</TableCell>
                <TableCell sx={{ color: "white" }}>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item, key) => {
                const product = products.find(
                  (product) => product.id === item.product_id
                )!;
                return (
                  <TableRow key={key}>
                    <TableCell sx={{ color: "white" }}>
                      {product.name}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.total)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Total total={cart.total} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default CheckoutPage;
