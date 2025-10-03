"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ShoppingCart, 
  Activity, 
  FileText, 
  Package, 
  Users,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: ShoppingCart, label: 'Point of Sales', href: '/pos' },
  { icon: Activity, label: 'Activity', href: '/activity' },
  { icon: FileText, label: 'Report', href: '/report' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: Users, label: 'Teams', href: '/teams' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Bakehouse</h1>
            <p className="text-xs text-gray-500">POS System</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">JG</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Jelly Grande</p>
            <p className="text-xs text-gray-500">Cashier</p>
          </div>
        </div>
        <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  )
}
