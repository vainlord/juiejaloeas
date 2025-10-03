"use client"

import { useState } from 'react'
import { Search, Plus, Minus, Trash2, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/utils'
import Sidebar from '@/components/sidebar'

// Mock product data
const categories = ['All Menu', 'Breads', 'Cakes', 'Donuts', 'Pastries', 'Sandwich']

const mockProducts = [
  { id: 1, name: 'Beef Crowbch', category: 'Sandwich', price: 5.50, image: '🥪' },
  { id: 2, name: 'Buttermeli Croissant', category: 'Pastry', price: 4.00, image: '🥐' },
  { id: 3, name: 'Cereal Cream Donut', category: 'Donut', price: 2.45, image: '🍩' },
  { id: 4, name: 'Cheesy Cheesecake', category: 'Cake', price: 3.75, image: '🍰' },
  { id: 5, name: 'Cheesy Sourdough', category: 'Bread', price: 4.50, image: '🍞' },
  { id: 6, name: 'Egg Tart', category: 'Tart', price: 3.25, image: '🥧' },
  { id: 7, name: 'Grains Pan Bread', category: 'Bread', price: 3.25, image: '🍞' },
  { id: 8, name: 'Spinchoco Roll', category: 'Pastry', price: 4.00, image: '🥖' },
  { id: 9, name: 'Sliced Black Forest', category: 'Cake', price: 5.00, image: '🍰' },
  { id: 10, name: 'Solo Floss Bread', category: 'Bread', price: 4.50, image: '🥖' },
  { id: 11, name: 'Zoguma Pan Bread', category: 'Bread', price: 4.50, image: '🍞' },
]

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Menu')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { items, addItem, updateQuantity, removeItem, getSubtotal, getTotal, discount, tax } = useCartStore()

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All Menu' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const subtotal = getSubtotal()
  const taxAmount = subtotal * tax
  const total = getTotal()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex">
        {/* Product Grid */}
        <div className="flex-1 flex flex-col p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Point of Sales</h1>
                <p className="text-sm text-gray-500">Wed, 29 May 2024 • 07:59 AM</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">● Open Order</span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search something sweet on your mind..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 gap-4 overflow-auto">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => handleAddToCart(product)}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md"
              >
                <div className="text-5xl mb-3">{product.image}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Cart Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Customer&apos;s Order</h2>
            <p className="text-sm text-gray-500">Order Number: #{new Date().getTime().toString().slice(-4)}</p>
          </div>

          {/* Order Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <select className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>Select Table</option>
                <option>Table 01</option>
                <option>Table 02</option>
              </select>
              <select className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>Dine In</option>
                <option>Take Away</option>
                <option>Delivery</option>
              </select>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>No item Selected</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-red-600">-{formatCurrency(discount)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-semibold">TOTAL</span>
              <span className="text-2xl font-bold">{formatCurrency(total)}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Add Promo or Voucher
              </button>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                QRIS
              </button>
              <button className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
