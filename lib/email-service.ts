import type { Notification } from "./database"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export class EmailService {
  async sendDeadlineReminder(
    userEmail: string,
    universityName: string,
    deadline: string,
    daysLeft: number,
  ): Promise<boolean> {
    try {
      const template = this.getDeadlineReminderTemplate(universityName, deadline, daysLeft)

      // In a real implementation, this would use a service like SendGrid, Mailgun, or AWS SES
      console.log(`Sending deadline reminder email to ${userEmail}`)
      console.log(`Subject: ${template.subject}`)
      console.log(`Content: ${template.text}`)

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Error sending deadline reminder email:", error)
      return false
    }
  }

  async sendNewAdmissionNotification(userEmail: string, universityName: string, programs: string[]): Promise<boolean> {
    try {
      const template = this.getNewAdmissionTemplate(universityName, programs)

      console.log(`Sending new admission notification to ${userEmail}`)
      console.log(`Subject: ${template.subject}`)
      console.log(`Content: ${template.text}`)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Error sending new admission notification:", error)
      return false
    }
  }

  async sendScholarshipAlert(userEmail: string, universityName: string, scholarshipDetails: string): Promise<boolean> {
    try {
      const template = this.getScholarshipTemplate(universityName, scholarshipDetails)

      console.log(`Sending scholarship alert to ${userEmail}`)
      console.log(`Subject: ${template.subject}`)
      console.log(`Content: ${template.text}`)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Error sending scholarship alert:", error)
      return false
    }
  }

  async sendBulkNotifications(
    notifications: Array<{
      userEmail: string
      notification: Notification
    }>,
  ): Promise<{ sent: number; failed: number }> {
    let sent = 0
    let failed = 0

    for (const { userEmail, notification } of notifications) {
      try {
        let success = false

        switch (notification.type) {
          case "deadline":
            success = await this.sendDeadlineReminder(
              userEmail,
              notification.universityName,
              "2025-01-01", // This would come from the notification data
              5, // This would be calculated
            )
            break
          case "new_admission":
            success = await this.sendNewAdmissionNotification(
              userEmail,
              notification.universityName,
              ["Computer Science", "Engineering"], // This would come from the notification data
            )
            break
          case "scholarship":
            success = await this.sendScholarshipAlert(
              userEmail,
              notification.universityName,
              "Merit-based scholarship available",
            )
            break
          default:
            success = await this.sendGenericNotification(userEmail, notification)
        }

        if (success) {
          sent++
        } else {
          failed++
        }
      } catch (error) {
        console.error(`Error sending notification to ${userEmail}:`, error)
        failed++
      }
    }

    return { sent, failed }
  }

  private async sendGenericNotification(userEmail: string, notification: Notification): Promise<boolean> {
    try {
      console.log(`Sending generic notification to ${userEmail}`)
      console.log(`Subject: ${notification.title}`)
      console.log(`Content: ${notification.message}`)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Error sending generic notification:", error)
      return false
    }
  }

  private getDeadlineReminderTemplate(universityName: string, deadline: string, daysLeft: number): EmailTemplate {
    const urgencyText = daysLeft <= 2 ? "URGENT: " : daysLeft <= 5 ? "Important: " : ""

    return {
      subject: `${urgencyText}${universityName} Application Deadline in ${daysLeft} Days`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">UniNotify AI</h1>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #333;">Application Deadline Reminder</h2>
            <p>Dear Student,</p>
            <p>This is a reminder that the application deadline for <strong>${universityName}</strong> is approaching.</p>
            <div style="background: ${daysLeft <= 2 ? "#fee" : daysLeft <= 5 ? "#fef5e7" : "#e8f5e8"}; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: ${daysLeft <= 2 ? "#d63384" : daysLeft <= 5 ? "#fd7e14" : "#198754"};">
                Deadline: ${deadline} (${daysLeft} days remaining)
              </p>
            </div>
            <p>Don't miss this opportunity! Make sure to submit your application before the deadline.</p>
            <p>Best regards,<br>The UniNotify AI Team</p>
          </div>
        </div>
      `,
      text: `
        UniNotify AI - Application Deadline Reminder
        
        Dear Student,
        
        This is a reminder that the application deadline for ${universityName} is approaching.
        
        Deadline: ${deadline} (${daysLeft} days remaining)
        
        Don't miss this opportunity! Make sure to submit your application before the deadline.
        
        Best regards,
        The UniNotify AI Team
      `,
    }
  }

  private getNewAdmissionTemplate(universityName: string, programs: string[]): EmailTemplate {
    return {
      subject: `New Admission Opening: ${universityName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">UniNotify AI</h1>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #333;">New Admission Opening</h2>
            <p>Great news! <strong>${universityName}</strong> has opened applications for new programs.</p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #198754;">Available Programs:</h3>
              <ul>
                ${programs.map((program) => `<li>${program}</li>`).join("")}
              </ul>
            </div>
            <p>This is a great opportunity to apply to one of the world's leading universities.</p>
            <p>Visit your UniNotify AI dashboard to learn more and start your application.</p>
            <p>Best regards,<br>The UniNotify AI Team</p>
          </div>
        </div>
      `,
      text: `
        UniNotify AI - New Admission Opening
        
        Great news! ${universityName} has opened applications for new programs.
        
        Available Programs:
        ${programs.map((program) => `- ${program}`).join("\n")}
        
        This is a great opportunity to apply to one of the world's leading universities.
        
        Visit your UniNotify AI dashboard to learn more and start your application.
        
        Best regards,
        The UniNotify AI Team
      `,
    }
  }

  private getScholarshipTemplate(universityName: string, scholarshipDetails: string): EmailTemplate {
    return {
      subject: `Scholarship Opportunity at ${universityName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">UniNotify AI</h1>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #333;">Scholarship Opportunity</h2>
            <p>Exciting news! <strong>${universityName}</strong> is offering new scholarship opportunities.</p>
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #856404;">Scholarship Details:</h3>
              <p style="margin-bottom: 0;">${scholarshipDetails}</p>
            </div>
            <p>Don't miss this chance to reduce your education costs and invest in your future.</p>
            <p>Check your UniNotify AI dashboard for application requirements and deadlines.</p>
            <p>Best regards,<br>The UniNotify AI Team</p>
          </div>
        </div>
      `,
      text: `
        UniNotify AI - Scholarship Opportunity
        
        Exciting news! ${universityName} is offering new scholarship opportunities.
        
        Scholarship Details: ${scholarshipDetails}
        
        Don't miss this chance to reduce your education costs and invest in your future.
        
        Check your UniNotify AI dashboard for application requirements and deadlines.
        
        Best regards,
        The UniNotify AI Team
      `,
    }
  }
}
