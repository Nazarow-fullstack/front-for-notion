'use client';

import useCommentStore from '@/store/commentStore';
import { Loader } from 'lucide-react';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { comments, isLoading, error } = useCommentStore();

  if (isLoading) return <div className="flex justify-center items-center h-24"><Loader className="animate-spin-slow"/></div>;
  if (error) return <p className="text-red-500 text-center">Ошибка загрузки комментариев.</p>;
  if (comments.length === 0) return <p className="text-neutral-500 text-center text-sm">Комментариев пока нет.</p>;

  return (
    <div className="space-y-4">
      {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
    </div>
  );
}