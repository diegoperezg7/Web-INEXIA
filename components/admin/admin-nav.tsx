"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
  },
  {
    href: "/admin/contacts",
    label: "Contactos",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    href: "/admin/settings",
    label: "Configuración",
    icon: <Settings className="h-4 w-4 mr-2" />,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-500/20 p-2">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-blue-600/30 text-white" : "text-blue-200/70 hover:bg-blue-900/40 hover:text-blue-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
