import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: Date
  preferences?: UserPreferences
}

export interface UserPreferences {
  countries: string[]
  programs: string[]
  maxTuition: number
  currency: string
  notificationSettings: {
    deadlineReminders: boolean
    newAdmissions: boolean
    scholarships: boolean
    emailFrequency: "immediate" | "daily" | "weekly"
  }
}

export interface SavedUniversity {
  id: string
  userId: string
  universityName: string
  savedAt: Date
  notes?: string
}

export interface Notification {
  id: string
  userId: string
  type: "deadline" | "new_admission" | "scholarship" | "update"
  title: string
  message: string
  universityName: string
  read: boolean
  createdAt: Date
  priority: "low" | "medium" | "high"
}

export class DatabaseService {
  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, first_name, last_name, created_at)
      VALUES (${userData.email}, ${userData.firstName}, ${userData.lastName}, NOW())
      RETURNING id, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt"
    `
    return result[0] as User
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT id, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt"
      FROM users 
      WHERE email = ${email}
    `
    return (result[0] as User) || null
  }

  async saveUniversity(userId: string, universityName: string, notes?: string): Promise<SavedUniversity> {
    const result = await sql`
      INSERT INTO saved_universities (user_id, university_name, notes, saved_at)
      VALUES (${userId}, ${universityName}, ${notes || ""}, NOW())
      RETURNING id, user_id as "userId", university_name as "universityName", saved_at as "savedAt", notes
    `
    return result[0] as SavedUniversity
  }

  async getSavedUniversities(userId: string): Promise<SavedUniversity[]> {
    const result = await sql`
      SELECT id, user_id as "userId", university_name as "universityName", saved_at as "savedAt", notes
      FROM saved_universities 
      WHERE user_id = ${userId}
      ORDER BY saved_at DESC
    `
    return result as SavedUniversity[]
  }

  async createNotification(notificationData: Omit<Notification, "id" | "createdAt">): Promise<Notification> {
    const result = await sql`
      INSERT INTO notifications (user_id, type, title, message, university_name, read, priority, created_at)
      VALUES (${notificationData.userId}, ${notificationData.type}, ${notificationData.title}, 
              ${notificationData.message}, ${notificationData.universityName}, ${notificationData.read}, 
              ${notificationData.priority}, NOW())
      RETURNING id, user_id as "userId", type, title, message, university_name as "universityName", 
                read, priority, created_at as "createdAt"
    `
    return result[0] as Notification
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const result = await sql`
      SELECT id, user_id as "userId", type, title, message, university_name as "universityName", 
             read, priority, created_at as "createdAt"
      FROM notifications 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    return result as Notification[]
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await sql`
      UPDATE notifications 
      SET read = true 
      WHERE id = ${notificationId}
    `
  }

  async updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    await sql`
      UPDATE users 
      SET preferences = ${JSON.stringify(preferences)}
      WHERE id = ${userId}
    `
  }
}
