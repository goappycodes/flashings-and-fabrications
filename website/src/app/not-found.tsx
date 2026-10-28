import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { company } from "@/content/site";

// The homepage is the only page in this design round; other routes land here.
export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 880 }}>
        <span className="eyebrow">Coming next</span>
        <h1 className="h1" style={{ marginTop: 22 }}>
          This page is part of the next design round.
        </h1>
        <p className="lead" style={{ marginTop: 24 }}>
          The homepage is ready for review first. In the meantime you can reach the team on{" "}
          <a href={company.phoneHref} className="text-link">
            {company.phone}
          </a>
          .
        </p>
        <div className="btn-row" style={{ marginTop: 36 }}>
          <Link href="/" className="btn">
            Back to the homepage <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
