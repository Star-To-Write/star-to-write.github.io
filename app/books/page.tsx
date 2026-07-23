import type { Book } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import BooksClient from "@/components/BooksClient";

const booksQuery = `
  *[_type == "book"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    synopsis,
    price,
    link,
    type,
    cover {
      asset->{ url },
      alt
    },
    author->{
      name,
      anonymous
    }
  }
`;

export default async function BooksPage() {
    const books: Book[] = await client.fetch(
        booksQuery,
        {},
        {
            next: {
                tags: ["book"],
            },
        },
    );

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            <BooksClient books={books} />
        </div>
    );
}
