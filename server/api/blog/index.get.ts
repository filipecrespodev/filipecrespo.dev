import matter from 'gray-matter'

export default defineEventHandler(async () => {
  try {
    // Usar useStorage do Nitro para acessar serverAssets (funciona em dev e produção)
    const storage = useStorage('assets:content')

    // Listar todos os arquivos no diretório blog
    const keys = await storage.getKeys('blog')
    const mdKeys = keys.filter(key => key.endsWith('.md'))

    const posts = await Promise.all(
      mdKeys.map(async (key) => {
        const fileContent = await storage.getItem(key) as string
        const { data } = matter(fileContent)

        // Extrair slug do caminho (ex: blog/introducao-ao-nuxt.md -> introducao-ao-nuxt)
        const slug = key.replace('blog/', '').replace('.md', '')

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
