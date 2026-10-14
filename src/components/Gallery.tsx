"use client";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import EditorialImage from "./EditorialImage";
import { Modal } from "./StudioProvider";
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const items = gallery.filter(
    (g) => filter === "All" || g.category === filter,
  );
  const move = (amount: number) =>
    setSelected((previous) =>
      previous === null
        ? null
        : (previous + amount + gallery.length) % gallery.length,
    );
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE SIXTY SIX MOODBOARD</p>
          <h2>
            Precision is
            <br />
            <em>in the details.</em>
          </h2>
        </div>
        <div>
          <p>
            A collection of expressions.
            <br />A glimpse of the world we’re creating.
          </p>
          <div className="gallery-filters" aria-label="Gallery categories">
            {["All", "Craft", "Portraits", "Rituals", "Details"].map((f) => (
              <button
                key={f}
                className={filter === f ? "selected" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="gallery-grid">
        {items.map((g) => (
          <button
            key={g.key}
            className="gallery-item"
            onClick={() => setSelected(gallery.indexOf(g))}
            aria-label={`View ${g.label}`}
          >
            <EditorialImage
              imageKey={g.key}
              sizes="(max-width:700px) 80vw, 40vw"
            />
            <span>
              {g.label}
              <ArrowUpRight size={20} />
            </span>
          </button>
        ))}
      </div>
      <p className="image-note">
        Licensed editorial photography. A visual direction, not our premises,
        staff or client results.
      </p>
      {selected !== null && (
        <Modal
          title="Editorial gallery"
          className="lightbox"
          wide
          onClose={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <div
            className="lightbox-image"
            onTouchStart={(e) => {
              touch.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touch.current !== null) {
                const difference = e.changedTouches[0].clientX - touch.current;
                if (Math.abs(difference) > 45) move(difference < 0 ? 1 : -1);
                touch.current = null;
              }
            }}
          >
            <EditorialImage imageKey={gallery[selected].key} sizes="90vw" />
          </div>
          <div className="lightbox-caption">
            <button aria-label="Previous image" onClick={() => move(-1)}>
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {gallery[selected].label}
              <small>
                {selected + 1} / {gallery.length} · EDITORIAL PREVIEW
              </small>
            </span>
            <button aria-label="Next image" onClick={() => move(1)}>
              <ArrowRight />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
