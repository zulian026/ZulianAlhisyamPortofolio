import BackgroundMarquee from "../components/BackgroundMarquee";
import PolaroidStack from "../components/PolaroidStack";

export default function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-10"
    >
      <BackgroundMarquee />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Hi, I'm Zul
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-md">
            Frontend Developer who focuses on creating modern, interactive, and
            high-performance websites using React, Next.js, and Tailwind.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-lg font-medium">
              View Projects
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <PolaroidStack />
        </div>
      </div>
    </section>
  );
}
