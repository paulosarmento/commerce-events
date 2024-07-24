import { fetchMyAccountData } from "../service/MyAccountService";
import MyAccountPage from "./MyAccountPage";
import { redirect } from "next/navigation";

const MyAccountData = async () => {
  try {
    const props = await fetchMyAccountData();
    return <MyAccountPage {...props} />;
  } catch (error) {
    redirect("/auth/login");
  }
};

export default MyAccountData;
