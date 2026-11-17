import BlogPreview from "@/components/other-pages/about-us/BlogPreview";
import GravityContact from "@/components/common/GravityContact";
import { getBlogPreviewPosts } from "@/lib/blogPreviewPosts";

type Props = { locale: string; title?: string; description?: string; button?: string };

/** The same close as the home and about pages: latest writing, then the contact field. */
export default async function ServiceOutro({ locale, title, description, button }: Props) {
  const posts = await getBlogPreviewPosts(locale);
  return (
    <>
      <BlogPreview posts={posts} />
      <GravityContact title={title} description={description} button={button} />
    </>
  );
}
