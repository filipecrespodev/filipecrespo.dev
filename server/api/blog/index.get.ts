import matter from 'gray-matter'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  try {
    // Usar filesystem diretamente (funciona tanto em dev quanto em produção com serverAssets)
    const contentDir = join(process.cwd(), 'content', 'blog')

    const files = await readdir(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = join(contentDir, file)
        const fileContent = await readFile(filePath, 'utf-8')
        const { data } = matter(fileContent)

        const slug = file.replace('.md', '')

        return {
          _path: `/blog/${slug}`,
          title: data.title,
          description: data.description,
          publishedAt: data.publishedAt,
          tags: data.tags || []
        }
      })
    )

    // Ordenar por data de publicação (mais recente primeiro)
    posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
})
