"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import { logoutAction } from "../components/LogoutAction";

const MyAccountPage = ({ viewerName, orders, posts }: any) => {
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
                <>
                  <Typography variant="h6">My Orders</Typography>
                  <ul>
                    {orders.length > 0 ? (
                      orders.map((order: any) => (
                        <li key={order.id}>
                          <Typography>Order ID: {order.id}</Typography>
                          <Typography>Status: {order.status}</Typography>
                        </li>
                      ))
                    ) : (
                      <Typography>No orders found.</Typography>
                    )}
                  </ul>
                </>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
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
