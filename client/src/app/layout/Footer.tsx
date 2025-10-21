"use client"
import React, { useState } from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { isValidEmail } from "@/common/validation";

function Footer({ categoryData }: any) {
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const isEmailValid = isValidEmail(newsletterEmail);
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) return;
    // integrate actual subscribe logic here if needed
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center select-none mb-3">
            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              vikashsharma
            </span>
            <span className="text-2xl font-semibold ml-1 text-white">.dev</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Thoughts on web development, tutorials, and practical insights. Built with care and a love for clean UI.
          </p>
          <div className="flex space-x-3 mt-4">
            <a aria-label="Facebook" href="#" className="bg-[#3b5998] p-2 rounded text-white hover:opacity-90">
              <Facebook size={18} />
            </a>
            <a aria-label="Twitter" href="#" className="bg-[#1da1f2] p-2 rounded text-white hover:opacity-90">
              <Twitter size={18} />
            </a>
            <a aria-label="YouTube" href="#" className="bg-[#ff0000] p-2 rounded text-white hover:opacity-90">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-lg text-white font-medium mb-4 border-b-2 border-blue-600 w-max pb-1">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/blogs">Blogs</Link></li>
            <li><Link className="hover:text-white" href="/categories">Categories</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
         <p className="text-lg text-white font-medium mb-4 border-b-2 border-blue-600 w-max pb-1">
            Categories
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {categoryData?.categories?.slice(0, 6)?.map((item: any) => (
              <li key={item?._id}>
                <Link className="hover:text-white" href={`/blogs?category=${item?._id}`}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
         <p className="text-lg text-white font-medium mb-4 border-b-2 border-blue-600 w-max pb-1">
            Newsletter
          </p>
          <form className="space-y-3 text-sm" onSubmit={handleSubscribe} noValidate>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none border border-gray-800"
              value={newsletterName}
              onChange={(e) => setNewsletterName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none border border-gray-800"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              aria-invalid={!isEmailValid}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isEmailValid}
            >
              <span>✉</span>
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/70 py-4 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-white">
          © {new Date().getFullYear()} <span className="text-blue-500 font-medium">vikashsharma.dev</span> — All rights reserved.
        </p>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
