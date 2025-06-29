import { fetchAllUsers } from "@/apis/server-apis";
import AdminLayout from "../AdminLayout";
import UserManagement from "./UserManagement";

async function Page() {
  const userData = await fetchAllUsers();
  return (
    <AdminLayout>
      <UserManagement userData={userData} />
    </AdminLayout>
  );
}

export default Page;
