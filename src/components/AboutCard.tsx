import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AboutCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="bg-[#0c0c0c] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-white">About Me</h3>

        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/70"
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.p
            key="short"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-white/70"
          >
            Frontend developer yang fokus membuat website modern dan interaktif.
          </motion.p>
        ) : (
          <motion.p
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-white/70 leading-relaxed"
          >
            Saya adalah frontend developer yang fokus pada pembuatan website
            modern menggunakan React, Next.js, TypeScript dan Tailwind CSS. Saya
            senang membangun UI yang clean, interaktif dan memiliki performa
            tinggi dengan pengalaman pengguna yang baik.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
