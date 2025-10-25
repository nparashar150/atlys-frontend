import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types/post'
import { AtlysCard } from '@/components/ui/atlys-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { CommentList } from '@/components/comment/CommentList'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuthStore } from '@/stores/authStore'
import { HeartIcon, CommentIcon, SendShareIcon } from '@/components/icons'

interface PostCardProps {
  post: Post
  onAddComment: (postId: string, content: string) => void
}

export function PostCard({ post, onAddComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()

  const handleLike = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    alert('Like not implemented')
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
  }

  const handleAddComment = (content: string) => {
    onAddComment(post.id, content)
  }

  return (
    <>
      <AtlysCard
        body={
          <div className="p-4">
            <div className="grid grid-cols-[auto_auto_1fr] gap-x-1.5 gap-y-3">
              {/* Row 1: Avatar and User Info */}
              <Avatar className="w-10 h-10 rounded-lg row-span-1">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="w-1" />
              <div>
                <h3 className="text-sm font-semibold text-black">{post.author.name}</h3>
                <p className="text-xs text-black/40 font-medium mt-0.5">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </p>
              </div>

              {/* Row 2: Reaction Emoji and Post Content */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base self-start justify-self-center">
                💭
              </div>
              <div className="w-1" />
              <div
                className="text-sm text-black/85 font-medium leading-normal prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="mt-4 pt-4 border-t border-black/10">
                <CommentList
                  postId={post.id}
                  comments={post.comments}
                  onAddComment={handleAddComment}
                />
              </div>
            )}
          </div>
        }
        footer={
          <div className="px-2">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleLike}
                className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
              >
                <HeartIcon size={18} strokeWidth={1.5} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleCommentClick}
                className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
              >
                <CommentIcon size={18} strokeWidth={1.5} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
              >
                <SendShareIcon size={18} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        }
      />

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
