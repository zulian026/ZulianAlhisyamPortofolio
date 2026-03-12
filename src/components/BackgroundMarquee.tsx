import { motion } from "motion/react";

const images = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
  "https://images.unsplash.com/photo-1537432376769-00a2b7f9c2b7",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <motion.div
      className="flex gap-6 w-max"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...images, ...images].map((src, i) => (
        <div
          key={i}
          className="w-80 h-56 overflow-hidden rounded-xl border border-black-200 bg-black"
        >
          <img
            src={`${src}?auto=format&fit=crop&w=800&q=60`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function BackgroundMarquee() {
  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1200px]">
      <div className="absolute inset-0 rotate-x-[35deg] scale-150 opacity-30 space-y-8">
        <Row />
        <Row reverse />
        <Row />
      </div>

      {/* overlay biar text kebaca */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
    </div>
  );
}
