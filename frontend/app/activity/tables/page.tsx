"use client"

import { useState } from 'react'
import { Search, Calendar, Edit, Users, Plus } from 'lucide-react'
import Sidebar from '@/components/sidebar'
import Link from 'next/link'

const tables = [
  { id: 'T-01', floor: '1st Floor', capacity: 2, status: 'served', guests: 'Sharon: 2 Guests', time: '09:00 AM' },
  { id: 'T-02', floor: '1st Floor', capacity: 2, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-03', floor: '1st Floor', capacity: 2, status: 'served', guests: 'Billie: 2 Guests', time: '09:00 AM' },
  { id: 'T-04', floor: '1st Floor', capacity: 2, status: 'served', guests: 'Mike: 1 Guest', time: '09:00 AM' },
  { id: 'T-05', floor: '1st Floor', capacity: 2, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-06', floor: '1st Floor', capacity: 2, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-07', floor: '1st Floor', capacity: 4, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-08', floor: '1st Floor', capacity: 4, status: 'reserved', guests: 'Hyacinth: 3 Guests', time: '01:00 PM' },
  { id: 'T-09', floor: '1st Floor', capacity: 4, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-10', floor: '1st Floor', capacity: 4, status: 'served', guests: 'Justin: 4 Guests', time: '09:30 AM' },
  { id: 'T-11', floor: '2nd Floor', capacity: 4, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-12', floor: '2nd Floor', capacity: 4, status: 'served', guests: 'Clark: 5 Guests', time: '09:00 AM' },
  { id: 'T-13', floor: '2nd Floor', capacity: 12, status: 'reserved', guests: 'Maeve: 10 Guests', time: '01:00 PM' },
  { id: 'T-14', floor: '2nd Floor', capacity: 4, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-15', floor: '2nd Floor', capacity: 4, status: 'available', guests: '0 Guest', time: null },
  { id: 'T-16', floor: '2nd Floor', capacity: 12, status: 'reserved', guests: 'Wendy: 12 Guests', time: '01:00 PM' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-gray-100 border-gray-300 text-gray-700'
    case 'served':
      return 'bg-blue-100 border-blue-400 text-blue-700'
    case 'reserved':
      return 'bg-red-100 border-red-400 text-red-700'
    default:
      return 'bg-gray-100 border-gray-300 text-gray-700'
  }
}

export default function TablesPage() {
  const [selectedFloor, setSelectedFloor] = useState('1st Floor')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTables = tables.filter(table => 
    table.floor === selectedFloor && 
    (table.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     table.guests.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const twoPersonTables = filteredTables.filter(t => t.capacity === 2)
  const fourPersonTables = filteredTables.filter(t => t.capacity === 4)
  const largePersonTables = filteredTables.filter(t => t.capacity > 4)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Activity / Tables</h1>
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
              <button className="px-6 py-3 font-medium text-white bg-blue-500 rounded-t-lg">
                Tables
              </button>
            </Link>
            <Link href="/activity/billing">
              <button className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Billing Queue
              </button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Floor Selector & Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Add Table
                </button>
                <Plus className="w-4 h-4 text-gray-600" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFloor('1st Floor')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedFloor === '1st Floor'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  1st Floor
                </button>
                <button
                  onClick={() => setSelectedFloor('2nd Floor')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedFloor === '2nd Floor'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  2nd Floor
                </button>
                <button
                  onClick={() => setSelectedFloor('3rd Floor')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedFloor === '3rd Floor'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  3rd Floor
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-gray-600">⚙️</span>
                </button>
              </div>
            </div>

            {/* 2 Persons Tables */}
            {twoPersonTables.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">2 Persons Table</h3>
                <div className="grid grid-cols-6 gap-4">
                  {twoPersonTables.map((table) => (
                    <div
                      key={table.id}
                      className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${getStatusColor(table.status)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg">{table.id}</span>
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">{table.guests}</p>
                        {table.time && (
                          <p className="text-xs">{table.time}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 Persons Tables */}
            {fourPersonTables.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">4 Persons Table</h3>
                <div className="grid grid-cols-4 gap-4">
                  {fourPersonTables.map((table) => (
                    <div
                      key={table.id}
                      className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${getStatusColor(table.status)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg">{table.id}</span>
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">{table.guests}</p>
                        {table.time && (
                          <p className="text-xs">{table.time}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Max 12 Persons Tables */}
            {largePersonTables.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Max 12 Persons</h3>
                <div className="grid grid-cols-2 gap-4">
                  {largePersonTables.map((table) => (
                    <div
                      key={table.id}
                      className={`border-2 rounded-xl p-6 transition-all hover:shadow-md ${getStatusColor(table.status)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-xl">{table.id}</span>
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{table.guests}</p>
                        {table.time && (
                          <p className="text-sm">{table.time}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Table Status:</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 rounded"></div>
                  <span className="text-sm text-gray-600">● Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 border-2 border-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">● Served</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 border-2 border-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">● Reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
