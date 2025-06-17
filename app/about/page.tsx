import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Target, Zap, Brain, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-purple-400">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Brain className="w-4 h-4 mr-2" />
            About UniNotify AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Revolutionizing University Discovery
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            UniNotify AI is the world's first AI-powered university discovery platform, designed to transform how
            students find and apply to their dream universities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We believe that every student deserves access to the best educational opportunities worldwide. Our mission
              is to democratize university discovery through advanced AI technology, making it easier, faster, and more
              intelligent than ever before.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              By leveraging cutting-edge artificial intelligence, we provide personalized recommendations, real-time
              updates, and comprehensive insights that empower students to make informed decisions about their academic
              future.
            </p>
          </div>
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                To become the global standard for university discovery, connecting millions of students with their
                perfect educational matches through the power of AI and automation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">What Makes Us Different</h2>
          <p className="text-gray-400 text-lg">Advanced AI technology meets educational excellence</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white">AI-Powered Intelligence</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced machine learning algorithms analyze thousands of data points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Our AI continuously learns and adapts, providing increasingly accurate recommendations based on your
                preferences, academic profile, and career goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Globe className="h-12 w-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Global Coverage</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive database of universities from around the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Access information on thousands of universities across 100+ countries, with real-time updates on
                admissions, programs, and requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle className="text-white">Real-Time Automation</CardTitle>
              <CardDescription className="text-gray-400">
                Automated data extraction and intelligent notification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Never miss important deadlines or new opportunities with our automated monitoring and notification
                system that works 24/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Built by Experts</h2>
          <p className="text-gray-400 text-lg">15+ years of experience in AI automation and web development</p>
        </div>

        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <Users className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <CardTitle className="text-white text-2xl">Expert Development Team</CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Combining deep expertise in AI, automation, and modern web technologies
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-white font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-gray-300 text-sm">Advanced algorithms for intelligent matching and predictions</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Web Development</h3>
                <p className="text-gray-300 text-sm">Modern, responsive, and user-friendly interfaces</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Automation Systems</h3>
                <p className="text-gray-300 text-sm">Seamless integration and automated workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl p-12 border border-purple-500/30">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Experience the Future?</h2>
          <p className="text-gray-300 text-lg mb-8">Join the revolution in university discovery with UniNotify AI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-6"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-6"
              >
                Contact Us
              </Button>
            </Link>
          </div>
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
