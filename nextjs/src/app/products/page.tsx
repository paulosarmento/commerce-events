import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Image from "next/legacy/image";
import Header from "../components/Header";

const products = [
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 100,
    image_url: "/images/products/1.png",
    category_id: "1",
  },
  {
    id: "2",
    name: "Produto 2",
    description: "Descrição do produto 2",
    price: 150,
    image_url: "/images/products/2.png",
    category_id: "1",
  },
  {
    id: "3",
    name: "Produto 3",
    description: "Descrição do produto 3",
    price: 200,
    image_url: "/images/products/3.png",
    category_id: "1",
  },
  {
    id: "4",
    name: "Produto 4",
    description: "Descrição do produto 4",
    price: 250,
    image_url: "/images/products/4.png",
    category_id: "1",
  },
  {
    id: "5",
    name: "Produto 5",
    description: "Descrição do produto 5",
    price: 300,
    image_url: "/images/products/5.png",
    category_id: "1",
  },
  {
    id: "6",
    name: "Produto 6",
    description: "Descrição do produto 6",
    price: 350,
    image_url: "/images/products/6.png",
    category_id: "1",
  },
  {
    id: "7",
    name: "Produto 7",
    description: "Descrição do produto 7",
    price: 400,
    image_url: "/images/products/7.png",
    category_id: "1",
  },
  {
    id: "8",
    name: "Produto 8",
    description: "Descrição do produto 8",
    price: 450,
    image_url: "/images/products/8.png",
    category_id: "1",
  },
  {
    id: "9",
    name: "Produto 9",
    description: "Descrição do produto 9",
    price: 500,
    image_url: "/images/products/9.png",
    category_id: "1",
  },
  {
    id: "10",
    name: "Produto 10",
    description: "Descrição do produto 10",
    price: 550,
    image_url: "/images/products/10.png",
    category_id: "1",
  },
  {
    id: "11",
    name: "Produto 11",
    description: "Descrição do produto 11",
    price: 600,
    image_url: "/images/products/11.png",
    category_id: "1",
  },
  {
    id: "12",
    name: "Produto 12",
    description: "Descrição do produto 12",
    price: 650,
    image_url: "/images/products/12.png",
    category_id: "1",
  },
];

function ListProductsPage() {
  return (
    <div>
      <div className="relative bg-gradient-to-b pb-8">
        <Header />
        <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
          <Grid2 container spacing={2} justifyContent="center">
            {products.length === 0 && (
              <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">Nenhum produto encontrado</Typography>
              </Grid2>
            )}
            {products.slice(0, 2).map((product, key) => (
              <Grid2 xs={12} sm={6} md={6} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" startIcon={<ShoppingCartIcon />}>
                        Comprar
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            {products.slice(2, 5).map((product, key) => (
              <Grid2 xs={12} sm={6} md={4} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" startIcon={<ShoppingCartIcon />}>
                        Comprar
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            {products.slice(5, 9).map((product, key) => (
              <Grid2 xs={12} sm={6} md={3} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" startIcon={<ShoppingCartIcon />}>
                        Comprar
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            {products.slice(9, 12).map((product, key) => (
              <Grid2 xs={12} sm={6} md={2.4} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" startIcon={<ShoppingCartIcon />}>
                        Comprar
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </main>
      </div>
    </div>
  );
}

export default ListProductsPage;
