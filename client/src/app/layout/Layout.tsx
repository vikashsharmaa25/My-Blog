import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import { getAllcategory } from "@/apis/all-apis";
import { handleError } from "@/utils/response-handler";
import { cookiesAccessToken } from "@/utils/get-cookies";
const getAllCategoryData = async () => {
  try {
    const response = await getAllcategory();
    return response;
  } catch (error) {
    handleError(error);
  }
};

async function Layout({ children }: any) {
  const categoryData = await getAllCategoryData();
  const cookiesData = await cookiesAccessToken();
  return (
    <>
      <Header categoryData={categoryData} cookiesData={cookiesData} />
      <div className="max-w-[1250px] mx-auto px-2">{children}</div>
      <Footer categoryData={categoryData} />
    </>
  );
}

export default Layout;
