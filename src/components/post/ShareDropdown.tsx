import { Share2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ShareDropdownProps {
  postContent: string
}

export function ShareDropdown({ postContent }: ShareDropdownProps) {
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
        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors py-2 px-3 rounded-md hover:bg-accent">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
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
