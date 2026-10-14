"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Brand } from "./Header";
import { Modal, RequestButton, WhatsApp } from "./StudioProvider";
import { salonConfig } from "@/data/salon";
export default function Footer() {
  const [legal, setLegal] = useState<"Privacy" | "Terms" | null>(null);
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <Brand />
          <p>
            Precision. Style. Character.
            <br />
            Men’s grooming, elevated.
            <small className="footer-opening">
              {salonConfig.bookingEnabled
                ? "AJMAN, UAE"
                : `OPENING ${salonConfig.openingLabel.toUpperCase()}`}
            </small>
          </p>
          <div>
            <Link href="/services">
              Explore services <ArrowUpRight size={15} />
            </Link>
            <Link href="/#visit">
              Find the lounge <ArrowUpRight size={15} />
            </Link>
            <WhatsApp />
            {salonConfig.instagram && (
              <a
                href={`https://instagram.com/${salonConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} /> Instagram
              </a>
            )}
          </div>
          <RequestButton className="text-link" kind="appointment">
            Request an appointment <ArrowUpRight size={17} />
          </RequestButton>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {salonConfig.name}
        </div>
        <div className="footer-bottom">
          <span>
            © 2027 {salonConfig.name}. {salonConfig.tagline.toUpperCase()}.
          </span>
          <span>AJMAN, UNITED ARAB EMIRATES</span>
          <div>
            <button onClick={() => setLegal("Privacy")}>Privacy</button>
            <button onClick={() => setLegal("Terms")}>Terms</button>
            <a href="#top" aria-label="Back to top">
              ↑
            </a>
          </div>
        </div>
      </footer>
      {legal && (
        <Modal title={legal} onClose={() => setLegal(null)}>
          <p className="eyebrow">SIXTY SIX</p>
          <h2>{legal}</h2>
          {legal === "Privacy" ? (
            <>
              <p>
                We ask for your name, mobile number, email and preferences only
                to respond to your enquiry or send the launch updates you
                consent to receive.
              </p>
              <p>
                Online submissions are currently unavailable until our enquiry
                service is connected. Unsent details are not saved by this
                website. Once enabled, submitted information will be shared with
                the studio’s configured enquiry provider for follow-up.
              </p>
              <p>
                No marketing analytics or advertising cookies are enabled. You
                can request access, correction or removal of information by
                contacting the studio through its published contact details when
                available.
              </p>
            </>
          ) : (
            <>
              <p>
                SIXTY SIX Men’s Grooming Lounge is scheduled to open in January
                2027. The exact opening day, service menu and hours are subject
                to confirmation.
              </p>
              <p>
                The service collection is an illustrative preview; final prices
                and durations will be confirmed before opening. A submitted
                appointment request does not confirm a booking. Our team must
                confirm availability and the final price before your visit.
              </p>
              <p>
                Reference photography illustrates our intended atmosphere and is
                not presented as photography of the actual studio, team or
                client results.
              </p>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
