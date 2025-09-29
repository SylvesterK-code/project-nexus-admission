import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'

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

export default function StudentProfilePage() {
  const router = useRouter()
  const { id } = router.query

  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/students/${id}`)
        .then((res) => setStudent(res.data))
        .catch((err) => console.error('Error fetching student:', err))
    }
  }, [id])

  if (!student) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold">Student Profile</h1>

        {/* Student Info */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Student Information</h2>
          <p><strong>Admission No:</strong> {student.admissionNumber}</p>
          <p><strong>Name:</strong> {student.firstName} {student.lastName} {student.otherNames || ''}</p>
          <p><strong>Class:</strong> {student.classAdmitted}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
          <p><strong>Religion:</strong> {student.religion || '-'}</p>
          <p><strong>Admission Date:</strong> {new Date(student.admissionDate).toLocaleDateString()}</p>
        </div>

        {/* Parents Info */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Parents</h2>
          <p><strong>Father:</strong> {student.parents.fatherName} ({student.parents.fatherOccupation}) - {student.parents.fatherPhone}</p>
          <p><strong>Mother:</strong> {student.parents.motherName} ({student.parents.motherOccupation}) - {student.parents.motherPhone}</p>
        </div>

        {/* Guardian Info */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Guardian</h2>
          <p><strong>Name:</strong> {student.parents.guardianName}</p>
          <p><strong>Relation:</strong> {student.parents.guardianRelation}</p>
          <p><strong>Phone:</strong> {student.parents.guardianPhone}</p>
          <p><strong>Occupation:</strong> {student.parents.guardianOccupation || '-'}</p>
          <p><strong>Email:</strong> {student.parents.guardianEmail || '-'}</p>
        </div>
      </div>
    </Layout>
  )
}
