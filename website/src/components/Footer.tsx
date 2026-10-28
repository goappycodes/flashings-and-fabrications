import Image from "next/image";
import { company, products } from "@/content/site";
import { PlaceholderLink } from "./PlaceholderLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Image src="/brand/logo-light.png" alt="Flashings & Fabrications Services Ltd" width={380} height={66} />
          <p>
            Manufacturers of metal flashings, rainwater systems and architectural fabrications, with in-house powder
            coating at our Littlehampton works.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <ul>
            {products.map((p) => (
              <li key={p.slug}>
                <PlaceholderLink href={`/products/${p.slug}`}>{p.name}</PlaceholderLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>On this page</h3>
          <ul>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#works">Our works</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#quote">Request a quote</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <address>
            {company.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <ul style={{ marginTop: 18 }}>
            <li>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>
          © 2026 {company.legalName}. Registered in England and Wales, company no. {company.companyNumber}. VAT no.{" "}
          {company.vatNumber}.
        </span>
      </div>
    </footer>
  );
}
