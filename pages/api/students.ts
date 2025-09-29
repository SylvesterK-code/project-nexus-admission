
// // pages/api/students.ts
// import { NextApiRequest, NextApiResponse } from 'next'
// import fs from 'fs'
// import path from 'path'

// const filePath = path.join(process.cwd(), 'data', 'students.json')

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const data = fs.readFileSync(filePath, 'utf-8')
//     const students = JSON.parse(data)
//     res.status(200).json(students)
//   } else if (req.method === 'POST') {
//     const newStudent = req.body
//     const data = fs.readFileSync(filePath, 'utf-8')
//     const students = JSON.parse(data)

//     students.push(newStudent)
//     fs.writeFileSync(filePath, JSON.stringify(students, null, 2))

//     res.status(201).json(newStudent)
//   } else {
//     res.status(405).json({ message: 'Method not allowed' })
//   }
// }










import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'students.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fileData = fs.readFileSync(filePath, 'utf-8')
      const students = JSON.parse(fileData)
      res.status(200).json(students)
    } catch (error) {
      res.status(500).json({ message: 'Error reading student data', error })
    }
  }

  if (req.method === 'POST') {
    try {
      const fileData = fs.readFileSync(filePath, 'utf-8')
      const students = JSON.parse(fileData)

      const body = req.body

      const newStudent = {
        id: Date.now().toString(),
        admissionNumber: body.admissionNumber || `ADM-${(students.length + 1).toString().padStart(3, '0')}`,
        classAdmitted: body.classAdmitted || '',
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        otherNames: body.otherNames || '',
        gender: body.gender || '',
        dob: body.dob || '',
        religion: body.religion || '',
        admissionDate: body.admissionDate || '',
        photo: body.photo || null,
        parents: {
          fatherName: body.parents?.fatherName || '',
          fatherPhone: body.parents?.fatherPhone || '',
          fatherOccupation: body.parents?.fatherOccupation || '',
          motherName: body.parents?.motherName || '',
          motherPhone: body.parents?.motherPhone || '',
          motherOccupation: body.parents?.motherOccupation || '',
          guardianName: body.parents?.guardianName || '',
          guardianRelation: body.parents?.guardianRelation || '',
          guardianPhone: body.parents?.guardianPhone || '',
          guardianOccupation: body.parents?.guardianOccupation || '',
          guardianEmail: body.parents?.guardianEmail || '',
        },
      }

      students.push(newStudent)
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2))

      res.status(201).json(newStudent)
    } catch (error) {
      res.status(500).json({ message: 'Error saving student', error })
    }
  }
}
