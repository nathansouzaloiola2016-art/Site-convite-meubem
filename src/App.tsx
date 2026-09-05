import { useState, useRef, useCallback, useEffect } from "react";

const NO_STATES = [
  { label: "Não", subtext: null },
  { label: "Tem certeza?", subtext: null },
  { label: "Não adianta ", subtext: null },
  { label: "Você vai continuar tentando?", subtext: null },
  { label: "…para de apertar", subtext: null },
  { label: "Ok, desisto ", subtext: null },
  { label: "Tá de sacanagem?", subtext: null },
  { label: "kkkkkkkk", subtext: null },
  { label: "Aperta SIM logo", subtext: null },
];

function Stars() {
  return (
    <>
      <span
        className="star-twinkle absolute text-[#c9a84c]"
        style={{ top: "8%", left: "12%", fontSize: "10px", opacity: 0.5 }}
      >
        ✦
      </span>
      <span
        className="star-twinkle absolute text-[#c9a84c]"
        style={{ top: "14%", left: "78%", fontSize: "7px", opacity: 0.4 }}
      >
        ✦
      </span>
      <span
        className="star-twinkle absolute text-[#c9a84c]"
        style={{ top: "82%", left: "88%", fontSize: "9px", opacity: 0.45 }}
      >
        ✦
      </span>
      <span
        className="star-twinkle absolute text-[#c9a84c]"
        style={{ top: "88%", left: "8%", fontSize: "6px", opacity: 0.35 }}
      >
        ✦
      </span>
    </>
  );
}

