import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import axios from 'axios'

interface ParentInfo {
  fatherName: string
  fatherPhone: string
  fatherOccupation: string
  motherName: string
  motherPhone: string
  motherOccupation: string
  guardianName: string
  guardianRelation: string
  guardianPhone: string
  guardianOccupation: string
  guardianEmail: string
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
  parents?: ParentInfo
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])

  // Load students from API
  useEffect(() => {
    axios
      .get('/api/students')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Error fetching students:', err))
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Students</h1>
          <Link
            href="/admission/addStudent"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add New Student
          </Link>
        </div>

        {/* Student Table */}
        {students.length === 0 ? (
          <p className="text-gray-600">No students admitted yet.</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg shadow text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Admission No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Date of Birth</th>
                <th className="px-4 py-2 border">Religion</th>
                <th className="px-4 py-2 border">Admission Date</th>
                <th className="px-4 py-2 border">Guardian</th>
                <th className="px-4 py-2 border">Guardian Contact</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <Link
                      href={`/students/${s.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {s.admissionNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      href={`/students/${s.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {s.firstName} {s.lastName} {s.otherNames || ''}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">{s.classAdmitted}</td>
                  <td className="px-4 py-2 border">{s.gender}</td>
                  <td className="px-4 py-2 border">
                    {new Date(s.dob).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{s.religion || ''}</td>
                  <td className="px-4 py-2 border">
                    {new Date(s.admissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{s.parents?.guardianName || ''}</td>
                  <td className="px-4 py-2 border">
                    {s.parents?.guardianPhone } <br />
                    <span className="text-xs text-gray-500">
                      {s.parents?.guardianEmail || ''}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
