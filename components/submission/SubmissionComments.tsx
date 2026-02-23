'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/client';

type Comment = {
  _id: string;
  name: string;
  body: string;
  _createdAt: string;
};

interface Props {
  submissionId: string;
}

const mockComments: Comment[] = [
  {
    _id: 'mock-1',
    name: 'Jeezebum2015',
    body: 'Bro, this story slaps! Need to know who the author is.',
    _createdAt: '2026-02-08T17:45:00Z',
  },
  {
    _id: 'mock-2',
    name: 'JoshuaKan6787',
    body: 'Woah, the prose and poetry here is so good! Must be an amazing poet!!',
    _createdAt: '2026-02-08T17:22:00Z',
  },
];

export default function SubmissionComments({ submissionId }: Props) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!submissionId) return;

    const query = `*[_type == "comment" && submission._ref == $submissionId] | order(_createdAt desc){
      _id, name, body, _createdAt
    }`;

    client
      .fetch<Comment[]>(query, { submissionId })
      .then((data) => {
        setComments(data.length > 0 ? data : mockComments);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setComments(mockComments);
        setLoading(false);
      });
  }, [submissionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || !submissionId) return;

    setSubmitting(true);

    const doc = {
      _type: 'comment',
      name: name.trim() || 'Anonymous',
      body: body.trim(),
      submission: { _type: 'reference', _ref: submissionId },
    };

    try {
      await client.create(doc);
      const refreshed = await client.fetch<Comment[]>(
        `*[_type == "comment" && submission._ref == $submissionId] | order(_createdAt desc){
          _id, name, body, _createdAt
        }`,
        { submissionId }
      );
      setComments(refreshed.length > 0 ? refreshed : mockComments);
      setBody('');
      setName('');
    } catch (err) {
      console.error('Create error:', err);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-gray-400 mt-6">Loading comments...</div>;

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          placeholder="Leave a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y min-h-[100px]"
          rows={3}
          required
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 max-w-xs p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {submitting ? 'Posting...' : 'Comment'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border-l-2 border-gray-600 pl-4">
              <div className="flex items-baseline gap-3">
                <span className="font-medium text-gray-200">{c.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(c._createdAt).toLocaleString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <p className="mt-1 text-gray-300 leading-relaxed">{c.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}