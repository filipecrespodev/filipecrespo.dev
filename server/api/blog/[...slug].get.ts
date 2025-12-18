import { marked } from "marked";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required",
    });
  }

  try {
    const supabase = useSupabase();

    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
      });
    }

    // Converter markdown para HTML se o conteúdo for markdown
    const htmlContent = post.content ? await marked(post.content) : "";

    return {
      _path: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedAt: post.published_at,
      tags: post.tags || [],
      body: htmlContent,
      rawContent: post.content,
    };
  } catch (error) {
    console.error(`Error reading blog post "${slug}":`, error);
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }
});
