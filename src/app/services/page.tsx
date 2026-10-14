import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";
import ServiceCatalogue from "@/components/ServiceCatalogue";
import { RequestButton } from "@/components/StudioProvider";
import { salonConfig } from "@/data/salon";
export const metadata: Metadata = {
  title: "Men’s Grooming Services",
  description:
    "Explore men’s haircuts, beard grooming, classic shaving, hair and scalp care and men’s skincare at SIXTY SIX, Ajman. Opening January 2027.",
  ...(salonConfig.siteUrl ? { alternates: { canonical: "/services" } } : {}),
};
export default function Services() {
  return (
    <main id="main">
      <section className="services-campaign">
        <EditorialImage
          imageKey="haircut-precision"
          priority
          sizes="100vw"
          position="50% 38%"
        />
        <div className="services-campaign-shade" />
        <div>
          <p className="eyebrow">THE SIXTY SIX COLLECTION</p>
          <h1>
            The craft of
            <br />
            <em>grooming.</em>
          </h1>
          <p>Precision cuts. Defined beards. Considered rituals.</p>
          <RequestButton kind="appointment" className="text-link light">
            {salonConfig.bookingEnabled
              ? "Book an appointment"
              : "Request appointment"}{" "}
            <ArrowUpRight size={17} />
          </RequestButton>
        </div>
        <span className="photo-caption">AN EDITORIAL PREVIEW / AJMAN, UAE</span>
      </section>
      <ServiceCatalogue />
      <section className="service-consult section">
        <p className="eyebrow">SOME THINGS BEGIN WITH A CONVERSATION</p>
        <h2>
          Let’s find
          <br />
          <em>your expression.</em>
        </h2>
        <p>
          A little guidance. A personal approach.
          <br />
          Tell us what you have in mind.
        </p>
        <RequestButton kind="appointment" service="Personal consultation">
          Request a consultation <ArrowUpRight size={17} />
        </RequestButton>
      </section>
    </main>
  );
}
