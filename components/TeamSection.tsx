import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  social?: {
    name: string;
    url: string;
    icon: string;
  }[];
};

type Props = {
  title: string;
  description?: string;
  members: TeamMember[];
  className?: string;
};

export default function TeamSection({ title, description, members, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-rose-300 mb-4">
            <BrandIcon name="team" className="h-3 w-3" />
            Équipe
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="card-premium text-center hover-lift transition-all"
            >
              <div className="relative mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="mx-auto h-32 w-32 rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-primary-300 mb-3">{member.role}</p>

              {member.bio && (
                <p className="text-sm text-neutral-400 mb-4 truncate-3">
                  {member.bio}
                </p>
              )}

              {member.social && (
                <div className="flex justify-center gap-3">
                  {member.social.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition hover:bg-primary-500 hover:text-white"
                    >
                      <BrandIcon name={social.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}