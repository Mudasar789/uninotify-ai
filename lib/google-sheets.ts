import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n")
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID!

const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

export interface UniversityData {
  name: string
  country: string
  ranking: number
  tuitionUSD: number
  tuitionLocal: number
  currency: string
  programs: string[]
  deadline: string
  scholarships: boolean
  qualityScore: number
  acceptanceRate: number
  admissionStatus: string
  lastUpdated: string
}

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet

  constructor() {
    this.doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth)
  }

  async initialize() {
    await this.doc.loadInfo()
  }

  async getUniversityData(): Promise<UniversityData[]> {
    await this.initialize()
    const sheet = this.doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    return rows.map((row) => ({
      name: row.get("name") || "",
      country: row.get("country") || "",
      ranking: Number.parseInt(row.get("ranking")) || 0,
      tuitionUSD: Number.parseInt(row.get("tuitionUSD")) || 0,
      tuitionLocal: Number.parseInt(row.get("tuitionLocal")) || 0,
      currency: row.get("currency") || "USD",
      programs: row.get("programs") ? row.get("programs").split(",") : [],
      deadline: row.get("deadline") || "",
      scholarships: row.get("scholarships") === "true",
      qualityScore: Number.parseFloat(row.get("qualityScore")) || 0,
      acceptanceRate: Number.parseFloat(row.get("acceptanceRate")) || 0,
      admissionStatus: row.get("admissionStatus") || "closed",
      lastUpdated: row.get("lastUpdated") || new Date().toISOString(),
    }))
  }

  async addUniversityData(data: UniversityData) {
    await this.initialize()
    const sheet = this.doc.sheetsByIndex[0]

    await sheet.addRow({
      name: data.name,
      country: data.country,
      ranking: data.ranking,
      tuitionUSD: data.tuitionUSD,
      tuitionLocal: data.tuitionLocal,
      currency: data.currency,
      programs: data.programs.join(","),
      deadline: data.deadline,
      scholarships: data.scholarships.toString(),
      qualityScore: data.qualityScore,
      acceptanceRate: data.acceptanceRate,
      admissionStatus: data.admissionStatus,
      lastUpdated: new Date().toISOString(),
    })
  }

  async updateUniversityData(name: string, updates: Partial<UniversityData>) {
    await this.initialize()
    const sheet = this.doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    const row = rows.find((r) => r.get("name") === name)
    if (row) {
      Object.keys(updates).forEach((key) => {
        if (key === "programs" && Array.isArray(updates[key])) {
          row.set(key, updates[key]!.join(","))
        } else if (key === "scholarships") {
          row.set(key, updates[key]!.toString())
        } else {
          row.set(key, updates[key as keyof UniversityData])
        }
      })
      row.set("lastUpdated", new Date().toISOString())
      await row.save()
    }
  }
}
