import matter from 'gray-matter'
import { marked } from 'marked'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  try {
    // Usar filesystem diretamente (funciona tanto em dev quanto em produção com serverAssets)
    const contentDir = join(process.cwd(), 'content', 'blog')
    const filePath = join(contentDir, `${slug}.md`)

    const fileContent = await readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    // Converter markdown para HTML
    const htmlContent = await marked(content)

    return {
      _path: `/blog/${slug}`,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      tags: data.tags || [],
      body: htmlContent,
      rawContent: content
    }
  } catch (error) {
    console.error(`Error reading blog post "${slug}":`, error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }
})
