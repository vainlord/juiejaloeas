"use client"

import { useState } from 'react'
import { Search, Calendar, Filter, ChevronRight } from 'lucide-react'
import Sidebar from '@/components/sidebar'
import Link from 'next/link'

const orderHistory = [
  { id: '001', date: '25/05/2024 - 08:04 AM', customer: 'George', status: 'Done', payment: 35.00, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '002', date: '25/05/2024 - 08:17 AM', customer: 'Charlie', status: 'Done', payment: 12.50, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '003', date: '25/05/2024 - 08:30 AM', customer: 'Hyacinth', status: 'Done', payment: 15.25, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '004', date: '25/05/2024 - 08:35 AM', customer: 'Francesca', status: 'Done', payment: 22.10, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '005', date: '25/05/2024 - 08:42 AM', customer: 'Eliza', status: 'Cancelled', payment: 12.25, paymentStatus: 'Unpaid', orderType: 'Dine In' },
  { id: '006', date: '25/05/2024 - 09:00 AM', customer: 'Jelly', status: 'Done', payment: 64.00, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '007', date: '25/05/2024 - 11:20 AM', customer: 'Justin', status: 'Done', payment: 21.50, paymentStatus: 'Paid', orderType: 'Take Away' },
  { id: '008', date: '25/05/2024 - 11:58 AM', customer: 'Gregory', status: 'Done', payment: 16.25, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '009', date: '25/05/2024 - 12:03 AM', customer: 'Alwi', status: 'Cancelled', payment: 19.20, paymentStatus: 'Unpaid', orderType: 'Dine In' },
  { id: '010', date: '25/05/2024 - 12:15 PM', customer: 'Gonta', status: 'Done', payment: 12.25, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '011', date: '25/05/2024 - 01:00 PM', customer: 'Zelda', status: 'Done', payment: 20.12, paymentStatus: 'Paid', orderType: 'Dine In' },
  { id: '001', date: '26/05/2024 - 10:08 AM', customer: 'Penelope', status: 'Done', payment: 13.50, paymentStatus: 'Paid', orderType: 'Take Away' },
  { id: '002', date: '26/05/2024 - 12:47 AM', customer: 'Olivia', status: 'Done', payment: 10.50, paymentStatus: 'Paid', orderType: 'Dine In' },
]

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('01:00')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Activity / Order History</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                <span>📥</span>
                Download
              </button>
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
              <button className="px-6 py-3 font-medium text-white bg-blue-500 rounded-t-lg">
                Order History
              </button>
            </Link>
            <Link href="/activity/tables">
              <button 
                className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tables
              </button>
            </Link>
            <Link href="/activity/billing">
              <button 
                className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Billing Queue
              </button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Filter Bar */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Date:</span>
                <input 
                  type="date" 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                  defaultValue="2024-05-25"
                />
                <span className="text-gray-400">—</span>
                <input 
                  type="date" 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                  defaultValue="2024-05-29"
                />
                
                <span className="text-sm text-gray-600 ml-4">Time:</span>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                />
                <span className="text-gray-400">—</span>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">#</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date & Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Payment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, index) => (
                    <tr key={`${order.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          order.status === 'Done' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">USD {order.payment.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          order.paymentStatus === 'Paid' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                          Detail
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bakehouse Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="font-semibold text-gray-700">Bakehouse • POS System</p>
            <p>This dreamy taste & magic of sweet moments in every bite from our bakery</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span>© 2024 Bakehouse</span>
              <span>•</span>
              <button className="hover:text-gray-700">Contacts</button>
              <span>•</span>
              <button className="hover:text-gray-700">Help</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