function Moon() {
  return (
    <div
      className="absolute"
      style={{ top: "6%", right: "14%", opacity: 0.65 }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M22 14.5C22 19.747 17.747 24 12.5 24C9.1 24 6.12 22.23 4.35 19.56C5.3 19.85 6.3 20 7.35 20C13.42 20 18.35 15.07 18.35 9C18.35 7.35 17.97 5.79 17.3 4.4C20.12 6.2 22 9.14 22 12.5V14.5Z"
          fill="#c9a84c"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

function BookmarkRibbon() {
  return <div className="ribbon" />;
}

function OrnamentalDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 my-1"
      style={{ color: "#c9a84c", opacity: 0.55, fontSize: "11px" }}
    >
      <span>—</span>
      <span style={{ fontSize: "14px" }}>✦</span>
      <span>—</span>
    </div>
  );
}

function PageNumber({ n }: { n: number }) {
  return (
    <div
      className="absolute bottom-6 left-0 right-0 flex justify-center"
      style={{
        fontFamily: "'Lora', serif",
        fontSize: "11px",
        color: "#8a7a64",
        letterSpacing: "0.18em",
        opacity: 0.55,
      }}
    >
      {n}
    </div>
  );
}

// Pick a safe position for the NO button using pixel-aware offsets
// The button is ~160px wide and ~44px tall; we keep it 20px from edges.
function randomNoPosition(attempt: number, vw: number, vh: number) {
  const btnW = 168;
  const btnH = 44;
  const pad = 24; // min distance from any edge

  // Safe zones: corners + sides, avoiding the vertical center band (40-60%)
  const zones = [
    // Top-left area
    { x: pad, y: pad + 60 },
    // Top-right area
    { x: vw - btnW - pad, y: pad + 60 },
    // Bottom-left area
    { x: pad, y: vh - btnH - pad - 48 },
    // Bottom-right area
    { x: vw - btnW - pad, y: vh - btnH - pad - 48 },
    // Mid-left
    { x: pad, y: Math.round(vh * 0.35) },
    // Mid-right
    { x: vw - btnW - pad, y: Math.round(vh * 0.35) },
  ];

  const pos = zones[attempt % zones.length];
  return { top: `${pos.y}px`, left: `${pos.x}px` };
}

export default function App() {
  const [screen, setScreen] = useState<"main" | "leaving" | "yes">("main");
  const [noState, setNoState] = useState(0);
  const [noPos, setNoPos] = useState<{ top: string; left: string } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // On first interaction with NO, place it in the first flee position
  const handleNoInteraction = useCallback(() => {
    const next = noState + 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setNoState(next);
    setNoPos(randomNoPosition(next, vw, vh));
  }, [noState]);

  const handleYes = useCallback(() => {
    setScreen("leaving");
    setTimeout(() => setScreen("yes"), 600);
  }, []);

  // Reset NO button to normal position when user hasn't interacted yet
  const noLabel = NO_STATES[Math.min(noState, NO_STATES.length - 1)].label;

  return (
    <div className="size-full paper-texture overflow-hidden">
      {/* MAIN SCREEN */}
      {(screen === "main" || screen === "leaving") && (
        <div
          ref={containerRef}
          className={`size-full relative flex flex-col items-center justify-center ${
            screen === "leaving" ? "page-turn" : ""
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Stars />
          <Moon />
          <BookmarkRibbon />

          {/* Top ornament */}
          <div
            className="absolute top-6 left-0 right-0 flex justify-center"
            style={{ color: "#c9a84c", opacity: 0.4, fontSize: "13px", letterSpacing: "0.4em" }}
          >
            ✦ ✦ ✦
          </div>

          {/* Main content card */}
          <div
            className="flex flex-col items-center px-8 z-10"
            style={{ maxWidth: "420px", width: "100%" }}
          >
            {/* Chapter label */}
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#8a7a64",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                opacity: 0.75,
              }}
            >
              Capítulo I
            </p>

            <OrnamentalDivider />

            {/* Question */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 6vw, 2.1rem)",
                color: "#2a2118",
                textAlign: "center",
                lineHeight: 1.45,
                marginTop: "1.2rem",
                marginBottom: "0.5rem",
              }}
            >
              Vamos ficar juntos
              <br />
              no domingo?
            </h1>

            <OrnamentalDivider />

            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(0.78rem, 3vw, 0.88rem)",
                color: "#8a7a64",
                textAlign: "center",
                marginTop: "0.9rem",
                marginBottom: "2.4rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              "Escolha com sabedoria, Meu Bem…"
            </p>

            {/* Buttons row — side by side initially */}
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={handleYes}
                className="z-20"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.95rem, 4vw, 1.05rem)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#f5f0e8",
                  background: "linear-gradient(135deg, #2a2118 0%, #3d3022 100%)",
                  border: "none",
                  borderRadius: "3px",
                  padding: "16px 40px",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(42,33,24,0.18)",
                  minWidth: "130px",
                  minHeight: "56px",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(42,33,24,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(42,33,24,0.18)";
                }}
              >
                Sim
              </button>

              {/* NO button: inline until first interaction, then floats */}
              {!noPos && (
                <button
                  onTouchStart={handleNoInteraction}
                  onMouseDown={handleNoInteraction}
                  style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(0.9rem, 3.8vw, 1rem)",
                    color: "#3d3022",
                    background: "#ede5d0",
                    border: "1.5px solid rgba(90,78,60,0.5)",
                    borderRadius: "3px",
                    padding: "16px 28px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.05em",
                    minWidth: "130px",
                    minHeight: "56px",
                    boxShadow: "0 1px 6px rgba(42,33,24,0.10)",
                  }}
                >
                  {noLabel}
                </button>
              )}
            </div>

            {/* Hint shown only after NO has fled */}
            {noPos && (
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "10px",
                  color: "#b0a08a",
                  marginTop: "1.4rem",
                  fontStyle: "italic",
                  opacity: 0.6,
                  textAlign: "center",
                }}
              >
                (o outro botão está fugindo…)
              </p>
            )}
          </div>

          {/* Floating NO button — only after first interaction */}
          {noPos && (
          <button
            onTouchStart={handleNoInteraction}
            onMouseDown={handleNoInteraction}
            className="btn-no z-30"
            style={{
              position: "absolute",
              top: noPos.top,
              left: noPos.left,
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 3.8vw, 1rem)",
              color: "#3d3022",
              background: "#ede5d0",
              border: "1.5px solid rgba(90,78,60,0.5)",
              borderRadius: "3px",
              padding: "13px 28px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              letterSpacing: "0.05em",
              minWidth: "120px",
              minHeight: "48px",
              textAlign: "center",
              boxShadow: "0 1px 6px rgba(42,33,24,0.10)",
            }}
          >
            {noLabel}
          </button>
          )}

          <PageNumber n={1} />
        </div>
      )}

      {/* YES / SECOND SCREEN */}
      {screen === "yes" && (
        <div
          className="size-full relative flex flex-col items-center justify-center page-enter paper-texture"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Stars />
          <Moon />
          <BookmarkRibbon />

          <div
            className="absolute top-6 left-0 right-0 flex justify-center"
            style={{ color: "#c9a84c", opacity: 0.4, fontSize: "13px", letterSpacing: "0.4em" }}
          >
            ✦ ✦ ✦
          </div>

          <div
            className="flex flex-col items-center px-8 z-10"
            style={{ maxWidth: "420px", width: "100%" }}
          >
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#8a7a64",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                opacity: 0.75,
              }}
            >
              Capítulo II
            </p>

            <OrnamentalDivider />

            {/* Heart */}
            <div
              className="heart-pulse"
              style={{
                fontSize: "clamp(2rem, 8vw, 2.8rem)",
                marginTop: "1.2rem",
                marginBottom: "0.6rem",
                color: "#c9a84c",
                opacity: 0.8,
              }}
            >
              ❤
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.35rem, 5.5vw, 1.9rem)",
                color: "#2a2118",
                textAlign: "center",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
              }}
            >
              Obrigado meu amor,
              <br />
              combinado então! ❤️
            </h2>

            <OrnamentalDivider />

            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(0.78rem, 3vw, 0.88rem)",
                color: "#8a7a64",
                textAlign: "center",
                marginTop: "1rem",
                marginBottom: "2rem",
                fontStyle: "italic",
                lineHeight: 1.7,
                opacity: 0.8,
              }}
            >
              "Prometo que vamos comer um Hamburgão,
              <br />
              e vou levar um docinho pra você."
            </p>

            {/* Book open icon */}
            <div style={{ color: "#c9a84c", opacity: 0.5, fontSize: "2rem" }}>
              📖
            </div>

            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "10px",
                color: "#b0a08a",
                marginTop: "1.4rem",
                fontStyle: "italic",
                opacity: 0.5,
                letterSpacing: "0.1em",
              }}
            >
              Fim.
            </p>
          </div>

          <PageNumber n={2} />
        </div>
      )}
    </div>
  );
}
