"use client";

import { useState, useEffect, useRef } from "react";
import { OrderStatus } from "@/models";
import { useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import { Button } from "../components/FormButton";
import { logoutAction } from "../server-actions/auth.action";

export const MyAccountPage = ({ viewerName, orders, posts }: any) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("welcome");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Set loading to false immediately
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (openDrawer) setOpenDrawer(false);
  };

  const handleToggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await logoutAction();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", mt: "120px" }}>
        <IconButton
          sx={{
            display: { sm: "none" },
            position: "fixed",
            top: 100,
            right: 16,
            zIndex: 1300,
            color: "white",
          }}
          onClick={handleToggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{
            display: { sm: "none" },
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "#333",
              color: "white",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={() => setOpenDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItemButton
              onClick={() => handleMenuClick("welcome")}
              sx={{
                backgroundColor:
                  selectedMenu === "welcome"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                color: "white",
              }}
            >
              <ListItemText primary="WELCOME" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleMenuClick("orders")}
              sx={{
                backgroundColor:
                  selectedMenu === "orders"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                color: "white",
              }}
            >
              <ListItemText primary="MY ORDERS" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleMenuClick("posts")}
              sx={{
                backgroundColor:
                  selectedMenu === "posts"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                color: "white",
              }}
            >
              <ListItemText primary="MY POSTS" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleMenuClick("logout")}
              sx={{
                backgroundColor:
                  selectedMenu === "logout"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                color: "white",
              }}
            >
              <ListItemText primary="LOGOUT" />
            </ListItemButton>
          </List>
        </Drawer>

        {/* Drawer for large screens */}
        <Box
          component="nav"
          sx={{
            width: { sm: 240 },
            flexShrink: { sm: 0 },
            display: { xs: "none", sm: "block" },
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                top: 120,
                width: 240,
                backgroundColor: "transparent",
                color: "white",
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              },
            }}
            open
          >
            <List>
              <ListItemButton
                onClick={() => handleMenuClick("welcome")}
                sx={{
                  backgroundColor:
                    selectedMenu === "welcome"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemText primary="WELCOME" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuClick("orders")}
                sx={{
                  backgroundColor:
                    selectedMenu === "orders"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemText primary="MY ORDERS" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuClick("posts")}
                sx={{
                  backgroundColor:
                    selectedMenu === "posts"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemText primary="MY POSTS" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuClick("logout")}
                sx={{
                  backgroundColor:
                    selectedMenu === "logout"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemText primary="LOGOUT" />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {selectedMenu === "welcome" && (
                <Typography variant="h4">Welcome {viewerName}</Typography>
              )}

              {selectedMenu === "orders" && (
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
                      {orders.length > 0 ? (
                        orders.map((order: any) => (
                          <TableRow key={order.id}>
                            <TableCell sx={{ color: "white" }}>
                              {order.id}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {order.date_created
                                ? new Date(
                                    order.date_created
                                  ).toLocaleDateString("pt-BR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                : "Data inválida"}
                            </TableCell>

                            <TableCell sx={{ color: "white" }}>
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(order.total)}
                            </TableCell>
                            <TableCell>
                              {order.status === OrderStatus.PENDING ? (
                                <Typography
                                  variant="h5"
                                  sx={{ color: "white" }}
                                >
                                  ⏳
                                </Typography>
                              ) : order.status === OrderStatus.PAID ? (
                                <Typography
                                  variant="h5"
                                  sx={{ color: "white" }}
                                >
                                  ✔
                                </Typography>
                              ) : (
                                <Typography
                                  variant="h5"
                                  sx={{ color: "white" }}
                                >
                                  ✖
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() =>
                                  router.push(`/my-orders/${order.id}`)
                                }
                                // variant="contained"
                                // component={Link}
                                // href={`/my-orders/${order.id}`}
                              >
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            <Typography>Nenhum pedido encontrado.</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Box>
              )}

              {selectedMenu === "posts" && (
                <>
                  <Typography variant="h6">My Posts</Typography>
                  <ul>
                    {posts.length > 0 ? (
                      posts.map((post: any) => (
                        <li key={post.id}>
                          <Typography>{post.title}</Typography>
                        </li>
                      ))
                    ) : (
                      <Typography>No posts found.</Typography>
                    )}
                  </ul>
                </>
              )}

              {selectedMenu === "logout" && (
                <Box sx={{ mt: 2 }}>
                  <Button onClick={handleLogout}>Logout</Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyAccountPage;
