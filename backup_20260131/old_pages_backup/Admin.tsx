'use client';

import { useState } from 'react';
import { Mail, Heart, Settings, Database, Users, FileText, BarChart3 } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'prayers' | 'content' | 'settings'>('overview');

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your Shame to Flame ministry site</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'prayers'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            Prayers
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'content'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Content
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Visitors</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">--</p>
                  <p className="text-xs text-gray-500 mt-1">Analytics not configured</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Contacts</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">--</p>
                  <p className="text-xs text-gray-500 mt-1">Backend not configured</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Prayer Requests</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">--</p>
                  <p className="text-xs text-gray-500 mt-1">Backend not configured</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Storage</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">--</p>
                  <p className="text-xs text-gray-500 mt-1">Backend not configured</p>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Backend Configuration Required</h3>
                <p className="text-yellow-700 text-sm">
                  The admin dashboard needs a backend to store contacts, prayer requests, and other data. 
                  Options include: local JSON files, a simple API, or a lightweight database solution.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Submissions</h2>
              <div className="text-center py-12 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No backend configured for contact submissions.</p>
                <p className="text-sm mt-2">Contact form submissions will be available once a backend is set up.</p>
              </div>
            </div>
          )}

          {activeTab === 'prayers' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Prayer Requests</h2>
              <div className="text-center py-12 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No backend configured for prayer requests.</p>
                <p className="text-sm mt-2">Prayer submissions will be available once a backend is set up.</p>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Content Management</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Daily Fire Devotionals</h3>
                  <p className="text-sm text-gray-600">Manage daily devotional content</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Healing Pathways</h3>
                  <p className="text-sm text-gray-600">Manage healing pathway studies</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Prayer Rock Blog</h3>
                  <p className="text-sm text-gray-600">Manage blog posts</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Downloadable Studies</h3>
                  <p className="text-sm text-gray-600">Manage downloadable Bible studies</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">API Keys</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Groq API</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Configured</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">HuggingFace API</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Configured</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Bible Reader</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">PWA</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">AI Conversation</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Not Built</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
