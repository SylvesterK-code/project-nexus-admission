// pages/admission/addStudents.tsx

import Layout from '../../components/Layout'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { addStudent, clearInProgress } from '../../store/studentsSlice'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import Image from 'next/image'

interface StudentFormData {
  admissionNumber: string
  classAdmitted: string
  firstName: string
  lastName: string
  otherNames?: string
  gender: string
  dob: string
  religion?: string
  admissionDate: string
  studentPhoto?: FileList
}

interface ParentsFormData {
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

export default function AdmissionPage() {
  const { register, handleSubmit } = useForm<StudentFormData & ParentsFormData>()
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const onSubmit = async (data: StudentFormData & ParentsFormData) => {
    const payload = {
      id: Date.now().toString(),
      admissionNumber: data.admissionNumber,
      classAdmitted: data.classAdmitted,
      firstName: data.firstName,
      lastName: data.lastName,
      otherNames: data.otherNames || '',
      gender: data.gender,
      dob: data.dob,
      religion: data.religion || '',
      admissionDate: data.admissionDate,
      photo: null,
      parents: {
        fatherName: data.fatherName || '',
        fatherPhone: data.fatherPhone || '',
        fatherOccupation: data.fatherOccupation || '',
        motherName: data.motherName || '',
        motherPhone: data.motherPhone || '',
        motherOccupation: data.motherOccupation || '',
        guardianName: data.guardianName,
        guardianRelation: data.guardianRelation,
        guardianPhone: data.guardianPhone,
        guardianOccupation: data.guardianOccupation || '',
        guardianEmail: data.guardianEmail || '',
      },
    }

    try {
      const res = await axios.post('/api/students', payload)
      dispatch(addStudent(res.data))
      dispatch(clearInProgress())
      router.push('/students')
    } catch (err) {
      alert('Error saving — check console')
      console.error(err)
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    } else {
      setPhotoPreview(null)
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="border p-6 rounded shadow space-y-4 relative">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Student Information</h2>

          {/* Photo Preview */}
          <div className="absolute top-6 right-6 border rounded-md p-2 bg-gray-50">
            <Image
              src={photoPreview || '/avatar.png'}
              alt="Student Photo"
              width={100}
              height={100}
              className="object-cover rounded"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register('admissionNumber', { required: true })} placeholder="Admission Number *" className="input" />

              <select {...register('classAdmitted', { required: true })} className="input">
                <option value="">Select Class</option>
                <option value="Nursery 1">Nursery 1</option>
                <option value="Nursery 2">Nursery 2</option>
                <option value="KG 1">KG 1</option>
                <option value="KG 2">KG 2</option>
                <option value="Basic 1">Basic 1</option>
                <option value="Basic 2">Basic 2</option>
                <option value="Basic 3">Basic 3</option>
                <option value="Basic 1">Basic 4</option>
                <option value="Basic 2">Basic 5</option>
                <option value="Basic 3">Basic 3</option>
                <option value="Basic 6">Basic 6</option>

              </select>

              <input {...register('firstName', { required: true })} placeholder="First Name *" className="input" />
              <input {...register('lastName', { required: true })} placeholder="Last Name *" className="input" />
              <input {...register('otherNames')} placeholder="Other Name(s)" className="input" />

              <select {...register('gender', { required: true })} className="input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <input {...register('dob', { required: true })} type="date" id="dob" className="input mt-1" />
              </div>

              <input {...register('religion')} placeholder="Religion" className="input" />

              {/* Admission Date */}
              <div>
                <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">
                  Admission Date *
                </label>
                <input {...register('admissionDate', { required: true })} type="date" id="admissionDate" className="input mt-1" />
              </div>

              {/* Student Photo */}
              <div>
                <label htmlFor="studentPhoto" className="block text-sm font-medium text-gray-700">
                  Upload Student Photo
                </label>
                <input
                  {...register('studentPhoto')}
                  type="file"
                  id="studentPhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Parents Form */}
            <section className="border p-6 rounded shadow space-y-4">
              <h2 className="text-xl font-semibold mb-2 border-b pb-2">Parents / Guardian Information</h2>

              {/* Father */}
              <h3 className="font-medium">Father</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input {...register('fatherName')} placeholder="Father Name" className="input" />
                <input {...register('fatherPhone')} placeholder="Father Phone" className="input" />
                <input {...register('fatherOccupation')} placeholder="Father Occupation" className="input" />
              </div>

              {/* Mother */}
              <h3 className="font-medium">Mother</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input {...register('motherName')} placeholder="Mother Name" className="input" />
                <input {...register('motherPhone')} placeholder="Mother Phone" className="input" />
                <input {...register('motherOccupation')} placeholder="Mother Occupation" className="input" />
              </div>

              {/* Guardian */}
              <h3 className="font-medium">Guardian</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input {...register('guardianName', { required: true })} placeholder="Guardian Name *" className="input" />
                <input {...register('guardianRelation', { required: true })} placeholder="Guardian Relation *" className="input" />
                <input {...register('guardianPhone', { required: true })} placeholder="Guardian Phone *" className="input" />
                <input {...register('guardianOccupation')} placeholder="Guardian Occupation" className="input" />
                <input {...register('guardianEmail')} placeholder="Guardian Email" className="input" />
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-between">
              <button type="button" onClick={() => router.push('/students')} className="px-4 py-2 border rounded">
                Back
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                Submit Admission
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}
