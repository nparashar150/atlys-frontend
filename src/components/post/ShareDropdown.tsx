import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ShareDropdownProps {
  postContent: string
}

export function ShareDropdown({ postContent: _postContent }: ShareDropdownProps) {
  const shareLinks = [
    { name: 'WhatsApp', icon: '💬' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'Facebook', icon: '📘' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Copy Link', icon: '🔗' }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-[#2F384C] hover:text-black transition-colors"
        >
          <Share2 size={18} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {shareLinks.map((link) => (
          <DropdownMenuItem key={link.name} className="cursor-pointer">
            <span className="mr-2">{link.icon}</span>
            {link.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
