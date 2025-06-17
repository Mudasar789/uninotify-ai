"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Search,
  Filter,
  Bell,
  Heart,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Star,
  Globe,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock university data
const mockUniversities = [
  {
    id: 1,
    name: "Stanford University",
    country: "United States",
    ranking: 3,
    tuitionUSD: 56169,
    tuitionLocal: 56169,
    currency: "USD",
    programs: ["Computer Science", "Engineering", "Business", "Medicine"],
    deadline: "2025-01-01",
    scholarships: true,
    qualityScore: 9.8,
    acceptanceRate: 4.3,
    saved: false,
  },
  {
    id: 2,
    name: "University of Oxford",
    country: "United Kingdom",
    ranking: 1,
    tuitionUSD: 45000,
    tuitionLocal: 35000,
    currency: "GBP",
    programs: ["Philosophy", "Medicine", "Law", "Engineering"],
    deadline: "2025-01-15",
    scholarships: true,
    qualityScore: 9.9,
    acceptanceRate: 17.5,
    saved: true,
  },
  {
    id: 3,
    name: "MIT",
    country: "United States",
    ranking: 2,
    tuitionUSD: 57986,
    tuitionLocal: 57986,
    currency: "USD",
    programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
    deadline: "2025-01-01",
    scholarships: true,
    qualityScore: 9.9,
    acceptanceRate: 6.7,
    saved: false,
  },
  {
    id: 4,
    name: "University of Toronto",
    country: "Canada",
    ranking: 25,
    tuitionUSD: 35000,
    tuitionLocal: 45000,
    currency: "CAD",
    programs: ["Computer Science", "Medicine", "Business", "Engineering"],
    deadline: "2025-02-01",
    scholarships: true,
    qualityScore: 8.9,
    acceptanceRate: 43.0,
    saved: true,
  },
  {
    id: 5,
    name: "ETH Zurich",
    country: "Switzerland",
    ranking: 8,
    tuitionUSD: 1500,
    tuitionLocal: 1400,
    currency: "CHF",
    programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
    deadline: "2025-03-31",
    scholarships: false,
    qualityScore: 9.5,
    acceptanceRate: 27.0,
    saved: false,
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [universities, setUniversities] = useState(mockUniversities)
  const [filteredUniversities, setFilteredUniversities] = useState(mockUniversities)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [maxFee, setMaxFee] = useState("")
  const [showSavedOnly, setShowSavedOnly] = useState(false)
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

  useEffect(() => {
    // Apply filters
    let filtered = universities

    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCountry !== "all") {
      filtered = filtered.filter((uni) => uni.country === selectedCountry)
    }

    if (selectedProgram !== "all") {
      filtered = filtered.filter((uni) => uni.programs.includes(selectedProgram))
    }

    if (maxFee) {
      filtered = filtered.filter((uni) => uni.tuitionUSD <= Number.parseInt(maxFee))
    }

    if (showSavedOnly) {
      filtered = filtered.filter((uni) => uni.saved)
    }

    setFilteredUniversities(filtered)
  }, [searchTerm, selectedCountry, selectedProgram, maxFee, showSavedOnly, universities])

  const handleSaveUniversity = (id: number) => {
    setUniversities((prev) => prev.map((uni) => (uni.id === id ? { ...uni, saved: !uni.saved } : uni)))
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 2) return { status: "urgent", color: "bg-red-500", text: `${diffDays} days left` }
    if (diffDays <= 5) return { status: "warning", color: "bg-orange-500", text: `${diffDays} days left` }
    if (diffDays <= 15) return { status: "soon", color: "bg-yellow-500", text: `${diffDays} days left` }
    return { status: "normal", color: "bg-green-500", text: `${diffDays} days left` }
  }

  const countries = [...new Set(universities.map((uni) => uni.country))]
  const programs = [...new Set(universities.flatMap((uni) => uni.programs))]
  const savedUniversities = universities.filter((uni) => uni.saved)

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
              <Link href="/notifications">
                <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
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
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Your University Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Discover, filter, and track your perfect university matches with AI-powered insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Universities</p>
                  <p className="text-2xl font-bold text-white">{filteredUniversities.length}</p>
                </div>
                <Globe className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Saved Universities</p>
                  <p className="text-2xl font-bold text-white">{savedUniversities.length}</p>
                </div>
                <Heart className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Urgent Deadlines</p>
                  <p className="text-2xl font-bold text-white">
                    {
                      universities.filter((uni) => {
                        const deadline = getDeadlineStatus(uni.deadline)
                        return deadline.status === "urgent" || deadline.status === "warning"
                      }).length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Countries</p>
                  <p className="text-2xl font-bold text-white">{countries.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="universities" className="space-y-6">
          <TabsList className="bg-black/40 border border-purple-500/30">
            <TabsTrigger value="universities" className="data-[state=active]:bg-purple-500">
              Universities
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-purple-500">
              Saved ({savedUniversities.length})
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="data-[state=active]:bg-purple-500">
              Deadlines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="universities" className="space-y-6">
            {/* Filters */}
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Universities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search universities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Program</label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                      <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        {programs.map((program) => (
                          <SelectItem key={program} value={program}>
                            {program}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Fee (USD)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 50000"
                      value={maxFee}
                      onChange={(e) => setMaxFee(e.target.value)}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Universities Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredUniversities.map((university) => {
                const deadlineInfo = getDeadlineStatus(university.deadline)
                return (
                  <Card
                    key={university.id}
                    className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-xl">{university.name}</CardTitle>
                          <CardDescription className="text-gray-400 flex items-center mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {university.country}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            #{university.ranking}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveUniversity(university.id)}
                            className={
                              university.saved ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-red-400"
                            }
                          >
                            <Heart className={`w-4 h-4 ${university.saved ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>${university.tuitionUSD.toLocaleString()}/year</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            <span>{university.qualityScore}/10</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{university.acceptanceRate}% acceptance</span>
                          </div>
                          <Badge className={`${deadlineInfo.color} text-white`}>{deadlineInfo.text}</Badge>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm mb-2">Programs:</p>
                          <div className="flex flex-wrap gap-1">
                            {university.programs.slice(0, 3).map((program) => (
                              <Badge
                                key={program}
                                variant="outline"
                                className="border-purple-500/30 text-purple-300 text-xs"
                              >
                                {program}
                              </Badge>
                            ))}
                            {university.programs.length > 3 && (
                              <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                                +{university.programs.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {university.scholarships && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            Scholarships Available
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {savedUniversities.map((university) => {
                const deadlineInfo = getDeadlineStatus(university.deadline)
                return (
                  <Card key={university.id} className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-xl">{university.name}</CardTitle>
                          <CardDescription className="text-gray-400 flex items-center mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {university.country}
                          </CardDescription>
                        </div>
                        <Badge className={`${deadlineInfo.color} text-white`}>{deadlineInfo.text}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-gray-300">
                          <span>Tuition:</span>
                          <span>${university.tuitionUSD.toLocaleString()}/year</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-300">
                          <span>World Ranking:</span>
                          <span>#{university.ranking}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-300">
                          <span>Quality Score:</span>
                          <span>{university.qualityScore}/10</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-300">
                          <span>Deadline:</span>
                          <span>{new Date(university.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="deadlines" className="space-y-6">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
                <CardDescription className="text-gray-400">Stay on top of your application deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {universities
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .map((university) => {
                      const deadlineInfo = getDeadlineStatus(university.deadline)
                      return (
                        <div
                          key={university.id}
                          className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${deadlineInfo.color}`}></div>
                            <div>
                              <p className="text-white font-medium">{university.name}</p>
                              <p className="text-gray-400 text-sm">{university.country}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white">{new Date(university.deadline).toLocaleDateString()}</p>
                            <p
                              className={`text-sm ${
                                deadlineInfo.status === "urgent"
                                  ? "text-red-400"
                                  : deadlineInfo.status === "warning"
                                    ? "text-orange-400"
                                    : deadlineInfo.status === "soon"
                                      ? "text-yellow-400"
                                      : "text-green-400"
                              }`}
                            >
                              {deadlineInfo.text}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
