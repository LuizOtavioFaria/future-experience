import s from "./AboutMe.module.css";

const TECHS = [
  { name: "HTML",        color: "#e34f26", symbol: "⟨⟩" },
  { name: "CSS",         color: "#1572b6", symbol: "⬡"  },
  { name: "JavaScript",  color: "#f7df1e", symbol: "JS" },
  { name: "React",       color: "#61dafb", symbol: "⚛"  },
  { name: "Vite",        color: "#bd34fe", symbol: "⚡"  },
  { name: "Tailwind CSS",color: "#38bdf8", symbol: "≋"  },
  { name: "Three.js",    color: "#00f2ff", symbol: "◉"  },
  { name: "GSAP",        color: "#88ce02", symbol: "▶"  },
  { name: "Figma",       color: "#ff7262", symbol: "✦"  },
  { name: "Git",         color: "#f05032", symbol: "⑂"  },
  { name: "GitHub",      color: "#adb5bd", symbol: "⊛"  },
  { name: "Node.js",     color: "#339933", symbol: "⬡"  },
];

const CONTACTS = [
  {
    label: "E-mail",
    handle: "luizotavio@email.com",
    href: "mailto:luizotavio@email.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 6.5L9 11L16.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "github.com/luizotavio",
    href: "https://github.com/luizotavio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5a7.5 7.5 0 00-2.371 14.618c.375.07.513-.163.513-.362 0-.178-.006-.651-.01-1.278-2.086.454-2.527-.9-2.527-.9-.34-.865-.831-1.096-.831-1.096-.68-.465.051-.455.051-.455.75.053 1.145.77 1.145.77.666 1.14 1.747.81 2.173.62.068-.482.26-.81.473-.997-1.666-.19-3.416-.833-3.416-3.708 0-.819.293-1.488.772-2.012-.077-.19-.335-.952.073-1.985 0 0 .63-.201 2.063.769A7.19 7.19 0 019 6.978a7.19 7.19 0 011.877.253c1.431-.97 2.06-.769 2.06-.769.41 1.033.152 1.795.075 1.985.48.524.771 1.193.771 2.012 0 2.882-1.754 3.516-3.424 3.702.269.231.508.689.508 1.389 0 1.003-.01 1.812-.01 2.059 0 .2.136.435.517.361A7.5 7.5 0 009 1.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/luizotavio",
    href: "https://linkedin.com/in/luizotavio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M5 7.5v5M5 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8.5 12.5V10a1.5 1.5 0 013 0v2.5M8.5 7.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@luizotavio",
    href: "https://instagram.com/luizotavio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="13" cy="5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function AboutMe() {
  return (
    <section className={s.section} id="about-me">
      <div className={s.inner}>
        <span className="chip">Sobre Mim</span>

        <div className={s.grid}>
          {/* ── Profile ── */}
          <div className={s.profile}>
            {/* Avatar */}
            <div className={s.avatarWrap}>
              <div className={s.avatar}>
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="ag" cx="50%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="rgba(0,242,255,0.2)"/>
                      <stop offset="100%" stopColor="rgba(0,242,255,0.02)"/>
                    </radialGradient>
                  </defs>
                  <circle cx="60" cy="60" r="60" fill="url(#ag)"/>
                  <circle cx="60" cy="42" r="22" fill="rgba(0,242,255,0.18)" stroke="rgba(0,242,255,0.5)" strokeWidth="1.2"/>
                  <circle cx="60" cy="42" r="14" fill="rgba(0,242,255,0.25)"/>
                  <path d="M14 110 C14 80 106 80 106 110" fill="rgba(0,242,255,0.14)" stroke="rgba(0,242,255,0.4)" strokeWidth="1.2"/>
                  <polygon points="60,26 66,38 80,38 69,46 73,60 60,52 47,60 51,46 40,38 54,38" fill="rgba(0,242,255,0.35)" opacity="0.6"/>
                </svg>
              </div>
              <div className={s.avatarPing} />
            </div>

            <div className={s.bio}>
              <h2 className={s.name}>Luiz Otávio Faria</h2>
              <p className={s.role}>
                Estudante de Ciência da Computação
                <span className={s.roleSep}> / </span>
                Desenvolvedor Front-End
              </p>
              <p className={s.text}>
                Apaixonado por transformar ideias em experiências visuais
                memoráveis. Atualmente cursando Ciência da Computação, dedico
                boa parte do meu tempo explorando as fronteiras entre design e
                código — especialmente em experiências 3D interativas na web.
                Acredito que o futuro da web é imersivo, e estou aqui para
                construí-lo, um projeto de cada vez.
              </p>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className={s.right}>
            {/* Skills */}
            <div className={s.block}>
              <h3 className={s.blockTitle}>Stack &amp; Ferramentas</h3>
              <div className={s.skills}>
                {TECHS.map((t) => (
                  <div
                    key={t.name}
                    className={s.skill}
                    style={{ "--tc": t.color }}
                  >
                    <span className={s.skillSym}>{t.symbol}</span>
                    <span className={s.skillName}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className={s.block}>
              <h3 className={s.blockTitle}>Contato</h3>
              <div className={s.contacts}>
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={s.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={s.contactIcon}>{c.icon}</span>
                    <div className={s.contactInfo}>
                      <span className={s.contactLabel}>{c.label}</span>
                      <span className={s.contactHandle}>{c.handle}</span>
                    </div>
                    <svg className={s.contactArrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
