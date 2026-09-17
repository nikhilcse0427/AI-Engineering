"use client";
import { contactInfo, footerSections, socials } from "@/lib/constant";
import { Stethoscope, Send, Heart, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] pt-32 pb-12 text-gray-300 relative overflow-hidden border-t border-gray-800">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/20 to-indigo-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/20 to-blue-900/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] p-10 md:p-14 mb-24 relative overflow-hidden group shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] border border-blue-500/50"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl group-hover:scale-125 group-hover:bg-white/15 transition-all duration-1000 ease-out"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/40 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl group-hover:scale-150 transition-all duration-1000 ease-out"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="text-center lg:text-left max-w-2xl">
              <h4 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Subscribe to our <br className="hidden md:block" /> health magazine
              </h4>
              <p className="text-blue-100/90 font-medium text-lg lg:pr-12">
                Get expert medical advice, healthy lifestyle tips, and exclusive updates delivered fresh to your inbox weekly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-inner">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-full bg-transparent text-white placeholder:text-blue-200/70 focus:outline-none focus:ring-0 sm:min-w-[320px] font-medium"
              />
              <Button className="bg-white hover:bg-gray-50 text-blue-900 px-8 py-4 rounded-full font-extrabold h-auto shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] group transition-all">
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 max-w-sm">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-3 mb-8 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.2rem] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-extrabold tracking-tight text-white">
                  Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Care+</span>
                </div>
              </div>
            </Link>

            <p className="text-gray-400 mb-10 text-lg leading-relaxed font-medium">
              Leading the digital healthcare revolution with expert care that's always within reach. Your health is our ultimate priority.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-extrabold text-white mb-8 uppercase tracking-widest text-sm relative inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></span>
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm font-medium inline-block hover:translate-x-2 relative group"
                        >
                          {link.text}
                          <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-800/80 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-500 text-sm font-semibold">
            <span>&copy; {new Date().getFullYear()} MediCare+ Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> for healthy living
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ name, icon: Icon, url }) => (
              <motion.a
                key={name}
                href={url}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gray-800/80 border border-gray-700 hover:bg-blue-600 hover:border-blue-500 rounded-[1rem] flex items-center justify-center transition-all shadow-lg"
                aria-label={name}
              >
                <Icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
