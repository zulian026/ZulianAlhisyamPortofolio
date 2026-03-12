import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { useRef } from "react";

const photos = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
];

const layout = [
  { x: -40, y: 0, rotate: -10, scale: 0.9, z: 1 },
  { x: 160, y: 10, rotate: 8, scale: 0.9, z: 1 },
  { x: 70, y: 120, rotate: -3, scale: 1, z: 3 },
  { x: -20, y: 210, rotate: 6, scale: 0.92, z: 2 },
  { x: 170, y: 220, rotate: -7, scale: 0.92, z: 2 },
];

export default function PolaroidStack() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]));

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-[420px] h-[380px] [perspective:1200px]"
    >
      <motion.div style={{ rotateX, rotateY }} className="w-full h-full">
        {photos.map((src, i) => {
          const item = layout[i];

          return (
            <motion.div
              key={i}
              drag
              dragElastic={0.15}
              dragMomentum={false}
              initial={{
                x: item.x,
                y: item.y,
                rotate: item.rotate,
                scale: item.scale,
              }}
              whileHover={{
                y: item.y - 20,
                rotate: 0,
                scale: 1.05,
                zIndex: 10,
              }}
              className="absolute bg-white p-2 pb-6 rounded-md shadow-2xl cursor-grab active:cursor-grabbing"
              style={{ zIndex: item.z }}
            >
              <img
                src={`${src}?auto=format&fit=crop&w=400&q=60`}
                className="w-36 h-36 object-cover rounded-sm"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
