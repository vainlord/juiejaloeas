"use client"

import { useState } from 'react'
import { TrendingUp, Users, DollarSign, Package, Download, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '@/components/sidebar'

// Mock data
const salesData = [
  { date: 'May 20', amount: 12450 },
  { date: 'May 21', amount: 13200 },
  { date: 'May 22', amount: 12100 },
  { date: 'May 23', amount: 14500 },
  { date: 'May 24', amount: 13800 },
  { date: 'May 25', amount: 15200 },
  { date: 'May 26', amount: 14100 },
  { date: 'May 27', amount: 13500 },
  { date: 'May 28', amount: 15800 },
  { date: 'May 29', amount: 12650 },
]

const favoriteProducts = [
  { id: 1, name: 'Buttermeli Croissant', category: 'Pastry', orders: 183, image: '🥐' },
  { id: 2, name: 'Beef Crowbch', category: 'Sandwich', orders: 160, image: '🥪' },
  { id: 3, name: 'Sliced Blackforest', category: 'Cake', orders: 125, image: '🍰' },
  { id: 4, name: 'Solo Floss Bread', category: 'Bread', orders: 119, image: '🥖' },
]

const allOrders = [
  { id: '001', date: '25/05/2024 - 08:04 AM', customer: 'George', status: 'Done', payment: 35.00, orderStatus: 'Paid' },
  { id: '002', date: '25/05/2024 - 08:17 AM', customer: 'Charlie', status: 'Done', payment: 12.50, orderStatus: 'Paid' },
  { id: '003', date: '25/05/2024 - 08:30 AM', customer: 'Hyacinth', status: 'Done', payment: 15.25, orderStatus: 'Paid' },
  { id: '004', date: '25/05/2024 - 08:35 AM', customer: 'Francesca', status: 'Done', payment: 22.10, orderStatus: 'Paid' },
  { id: '005', date: '25/05/2024 - 08:42 AM', customer: 'Eliza', status: 'Cancelled', payment: 12.25, orderStatus: 'Unpaid' },
]

export default function ReportPage() {
  const [dateRange, setDateRange] = useState('Monthly')
  const [showGraph, setShowGraph] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Report</h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-sm font-medium text-gray-900 bg-transparent border-none outline-none"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
              <span className="text-sm text-gray-500">Wed, 29 May 2024</span>
              <button className="p-2 bg-white border border-gray-200 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-green-600 font-medium">● Open Order</span>
              <label className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show Graph</span>
                <input 
                  type="checkbox" 
                  checked={showGraph}
                  onChange={(e) => setShowGraph(e.target.checked)}
                  className="w-12 h-6 rounded-full appearance-none bg-blue-500 relative cursor-pointer transition-colors checked:bg-blue-500"
                  style={{
                    backgroundImage: showGraph 
                      ? 'radial-gradient(circle at 75% 50%, white 40%, transparent 40%)'
                      : 'radial-gradient(circle at 25% 50%, white 40%, transparent 40%)'
                  }}
                />
              </label>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  12.2% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Sales Amount</p>
              <p className="text-2xl font-bold text-gray-900">12,650.00</p>
              <p className="text-xs text-gray-400 mt-1">USD</p>
              <p className="text-xs text-green-600 mt-2">+ USD 1,543.30</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Package className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  10% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Product Sales</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
              <p className="text-xs text-gray-400 mt-1">Items</p>
              <p className="text-xs text-green-600 mt-2">+ 125 Items</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                  0.02% <TrendingUp className="w-3 h-3 rotate-180" />
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">400</p>
              <p className="text-xs text-gray-400 mt-1">Persons</p>
              <p className="text-xs text-red-600 mt-2">- 5 Persons</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  0.3% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">12,650.00</p>
              <p className="text-xs text-gray-400 mt-1">USD</p>
              <p className="text-xs text-green-600 mt-2">+ USD 3,792</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Graph Section */}
            <div className="col-span-2 space-y-6">
              {/* Sales Chart */}
              {showGraph && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">● Report Graph</h2>
                    <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                      <option>Total Sales Amount</option>
                      <option>Total Orders</option>
                      <option>Total Customers</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="text-2xl font-bold">12,650.00</p>
                        <p className="text-xs text-gray-400">USD</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Growth</p>
                        <p className="text-2xl font-bold text-green-600">+ 1,543.30</p>
                        <p className="text-xs text-gray-400">USD</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Growth Percentage</p>
                        <p className="text-2xl font-bold text-green-600">12.2</p>
                        <p className="text-xs text-gray-400">Percent (%)</p>
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* All Orders */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">● All Orders</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Date:</span>
                    <input type="date" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm" defaultValue="2024-05-25" />
                    <span className="text-gray-400">—</span>
                    <input type="date" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm" defaultValue="2024-05-29" />
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <span className="text-gray-400">🔍</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <span className="text-gray-400">⚙️</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
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
                      {allOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{order.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                          <td className="py-3 px-4 text-sm">{order.customer}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">USD {order.payment.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.orderStatus === 'Paid' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Favorite Products */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">● Favorite Product</h2>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <span className="text-gray-400">🔍</span>
                </button>
              </div>

              <div className="space-y-3">
                {favoriteProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{product.orders}</p>
                      <p className="text-xs text-gray-500">Times</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
