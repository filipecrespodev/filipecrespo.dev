export default defineEventHandler(async () => {
  try {
    const supabase = useSupabase();

    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, slug, title, description, published_at, tags")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    // Mapear para o formato esperado pelo frontend
    return (
      posts?.map((post) => ({
        _path: `/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        publishedAt: post.published_at,
        tags: post.tags || [],
      })) || []
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
});
