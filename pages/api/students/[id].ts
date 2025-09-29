import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface ParentInfo {
  fatherName?: string
  fatherPhone?: string
  fatherOccupation?: string
  motherName?: string
  motherPhone?: string
  motherOccupation?: string
  guardianName: string
  guardianRelation: string
  guardianPhone: string
  guardianOccupation?: string
  guardianEmail?: string
}

interface Student {
  id: string
  admissionNumber: string
  classAdmitted: string
  firstName: string
  lastName: string
  otherNames?: string
  gender: string
  dob: string
  religion?: string
  admissionDate: string
  photo?: string | null
  parents: ParentInfo
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const filePath = path.join(process.cwd(), 'data', 'students.json')
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const students: Student[] = JSON.parse(fileData)

  const student = students.find((s: Student) => s.id === id)

  if (!student) {
    return res.status(404).json({ message: 'Student not found' })
  }

  res.status(200).json(student)
}
