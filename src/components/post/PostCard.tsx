import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types'
import { AtlysCard } from '@/components/ui/atlys-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedEmoji } from '@/components/ui/animated-emoji'
import { Magnetic } from '@/components/ui/magnetic'
import { CommentList } from '@/components/comment/CommentList'
import { useAuthModal } from '@/hooks'
import { HeartIcon, CommentIcon, SendShareIcon } from '@/components/icons'

interface PostCardProps {
  post: Post
  onAddComment: (postId: string, content: string) => void
}

export function PostCard({ post, onAddComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { requireAuth, AuthModalComponent } = useAuthModal()

  const handleLike = () => {
    requireAuth(() => {
      setIsLiked(!isLiked)
      alert('Like not implemented')
    })
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
        role="article"
        aria-label={`Post by ${post.author.name}`}
        body={
          <div className="p-4">
            <div className="grid grid-cols-[auto_auto_1fr] gap-x-1.5 gap-y-3">
              {/* Row 1: Avatar and User Info */}
              <Avatar className="w-10 h-10 rounded-lg row-span-1">
                <AvatarImage src={post.author.avatar} alt={`${post.author.name}'s avatar`} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="w-1" />
              <div>
                <h3 className="text-sm font-semibold text-black">{post.author.name}</h3>
                <p className="text-xs text-black/40 font-medium mt-0.5">
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </time>
                </p>
              </div>

              {/* Row 2: Reaction Emoji and Post Content */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center self-start justify-self-center">
                <AnimatedEmoji emoji={post.emoji} size={20} />
              </div>
              <div className="w-1" />
              <div
                className="text-sm text-black/85 font-medium leading-normal prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Comments Section */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-black/10">
                    <CommentList
                      postId={post.id}
                      comments={post.comments}
                      onAddComment={handleAddComment}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        }
        footer={
          <div className="px-2">
            <div className="flex items-center gap-2">
              <Magnetic strength={0.2}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleLike}
                    className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
                    aria-label="Like post"
                  >
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <HeartIcon size={18} strokeWidth={1.5} />
                    </motion.div>
                  </Button>
                </motion.div>
              </Magnetic>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCommentClick}
                  className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
                  aria-label={showComments ? 'Hide comments' : 'Show comments'}
                  aria-expanded={showComments}
                >
                  <CommentIcon size={18} strokeWidth={1.5} />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-[#2F384C] hover:text-black transition-colors rounded-lg"
                  aria-label="Share post"
                >
                  <SendShareIcon size={18} strokeWidth={1.5} />
                </Button>
              </motion.div>
            </div>
          </div>
        }
      />

      <AuthModalComponent />
    </>
  )
}
