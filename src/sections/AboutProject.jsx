import s from "./AboutProject.module.css";

const CARDS = [
  {
    tag: "TECNOLOGIA",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#00f2ff" strokeWidth="1.2" fill="rgba(0,242,255,0.05)" />
        <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" stroke="#00f2ff" strokeWidth="0.8" fill="rgba(0,242,255,0.08)" />
        <circle cx="14" cy="14" r="2.5" fill="#00f2ff" opacity="0.8"/>
      </svg>
    ),
    title: "Renderização 3D no Navegador",
    desc: "Utiliza React Three Fiber e Three.js para renderizar geometria holográfica interativa diretamente no browser, sem plugins ou instalações. Cada elemento responde em tempo real ao scroll, criando uma narrativa visual que combina código e arte.",
  },
  {
    tag: "DESIGN",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3 L14 25 M3 14 L25 14" stroke="#00f2ff" strokeWidth="1" opacity="0.3"/>
        <circle cx="14" cy="14" r="10" stroke="#00f2ff" strokeWidth="1.2" fill="none"/>
        <circle cx="14" cy="14" r="5"  stroke="#00f2ff" strokeWidth="0.8" fill="rgba(0,242,255,0.06)"/>
        <circle cx="14" cy="4"  r="1.5" fill="#00f2ff"/>
        <circle cx="14" cy="24" r="1.5" fill="#00f2ff" opacity="0.4"/>
      </svg>
    ),
    title: "Storytelling por Scroll",
    desc: "A experiência é guiada pelo scroll: frases cinematográficas surgem, crescem em zoom e explodem fora da tela, como atravessar camadas de realidade. Inspirada na direção artística de produções como GTA VI — brutal, neon e sem concessões.",
  },
];

export default function AboutProject() {
  return (
    <section className={s.section} id="about-project">
      <div className={s.inner}>
        {/* Header */}
        <div className={s.header}>
          <span className={`chip ${s.chip}`}>Sobre o Projeto</span>
          <h2 className={s.title}>
            Uma nova forma de
            <br />
            <em className={s.titleEm}>apresentar ideias</em>
          </h2>
          <p className={s.sub}>
            Um portfólio que não é apenas uma página — é uma experiência
            interativa construída com as ferramentas mais modernas de
            renderização 3D na web.
          </p>
        </div>

        {/* Cards */}
        <div className={s.cards}>
          {CARDS.map((c) => (
            <div className={s.card} key={c.title}>
              <div className={s.cardTop}>
                <div className={s.cardIcon}>{c.icon}</div>
                <span className={`chip ${s.cardTag}`}>{c.tag}</span>
              </div>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardDesc}>{c.desc}</p>
              <div className={s.cardLine} />
            </div>
          ))}
        </div>
      </div>

      {/* decorative divider */}
      <div className={s.divider} aria-hidden />
    </section>
  );
}
