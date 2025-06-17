import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { EmailService } from "@/lib/email-service"
import { GoogleSheetsService } from "@/lib/google-sheets"

export async function POST() {
  try {
    const dbService = new DatabaseService()
    const emailService = new EmailService()
    const sheetsService = new GoogleSheetsService()

    // Get university data from Google Sheets
    const universities = await sheetsService.getUniversityData()

    // Calculate deadline reminders (15, 10, 5, 2 days before)
    const today = new Date()
    const reminderDays = [15, 10, 5, 2]

    const upcomingDeadlines = universities.filter((uni) => {
      const deadline = new Date(uni.deadline)
      const diffTime = deadline.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return reminderDays.includes(diffDays)
    })

    console.log(`Found ${upcomingDeadlines.length} upcoming deadlines`)

    // In a real implementation, you would:
    // 1. Get all users who have saved these universities
    // 2. Check their notification preferences
    // 3. Send personalized emails

    // For demo purposes, we'll simulate the process
    let totalEmailsSent = 0

    for (const university of upcomingDeadlines) {
      const deadline = new Date(university.deadline)
      const diffTime = deadline.getTime() - today.getTime()
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // Simulate getting users who saved this university
      const mockUsers = [
        { email: "student1@example.com", id: "1" },
        { email: "student2@example.com", id: "2" },
      ]

      for (const user of mockUsers) {
        // Create notification in database
        await dbService.createNotification({
          userId: user.id,
          type: "deadline",
          title: `Application Deadline Approaching`,
          message: `${university.name} application deadline is in ${daysLeft} days`,
          universityName: university.name,
          read: false,
          priority: daysLeft <= 2 ? "high" : daysLeft <= 5 ? "medium" : "low",
        })

        // Send email notification
        const emailSent = await emailService.sendDeadlineReminder(
          user.email,
          university.name,
          university.deadline,
          daysLeft,
        )

        if (emailSent) {
          totalEmailsSent++
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${upcomingDeadlines.length} deadline reminders`,
      data: {
        upcomingDeadlines: upcomingDeadlines.length,
        emailsSent: totalEmailsSent,
        processedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error sending deadline reminders:", error)
    return NextResponse.json({ success: false, error: "Failed to send deadline reminders" }, { status: 500 })
  }
}
