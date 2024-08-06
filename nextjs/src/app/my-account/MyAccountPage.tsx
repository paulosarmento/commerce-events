"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import { logoutAction } from "../server-actions/auth.action";
import { useRouter } from "next/navigation";
import { Button } from "../components/button/FormButton";
import MenuDrawer from "../components/my-account/MenuDrawer";
import Loading from "../components/my-account/Loading";
import OrderList from "../components/my-account/OrderList";
import PostList from "../components/my-account/PostList";

export const MyAccountPage = ({ viewerName, orders, posts }: any) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("welcome");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await logoutAction();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setOpenDrawer(false);
  };

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box>
      <Header />
      <MenuDrawer
        selectedMenu={selectedMenu}
        openDrawer={openDrawer}
        onMenuClick={handleMenuClick}
        onToggleDrawer={handleToggleDrawer}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          ml: { sm: 30 },
          p: 3,
          mt: 12,
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {selectedMenu === "welcome" && (
              <Box>
                <Typography variant="h5" sx={{ color: "white" }}>
                  Bem-vindo, {viewerName}!
                </Typography>
              </Box>
            )}
            {selectedMenu === "orders" && <OrderList orders={orders} />}
            {selectedMenu === "posts" && <PostList posts={posts} />}
            {selectedMenu === "account" && (
              <Box>
                <Typography variant="h5" sx={{ color: "white" }}>
                  Minha conta
                </Typography>
              </Box>
            )}
            {selectedMenu === "logout" && (
              <Box>
                <Typography variant="h5" sx={{ color: "white" }}>
                  Deseja sair da sua conta?
                </Typography>
                <Button onClick={handleLogout}>Logout</Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
