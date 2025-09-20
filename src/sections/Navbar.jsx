import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Navigation({ isOpen, activeSection, setActiveSection }) {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <ul className={`nav-ul ${isOpen ? "block" : "hidden"} sm:flex`}>
      {links.map((link) => (
        <li key={link.name} className="nav-li">
          <a
            href={link.href}
            onClick={() => setActiveSection(link.name)}
            className={`nav-link ${
              activeSection === link.name ? "text-aqua" : ""
            }`}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <a
          href="#"
          className="text-2xl font-bold text-white hover:text-aqua transition-colors"
        >
          IMRAN CHINTAKAYAMANDA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <Navigation
            isOpen={true}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-aqua"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <img
            src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
            alt="Menu Toggle"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-primary/90 backdrop-blur-md rounded-b-lg shadow-lg px-4 py-4"
          >
            <Navigation
              isOpen={isOpen}
              activeSection={activeSection}
              setActiveSection={(section) => {
                setActiveSection(section);
                setIsOpen(false); // close on selection
              }}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
