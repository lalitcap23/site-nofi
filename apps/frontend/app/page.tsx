"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  LayoutDashboard,
  HardDrive,
  Wallet,
  Users,
  Database,
  Menu,
  Bell,
  Search,
  ChevronDown,
  CreditCard,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle,
  Moon,
  Sun,
} from "lucide-react"
import router from "next/router"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

const performanceData = [
    { time: "00:00", tps: 2100, latency: 120, validators: 1250 },
    { time: "04:00", tps: 2200, latency: 125, validators: 1260 },
    { time: "08:00", tps: 3200, latency: 85, validators: 1270 },
    { time: "12:00", tps: 3800, latency: 75, validators: 1280 },
    { time: "16:00", tps: 3700, latency: 75, validators: 1282 },
    { time: "20:00", tps: 3600, latency: 75, validators: 1284 },
  ]

  // Resource usage data
  const resourceData = [
    { name: "CPU", value: 68 },
    { name: "Memory", value: 74 },
    { name: "Storage", value: 42 },
    { name: "Network", value: 56 },
  ]

  // Transaction history data
  const transactions = [
    {
      id: "7pKfQc...3bVs",
      type: "Transfer",
      amount: "12.5 SOL",
      status: "confirmed",
      time: "2 mins ago",
    },
    {
      id: "9jRtZx...7mNp",
      type: "Smart Contract",
      amount: "0.05 SOL",
      status: "confirmed",
      time: "5 mins ago",
    },
    {
      id: "3vBnLq...1kPd",
      type: "NFT Mint",
      amount: "0.2 SOL",
      status: "processing",
      time: "8 mins ago",
    },
    {
      id: "5tYhGj...9sRw",
      type: "Transfer",
      amount: "5.75 SOL",
      status: "confirmed",
      time: "15 mins ago",
    },
  ]

  // Network status data
  const services = [
    { name: "Validator Network", status: "operational", uptime: "99.98%" },
    { name: "RPC Endpoints", status: "operational", uptime: "99.95%" },
    { name: "Block Explorer", status: "operational", uptime: "100%" },
    { name: "API Services", status: "operational", uptime: "99.92%" },
    { name: "Wallet Services", status: "degraded", uptime: "97.84%" },
  ]

  const COLORS = ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981"]

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } lg:left-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-600">
              <Database className="h-4 w-4 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Stutely
              </span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <button
              className={`flex items-center justify-${
                isSidebarOpen ? "start" : "center"
              } gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <LayoutDashboard className="h-5 w-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            <button
              className={`flex items-center justify-${
                isSidebarOpen ? "start" : "center"
              } gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <HardDrive className="h-5 w-5" />
              {isSidebarOpen && <span>Resources</span>}
            </button>
            <button
              className={`flex items-center justify-${
                isSidebarOpen ? "start" : "center"
              } gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Wallet className="h-5 w-5" />
              {isSidebarOpen && <span>Wallet</span>}
            </button>
            <button
              className={`flex items-center justify-${
                isSidebarOpen ? "start" : "center"
              } gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Users className="h-5 w-5" />
              {isSidebarOpen && <span>Validators</span>}
            </button>
          </nav>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-600">
              <span className="text-xs font-medium text-white">JS</span>
            </div>
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">john@stutely.io</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <div className="flex flex-1 items-center gap-4">
            <form className="flex-1 lg:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-full bg-gray-100 dark:bg-gray-800 pl-8 py-2 md:w-64 lg:w-80 border-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </form>
            <div className="ml-auto flex items-center gap-2">
              {/* Theme Toggle */}
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-600">
                    <span className="text-xs font-medium text-white">JS</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="grid gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Monitor your decentralized infrastructure on Solana</p>
          </div>

          {/* Tabs and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-sm font-medium">Overview</button>
              <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400">
                Analytics
              </button>
              <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400">
                Reports
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm font-medium flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Upgrade</span>
              </button>
              <button onClick={() =>router.push('/dashboard')} className="px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-sm font-medium flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Start monitoring</span>
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Network Status */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4 pb-2">
                <h3 className="text-sm font-medium">Network Status</h3>
              </div>
              <div className="p-4 pt-0">
                <div className="text-2xl font-bold">98.7%</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Uptime</p>
                <div className="mt-4 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-1 w-[98.7%] rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
                </div>
              </div>
            </div>

            {/* Active Nodes */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4 pb-2">
                <h3 className="text-sm font-medium">Active Nodes</h3>
              </div>
              <div className="p-4 pt-0">
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-emerald-500">+24 in last hour</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">All systems operational</span>
                </div>
              </div>
            </div>

            {/* Transaction Rate */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4 pb-2">
                <h3 className="text-sm font-medium">Transaction Rate</h3>
              </div>
              <div className="p-4 pt-0">
                <div className="text-2xl font-bold">3,842</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">TPS (Transactions per second)</p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="text-xs font-medium text-emerald-500">↑ 12.5%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">from last week</span>
                </div>
              </div>
            </div>

            {/* SOL Price */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4 pb-2">
                <h3 className="text-sm font-medium">SOL Price</h3>
              </div>
              <div className="p-4 pt-0">
                <div className="text-2xl font-bold">$142.87</div>
                <p className="text-xs text-rose-500">↓ 2.3% (24h)</p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="text-xs font-medium text-emerald-500">↑ 8.7%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Performance Metrics */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4">
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">System performance over the last 24 hours</p>
              </div>
              <div className="p-4 pt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                    />
                    <XAxis dataKey="time" stroke={theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} />
                    <YAxis stroke={theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(17, 17, 17, 0.9)" : "rgba(255, 255, 255, 0.9)",
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "6px",
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tps"
                      name="TPS"
                      stroke="#8b5cf6"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="latency" name="Latency (ms)" stroke="#06b6d4" strokeWidth={2} />
                    <Line type="monotone" dataKey="validators" name="Validators" stroke="#ec4899" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-4">
                <h3 className="text-lg font-medium">Resource Usage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">CPU, Memory, and Storage allocation</p>
              </div>
              <div className="p-4 pt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {resourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(17, 17, 17, 0.9)" : "rgba(255, 255, 255, 0.9)",
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "6px",
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                      formatter={(value) => [`${value}%`, "Usage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-medium">Recent Transactions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest network activity</p>
            </div>
            <div className="p-4 pt-0">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-3 text-left text-sm font-medium">Transaction</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr
                        key={index}
                        className={
                          index !== transactions.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""
                        }
                      >
                        <td className="px-4 py-3 text-sm font-mono">{tx.id}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-xs font-medium">
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{tx.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            {tx.status === "confirmed" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                <span>Confirmed</span>
                              </>
                            ) : tx.status === "processing" ? (
                              <>
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span>Processing</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-rose-500" />
                                <span>Failed</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <button className="text-sm text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300">
                  View all transactions →
                </button>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-medium">Network Status</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current status of all monitored services</p>
            </div>
            <div className="p-4 pt-0">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Uptime</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Last Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr
                        key={index}
                        className={index !== services.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""}
                      >
                        <td className="px-4 py-3 text-sm">{service.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            {service.status === "operational" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                <span>Operational</span>
                              </>
                            ) : service.status === "degraded" ? (
                              <>
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span>Degraded</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-rose-500" />
                                <span>Outage</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{service.uptime}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">2 minutes ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 py-3 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium">All systems operational</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Last updated: May 15, 2025 at 10:03 PM</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
