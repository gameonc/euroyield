import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export type BlogCategory = 'Education' | 'News' | 'Tutorials'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: BlogCategory
  tags: string[]
  image?: string
  content: string
  readingTime: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: BlogCategory
  tags: string[]
  image?: string
  readingTime: string
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  ensureBlogDir()

  const files = fs.readdirSync(BLOG_DIR).filter((file) =>
    file.endsWith('.mdx') || file.endsWith('.md')
  )

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      const stats = readingTime(content)

      return {
        slug: filename.replace(/\.mdx?$/, ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'EuroYield Team',
        category: (data.category as BlogCategory) || 'Education',
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
      } as BlogPostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  ensureBlogDir()

  const extensions = ['.mdx', '.md']

  for (const ext of extensions) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`)

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'EuroYield Team',
        category: (data.category as BlogCategory) || 'Education',
        tags: data.tags || [],
        image: data.image,
        content,
        readingTime: stats.text,
      }
    }
  }

  return null
}

export async function getBlogPostsByCategory(category: BlogCategory): Promise<BlogPostMeta[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.category === category)
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts()
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPostMeta[]> {
  const currentPost = await getBlogPost(currentSlug)
  if (!currentPost) return []

  const allPosts = await getBlogPosts()

  // Score posts by tag overlap
  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const tagOverlap = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length
      const sameCategory = post.category === currentPost.category ? 1 : 0
      return { post, score: tagOverlap * 2 + sameCategory }
    })
    .sort((a, b) => b.score - a.score)

  return scoredPosts.slice(0, limit).map((s) => s.post)
}
