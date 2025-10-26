'use client';

import useCommentStore from '@/store/commentStore';
import useAuthStore from '@/store/authStore';
import { Trash2 } from 'lucide-react';

export default function CommentItem({ comment }) {
  const { deleteComment } = useCommentStore();
  const currentUser = useAuthStore((state) => state.user);

  const handleDelete = () => {
    if(confirm("Удалить этот комментарий?")) {
      deleteComment(comment.id, comment.task.id);
    }
  };
  
  const authorUsername = comment.author?.username || 'Аноним';

  // Новая, простая и надежная логика
  const isAuthor = currentUser?.id === comment.author?.id;
  const isCommandOwner = currentUser?.id === comment.command_owner_id;

  return (
    <div className="bg-neutral-900 p-3 rounded-lg group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold">
            {authorUsername.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-semibold text-white">{authorUsername}</span>
          <span className="text-xs text-neutral-500">{new Date(comment.created_at).toLocaleString()}</span>
        </div>
        {(isAuthor || isCommandOwner) && (
          <button onClick={handleDelete} className="p-1 text-neutral-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={14}/>
          </button>
        )}
      </div>
      <p className="text-neutral-300 mt-2 pl-9">{comment.content}</p>
    </div>
  );
}