import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, type BlogCategory } from '@/lib/blog'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Rendite — Euro DeFi Insights',
  description: 'Learn about Euro stablecoins, DeFi yields, risk management, and strategies for maximizing your EUR returns in decentralized finance.',
  openGraph: {
    title: 'Rendite Blog — Euro DeFi Insights',
    description: 'Learn about Euro stablecoins, DeFi yields, and strategies for maximizing your EUR returns.',
    type: 'website',
  },
}

const categoryColors: Record<BlogCategory, string> = {
  Education: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  News: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Tutorials: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Euro DeFi Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Guides, tutorials, and market analysis for Euro stablecoin yields.
              Stay informed, optimize your returns.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            <Link
              href="/blog"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-foreground text-background"
            >
              All Posts
            </Link>
            {(['Education', 'News', 'Tutorials'] as BlogCategory[]).map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category.toLowerCase()}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border ${categoryColors[category]} hover:opacity-80 transition-opacity`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re working on insightful content about Euro stablecoins and DeFi yields.
              Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
              >
                {/* Image placeholder */}
                {post.image ? (
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl">📊</span>
                  </div>
                )}

                <div className="p-5">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium border ${categoryColors[post.category]}`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read More
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get weekly insights on Euro DeFi yields delivered to your inbox.
          </p>
          <Link
            href="/alerts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Set Up Alerts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
