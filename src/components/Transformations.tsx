import Image from "next/image";
import { Check } from "lucide-react";
import { transformations } from "@/data/transformations";
export default function Transformations() {
  const published = transformations.filter((t) => t.published);
  return published.length ? (
    <section className="section">
      <p className="eyebrow">THE DIFFERENCE IS IN THE DETAILS</p>
      <h2>Real transformations.</h2>
      <div className="transformations">
        {published.map((t) => (
          <article key={t.id}>
            <div className="before-after">
              {(["before", "after"] as const).map((side) => (
                <figure key={side}>
                  <Image
                    src={t[side]}
                    alt={`${side} ${t.treatment}`}
                    width={600}
                    height={700}
                  />
                  <figcaption>{side}</figcaption>
                </figure>
              ))}
            </div>
            <h3>{t.treatment}</h3>
            {t.stylist && <p>By {t.stylist}</p>}
          </article>
        ))}
      </div>
    </section>
  ) : (
    <section className="transformation-strip section">
      <p className="eyebrow">THE NEXT CHAPTER</p>
      <h3>
        Real transformations.
        <br />
        Coming with our first clients.
      </h3>
      <span>
        <Check size={17} /> Our work. Our people. Always authentic.
      </span>
    </section>
  );
}
