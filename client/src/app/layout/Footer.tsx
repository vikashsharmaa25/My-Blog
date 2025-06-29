import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import DemoImage from "../../../public/images/person logo.jpg";
import Image from "next/image";

function Footer({ categoryData }: any) {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b-2 border-red-600 w-max pb-1">
            Categories
          </h3>

          <div>
            {categoryData?.categories?.map((item: any) => (
              <div key={item?._id} className="text-sm text-gray-300 space-y-1">
                {item?.name}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b-2 border-red-600 w-max pb-1">
            Newsletter
          </h3>
          <form className="space-y-4 text-sm">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded bg-[#111] text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 rounded bg-[#111] text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition duration-300 py-3 rounded font-semibold flex items-center justify-center space-x-2"
            >
              <span>✈</span>
              <span>Subscribe Now</span>
            </button>
          </form>
        </div>

        {/* Recent Feeds */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b-2 border-red-600 w-max pb-1">
            Recent Feeds
          </h3>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-14 h-14 overflow-hidden rounded bg-gray-700">
                  <Image
                    src={DemoImage}
                    alt="Recent feed"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    📅 24th February 2020
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {item === 1
                      ? "Sparks Of Inspiration To The New Trend 2021"
                      : "Career Certificates And More Ways We're"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">
              B
            </div>
            <h2 className="text-xl font-bold">
              Binduz <span className="text-red-500">magazine</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida.
          </p>
          <div className="flex space-x-3 mt-4">
            <button className="bg-[#3b5998] p-2 rounded text-white">
              <Facebook size={18} />
            </button>
            <button className="bg-[#1da1f2] p-2 rounded text-white">
              <Twitter size={18} />
            </button>
            <button className="bg-[#ff0000] p-2 rounded text-white">
              <Youtube size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0d0d0d] py-4 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between px-4">
        <p>
          Copyright By
          <span className="text-white font-medium ml-1">@QuomodoTheme</span> -
          2021
        </p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">
            Privacy & Policy
          </a>
          <a href="#" className="hover:text-white">
            Claim A Report
          </a>
          <a href="#" className="hover:text-white">
            Careers
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
