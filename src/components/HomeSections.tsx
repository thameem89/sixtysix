import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, MapPin, Instagram } from "lucide-react";
import EditorialImage from "./EditorialImage";
import Countdown from "./Countdown";
import Transformations from "./Transformations";
import { salonConfig } from "@/data/salon";
import { categories, featuredCategoryIds } from "@/data/services";
import { team, productBrands } from "@/data/gallery";
import { imageGroups } from "@/data/siteImages";
import { RequestButton, EnquiryForm, WhatsApp } from "./StudioProvider";
export function Hero() {
  return (
    <section className="campaign-hero">
      <EditorialImage
        imageKey="portrait-blue"
        className="hero-photograph"
        priority
        sizes="(max-width:700px) 100vw, 80vw"
        position="52% 33%"
      />
      <div className="hero-shade" />
      <div className="hero-edition">
        <span>THE SIXTY SIX EDITORIAL</span>
        <span>AJMAN, UAE / 01</span>
      </div>
      <div className="campaign-copy">
        <p className="eyebrow">
          {salonConfig.bookingEnabled
            ? "PRECISION. STYLE. CHARACTER."
            : `OPENING ${salonConfig.openingLabel.toUpperCase()}`}
        </p>
        <h1>
          The art of
          <br />
          <em>grooming.</em>
        </h1>
        <p>
          A new standard in men’s grooming
          <br />
          {salonConfig.bookingEnabled
            ? "created around you."
            : "is arriving in Ajman."}
        </p>
        <div className="hero-actions">
          <Link href="/services" className="button ivory">
            Explore our services <ArrowUpRight size={18} />
          </Link>
          <RequestButton className="text-link light" />
        </div>
      </div>
      <div className="hero-foot">
        <span>PRECISION. STYLE. CHARACTER.</span>
        <a href="#introduction" aria-label="Discover SIXTY SIX">
          Discover <ArrowDown size={16} />
        </a>
        <span>EDITORIAL PREVIEW / SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
export function Introduction() {
  return (
    <section id="introduction" className="section editorial-intro">
      <div className="intro-photography">
        <EditorialImage
          imageKey="lounge-interior"
          sizes="(max-width:700px) 90vw, 45vw"
        />
        <span className="photo-caption">01 / A VISION OF WHAT’S TO COME</span>
        <div className="intro-detail">
          <EditorialImage imageKey="tools-dark" sizes="25vw" />
        </div>
      </div>
      <div className="intro-copy">
        <p className="eyebrow">A NEW CHAPTER IN AJMAN</p>
        <h2>
          More than
          <br />
          <em>a haircut.</em>
        </h2>
        <p>Precision barbering. Contemporary grooming.</p>
        <p>
          SIXTY SIX brings together precision barbering, contemporary grooming
          and an elevated experience designed for the modern gentleman.
        </p>
        <Link href="#experience" className="text-link">
          Enter the world of SIXTY SIX <ArrowUpRight size={17} />
        </Link>
        <span className="intro-monogram">66</span>
      </div>
    </section>
  );
}
export function FeaturedServices() {
  const featured = featuredCategoryIds.map((id) =>
    categories.find((c) => c.id === id)!,
  );
  return (
    <section className="section featured">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE ART OF PERSONAL CARE</p>
          <h2>
            Your style.
            <br />
            <em>Every detail.</em>
          </h2>
        </div>
        <div>
          <p>
            Precision cuts. Considered rituals.
            <br />
            An advance look at men’s grooming, elevated.
          </p>
          <Link href="/services" className="text-link">
            Explore the collection <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="service-editorial-grid">
        {featured.map((category, i) => (
          <Link
            className={`service-feature feature-${i + 1}`}
            key={category.id}
            href={`/services#${category.id}`}
          >
            <div className="service-feature-photo">
              <EditorialImage
                imageKey={category.imageKey}
                sizes={
                  i === 0
                    ? "(max-width:700px) 50vw, 45vw"
                    : "(max-width:700px) 50vw, 40vw"
                }
              />
              <span className="feature-number">0{i + 1}</span>
              <span className="feature-arrow">
                <ArrowUpRight size={23} />
              </span>
            </div>
            <div className="feature-caption">
              <h3>{category.featuredName}</h3>
              <p>{category.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
      <p className="image-note">
        An illustrative service preview. The final collection will be announced
        before opening.
      </p>
    </section>
  );
}
export function GroomingCampaign() {
  return (
    <section className="grooming-campaign">
      <EditorialImage
        imageKey="portrait-beard"
        sizes="100vw"
        position="50% 33%"
      />
      <div className="campaign-screen" />
      <div>
        <p className="eyebrow">EVERY DETAIL MATTERS</p>
        <h2>
          Sharpen your
          <br />
          <em>presence.</em>
        </h2>
        <p>From the precision of the cut to the finishing touch.</p>
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section className="section studio-experience" id="experience">
      <div className="experience-heading">
        <p className="eyebrow">THE EXPERIENCE WE’RE CREATING</p>
        <h2>
          Time slows.
          <br />
          <em>You come first.</em>
        </h2>
        <p>
          Precision barbering, skilled grooming professionals and personalised
          consultations. Considered products, a refined atmosphere and attention
          to every detail.
        </p>
      </div>
      <div className="architecture-wide">
        <EditorialImage
          imageKey="barber-chair"
          sizes="(max-width:700px) 90vw, 60vw"
        />
        <span className="photo-caption">
          ARCHITECTURAL INSPIRATION / NOT THE FINAL STUDIO
        </span>
      </div>
      <div className="experience-detail">
        <EditorialImage
          imageKey="barber-station"
          sizes="(max-width:700px) 45vw, 25vw"
        />
      </div>
      <div className="experience-portrait">
        <EditorialImage
          imageKey="hair-wash"
          sizes="(max-width:700px) 45vw, 30vw"
        />
      </div>
      <div className="experience-values">
        {[
          [
            "01",
            "A personal conversation",
            "Your preferences, your pace. Care begins with listening.",
          ],
          [
            "02",
            "Precision barbering",
            "A commitment to thoughtful techniques and considered professional products.",
          ],
          [
            "03",
            "A refined atmosphere",
            "Comfort, attention and a more unhurried approach to personal care.",
          ],
        ].map(([n, title, copy]) => (
          <div key={n}>
            <span>{n}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function PeopleAndProducts() {
  const published = team.filter((t) => t.published);
  return (
    <>
      {published.length > 0 && (
        <section className="section artists" id="artists">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE PEOPLE BEHIND THE ARTISTRY</p>
              <h2>Meet the barbers.</h2>
            </div>
          </div>
          <div className="artist-grid">
            {published.map((t) => (
              <article key={t.name}>
                <div>
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width:700px) 90vw, 30vw"
                  />
                </div>
                <h3>{t.name}</h3>
                <p>{t.specialty}</p>
                <p>{t.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {productBrands.length > 0 && (
        <section className="section brands">
          <p className="eyebrow">SELECTED WITH INTENTION</p>
          <h2>The finest details.</h2>
          <div>
            {productBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>
      )}
      <Transformations />
    </>
  );
}
export function LaunchCampaign() {
  if (salonConfig.bookingEnabled) return null;
  return (
    <section className="launch-campaign">
      <EditorialImage
        imageKey="portrait-cufflinks"
        sizes="100vw"
        position="50% 30%"
      />
      <div className="launch-shade" />
      <div className="launch-copy">
        <p className="eyebrow">THE BEGINNING OF SOMETHING NEW</p>
        <h2>
          A new standard
          <br />
          <em>is coming.</em>
        </h2>
        <p>Ajman. {salonConfig.openingLabel}.</p>
        <Countdown />
        <RequestButton className="button ivory">
          Be first in the chair. <ArrowUpRight size={17} />
        </RequestButton>
      </div>
      <span className="launch-reference">SIXTY SIX / LAUNCH EDITORIAL</span>
    </section>
  );
}
export function InstagramSection() {
  return (
    <section className="section story-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE DETAILS TELL THE STORY</p>
          <h2>A little closer.</h2>
        </div>
        {salonConfig.instagram ? (
          <a
            href={`https://instagram.com/${salonConfig.instagram}`}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={17} /> Follow our story <ArrowUpRight size={17} />
          </a>
        ) : (
          <span className="muted">
            Follow our story. Instagram coming soon.
          </span>
        )}
      </div>
      <div className="story-grid">
        {imageGroups.story.map((key, i) => (
          <a
            href="#gallery"
            key={key}
            aria-label={`Explore editorial detail ${i + 1}`}
          >
            <EditorialImage
              imageKey={key}
              sizes="(max-width:700px) 45vw, 30vw"
            />
            <span>
              0{i + 1} / THE ART OF ATTENTION <ArrowUpRight size={17} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
export function Visit() {
  return (
    <section className="visit section" id="visit">
      <div>
        <p className="eyebrow">A NEW DESTINATION</p>
        <h2>
          Find us
          <br />
          in <em>Ajman.</em>
        </h2>
        <address>{salonConfig.address}</address>
        <a
          href={salonConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Explore the neighbourhood <ArrowUpRight size={17} />
        </a>
        <div className="visit-details">
          <div>
            <h4>WHEN TO VISIT</h4>
            <p>{salonConfig.openingHours}</p>
          </div>
          <div>
            <h4>LET’S TALK</h4>
            {salonConfig.phone && (
              <a href={`tel:${salonConfig.phone}`}>{salonConfig.phone}</a>
            )}
            {salonConfig.email && (
              <a href={`mailto:${salonConfig.email}`}>{salonConfig.email}</a>
            )}
            <WhatsApp />
            {!salonConfig.phone && (
              <p>Contact details will be shared before opening.</p>
            )}
          </div>
          {salonConfig.parking && <p>{salonConfig.parking}</p>}
        </div>
      </div>
      <a
        className="map-art"
        href={salonConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Helio 2, Al Zahia in Google Maps"
      >
        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <div className="map-road road-three" />
        <span className="map-label">AL ZAHIA</span>
        <div className="map-pin">
          <MapPin size={30} />
          <span>
            {salonConfig.name}
            <small>HELIO 2 · AJMAN</small>
          </span>
        </div>
        <span className="map-caption">
          NEIGHBOURHOOD REFERENCE · OPEN MAPS <ArrowUpRight size={16} />
        </span>
      </a>
    </section>
  );
}
export function PrioritySection() {
  if (!salonConfig.priorityListEnabled && !salonConfig.bookingEnabled)
    return null;
  return (
    <section className="priority-section section" id="priority">
      <div>
        <p className="eyebrow">AN INVITATION TO BE FIRST</p>
        <h2>
          {salonConfig.bookingEnabled
            ? "Your time.\nPrecisely considered."
            : "Be first\nin the chair."}
        </h2>
        <p>
          {salonConfig.bookingEnabled
            ? "Tell us what you have in mind. Our team will contact you to confirm availability."
            : "Opening announcements, early appointment enquiries and a first look inside SIXTY SIX. Join us from the beginning."}
        </p>
        <span className="priority-date">
          {salonConfig.bookingEnabled
            ? "SIXTY SIX · AJMAN"
            : `OPENING ${salonConfig.openingLabel.toUpperCase()} · AJMAN, UAE`}
        </span>
      </div>
      <EnquiryForm
        kind={salonConfig.bookingEnabled ? "appointment" : "priority"}
      />
    </section>
  );
}
