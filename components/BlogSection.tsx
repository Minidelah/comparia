import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn, formatDate } from "@/lib/utils";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  readingTime: number;
  image?: string;
};

type Props = {
  title: string;
  description?: string;
  posts: BlogPost[];
  showAllLink?: boolean;
  className?: string;
};

export default function BlogSection({ title, description, posts, showAllLink = true, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-violet-300 mb-4">
            <BrandIcon name="blog" className="h-3 w-3" />
            Blog
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={cn("card-premium hover-lift transition-all",
                index === 0 ? "md:col-span-2 lg:col-span-1" : "")}
            >
              {post.image && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-neutral-300">
                  <BrandIcon name="calendar" className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-neutral-300">
                  <BrandIcon name="user" className="h-3 w-3" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-neutral-300">
                  <BrandIcon name="clock" className="h-3 w-3" />
                  {post.readingTime} min
                </span>
                <span className="flex items-center gap-1 rounded-full bg-primary-500/20 px-2 py-1 text-primary-300">
                  <BrandIcon name="tag" className="h-3 w-3" />
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 truncate-2">{post.title}</h3>
              <p className="text-neutral-400 mb-4 truncate-3">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="btn-ghost inline-flex items-center justify-center gap-2 text-sm"
              >
                Lire l'article
                <BrandIcon name="arrow-right" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Voir tous les articles
              <BrandIcon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}