import type { ReactNode } from "react";
import { company, stock } from "@/content/site";
import { Arrow } from "./Icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {children ? <div className="section-head__aside">{children}</div> : null}
    </Reveal>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band section" id="quote">
      <div className="cta-band__media" aria-hidden="true">
        <Photo src={stock.fins} alt="" sizes="100vw" />
      </div>
      <Reveal className="container cta-band__inner">
        <div>
          <span className="eyebrow eyebrow--light">Request a quote</span>
          <h2 className="h2">Request a Quote</h2>
          <p>
            Send us a drawing, sketch or description of what you need and our team will reply with options and a price.
          </p>
          <address className="cta-band__address">
            {company.legalName}, {company.address.join(", ")}
          </address>
        </div>
        <div className="cta-band__contact">
          <a href={company.phoneHref} className="cta-band__phone">
            {company.phone}
          </a>
          <div className="btn-row">
            <a href={company.quoteHref} className="btn btn--light">
              Email us your details <Arrow />
            </a>
          </div>
          <a href={`mailto:${company.email}`} className="cta-band__email">
            {company.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
