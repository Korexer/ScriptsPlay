import { useState } from "react";
import { ArrowLeft, ArrowRight, PencilLine } from "lucide-react";

const frames = [
  {
    title: "A good idea. Too much explaining.",
    caption:
      "A customer sees features, steps, and unfamiliar words. They need a reason to care.",
    label: "The problem",
  },
  {
    title: "Give the story a clear path.",
    caption:
      "Start with their problem. Show one useful change. Draw the steps that make it happen.",
    label: "The explanation",
  },
  {
    title: "Make the next step obvious.",
    caption:
      "Now the viewer knows what you do, why it matters, and where to go next.",
    label: "The next step",
  },
];

export default function Storyboard() {
  const [scene, setScene] = useState(0);
  const frame = frames[scene];
  return (
    <div className="sp-board-shell">
      <div className="sp-board-top">
        <span>
          <PencilLine size={16} /> The idea, illustrated
        </span>
        <span>Storyboard concept</span>
      </div>
      <div className="sp-board" aria-live="polite">
        <p className="sp-board-label">
          SCENE 0{scene + 1} / {frame.label}
        </p>
        <svg
          className="sp-drawing"
          viewBox="0 0 480 210"
          role="img"
          aria-label={frame.title}
          key={scene}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {scene === 0 ? (
              <>
                <circle cx="100" cy="82" r="24" />
                <path d="M99 108v56m-1-39-35 23m36-23 35 22m-35 17-24 32m24-32 24 32" />
                <path d="M184 37q62-15 115 0v53H185zm134 55 94-6 6 50-92 9zm-107 32 76 12-6 49-73-9" />
                <path d="m151 86 20-12m-23 46 30 8m-11 43 27-9" />
                <text
                  x="222"
                  y="74"
                  fontSize="25"
                  fill="currentColor"
                  stroke="none"
                >
                  ?
                </text>
                <text
                  x="349"
                  y="122"
                  fontSize="25"
                  fill="currentColor"
                  stroke="none"
                >
                  ?
                </text>
                <path d="m227 156 42 5" />
              </>
            ) : scene === 1 ? (
              <>
                <path d="m25 64 100-4 3 90-100 5zm155-4 102 3-1 91-101-2zm155 2 104-1-2 92-101 2" />
                <path d="m136 107 32 0-9-8m9 8-9 8m133-8h31l-9-8m9 8-9 8" />
                <circle cx="77" cy="100" r="13" />
                <path d="m65 120 23 0m137-36v32m-10-10 10 10 12-10m-24 21h30" />
                <path d="m365 110 14 13 29-32" />
              </>
            ) : (
              <>
                <path d="M89 28h290l-4 164-286 2z" />
                <path d="M89 59h288" />
                <circle cx="108" cy="44" r="3" />
                <circle cx="121" cy="44" r="3" />
                <path d="m185 95 25 25 48-48m-84 69h120v29H174z" />
                <path d="m323 131 5 41 12-12 12 8 5-10-13-7 12-9z" />
              </>
            )}
          </g>
        </svg>
        <h3>{frame.title}</h3>
        <p>{frame.caption}</p>
      </div>
      <div className="sp-board-controls">
        <button
          type="button"
          onClick={() => setScene((scene + 2) % 3)}
          aria-label="Previous storyboard scene"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          {frames.map((f, i) => (
            <button
              type="button"
              key={f.label}
              className={i === scene ? "active" : ""}
              aria-label={`Show scene ${i + 1}: ${f.label}`}
              aria-pressed={i === scene}
              onClick={() => setScene(i)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setScene((scene + 1) % 3)}
          aria-label="Next storyboard scene"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
