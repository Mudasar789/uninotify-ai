import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, User, ArrowRight, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing University Admissions in 2025",
    excerpt:
      "Discover how artificial intelligence is transforming the way students find and apply to universities, making the process more efficient and personalized than ever before.",
    author: "Dr. Sarah Chen",
    date: "2024-12-28",
    readTime: "5 min read",
    category: "AI Technology",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Universities for Computer Science in 2025",
    excerpt:
      "A comprehensive guide to the world's leading computer science programs, including admission requirements, tuition fees, and career prospects.",
    author: "Prof. Michael Rodriguez",
    date: "2024-12-25",
    readTime: "8 min read",
    category: "University Rankings",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 3,
    title: "Scholarship Opportunities for International Students",
    excerpt:
      "Explore the best scholarship programs available for international students in 2025, including application tips and eligibility criteria.",
    author: "Emma Thompson",
    date: "2024-12-22",
    readTime: "6 min read",
    category: "Scholarships",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "The Future of Online Education: Trends to Watch",
    excerpt:
      "Examining the latest trends in online education and how they're shaping the future of higher learning worldwide.",
    author: "Dr. James Wilson",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Education Trends",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "Study Abroad Guide: Everything You Need to Know",
    excerpt:
      "A complete guide to studying abroad, covering visa requirements, cultural adaptation, and academic preparation.",
    author: "Lisa Park",
    date: "2024-12-18",
    readTime: "10 min read",
    category: "Study Abroad",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "How to Write a Winning University Application Essay",
    excerpt:
      "Expert tips and strategies for crafting compelling application essays that stand out to admissions committees.",
    author: "Prof. David Kim",
    date: "2024-12-15",
    readTime: "9 min read",
    category: "Application Tips",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
]

const categories = [
  "All",
  "AI Technology",
  "University Rankings",
  "Scholarships",
  "Education Trends",
  "Study Abroad",
  "Application Tips",
]

export default function BlogsPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

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
              <Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="/blogs" className="text-purple-400">
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
            <BookOpen className="w-4 h-4 mr-2" />
            UniNotify AI Blog
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Insights & Updates
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Stay informed with the latest trends in AI-powered education, university insights, and expert guidance for
            your academic journey.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Article</h2>
          </div>
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <Badge className="absolute top-4 left-4 bg-purple-500 text-white">Featured</Badge>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                    {featuredPost.category}
                  </Badge>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
          <p className="text-gray-400">Discover insights, tips, and trends in higher education</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 bg-black/60 text-white border-none">{post.category}</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-4 mb-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-purple-300 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 p-0">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl p-12 border border-purple-500/30">
          <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-gray-300 text-lg mb-8">
            Subscribe to our newsletter for the latest insights on AI-powered education and university trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8">
              Subscribe
            </Button>
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
