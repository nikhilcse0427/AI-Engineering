"use client";
import { testimonials } from "@/lib/constant";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#fafdfc]">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-bl from-blue-300/20 to-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-purple-300/20 to-pink-300/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-bold tracking-wider text-blue-700 uppercase bg-blue-50 border border-blue-100 rounded-full shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            Patient Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow-sm"
          >
            What our patients <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">say about us</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-8 bg-white/70 backdrop-blur-md rounded-full w-fit mx-auto shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-white"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-gray-900">4.9/5</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">based on 12k+ reviews</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, type: "spring" }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="h-full relative group perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="h-full border border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden relative z-10 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] group-hover:border-blue-100">
                <CardContent className="p-10 relative flex flex-col h-full">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <Quote className="absolute top-8 right-8 w-14 h-14 text-blue-500 opacity-5 group-hover:opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />

                  <div className="flex gap-1 mb-8 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + i * 0.05 }}>
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-10 text-lg italic leading-relaxed relative z-10 flex-grow font-medium">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-5 mt-auto relative z-10 pt-6 border-t border-gray-100/80">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-gray-900 text-lg tracking-tight">
                        {testimonial.author}
                      </span>
                      <span className="text-sm font-semibold text-blue-600/80 uppercase tracking-wide">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full hover:bg-gray-800 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              See More Success Stories
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
