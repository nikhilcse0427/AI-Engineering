"use client";
import { faqs, trustLogos } from "@/lib/constant";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Award, Sparkles } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] mb-32 border border-gray-100 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="text-center mb-16 relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-8 shadow-xl shadow-blue-500/20"
            >
              <Award className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Millions</span> of Patients
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              We've been providing top-tier healthcare services since 2010.
              Our commitment to quality has earned us the trust of leading institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center relative z-10">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.1, filter: "brightness(1.2) drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-16 transition-all duration-300 cursor-pointer"
              >
                <span className="font-extrabold text-xl text-gray-400 hover:text-blue-600 transition-colors tracking-tighter uppercase italic">{logo}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-6 shadow-sm"
            >
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Everything you need to know
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-6 relative">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
              >
                <Card
                  className={`border-2 transition-all duration-500 rounded-3xl overflow-hidden backdrop-blur-sm ${openFAQ === index
                      ? 'border-blue-500/30 bg-blue-50/40 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] ring-4 ring-blue-500/10'
                      : 'border-transparent bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:border-gray-200 cursor-pointer'
                    }`}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <CardContent className="p-0">
                    <div className="w-full px-8 py-6 text-left flex items-center justify-between">
                      <span className={`text-xl font-bold transition-colors duration-300 pr-8 ${openFAQ === index ? 'text-blue-700' : 'text-gray-800 hover:text-blue-600'}`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0, scale: openFAQ === index ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${openFAQ === index ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className="px-8 pb-8 pt-0">
                            <motion.p
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.4 }}
                              className="text-gray-600 text-lg leading-relaxed font-medium border-l-4 border-blue-400 pl-4"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
