import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Globe, Bell, Filter, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                UniNotify AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="/blogs" className="text-gray-300 hover:text-purple-400 transition-colors">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                Contact
              </Link>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered University Discovery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Discover Your Perfect University with AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            UniNotify AI revolutionizes university search with intelligent automation, real-time notifications, and
            personalized recommendations powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-6"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-6"
              >
                Explore Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">AI-Powered Features</h2>
          <p className="text-gray-400 text-lg">Experience the future of university discovery</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Globe className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white">Global University Database</CardTitle>
              <CardDescription className="text-gray-400">
                Access comprehensive data on universities worldwide with AI-extracted information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Real-time admission updates</li>
                <li>• Program details & fees</li>
                <li>• World rankings & quality metrics</li>
                <li>• Scholarship opportunities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Bell className="h-12 w-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Smart Notifications</CardTitle>
              <CardDescription className="text-gray-400">
                Never miss important deadlines with AI-powered notification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Deadline reminders (15, 10, 5, 2 days)</li>
                <li>• New admission openings</li>
                <li>• Scholarship alerts</li>
                <li>• Personalized recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Filter className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle className="text-white">Advanced Filtering</CardTitle>
              <CardDescription className="text-gray-400">
                Find your perfect match with intelligent filtering and search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Multi-currency fee filtering</li>
                <li>• Program-based search</li>
                <li>• Country & ranking filters</li>
                <li>• AI-powered recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle className="text-white">Analytics Dashboard</CardTitle>
              <CardDescription className="text-gray-400">
                Track your applications and get insights with detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Application statistics</li>
                <li>• Deadline tracking</li>
                <li>• Success probability analysis</li>
                <li>• Personalized insights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-pink-400 mb-4" />
              <CardTitle className="text-white">AI Automation</CardTitle>
              <CardDescription className="text-gray-400">
                Powered by advanced AI for intelligent university matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Automated data extraction</li>
                <li>• Smart recommendations</li>
                <li>• Predictive analytics</li>
                <li>• Personalized matching</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Profile Management</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive profile system for tracking your academic journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Saved universities & programs</li>
                <li>• Application tracking</li>
                <li>• Document management</li>
                <li>• Progress monitoring</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl p-12 border border-purple-500/30">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your University Search?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of students who have found their perfect university with UniNotify AI
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-12 py-6"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 UniNotify AI. Powered by advanced AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
