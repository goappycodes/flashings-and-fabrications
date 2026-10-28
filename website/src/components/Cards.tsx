import { families, type Product, type Project } from "@/content/site";
import { ArrowIcon } from "./Icons";
import { Photo } from "./Photo";
import { PlaceholderLink } from "./PlaceholderLink";

export function ProductTile({ product, index }: { product: Product; index?: number }) {
  return (
    <PlaceholderLink href={`/products/${product.slug}`} className="product-tile" id={`product-${product.slug}`}>
      <Photo src={product.image} alt={product.name} sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 25vw" />
      <div className="product-tile__meta">
        <span>
          {index !== undefined ? `${String(index + 1).padStart(2, "0")} · ` : ""}
          {families[product.family].title}
        </span>
      </div>
      <div className="card-title">
        <h3 className="h3">{product.name}</h3>
        <ArrowIcon />
      </div>
      <p>{product.summary}</p>
    </PlaceholderLink>
  );
}

// Projects without a usable photograph get a drawing-sheet plate instead of a stretched thumbnail.
export function ProjectPlate({ project, showThumb = true }: { project: Project; showThumb?: boolean }) {
  return (
    <div className="plate">
      {showThumb && project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="plate__thumb" src={project.image} alt="" />
      ) : null}
      <span className="plate__top">Project · {project.sector}</span>
      <span className="plate__name">{project.name}</span>
      <span className="plate__block">
        <span>
          <em>Location</em>
          {project.location}
        </span>
        <span>
          <em>Scope</em>
          {project.scope.length} {project.scope.length === 1 ? "item" : "items"} supplied
        </span>
      </span>
    </div>
  );
}

export function ProjectMedia({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  if (project.image && project.imageWide) {
    return <Photo src={project.image} alt={project.name} sizes={sizes} className={className} />;
  }
  return (
    <div className={`photo${className ? ` ${className}` : ""}`}>
      <ProjectPlate project={project} />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <PlaceholderLink href={`/projects/${project.slug}`} className="project-card" id={`project-${project.slug}`}>
      <ProjectMedia
        project={project}
        className="project-card__media"
        sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
      />
      <div className="card-title project-card__title">
        <h3 className="h3">{project.name}</h3>
        <ArrowIcon />
      </div>
      <p>{project.summary}</p>
      <dl className="meta-list">
        <div>
          <dt>Location</dt>
          <dd>{project.location}</dd>
        </div>
        <div>
          <dt>Sector</dt>
          <dd>{project.sector}</dd>
        </div>
      </dl>
    </PlaceholderLink>
  );
}
