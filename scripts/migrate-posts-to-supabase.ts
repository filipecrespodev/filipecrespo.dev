import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import "dotenv/config";

const supabaseUrl = process.env.DB_URL!;
const supabaseKey = process.env.DB_API!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePosts() {
  try {
    const contentDir = join(process.cwd(), "content", "blog");
    const files = await readdir(contentDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    console.log(`📚 Encontrados ${mdFiles.length} posts para migrar...`);

    for (const file of mdFiles) {
      const filePath = join(contentDir, file);
      const fileContent = await readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const slug = file.replace(".md", "");

      const post = {
        slug,
        title: data.title,
        description: data.description,
        content,
        published_at: data.publishedAt,
        tags: data.tags || [],
      };

      console.log(`📝 Migrando: ${post.title}`);

      const { error } = await supabase
        .from("posts")
        .upsert(post, { onConflict: "slug" });

      if (error) {
        console.error(`❌ Erro ao migrar ${slug}:`, error);
      } else {
        console.log(`✅ ${slug} migrado com sucesso!`);
      }
    }

    console.log("\n🎉 Migração concluída!");
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    process.exit(1);
  }
}

migratePosts();
