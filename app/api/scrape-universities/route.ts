import { NextResponse } from "next/server"
import { WebScraperService } from "@/lib/web-scraper"
import { GoogleSheetsService } from "@/lib/google-sheets"
import { DatabaseService } from "@/lib/database"
import { EmailService } from "@/lib/email-service"

export async function POST() {
  try {
    const scraper = new WebScraperService()
    const sheetsService = new GoogleSheetsService()
    const dbService = new DatabaseService()
    const emailService = new EmailService()

    // Scrape university data
    console.log("Starting university data scraping...")
    const scrapedData = await scraper.scrapeAllUniversities()

    // Update Google Sheets
    console.log("Updating Google Sheets...")
    for (const university of scrapedData) {
      try {
        await sheetsService.addUniversityData(university)
      } catch (error) {
        console.error(`Error adding ${university.name} to sheets:`, error)
      }
    }

    // Check for new admissions and send notifications
    console.log("Checking for new admissions...")
    const newAdmissions = scrapedData.filter((uni) => uni.admissionStatus === "open")

    if (newAdmissions.length > 0) {
      // In a real implementation, you would get all users from the database
      // and send notifications based on their preferences
      console.log(`Found ${newAdmissions.length} new admissions`)

      // Mock sending notifications
      for (const admission of newAdmissions) {
        console.log(`New admission opened: ${admission.name}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully scraped and updated ${scrapedData.length} universities`,
      data: {
        totalUniversities: scrapedData.length,
        newAdmissions: newAdmissions.length,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error in scraping process:", error)
    return NextResponse.json({ success: false, error: "Failed to scrape university data" }, { status: 500 })
  }
}
