"use client";
import Link from "next/link";
import Image from "next/image";
import { salonConfig } from "@/data/salon";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { RequestButton, WhatsApp, Modal } from "./StudioProvider";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="SIXTY SIX — Home">
      <Image src={salonConfig.logo} alt="" width={44} height={44} />
      <span>
        {salonConfig.name}
        <small>{salonConfig.tagline.toUpperCase()}</small>
      </span>
    </Link>
  );
}
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};
export default function Header() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 48,
    () => false,
  );
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const links = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Experience", "/#experience"],
    ["Gallery", "/#gallery"],
    ["Contact", "/#visit"],
  ];
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className={`header ${scrolled ? "scrolled" : "over-hero"}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={href === path ? "active" : ""}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <WhatsApp iconOnly />
          <RequestButton className="button small" />
          <button
            className="menu-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <Modal
          title="Navigation menu"
          className="navigation-dialog"
          onClose={() => setMenu(false)}
        >
          <div className="mobile-menu">
            <nav aria-label="Mobile navigation">
              {links.map(([name, href], i) => (
                <Link href={href} key={name} onClick={() => setMenu(false)}>
                  <span>0{i + 1}</span>
                  {name}
                  <ArrowUpRight size={24} />
                </Link>
              ))}
            </nav>
            <p>HELIO 2 · AL ZAHIA · AJMAN</p>
          </div>
        </Modal>
      )}
    </>
  );
}
