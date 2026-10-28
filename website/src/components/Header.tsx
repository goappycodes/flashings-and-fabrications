"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { company, families, getProject, machines, materials, products, stock, type ProductFamily } from "@/content/site";
import { Arrow, Chevron } from "./Icons";

// Homepage only for now: every dropdown item scrolls to a section or card on this page.
type MenuItem = { label: string; meta?: string; href?: string };
type MenuColumn = { title: string; blurb?: string; items: MenuItem[] };
type Menu = {
  key: string;
  label: string;
  columns: MenuColumn[];
  feature: { href: string; title: string; text: string; image?: string };
};

const familyOrder: ProductFamily[] = ["envelope", "rainwater", "fabrication"];
const homeProjects = ["blackfriars-station", "plymouth-life-centre", "amex-stadium", "worthing-yacht-club"].map(
  (slug) => getProject(slug)!,
);

const menus: Menu[] = [
  {
    key: "products",
    label: "Products",
    columns: familyOrder.map((family) => ({
      title: families[family].title,
      blurb: families[family].blurb,
      items: products
        .filter((p) => p.family === family)
        .map((p) => ({ label: p.name, href: `#product-${p.slug}` })),
    })),
    feature: {
      href: "#products",
      title: "All products",
      text: "Eight product ranges, all made to order",
      image: stock.roofline,
    },
  },
  {
    key: "works",
    label: "Our works",
    columns: [
      {
        title: "Machinery",
        blurb: "Fabrication and finishing on one site in Littlehampton.",
        items: machines.map((m) => ({ label: m.name, meta: m.text, href: "#works" })),
      },
      {
        title: "Materials",
        blurb: "Supplied by us or free-issue from you.",
        items: materials.map((m) => ({ label: m })),
      },
    ],
    feature: {
      href: "#works",
      title: "Our Littlehampton works",
      text: "CNC punching, 4m press brakes and powder coating",
      image: stock.pressBrakeTeam,
    },
  },
  {
    key: "projects",
    label: "Projects",
    columns: [
      {
        title: "Recent projects",
        items: homeProjects.map((p) => ({ label: p.name, meta: p.location, href: `#project-${p.slug}` })),
      },
      {
        title: "Also supplied",
        items: [
          { label: "The Shard", meta: "London" },
          { label: "The Olympic Stadium", meta: "London" },
          { label: "BBC Television Centre", meta: "London" },
          { label: "Virgin Atlantic VIP Lounge", meta: "Gatwick" },
        ],
      },
    ],
    feature: {
      href: "#projects",
      title: "Recent projects",
      text: "Blackfriars Station, Plymouth Life Centre and more",
      image: "/images/ffs/blackfriars-820x293_c.jpg",
    },
  },
  {
    key: "contact",
    label: "Contact",
    columns: [
      {
        title: "Call or email",
        items: [
          { label: company.phone, meta: "Speak to the team", href: company.phoneHref },
          { label: company.email, meta: "Send a drawing or enquiry", href: `mailto:${company.email}` },
        ],
      },
      {
        title: "Our works",
        items: [{ label: company.address.slice(0, 2).join(", "), meta: company.address.slice(2).join(", ") }],
      },
    ],
    feature: {
      href: "#quote",
      title: "Request a quote",
      text: "Send us a drawing, sketch or description",
    },
  },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // Set when a mouse opens a menu by hovering, so the following click doesn't immediately close it.
  const openedByHover = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="utility">
        <div className="container">
          <span>Sheet-metal fabricators in Littlehampton, West Sussex. Supplying projects nationwide.</span>
          <div className="utility__links">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.phoneHref}>{company.phone}</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <a href="#top" className="brand-logo" aria-label="Flashings & Fabrications, back to top" onClick={closeAll}>
            <Image src="/brand/logo-dark.png" alt="Flashings & Fabrications Services Ltd" width={380} height={66} preload />
          </a>

          <nav className="primary-nav" aria-label="Main" ref={navRef}>
            {menus.map((menu) => {
              const isOpen = openMenu === menu.key;
              return (
                <div
                  className="nav-item"
                  key={menu.key}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    openedByHover.current = true;
                    setOpenMenu(menu.key);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== "mouse") return;
                    openedByHover.current = false;
                    setOpenMenu((current) => (current === menu.key ? null : current));
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`menu-${menu.key}`}
                    onClick={() => {
                      if (openedByHover.current) return;
                      setOpenMenu(isOpen ? null : menu.key);
                    }}
                  >
                    {menu.label} <Chevron />
                  </button>
                  {isOpen ? (
                    <div className="mega" id={`menu-${menu.key}`}>
                      <div
                        className="container mega__inner"
                        style={{ "--cols": menu.columns.length } as React.CSSProperties}
                      >
                        {menu.columns.map((column) => (
                          <div className="mega__family" key={column.title}>
                            <h3>{column.title}</h3>
                            {column.blurb ? <p>{column.blurb}</p> : null}
                            <ul>
                              {column.items.map((item) => (
                                <li key={item.label}>
                                  {item.href ? (
                                    <a href={item.href} onClick={closeAll}>
                                      <span>
                                        {item.label}
                                        {item.meta ? <small>{item.meta}</small> : null}
                                      </span>
                                      <Arrow />
                                    </a>
                                  ) : (
                                    <span className="mega__item">
                                      {item.label}
                                      {item.meta ? <small>{item.meta}</small> : null}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <a
                          href={menu.feature.href}
                          className={`mega__feature${menu.feature.image ? "" : " mega__feature--plain"}`}
                          onClick={closeAll}
                        >
                          {menu.feature.image ? <Image src={menu.feature.image} alt="" fill sizes="360px" /> : null}
                          <strong>{menu.feature.title}</strong>
                          <span>{menu.feature.text} →</span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="header-actions">
            <a className="header-phone" href={company.phoneHref}>
              <small>Call us</small>
              <strong>{company.phone}</strong>
            </a>
            <a href="#quote" className="btn" onClick={closeAll}>
              Request a quote <Arrow />
            </a>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? "Close" : "Menu"}
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
            </span>
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
          {menus.map((menu) => (
            <details key={menu.key}>
              <summary>
                {menu.label} <Chevron />
              </summary>
              <div className="mobile-nav__sub">
                {menu.columns.flatMap((column) =>
                  column.items
                    .filter((item) => item.href)
                    .map((item) => (
                      <a key={item.label} href={item.href} onClick={closeAll}>
                        {item.label}
                      </a>
                    )),
                )}
                <a href={menu.feature.href} onClick={closeAll}>
                  {menu.feature.title}
                </a>
              </div>
            </details>
          ))}
          <div className="mobile-nav__contact">
            <a href="#quote" className="btn" onClick={closeAll}>
              Request a quote <Arrow />
            </a>
            <a href={company.phoneHref} className="btn btn--outline">
              Call {company.phone}
            </a>
          </div>
        </nav>
      ) : null}
    </>
  );
}
