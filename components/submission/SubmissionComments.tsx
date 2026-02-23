// @ts-nocheck

type Comment = 
{
  id: string
  author: string
  content: string
  createdAt: string
}

// TODO: replace mockComments with Sanity data
const mockComments: Comment[] = [
  {
    id: "1",
    author: "Alex Kim",
    content: "This submission was honestly super powerful. Loved the visuals.",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    author: "Jamie Lee",
    content: "The writing here is really strong. Keep it up!",
    createdAt: "1 day ago",
  },
]

export default function SubmissionComments() {
  return (
    <section className="mt-10 border-t pt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      <div className="space-y-4">
        {mockComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">{comment.author}</p>
              <span className="text-xs text-gray-500">
                {comment.createdAt}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}