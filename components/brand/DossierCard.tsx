import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";
import PunkLabel from "./PunkLabel";

interface DossierCardProps {
  project: Project;
  index: number;
  compact?: boolean;
  href?: string;
}

function statusFromProject(project: Project) {
  if (project.tags.some((tag) => tag.includes("战略") || tag.includes("政企"))) return "STRATEGY";
  if (project.timeline.includes("至今")) return "LIVE";
  return "SCALED";
}

export default function DossierCard({ project, index, compact = false, href }: DossierCardProps) {
  const card = (
    <article id={project.slug} className="dossier-card group h-full rounded-2xl p-5 md:p-7">
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-4)]">
              DOSSIER {String(index + 1).padStart(3, "0")}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.slice(0, compact ? 2 : 3).map((tag, tagIndex) => (
                <PunkLabel key={tag} tone={tagIndex === 0 ? "acid" : "violet"}>{tag}</PunkLabel>
              ))}
            </div>
          </div>
          <PunkLabel tone="yellow">{statusFromProject(project)}</PunkLabel>
        </div>

        <h3 className="mb-4 text-2xl font-black leading-tight tracking-tight text-[var(--fg)] md:text-3xl">{project.title}</h3>
        <p className="mb-6 text-sm leading-7 text-[var(--fg-2)] md:text-base">{project.summary}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3 border-y border-[var(--border)] py-5 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="metric-number text-xl text-[var(--primary-bright)] md:text-2xl">{metric.value}</div>
                <div className="mt-1 text-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-4)]">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto grid gap-3 text-sm text-[var(--fg-3)] md:grid-cols-2">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">Role</div>
            <div className="mt-1 font-semibold text-[var(--fg-2)]">{project.role}</div>
          </div>
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">Timeline</div>
            <div className="mt-1 font-semibold text-[var(--fg-2)]">{project.timeline}</div>
          </div>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-bright)] opacity-80 transition-opacity group-hover:opacity-100">
          Open dossier <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );

  if (!href) return card;
  return <Link href={href} className="block h-full">{card}</Link>;
}
