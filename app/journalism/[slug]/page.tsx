import SubmissionCarousel from "@/components/SubmissionCarousel"
import { RichTextRenderer } from "@/components/ui/RichText"
import { Submission } from "@/lib/types"
import { client } from "@/sanity/lib/client"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const query = `
  *[_type == "submission" && status == "Published" && slug.current == $slug]{
    author->{ name, anonymous },
    title,
    content,
    category->{ title, "slug": slug.current },
    tags->{ name },
    featured,
    submittedDate,
    images[]{
      asset->{ url }
    }
  }[0]
  `

  const submission = await client.fetch<Submission>(query, {
    slug: slug,
  })
  
  
  return (
    <div>
      <article className="prose mx-auto">
        <h1>{submission.title}</h1>

       	<SubmissionCarousel />

        <div className="mx-5 text-foreground">
          <RichTextRenderer value={submission.content} />
        </div>

      </article>
    </div>
  )
}
