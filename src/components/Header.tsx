"use client";

import Link from "next/link";
import { useState } from "react";
import { facialMenuCategories } from "@/data/facial-menu";
import { hydrafacialMenuCategories } from "@/data/hydrafacial-menu";
import { massageMenuCategories } from "@/data/massage-menu";

interface MenuCategory {
  title: string;
  preTitle?: string;
  items: { label: string; serviceId: string }[];
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/book", label: "Book Now" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function NavMegaMenu({
  categories,
  onNavigate,
  variant = "desktop",
}: {
  categories: MenuCategory[];
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={`${category.preTitle ?? ""}-${category.title}`}>
            {category.preTitle && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                {category.preTitle}
              </p>
            )}
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              {category.title}
            </p>
            <ul className="space-y-2 border-t border-sage-200 pt-3">
              {category.items.map((item) => (
                <li key={item.serviceId}>
                  <Link
                    href={`/book?service=${item.serviceId}`}
                    className="block text-sm uppercase tracking-wider text-sage-600 transition-colors hover:text-sage-800"
                    onClick={onNavigate}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {categories.map((category) => (
        <div key={`${category.preTitle ?? ""}-${category.title}`}>
          {category.preTitle && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {category.preTitle}
            </p>
          )}
          <p className="border-b border-sage-600 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {category.title}
          </p>
          <ul className="mt-4 space-y-3">
            {category.items.map((item) => (
              <li key={item.serviceId}>
                <Link
                  href={`/book?service=${item.serviceId}`}
                  className="block text-sm uppercase tracking-wider text-cream-100 transition-colors hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DesktopNavDropdown({
  label,
  categories,
  align = "center",
}: {
  label: string;
  categories: MenuCategory[];
  align?: "center" | "right";
}) {
  const positionClasses =
    align === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-sage-600 transition-colors hover:text-sage-800"
        aria-haspopup="true"
      >
        {label}
        <svg
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full z-[60] hidden w-[min(720px,calc(100vw-2rem))] pt-2 group-hover:block ${positionClasses}`}
      >
        <div className="overflow-hidden rounded-xl border border-sage-700 bg-sage-800 shadow-2xl">
          <NavMegaMenu categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMassageOpen, setMobileMassageOpen] = useState(false);
  const [mobileFacialOpen, setMobileFacialOpen] = useState(false);
  const [mobileHydrafacialOpen, setMobileHydrafacialOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setMobileMassageOpen(false);
    setMobileFacialOpen(false);
    setMobileHydrafacialOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-sage-200/60 bg-cream-50/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between overflow-visible px-6 py-4 md:px-12">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl font-semibold tracking-wide text-sage-800 transition-colors group-hover:text-sage-600 md:text-3xl">
            Madison Deluxe
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold-500 md:text-xs">
            Spa & Wellness Center
          </span>
        </Link>

        <nav className="hidden items-center gap-6 overflow-visible lg:flex lg:gap-8">
          {navLinks
            .filter((link) => link.label !== "Book Now")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-sage-600 transition-colors hover:text-sage-800"
              >
                {link.label}
              </Link>
            ))}

          <DesktopNavDropdown label="Massage" categories={massageMenuCategories} />
          <DesktopNavDropdown label="Facial" categories={facialMenuCategories} />
          <DesktopNavDropdown
            label="HYDRAFACIAL"
            categories={hydrafacialMenuCategories}
            align="right"
          />

          <Link href="/book" className="btn-primary !px-6 !py-2.5 !text-xs">
            Book Appointment
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-sage-700 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-sage-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-sage-700 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-sage-200 bg-cream-50 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks
              .filter((link) => link.label !== "Book Now")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-wider text-sage-600"
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              ))}

            <button
              type="button"
              className="flex items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-sage-600"
              onClick={() => {
                setMobileFacialOpen(false);
                setMobileHydrafacialOpen(false);
                setMobileMassageOpen(!mobileMassageOpen);
              }}
            >
              Massage
              <svg
                className={`h-4 w-4 transition-transform ${mobileMassageOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileMassageOpen && (
              <NavMegaMenu
                categories={massageMenuCategories}
                variant="mobile"
                onNavigate={closeMenus}
              />
            )}

            <button
              type="button"
              className="flex items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-sage-600"
              onClick={() => {
                setMobileMassageOpen(false);
                setMobileHydrafacialOpen(false);
                setMobileFacialOpen(!mobileFacialOpen);
              }}
            >
              Facial
              <svg
                className={`h-4 w-4 transition-transform ${mobileFacialOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileFacialOpen && (
              <NavMegaMenu
                categories={facialMenuCategories}
                variant="mobile"
                onNavigate={closeMenus}
              />
            )}

            <button
              type="button"
              className="flex items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-sage-600"
              onClick={() => {
                setMobileMassageOpen(false);
                setMobileFacialOpen(false);
                setMobileHydrafacialOpen(!mobileHydrafacialOpen);
              }}
            >
              HYDRAFACIAL
              <svg
                className={`h-4 w-4 transition-transform ${mobileHydrafacialOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileHydrafacialOpen && (
              <NavMegaMenu
                categories={hydrafacialMenuCategories}
                variant="mobile"
                onNavigate={closeMenus}
              />
            )}

            <Link
              href="/book"
              className="btn-primary mt-2 text-center"
              onClick={closeMenus}
            >
              Book Appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
