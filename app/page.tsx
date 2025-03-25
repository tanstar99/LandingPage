"use client"; // Mark this component as a Client Component

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
// import FeaturedProducts from "@/components/featured-products";
import Innovation from "@/components/innovation";
import Timeline from "@/components/timeline";
import ProductShowcase from "@/components/product-showcase";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";
import ChatBot from "@/components/chatbot"; // Import chatbot component

export default function Home() {
  return (  
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      {/* <FeaturedProducts /> */}
      <ProductShowcase />
      <Innovation />
      <Timeline />
      <Footer />
      <ChatBot /> {/* ChatBot Component */}
    </>
  );     
}
