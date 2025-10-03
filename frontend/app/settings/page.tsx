"use client"

import Sidebar from '@/components/sidebar'
import { Settings as SettingsIcon, Bell, Lock, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-10 h-10 text-gray-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-500 mb-8">Configure your POS system preferences</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
              <Bell className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Notifications</h3>
              <p className="text-sm text-gray-500">Manage alerts & updates</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-500 transition-colors cursor-pointer">
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
              <p className="text-sm text-gray-500">Privacy & access control</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-pink-500 transition-colors cursor-pointer">
              <Palette className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Appearance</h3>
              <p className="text-sm text-gray-500">Theme & display options</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-8">Coming Soon...</p>
        </div>
      </div>
    </div>
  )
}
