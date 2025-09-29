// import { useState } from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState, AppDispatch } from '../../store/store'
// import { setStudents } from '../../store/studentsSlice'
// import Layout from '../../components/Layout'
// import { useRouter } from 'next/router'

// export default function AddStudentPage() {
//   const [form, setForm] = useState({
//     admissionNumber: '',
//     firstName: '',
//     lastName: '',
//     otherNames: '',
//     classAdmitted: '',
//     gender: '',
//     guardianName: ''
//   })

//   const students = useSelector((state: RootState) => state.students.list)
//   const dispatch = useDispatch<AppDispatch>()
//   const router = useRouter()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const res = await axios.post('/api/students', form)

//       // Update Redux immediately
//       dispatch(setStudents([...students, res.data]))

//       // Redirect back to student detail
//       router.push('/students/studentDetail')
//     } catch (err) {
//       console.error('Error adding student:', err)
//     }
//   }

//   return (
//     <Layout>
//       <div className="max-w-xl mx-auto p-6">
//         <h1 className="text-xl font-bold mb-4">Add New Student</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="admissionNumber"
//             placeholder="Admission No."
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="otherNames"
//             placeholder="Other Names"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="classAdmitted"
//             placeholder="Class Admitted"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="gender"
//             placeholder="Gender"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="guardianName"
//             placeholder="Guardian Name"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Save Student
//           </button>
//         </form>
//       </div>
//     </Layout>
//   )
// }



















import { useEffect } from 'react'
import Layout from '../../components/Layout'
import StudentCard from '../../components/StudentCard'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { setStudents } from '../../store/studentsSlice'
import axios from 'axios'

export default function StudentDetailPage() {
  const students = useSelector((state: RootState) => state.students.list)
  const dispatch = useDispatch<AppDispatch>()

  // Load students from API if Redux is empty
  useEffect(() => {
    if (students.length === 0) {
      axios
        .get('/api/students')
        .then((res) => {
          dispatch(setStudents(res.data))
        })
        .catch((err) => {
          console.error('Error fetching students:', err)
        })
    }
  }, [students.length, dispatch])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

        {students.length === 0 ? (
          <p className="text-gray-600">
            No students admitted yet. Click{' '}
            <a href="/admission" className="text-blue-600 underline">
              here
            </a>{' '}
            to add one.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
