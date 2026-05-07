import { useState, useEffect } from "react";
import s from "./Navbar.module.css";

const LINKS = [
  { id: "home",          label: "Início"    },
  { id: "about-project", label: "Projeto"   },
  { id: "project",       label: "Demo"      },
  { id: "about-me",      label: "Sobre Mim" },
];

/* ── Theme Toggle Icon ── */
function ThemeIcon({ theme }) {
  if (theme === "dark") {
    // Sun icon
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1"  x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1"  y1="12" x2="3"  y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    );
  }
  // Moon icon
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}

export default function Navbar({ activeSection, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ""}`}>
      <div className={s.inner}>
        {/* Logo */}
        <button className={s.logo} onClick={() => go("home")}>
          <span className={s.logoBracket}>[</span>
          <span className={s.logoText}>LO</span>
          <span className={s.logoBracket}>]</span>
        </button>

        {/* Desktop links */}
        <ul className={s.links}>
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`${s.link} ${activeSection === id ? s.linkActive : ""}`}
                onClick={() => go(id)}
              >
                {label}
                {activeSection === id && <span className={s.linkDot} />}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          className={s.themeBtn}
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          title={theme === "dark" ? "Tema claro" : "Tema escuro"}
        >
          <ThemeIcon theme={theme} />
        </button>

        {/* CTA */}
        <a href="mailto:luizotavio@email.com" className={s.cta}>
          Contato
        </a>

        {/* Hamburger */}
        <button
          className={`${s.burger} ${open ? s.burgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${s.drawer} ${open ? s.drawerOpen : ""}`}>
        {LINKS.map(({ id, label }) => (
          <button
            key={id}
            className={`${s.drawerLink} ${activeSection === id ? s.drawerLinkActive : ""}`}
            onClick={() => go(id)}
          >
            {label}
          </button>
        ))}
        {/* Theme toggle inside drawer on mobile */}
        <button className={s.drawerThemeBtn} onClick={onToggleTheme}>
          <ThemeIcon theme={theme} />
          {theme === "dark" ? "Tema Claro" : "Tema Escuro"}
        </button>
      </div>
    </nav>
  );
}
