"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <section className="overflow-hidden mx-auto relative min-h-[100vh]  font-clashMed">
        <div className="absolute z-10 right-0 left-0 top-[140px] md:top-5">
          <h2 className="text-[262.916px] lg:text-[547.559px] mx-auto font-semibold rotate-[-0.133deg] bg-gradient-to-r bg-clip-text text-transparent from-[#D9D9D975]/5 to-[#D9D9D900] text-center">
            404
          </h2>
        </div>
        <div className="absolute -z-50 right-0 left-0 top-[145px] md:-top-4">
          <h2 className="text-[262.916px] lg:text-[547.559px] mx-auto font-semibold rotate-[-0.133deg] bg-gradient-to-r bg-clip-text text-transparent from-[#FFFFFF03]/5 to-[#D9D9D900] text-center">
            404
          </h2>
        </div>

        <div className="mt-[200px] md:mt-[100px] relative">
          <p className="absolute top-0 left-0 right-0 text-[100.999px] lg:text-[200.477px] mx-auto font-semibold rotate-[-0.133deg] bg-gradient-to-r bg-clip-text text-transparent from-[#FFFFFF03]/40 to-[#D9D9D900] text-center">
            404
          </p>
          <p className="absolute top-3 lg:top-6 left-0 right-0 text-[100.999px] lg:text-[200.477px] mx-auto font-semibold rotate-[-0.133deg] bg-gradient-to-r bg-clip-text text-[#FFFFFF66] from-[#FFFFFF66] to-[#D9D9D900] text-center">
            404
          </p>
        </div>

        <div className="mt-[340px] md:mt-[250px] lg:mt-[400px] text-center mx-auto">
          <h3 className="text-[23px] font-satMed font-semibold">
            oooops! chief..😢
          </h3>
          <p className="text-[#FFFFFF99] text-center mx-auto max-w-sm px-3 text-sm font-clashMed font-medium">
            {"We can't get the user that owns the link, where you see am?."}
          </p>

          <Link
            href="/"
            className="relative z-40 cursor-pointer w-fit mt-4 md:mt-[27px] mx-auto block bg-gradient-to-l from-[#D9D9D9] to-[#D9D9D900] pt-0.5 pr-0.5"
          >
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 0.99 }}
              className="bg-primary px-[22.8px] py-[14.85px] whitespace-nowrap transition-all duration-300 text-[14.5px] font-medium"
            >
              Create your own link
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
}
