"use client"

import { useState } from 'react'
import { Search, Calendar, ChevronRight, MoreVertical } from 'lucide-react'
import Sidebar from '@/components/sidebar'
import Link from 'next/link'

const billingQueue = [
  { id: '#006', customer: 'Francois', orderNumber: '#006', table: '06', date: 'Wed, 29 May 2024 • 09:15 AM', amount: 20.00, status: 'Active' },
  { id: '#005', customer: 'Eloise', orderNumber: '#005', table: '05', date: 'Wed, 29 May 2024 • 09:00 AM', amount: 19.35, status: 'Closed' },
  { id: '#004', customer: 'Mike', orderNumber: '#004', table: '04', date: 'Wed, 29 May 2024 • 08:15 AM', amount: 25.00, status: 'Active' },
  { id: '#003', customer: 'Billie', orderNumber: '#003', table: '03', date: 'Wed, 29 May 2024 • 07:50 AM', amount: 31.50, status: 'Active' },
]

const trackOrders = [
  { 
    customer: 'Mike', 
    table: '04', 
    orderType: 'Dine In', 
    time: '10:00 AM',
    items: [
      '1x Beef Crowbch',
      '1x Cereal Cream Donut',
      '1x Cheesy Sourdough',
      '1x Sliced Black Forest'
    ],
    total: 4,
    amount: 16.00
  },
  { 
    customer: 'Billie', 
    table: '03', 
    orderType: 'Take Away', 
    time: '08:15 AM',
    items: [
      '1x Beef Crowbch',
      '1x Cereal Cream Donut',
      '1x Cheesy Sourdough',
      '1x Choisy Sourdough',
      '1x See More'
    ],
    total: 6,
    amount: 24.50
  },
  { 
    customer: 'Richard', 
    table: '02', 
    orderType: 'Dine In', 
    time: '08:15 AM',
    items: [
      '1x Beef Crowbch',
      '1x Cereal Cream Donut',
      '1x Cheesy Sourdough',
      '1x Choisy Sourdough',
      '1x See More'
    ],
    total: 6,
    amount: 22.75
  },
  { 
    customer: 'Sharon', 
    table: '04', 
    orderType: 'Dine In', 
    time: '10:00 AM',
    items: [
      '1x Beef Crowbch',
      '1x Cereal Cream Donut',
      '1x Cheesy Sourdough',
      '1x Sliced Black Forest'
    ],
    total: 6,
    amount: 18.00
  },
]

export default function BillingQueuePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const activeQueue = 4

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Activity / Billing Queue</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Wed, 29 May 2024</span>
              <button className="p-2 bg-white border border-gray-200 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-green-600 font-medium">● Open Order</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-1">
            <Link href="/activity">
              <button className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Order History
              </button>
            </Link>
            <Link href="/activity/tables">
              <button className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Tables
              </button>
            </Link>
            <Link href="/activity/billing">
              <button className="px-6 py-3 font-medium text-white bg-blue-500 rounded-t-lg">
                Billing Queue
              </button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Billing Queue Cards */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Billing Queue</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <span className="font-semibold">{activeQueue} Active Queue</span>
                <button className="p-1 hover:bg-blue-100 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              <button className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-full font-medium text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-50">
                Active
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-50">
                Closed
              </button>
            </div>

            {/* Queue Cards */}
            <div className="space-y-4">
              {billingQueue.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.customer}</h3>
                        <p className="text-sm text-gray-500">Order Number: {item.orderNumber}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-200"></div>
                      <div>
                        <p className="text-sm text-gray-600">Table: {item.table}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">{item.date}</p>
                      <p className="text-lg font-bold text-gray-900">${item.amount.toFixed(2)}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track Order Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Track Order</h2>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Horizontal Scroll Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {trackOrders.map((order, index) => (
                <div 
                  key={index} 
                  className="min-w-[280px] border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-all"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                      <p className="text-xs text-gray-500">Table: {order.table} • {order.orderType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.orderType === 'Dine In' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.orderType === 'Dine In' ? 'On Kitchen Hand' : 'All Done'}
                    </span>
                  </div>

                  {/* Time */}
                  <p className="text-xs text-gray-500 mb-3">{order.time}</p>

                  {/* Items List */}
                  <div className="space-y-1.5 mb-3 text-sm text-gray-700">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-xs">{item}</p>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Total Order:</p>
                        <p className="font-semibold text-gray-900">{order.total} Items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Amount:</p>
                        <p className="font-bold text-lg text-gray-900">${order.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* See More Button */}
                  <button className="w-full mt-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    See More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
