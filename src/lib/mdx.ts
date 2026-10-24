import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GuideMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

export interface LegalMetadata {
  slug: string;
  title: string;
  lastUpdated: string;
  status: string; // "DRAFT - Pending Attorney Review"
}

const guidesDirectory = path.join(process.cwd(), "content/guides");
const legalDirectory = path.join(process.cwd(), "content/legal");

export function getAllGuides(): GuideMetadata[] {
  if (!fs.existsSync(guidesDirectory)) return [];

  const files = fs.readdirSync(guidesDirectory);
  const guides = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(guidesDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        publishedAt: data.publishedAt || "2026-01-01",
        readTime: data.readTime || "5 min read",
        category: data.category || "Equipment Guide",
        author: data.author || "Fleet Operations Team",
        tags: data.tags || [],
      } as GuideMetadata;
    });

  return guides.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): { metadata: GuideMetadata; content: string } | null {
  const fullPathMdx = path.join(guidesDirectory, `${slug}.mdx`);
  const fullPathMd = path.join(guidesDirectory, `${slug}.md`);

  const fullPath = fs.existsSync(fullPathMdx)
    ? fullPathMdx
    : fs.existsSync(fullPathMd)
    ? fullPathMd
    : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      slug,
      title: data.title || slug,
      description: data.description || "",
      publishedAt: data.publishedAt || "2026-01-01",
      readTime: data.readTime || "5 min read",
      category: data.category || "Equipment Guide",
      author: data.author || "Fleet Operations Team",
      tags: data.tags || [],
    },
    content,
  };
}

export function getAllLegalDocuments(): LegalMetadata[] {
  if (!fs.existsSync(legalDirectory)) return [];

  const files = fs.readdirSync(legalDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(legalDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        lastUpdated: data.lastUpdated || "2026-01-01",
        status: data.status || "DRAFT - Pending Attorney Review",
      };
    });
}

export function getLegalDocumentBySlug(slug: string): { metadata: LegalMetadata; content: string } | null {
  const fullPathMdx = path.join(legalDirectory, `${slug}.mdx`);
  const fullPathMd = path.join(legalDirectory, `${slug}.md`);

  const fullPath = fs.existsSync(fullPathMdx)
    ? fullPathMdx
    : fs.existsSync(fullPathMd)
    ? fullPathMd
    : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      slug,
      title: data.title || slug,
      lastUpdated: data.lastUpdated || "2026-01-01",
      status: data.status || "DRAFT - Pending Attorney Review",
    },
    content,
  };
}
