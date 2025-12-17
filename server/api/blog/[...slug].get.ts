import matter from 'gray-matter'
import { marked } from 'marked'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  try {
    // Usar useStorage do Nitro para acessar serverAssets (funciona em dev e produção)
    const storage = useStorage('assets:content')
    const filePath = `blog/${slug}.md`

    const fileContent = await storage.getItem(filePath) as string

    if (!fileContent) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }

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
