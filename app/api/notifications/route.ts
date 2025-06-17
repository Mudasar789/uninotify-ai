import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const dbService = new DatabaseService()
    const notifications = await dbService.getUserNotifications(userId)

    return NextResponse.json({
      success: true,
      notifications,
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, universityName, priority = "medium" } = body

    if (!userId || !type || !title || !message || !universityName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const dbService = new DatabaseService()
    const notification = await dbService.createNotification({
      userId,
      type,
      title,
      message,
      universityName,
      read: false,
      priority,
    })

    return NextResponse.json({
      success: true,
      notification,
    })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
