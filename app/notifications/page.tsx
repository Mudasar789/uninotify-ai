"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Bell,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  User,
  LogOut,
  Clock,
  University,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "deadline",
    title: "Application Deadline Approaching",
    message: "Stanford University application deadline is in 2 days (January 1, 2025)",
    university: "Stanford University",
    timestamp: "2024-12-30T10:00:00Z",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "new_admission",
    title: "New Admission Opening",
    message: "Harvard University has opened applications for Fall 2025 with new scholarship opportunities",
    university: "Harvard University",
    timestamp: "2024-12-29T15:30:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "deadline",
    title: "Deadline Reminder",
    message: "University of Oxford application deadline is in 5 days (January 15, 2025)",
    university: "University of Oxford",
    timestamp: "2024-12-29T09:00:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: 4,
    type: "scholarship",
    title: "Scholarship Opportunity",
    message: "MIT is offering new merit-based scholarships for international students",
    university: "MIT",
    timestamp: "2024-12-28T14:20:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: 5,
    type: "deadline",
    title: "Urgent: Deadline Tomorrow",
    message: "University of Cambridge application deadline is tomorrow (December 31, 2024)",
    university: "University of Cambridge",
    timestamp: "2024-12-28T08:00:00Z",
    read: true,
    priority: "high",
  },
  {
    id: 6,
    type: "update",
    title: "University Information Updated",
    message: "ETH Zurich has updated their program requirements and fee structure",
    university: "ETH Zurich",
    timestamp: "2024-12-27T16:45:00Z",
    read: true,
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="w-5 h-5 text-orange-400" />
      case "new_admission":
        return <University className="w-5 h-5 text-green-400" />
      case "scholarship":
        return <DollarSign className="w-5 h-5 text-yellow-400" />
      case "update":
        return <Info className="w-5 h-5 text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-purple-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 bg-red-500/10"
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/10"
      case "low":
        return "border-blue-500/50 bg-blue-500/10"
      default:
        return "border-purple-500/30 bg-black/40"
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "deadlines") return notif.type === "deadline"
    if (filter === "admissions") return notif.type === "new_admission"
    if (filter === "scholarships") return notif.type === "scholarship"
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                UniNotify AI
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span>Welcome, {user.firstName}</span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm" className="border-red-500/30 text-red-400">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-gray-400 text-lg">
              Stay updated with university deadlines, admissions, and opportunities
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{unreadCount} unread</Badge>
            <Button onClick={markAllAsRead} variant="outline" className="border-purple-500/30 text-purple-400">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Notifications</p>
                  <p className="text-2xl font-bold text-white">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-white">{unreadCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Deadline Alerts</p>
                  <p className="text-2xl font-bold text-white">
                    {notifications.filter((n) => n.type === "deadline").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Admissions</p>
                  <p className="text-2xl font-bold text-white">
                    {notifications.filter((n) => n.type === "new_admission").length}
                  </p>
                </div>
                <University className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-black/40 border border-purple-500/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-500">
              All Notifications
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-purple-500">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="data-[state=active]:bg-purple-500">
              Deadlines
            </TabsTrigger>
            <TabsTrigger value="admissions" className="data-[state=active]:bg-purple-500">
              Admissions
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="data-[state=active]:bg-purple-500">
              Scholarships
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${getPriorityColor(notification.priority)} backdrop-blur-xl transition-all duration-300 hover:border-purple-400/50 ${
                    !notification.read ? "border-l-4 border-l-purple-400" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold ${!notification.read ? "text-white" : "text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && <Badge className="bg-purple-500 text-white text-xs">New</Badge>}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                notification.priority === "high"
                                  ? "border-red-500/50 text-red-400"
                                  : notification.priority === "medium"
                                    ? "border-yellow-500/50 text-yellow-400"
                                    : "border-blue-500/50 text-blue-400"
                              }`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <University className="w-4 h-4 mr-1" />
                              {notification.university}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(notification.timestamp).toLocaleDateString()} at{" "}
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-4">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`${getPriorityColor(notification.priority)} backdrop-blur-xl border-l-4 border-l-purple-400`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white">{notification.title}</h3>
                              <Badge className="bg-purple-500 text-white text-xs">New</Badge>
                            </div>
                            <p className="text-gray-400 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <University className="w-4 h-4 mr-1" />
                                {notification.university}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {new Date(notification.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => deleteNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="deadlines">
            <div className="space-y-4">
              {notifications
                .filter((n) => n.type === "deadline")
                .map((notification) => (
                  <Card key={notification.id} className="bg-red-500/10 border-red-500/50 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Calendar className="w-5 h-5 text-red-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-2">{notification.title}</h3>
                          <p className="text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <University className="w-4 h-4 mr-1" />
                              {notification.university}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions">
            <div className="space-y-4">
              {notifications
                .filter((n) => n.type === "new_admission")
                .map((notification) => (
                  <Card key={notification.id} className="bg-green-500/10 border-green-500/50 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <University className="w-5 h-5 text-green-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-2">{notification.title}</h3>
                          <p className="text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <University className="w-4 h-4 mr-1" />
                              {notification.university}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="space-y-4">
              {notifications
                .filter((n) => n.type === "scholarship")
                .map((notification) => (
                  <Card key={notification.id} className="bg-yellow-500/10 border-yellow-500/50 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <DollarSign className="w-5 h-5 text-yellow-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-2">{notification.title}</h3>
                          <p className="text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <University className="w-4 h-4 mr-1" />
                              {notification.university}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
