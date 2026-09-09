import type { NavigationMenuItem } from '@nuxt/ui'

export const sidebarRoutes : NavigationMenuItem[][]=[
    [
        {
            label: 'Conversation',
            icon: 'i-lucide-message-square',
            to: '/dashboard/conversation',
        },
          {
            label: 'Code Generation',
            icon: 'i-lucide-code',
            to: '/dashboard/code',
        },
          {
            label: 'Ai Article Writer',
            icon: 'i-lucide-square-pen',
            to: '/dashboard/write-article',
        },
          {
            label: 'Blog Title Generator',
            icon: 'i-lucide-hash',
            to: '/dashboard/generate-blog-title',
        },
          {
            label: 'Background Removal',
            icon: 'i-lucide-eraser',
            to: '/dashboard/remove-background',
        },
          {
            label: 'Object Removal',
            icon: 'i-lucide-scissors',
            to: '/dashboard/object-removal',
        },
          {
            label: 'Resume Reviewer',
            icon: 'i-lucide-file-check',
            to: '/dashboard/resume-review',
        },
        
    ]
]