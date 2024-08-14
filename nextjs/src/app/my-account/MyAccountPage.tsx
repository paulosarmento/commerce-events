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
import AddressesList from "../components/my-account/address/AddressesList";
import Account from "../components/my-account/Account";

export const MyAccountPage = ({ viewer, orders, posts, customer }: any) => {
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
                  Bem-vindo, {viewer.name}!
                </Typography>
              </Box>
            )}
            {selectedMenu === "orders" && <OrderList orders={orders} />}
            {selectedMenu === "posts" && <PostList posts={posts} />}
            {selectedMenu === "account" && (
              <Account
                username={viewer.name}
                billing={customer.billing}
                role={customer.role}
              />
            )}
            {selectedMenu === "addresses" && (
              <AddressesList
                viewer={viewer}
                billing={customer.billing}
                shipping={customer.shipping}
              />
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

interface MetaData {
  id: number;
  key: string;
  value: any; // Use a tipagem específica caso conheça o tipo exato do valor
}

interface Links {
  self: Array<Record<string, any>>;
  collection: Array<Record<string, any>>;
}

interface BillingDetails {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  email: string;
  phone: string;
  number: string;
  neighborhood: string;
  personType: string;
  cpf: string;
  rg: string;
  cnpj: string;
  ie: string;
  birthdate: string;
  gender: string;
  cellphone: string;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  phone: string;
  number: string;
  neighborhood: string;
}

interface UserProps {
  id: number;
  dateCreated: string;
  dateCreatedGmt: string;
  dateModified: string;
  dateModifiedGmt: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  billing: BillingDetails;
  shipping: ShippingDetails;
  isPayingCustomer: boolean;
  avatarUrl: string;
  metaData: MetaData[];
  links: Links;
}
