import Dock from "./components/Dock";
import { House, User, FolderOpen, Mail } from "lucide-react";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const dockItems = [
    {
      label: "Home",
      href: "#home",
      icon: (
        <div className="flex flex-col items-center">
          <House size={20} />
          <span className="mt-1 text-[10px] font-medium">Home</span>
        </div>
      ),
    },
    {
      label: "About",
      href: "#about",
      icon: (
        <div className="flex flex-col items-center">
          <User size={20} />
          <span className="mt-1 text-[10px] font-medium">About</span>
        </div>
      ),
    },
    {
      label: "Projects",
      href: "#projects",
      icon: (
        <div className="flex flex-col items-center">
          <FolderOpen size={20} />
          <span className="mt-1 text-[10px] font-medium">Projects</span>
        </div>
      ),
    },
    {
      label: "Contact",
      href: "#contact",
      icon: (
        <div className="flex flex-col items-center">
          <Mail size={20} />
          <span className="mt-1 text-[10px] font-medium">Contact</span>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#000] text-white">
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section
        id="projects"
        className="flex min-h-screen items-center justify-center px-6"
      >
        <h2 className="text-3xl font-semibold">Projects Section</h2>
      </section>

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center px-6 pb-32"
      >
        <h2 className="text-3xl font-semibold">Contact Section</h2>
      </section>

      <Dock items={dockItems} />
    </main>
  );
}

export default App;
