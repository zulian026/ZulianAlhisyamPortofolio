import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const rightCards = [
  {
    title: "Skills",
    short: "React, Next.js, TypeScript",
    full: "React, Next.js, TypeScript, Tailwind CSS, Zustand, Prisma, Recharts",
  },
  {
    title: "Experience",
    short: "Web apps & dashboards",
    full: "Membangun berbagai web apps, dashboard, landing page dan project portfolio menggunakan React dan Next.js.",
  },
  {
    title: "Tools",
    short: "VSCode, Git",
    full: "VSCode, Git, Figma, Vercel, Postman, Supabase, Neon",
  },
  {
    title: "Learning",
    short: "3D Web",
    full: "Three.js, Motion UI, Advanced React patterns, performance optimization.",
  },
];

function RightCard({ card, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="glow-border group relative cursor-pointer rounded-2xl border border-white/10 bg-black p-6 text-white text-left transition hover:border-white/20 hover:bg-[#0a0a0a]"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{card.title}</h3>

        <motion.div
          className="text-white/40 group-hover:text-white/80"
          whileHover={{ x: 4 }}
        >
          <ArrowRight size={18} />
        </motion.div>
      </div>

      <p className="mt-2 text-sm text-white/70">{card.short}</p>

      <span className="mt-4 block text-xs text-white/40 group-hover:text-white/60">
        Click to view →
      </span>
    </motion.button>
  );
}

function DetailPanel({ card, onBack }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-2 rounded-2xl border border-white/10 bg-black p-6 text-white"
    >
      <button
        onClick={onBack}
        className="text-sm text-white/60 mb-4 hover:text-white"
      >
        ← Back
      </button>

      <h3 className="text-xl font-semibold">{card.title}</h3>

      <p className="mt-3 text-white/70 leading-relaxed">{card.full}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="min-h-screen bg-black flex items-center px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            About Me
          </h2>

          <p className="mt-4 text-white/60 max-w-xl">
            Learn more about who I am, my skills, experience, and the tools I
            use to build modern web applications.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-[1.2fr_2fr] gap-6">
          {/* LEFT PROFILE CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glow-border rounded-2xl border border-white/10 bg-black p-6 text-white"
          >
            <div className="flex flex-col h-full">
              {/* FOTO */}
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                  className="w-full h-72 object-cover rounded-xl"
                />
              </div>

              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">About Me</h3>

                <motion.div
                  animate={{ rotate: open ? 90 : 0 }}
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer text-white/60"
                >
                  <ArrowRight size={18} />
                </motion.div>
              </div>

              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {open
                  ? "Saya adalah frontend developer yang fokus membangun website modern menggunakan React, Next.js, TypeScript dan Tailwind CSS. Saya menyukai UI yang clean, interaktif dan performa tinggi."
                  : "Frontend developer yang fokus membangun website modern dan interaktif."}
              </p>
            </div>
          </motion.div>

          {/* RIGHT BENTO */}
          <div className="grid grid-cols-2 gap-5 auto-rows-[220px]">
            {activeCard === null ? (
              rightCards.map((card, i) => (
                <RightCard
                  key={i}
                  card={card}
                  onClick={() => setActiveCard(i)}
                />
              ))
            ) : (
              <DetailPanel
                card={rightCards[activeCard]}
                onBack={() => setActiveCard(null)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
