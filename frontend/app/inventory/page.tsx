"use client"

import Sidebar from '@/components/sidebar'
import { Package, Search, Plus } from 'lucide-react'

export default function InventoryPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-500 mb-6">Manage products, stock levels, and categories</p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Product
            </button>
            <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-8">Coming Soon...</p>
        </div>
      </div>
    </div>
  )
}
