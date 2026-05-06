import s from "./Footer.module.css";

const NAV = [
  { id: "home",          label: "Início"    },
  { id: "about-project", label: "Projeto"   },
  { id: "project",       label: "Demo"      },
  { id: "about-me",      label: "Sobre Mim" },
];

export default function Footer() {
  const year   = new Date().getFullYear();
  const go     = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const toTop  = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={s.footer}>
      <div className={s.topLine} aria-hidden />

      <div className={s.inner}>
        {/* Brand */}
        <div className={s.brand}>
          <button className={s.logo} onClick={toTop}>
            <span className={s.logoBracket}>[</span>
            <span className={s.logoText}>LO</span>
            <span className={s.logoBracket}>]</span>
          </button>
          <p className={s.tagline}>
            Construindo o futuro da web,<br />um projeto de cada vez.
          </p>
          <div className={s.status}>
            <span className={s.statusDot} />
            <span>Disponível para projetos</span>
          </div>
        </div>

        {/* Nav */}
        <div className={s.navCol}>
          <span className={s.colLabel}>Navegação</span>
          <ul className={s.navList}>
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <button className={s.navLink} onClick={() => go(id)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className={s.techCol}>
          <span className={s.colLabel}>Feito com</span>
          <div className={s.badges}>
            {["React 18", "Three.js", "R3F", "Vite 5", "CSS Modules"].map((t) => (
              <span key={t} className={s.badge}>{t}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className={s.contactCol}>
          <span className={s.colLabel}>Contato rápido</span>
          <a href="mailto:luizotavio@email.com" className={s.mailLink}>
            luizotavio
            <span className={s.mailAt}>@</span>
            email.com
          </a>
          <div className={s.socials}>
            {[
              { label: "GH",  href: "https://github.com/luizotavio"       },
              { label: "LI",  href: "https://linkedin.com/in/luizotavio"  },
              { label: "IG",  href: "https://instagram.com/luizotavio"    },
            ].map((sc) => (
              <a key={sc.label} href={sc.href} className={s.socialBtn}
                target="_blank" rel="noopener noreferrer">
                {sc.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={s.bottom}>
        <p className={s.copy}>
          © {year} Luiz Otávio Faria — Todos os direitos reservados.
        </p>
        <button className={s.toTop} onClick={toTop}>
          ↑ Voltar ao topo
        </button>
      </div>
    </footer>
  );
}
