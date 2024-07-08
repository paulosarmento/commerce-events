import { OrderStatus } from "@/models";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

const orders = [
  {
    id: "1",
    status: OrderStatus.PENDING,
    created_at: "2021-10-10T00:00:00.000Z",
    items: [
      {
        id: 1,
        product: {
          id: "1",
          name: "Camisa",
          description: "Camisa branca",
          price: 100,
          image_url: "https://source.unsplash.com/random?product",
          category_id: "1",
        },
        quantity: 2,
        price: 100,
      },
      {
        id: 2,
        product: {
          id: "2",
          name: "Calça",
          description: "Calça jeans",
          price: 100,
          image_url: "https://source.unsplash.com/random?product",
          category_id: "1",
        },
        quantity: 1,
        price: 100,
      },
    ],
    total: 1000,
  },
];

export async function MyOrdersListPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white" }}>
        Meus pedidos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>ID</TableCell>
            <TableCell sx={{ color: "white" }}>Data</TableCell>
            <TableCell sx={{ color: "white" }}>Valor</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell sx={{ color: "white" }}>{order.id}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.total)}
                </TableCell>
                <TableCell>
                  {order.status === OrderStatus.PENDING ? (
                    <Typography variant="h5" sx={{ color: "white" }}>
                      ⏳
                    </Typography>
                  ) : order.status === OrderStatus.PAID ? (
                    <Typography variant="h5" sx={{ color: "white" }}>
                      ✔
                    </Typography>
                  ) : (
                    <Typography variant="h5" sx={{ color: "white" }}>
                      ✖
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    component={Link}
                    href={`/my-orders/${order.id}`}
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MyOrdersListPage;
