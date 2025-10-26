'use client';

import { useState } from 'react';
import useCommentStore from '@/store/commentStore';
import ShimmerButton from '../ui/ShimmerButton';

export default function CommentForm({ taskId }) {
  const [content, setContent] = useState('');
  const { createComment } = useCommentStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createComment({ content, task: taskId });
      setContent('');
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Написать комментарий..."
        className="w-full flex-grow bg-neutral-900 border border-neutral-700 rounded-lg p-2 outline-none focus:ring-1 focus:ring-white transition-shadow resize-none"
        rows="1"
      />
      <div className="w-32 flex-shrink-0">
        <ShimmerButton type="submit">Отправить</ShimmerButton>
      </div>
    </form>
  );
}