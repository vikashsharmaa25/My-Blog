import React from "react";

function NavLinks({ categoryData }: any) {
  return (
    <div className="flex justify-center items-center gap-5">
      {categoryData?.categories?.map((link: any, index: any) => (
        <h1
          key={index}
          className="px-2 py-1 cursor-pointer hover:text-green-700 font-semibold duration-200"
        >
          {link.name}
        </h1>
      ))}
    </div>
  );
}

export default NavLinks;
