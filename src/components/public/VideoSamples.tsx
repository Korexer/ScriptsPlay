import { useRef, type SyntheticEvent } from "react";

const samples = [
  {
    title: "Complex B2B, made clear",
    description:
      "A business explainer that turns a technical offer into a story people can follow.",
    duration: "1:16",
    video: "/videos/complex-b2b-explainer.mp4",
    poster: "/images/samples/complex-b2b-explainer.webp",
  },
  {
    title: "Public speaking training",
    description:
      "A training example that makes an everyday challenge easier to understand and remember.",
    duration: "1:07",
    video: "/videos/public-speaking-training.mp4",
    poster: "/images/samples/public-speaking-training.webp",
  },
  {
    title: "Fast, visual education",
    description:
      "An educational example that explains panic reactions through clear scenes and narration.",
    duration: "1:07",
    video: "/videos/panic-response-education.mp4",
    poster: "/images/samples/panic-response-education.webp",
  },
];

export default function VideoSamples() {
  const gridRef = useRef<HTMLDivElement>(null);

  const pauseOtherSamples = (event: SyntheticEvent<HTMLVideoElement>) => {
    gridRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== event.currentTarget) video.pause();
    });
  };

  return (
    <div className="sp-sample-grid" ref={gridRef}>
      {samples.map((sample) => (
        <article className="sp-sample-card" key={sample.video}>
          <div className="sp-sample-player">
            <video
              aria-label={`Play ${sample.title}`}
              controls
              onPlay={pauseOtherSamples}
              playsInline
              poster={sample.poster}
              preload="none"
              width="1920"
              height="1080"
            >
              <source src={sample.video} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
          <div className="sp-sample-copy">
            <div className="sp-sample-meta">
              <span>Sample animation</span>
              <span>{sample.duration}</span>
            </div>
            <h3>{sample.title}</h3>
            <p>{sample.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
