import { ProductTile, ProjectCard, ProjectMedia } from "@/components/Cards";
import { Arrow, ArrowIcon } from "@/components/Icons";
import { HeroVideo } from "@/components/HeroVideo";
import { Photo } from "@/components/Photo";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { Reveal } from "@/components/Reveal";
import { CtaBand, SectionHead } from "@/components/Sections";
import { company, getProject, machines, products, stock } from "@/content/site";

// Placeholder footage (Pexels licence: "Industrial Metal Bending Machine Process" by Dominik Zítka)
// until FFS's own press brake footage is filmed.
const heroVideo = {
  desktop: "https://videos.pexels.com/video-files/31751364/13527988_1920_1080_25fps.mp4",
  mobile: "https://videos.pexels.com/video-files/31751364/13527987_1280_720_25fps.mp4",
};

const marqueeNames = [
  "The Shard",
  "The Olympic Stadium",
  "BBC Television Centre",
  "Blackfriars Station",
  "Amex Stadium",
  "Plymouth Life Centre",
  "Virgin Atlantic VIP Lounge, Gatwick",
  "RAF Brize Norton",
  "Royal Mail, Maidstone",
  "Northbrook College",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.legalName,
  url: "https://www.flashings-and-fabrications.co.uk",
  telephone: "+44 1903 726500",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Units 1, 2 & 4 Harwood Centre, Harwood Road",
    addressLocality: "Littlehampton",
    addressRegion: "West Sussex",
    postalCode: "BN17 7AT",
    addressCountry: "GB",
  },
  areaServed: "GB",
  makesOffer: products.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: p.name } })),
};

export default function HomePage() {
  const featured = getProject("blackfriars-station")!;
  const moreProjects = ["plymouth-life-centre", "amex-stadium", "worthing-yacht-club"].map((s) => getProject(s)!);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero">
        <div className="hero__media">
          <HeroVideo
            poster="https://images.unsplash.com/photo-1770910452211-2e8fd91bc347?w=1920&q=75&fm=jpg"
            sources={[
              { src: heroVideo.mobile, media: "(max-width: 768px)" },
              { src: heroVideo.desktop },
            ]}
          />
          <span className="photo-tag">Placeholder video</span>
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--light">Flashings &amp; Fabrications Services Ltd</span>
            <h1 className="display">Manufacturers of Metal Flashings, Rainwater Systems and Architectural Fabrications</h1>
            <p>
              We make flashings, gutters, louvres, rainscreen panels and bespoke sheet-metal components to order at our
              works in Littlehampton, West Sussex, with in-house powder coating and supply across the UK.
            </p>
            <div className="btn-row">
              <a href="#quote" className="btn btn--light">
                Request a quote <Arrow />
              </a>
              <a href="#products" className="btn btn--ghost-light">
                View our products
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Projects we have supplied">
        <span className="marquee__label">Projects we have supplied</span>
        <div className="marquee__viewport">
          {[0, 1].map((copy) => (
            <div className="marquee__track" key={copy} aria-hidden={copy === 1}>
              {marqueeNames.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section" id="about">
        <div className="container">
          <Reveal className="intro-grid">
            <h2 className="statement">
              Specialist sheet-metal fabricators supplying the UK construction industry from Littlehampton, West Sussex.
            </h2>
            <p className="lead">
              Our team has more than 30 years&apos; combined experience in flashings and fabrication. Every product is
              made to order, from a single bespoke flashing to a complete roofline package for a major project.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--steel" id="products">
        <div className="container">
          <SectionHead eyebrow="What we make" title="Our Products and Services">
            <p className="muted">
              Eight product ranges, all manufactured to order in aluminium, steel, zinc, copper and other sheet materials.
            </p>
            <PlaceholderLink href="/products" className="text-link">
              View all products <Arrow />
            </PlaceholderLink>
          </SectionHead>
          <div className="product-grid">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 4) * 80}>
                <ProductTile product={product} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="works">
        <div className="container capability">
          <Reveal>
            <Photo
              src={stock.pressBrakeTeam}
              alt="Press brake operators folding sheet metal"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal className="capability__copy">
            <span className="eyebrow eyebrow--light">Our works</span>
            <h2 className="h2" style={{ marginTop: 20 }}>
              Fabrication and Powder Coating at Our Littlehampton Works
            </h2>
            <p>
              Our works houses CNC turret punching, 4m press brakes and an in-house powder coating line, so components are
              fabricated and finished on one site.
            </p>
            <div className="machine-list">
              {machines.map((m) => (
                <PlaceholderLink href={`/capabilities#${m.key}`} className="machine" key={m.key}>
                  <span className="machine__figure">{m.figure}</span>
                  <div>
                    <h3>{m.name}</h3>
                    <p>{m.text}</p>
                  </div>
                  <ArrowIcon />
                </PlaceholderLink>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <PlaceholderLink href="/capabilities" className="text-link">
                View our capabilities <Arrow />
              </PlaceholderLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <SectionHead eyebrow="Projects" title="Recent Projects">
            <p className="muted">
              We have supplied flashings, gutters, rainscreen panels and support steelwork to projects including
              Blackfriars Station, Plymouth Life Centre and the Amex Stadium.
            </p>
            <PlaceholderLink href="/projects" className="text-link">
              View all projects <Arrow />
            </PlaceholderLink>
          </SectionHead>
          <Reveal className="project-feature">
            <PlaceholderLink
              href={`/projects/${featured.slug}`}
              className="project-feature__media"
              id={`project-${featured.slug}`}
              aria-label={featured.name}
            >
              <ProjectMedia project={featured} sizes="(max-width: 980px) 100vw, 66vw" />
            </PlaceholderLink>
            <div className="project-feature__copy">
              <span className="eyebrow">
                {featured.location} · {featured.year}
              </span>
              <h3>{featured.name}</h3>
              <p>{featured.story}</p>
              <PlaceholderLink href={`/projects/${featured.slug}`} className="text-link">
                View project <Arrow />
              </PlaceholderLink>
            </div>
          </Reveal>
          <div className="project-grid">
            {moreProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
