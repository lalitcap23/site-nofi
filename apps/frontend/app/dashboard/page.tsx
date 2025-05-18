"use client"

import { useState } from "react"
import { Check, Plus, AlertCircle, Globe, Server, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  uptime: number
}

export default function MonitoringDashboard() {
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
      uptime: 99.98,
    },
    {
      id: "2",
      name: "Test Site",
      url: "https://test-site.com",
      status: {
        server1: "up",
        server2: "down",
        server3: "up",
      },
      lastChecked: new Date(Date.now() - 5 * 60000),
      uptime: 98.76,
    },
  ])

  const [open, setOpen] = useState(false)
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" })

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
      uptime: 100,
    }

    setWebsites([...websites, website])
    setNewWebsite({ name: "", url: "" })
    setOpen(false)

    // Simulate checking status from different servers
    setTimeout(() => {
      setWebsites((prev) =>
        prev.map((site) =>
          site.id === website.id
            ? {
                ...site,
                status: {
                  server1: "up",
                  server2: "up",
                  server3: "up",
                },
              }
            : site,
        ),
      )
    }, 2000)
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8 pt-6">
          <div>
            <h1 className="text-3xl font-bold">Website Monitoring</h1>
            <p className="text-gray-500 dark:text-gray-400">Monitor your websites from multiple servers</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Website
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new website to monitor</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Website Name</Label>
                  <Input
                    id="name"
                    placeholder="My Website"
                    value={newWebsite.name}
                    onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={newWebsite.url}
                    onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={addWebsite}>Add Website</Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Websites</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              {websites.length} website{websites.length !== 1 ? "s" : ""} monitored
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {websites.map((website) => (
                <Card key={website.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{website.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1" />
                          {website.url}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          Object.values(website.status).includes("down")
                            ? "destructive"
                            : Object.values(website.status).includes("checking")
                              ? "outline"
                              : "default"
                        }
                      >
                        {Object.values(website.status).includes("down")
                          ? "Issues"
                          : Object.values(website.status).includes("checking")
                            ? "Checking"
                            : "Healthy"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
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
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <div>Last checked: {formatTimeAgo(website.lastChecked)}</div>
                        <div>Uptime: {website.uptime}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {websites
                .filter((website) => Object.values(website.status).includes("down"))
                .map((website) => (
                  <Card key={website.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{website.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Globe className="h-3 w-3 mr-1" />
                            {website.url}
                          </CardDescription>
                        </div>
                        <Badge variant="destructive">Issues</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
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
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                          <div>Last checked: {formatTimeAgo(website.lastChecked)}</div>
                          <div>Uptime: {website.uptime}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {!websites.some((website) => Object.values(website.status).includes("down")) && (
                <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">All systems operational</h3>
                  <p className="text-gray-500 mt-1">No issues detected with any of your websites</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {websites.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-white dark:bg-gray-800 mt-8">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium">No websites monitored yet</h3>
            <p className="text-gray-500 mt-1 mb-4">Add your first website to start monitoring</p>
            <Button onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Website
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
