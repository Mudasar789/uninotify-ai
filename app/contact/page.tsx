"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
              <Link href="/contact" className="text-purple-400">
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
            <MessageSquare className="w-4 h-4 mr-2" />
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Contact UniNotify AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Have questions about our AI-powered university discovery platform? We're here to help you on your
            educational journey.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for contacting us. We'll respond soon.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-gradient-to-r from-purple-500 to-cyan-500"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <Mail className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Email Support</CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch via email for detailed inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-400 font-medium">support@uninotify.ai</p>
                <p className="text-gray-300 text-sm mt-2">Response time: Within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <Phone className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">Phone Support</CardTitle>
                <CardDescription className="text-gray-400">Speak directly with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-cyan-400 font-medium">+1 (555) 123-4567</p>
                <p className="text-gray-300 text-sm mt-2">Available: Mon-Fri, 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Office Location</CardTitle>
                <CardDescription className="text-gray-400">Visit us at our headquarters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-green-400 font-medium">San Francisco, CA</p>
                <p className="text-gray-300 text-sm mt-2">123 Innovation Drive, Suite 100</p>
                <p className="text-gray-300 text-sm">San Francisco, CA 94105</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Quick answers to common questions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">How does the AI matching work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our AI analyzes your academic profile, preferences, and goals to match you with universities that best
                fit your criteria using advanced machine learning algorithms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Is UniNotify AI free to use?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                We offer a free tier with basic features. Premium plans provide advanced AI insights, unlimited
                notifications, and priority support.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">How accurate is the university data?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our AI continuously scrapes and updates data from official university sources, ensuring 99%+ accuracy
                with real-time updates.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Can I track multiple applications?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Yes! Our dashboard allows you to track unlimited applications, deadlines, and receive personalized
                notifications for each university.
              </p>
            </CardContent>
          </Card>
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
