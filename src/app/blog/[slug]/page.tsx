import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog'
import { Calendar, Clock, ArrowLeft, User, Share2, Twitter, Linkedin } from 'lucide-react'
import { mdxComponents } from '@/components/blog/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found | Rendite' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rendite.fi'

  return {
    title: `${post.title} | Rendite Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `${baseUrl}/blog/${slug}`,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, 3)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rendite.fi'
  const postUrl = `${baseUrl}/blog/${slug}`

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-3xl">
            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div className="max-w-3xl">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share this article
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl border bg-card/50 p-5">
                <h3 className="font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {related.readingTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-primary/5 p-5">
              <h3 className="font-semibold mb-2">Explore Yields</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Compare Euro stablecoin yields across top DeFi protocols.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View Dashboard →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
