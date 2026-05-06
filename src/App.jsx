import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import HeroSection  from "./sections/HeroSection";
import AboutProject from "./sections/AboutProject";
import ProjectDemo  from "./sections/ProjectDemo";
import AboutMe      from "./sections/AboutMe";
import Footer       from "./components/Footer";
import ProjectPage  from "./pages/ProjectPage";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [inProject,     setInProject]     = useState(false);
  const [theme,         setTheme]         = useState(() => {
    // Persist theme preference
    return localStorage.getItem("theme") || "dark";
  });

  /* ── Apply theme to <html> ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  /* ── Active section tracker ── */
  useEffect(() => {
    const ids = ["home", "about-project", "project", "about-me"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  if (inProject) return <ProjectPage onExit={() => setInProject(false)} />;

  return (
    <>
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutProject />
        <ProjectDemo onStart={() => setInProject(true)} />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}
