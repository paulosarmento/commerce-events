import { authenticateUser, getOrders } from "../service/MyAccountService";
import MyAccountPage from "./MyAccountPage";
import { redirect } from "next/navigation";

const MyAccountData = async () => {
  try {
    const viewer = await authenticateUser();
    const orders = await getOrders(viewer.databaseId);
    return (
      <MyAccountPage
        viewerName={viewer.name}
        orders={orders}
        posts={viewer.posts.nodes}
      />
    );
  } catch (error) {
    redirect("/auth/login");
  }
};

export default MyAccountData;
