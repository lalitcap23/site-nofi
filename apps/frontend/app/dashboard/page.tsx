"use client"

import { useState } from "react"
import { Check, Plus, Globe, Server, X, Loader2 } from "lucide-react"

export default function MonitoringDashboard() {
  // Website type definition
  type Website = {
    id: string
    name: string
    url: string
    status: {
      server1: "up" | "down" | "checking"
      server2: "up" | "down" | "checking"
      server3: "up" | "down" | "checking"
    }
    lastChecked: Date
  }

  // State for websites
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: "1",
      name: "Example Website",
      url: "https://example.com",
      status: {
        server1: "up",
        server2: "up",
        server3: "up",
      },
      lastChecked: new Date(),
    },
  ])

  // State for modal and form
  const [showModal, setShowModal] = useState(false)
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" })

  // Add website function
  const addWebsite = () => {
    if (!newWebsite.name || !newWebsite.url) return

    // Create a new website with checking status
    const website: Website = {
      id: Date.now().toString(),
      name: newWebsite.name,
      url: newWebsite.url,
      status: {
        server1: "checking",
        server2: "checking",
        server3: "checking",
      },
      lastChecked: new Date(),
    }

    setWebsites([...websites, website])
    setNewWebsite({ name: "", url: "" })
    setShowModal(false)

    // Simulate checking status from different servers
    setTimeout(() => {
      setWebsites((prev) =>
        prev.map((site) =>
          site.id === website.id
            ? {
                ...site,
                status: {
                  server1: Math.random() > 0.2 ? "up" : "down",
                  server2: Math.random() > 0.2 ? "up" : "down",
                  server3: Math.random() > 0.2 ? "up" : "down",
                },
              }
            : site,
        ),
      )
    }, 2000)
  }

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  // Status indicator component
  const StatusIndicator = ({ status }: { status: "up" | "down" | "checking" }) => {
    if (status === "checking") {
      return <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
    } else if (status === "up") {
      return <Check className="h-5 w-5 text-green-500" />
    } else {
      return <X className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Website Monitoring</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Website
        </button>
      </header>

      {/* Website List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {websites.map((website) => (
          <div key={website.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-lg">{website.name}</h2>
                <p className="text-gray-500 text-sm flex items-center">
                  <Globe className="h-3 w-3 mr-1" />
                  {website.url}
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  Object.values(website.status).includes("down")
                    ? "bg-red-100 text-red-800"
                    : Object.values(website.status).includes("checking")
                      ? "bg-gray-100 text-gray-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {Object.values(website.status).includes("down")
                  ? "Issues"
                  : Object.values(website.status).includes("checking")
                    ? "Checking"
                    : "Healthy"}
              </div>
            </div>

            {/* Server Status */}
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-gray-500" />
                  <span>Server 1</span>
                </div>
                <StatusIndicator status={website.status.server1} />
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-gray-500" />
                  <span>Server 2</span>
                </div>
                <StatusIndicator status={website.status.server2} />
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-gray-500" />
                  <span>Server 3</span>
                </div>
                <StatusIndicator status={website.status.server3} />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">Last checked: {formatTimeAgo(website.lastChecked)}</div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {websites.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-white mt-8">
          <h3 className="text-lg font-medium">No websites monitored yet</h3>
          <p className="text-gray-500 mt-1 mb-4">Add your first website to start monitoring</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Website
          </button>
        </div>
      )}

      {/* Add Website Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add a new website to monitor</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Name</label>
              <input
                type="text"
                placeholder="My Website"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={newWebsite.name}
                onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={newWebsite.url}
                onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={addWebsite} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Add Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
