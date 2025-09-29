import Image from 'next/image'

export type Student = {
  id: string
  admissionNumber: string
  firstName: string
  lastName: string
  otherNames?: string
  gender: string
  dob: string
  photo?: string
  classAdmitted: string
}

export default function StudentCard({ student }: { student: Student }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <div className="w-24 h-24 relative mb-4">
        {student.photo ? (
          <Image
            src={student.photo}
            alt={`${student.firstName} ${student.lastName}`}
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-center">
        {student.firstName}{' '}
        {student.otherNames ? student.otherNames + ' ' : ''}
        {student.lastName}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Admission #: {student.admissionNumber}
      </p>
      <p className="text-sm text-gray-600 mt-1">Gender: {student.gender}</p>
      <p className="text-sm text-gray-600 mt-1">
        Class: {student.classAdmitted}
      </p>
    </div>
  )
}
