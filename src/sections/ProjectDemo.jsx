import { useState, useCallback } from "react";
import s from "./ProjectDemo.module.css";

const isMobile = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  window.innerWidth < 900;

export default function ProjectDemo({ onStart }) {
  const [zooming,   setZooming]   = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleStart = useCallback(() => {
    if (isMobile()) { setShowAlert(true); return; }
    setZooming(true);
    setTimeout(onStart, 3000);
  }, [onStart]);

  return (
    <section className={s.section} id="project">
      <div className={s.inner}>
        {/* Header */}
        <div className={s.header}>
          <span className="chip">Demonstração</span>
          <h2 className={s.title}>
            Veja o projeto
            <span className={s.titleOutline}> em ação</span>
          </h2>
          <p className={s.sub}>
            Mergulhe na experiência completa com scroll interativo,
            frases cinematográficas e objeto 3D holográfico.
          </p>
        </div>

        {/* Preview card */}
        <div className={s.card}>
          {/* Simulated first frame */}
          <div className={s.preview}>
            <div className={s.previewBg} />
            <div className={s.previewGrid} aria-hidden />

            {/* Phrase simulation */}
            <div className={s.previewPhrase}>
              <div className={s.previewLine1}>SYSTEM</div>
              <div className={s.previewLine2}>START</div>
            </div>

            {/* Corner decorations */}
            <div className={`${s.corner} ${s.cornerTL}`} />
            <div className={`${s.corner} ${s.cornerTR}`} />
            <div className={`${s.corner} ${s.cornerBL}`} />
            <div className={`${s.corner} ${s.cornerBR}`} />

            {/* Scan line */}
            <div className={s.scanLine} aria-hidden />

            {/* Zoom overlay — plays on click */}
            {zooming && <div className={s.zoomOverlay} />}
          </div>

          {/* CTA panel */}
          <div className={s.cta}>
            <div className={s.ctaMeta}>
              <div className={s.metaItem}>
                <span className={s.metaLabel}>TECNOLOGIA</span>
                <span className={s.metaVal}>React + Three.js</span>
              </div>
              <div className={s.metaItem}>
                <span className={s.metaLabel}>TIPO</span>
                <span className={s.metaVal}>Scroll Imersivo</span>
              </div>
              <div className={s.metaItem}>
                <span className={s.metaLabel}>PLATAFORMA</span>
                <span className={s.metaVal}>Desktop only</span>
              </div>
            </div>

            <p className={s.ctaNote}>
              Requer computador para a experiência completa com WebGL e scroll 3D.
            </p>

            <button
              className={s.btnLaunch}
              onClick={handleStart}
              disabled={zooming}
            >
              {zooming ? (
                <>
                  <div className="spinner" />
                  Iniciando…
                </>
              ) : (
                <>
                  Ver Projeto
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile alert modal */}
      {showAlert && (
        <div className={s.backdrop} onClick={() => setShowAlert(false)}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 8 L35 32 L5 32 Z" stroke="#ff9500" strokeWidth="1.5" fill="rgba(255,149,0,0.08)" strokeLinejoin="round"/>
                <line x1="20" y1="18" x2="20" y2="25" stroke="#ff9500" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="29" r="1.2" fill="#ff9500"/>
              </svg>
            </div>
            <h3 className={s.modalTitle}>Desktop necessário</h3>
            <p className={s.modalText}>
              O projeto 3D interativo utiliza WebGL, scroll de alta precisão e
              OrbitControls — recursos que requerem um computador com teclado e
              mouse para funcionar corretamente.
              <br /><br />
              Acesse pelo desktop para a experiência completa.
            </p>
            <button className={s.btnLaunch} onClick={() => setShowAlert(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
