// import Layout from '../components/Layout'
// import { useSelector } from 'react-redux'
// import { RootState } from '../store/store'
// import Link from 'next/link'

// export default function Dashboard() {
//   const students = useSelector((state: RootState) => state.students.list)

//   return (
//     <Layout>
//       <div className="max-w-5xl mx-auto space-y-6">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Students Card */}
//           <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Total Students</h2>
//               <p className="text-3xl font-bold text-green-600">
//                 {students.length}
//               </p>
//             </div>
//             <Link
//               href="/students"
//               className="mt-4 inline-block text-sm text-blue-600 hover:underline"
//             >
//               View Students →
//             </Link>
//           </div>

//           {/* Classes Card */}
//           <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Classes</h2>
//               <p className="text-3xl font-bold text-blue-600">12</p>
//             </div>
//             <Link
//               href="/classes"
//               className="mt-4 inline-block text-sm text-blue-600 hover:underline"
//             >
//               View Classes →
//             </Link>
//           </div>

//           {/* Pending Admissions Card */}
//           <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Pending Admissions</h2>
//               <p className="text-3xl font-bold text-orange-600">3</p>
//             </div>
//             <Link
//               href="/admissions"
//               className="mt-4 inline-block text-sm text-blue-600 hover:underline"
//             >
//               Review Admissions →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }








// pages/dashboard.tsx

import Layout from '../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

interface DashboardProps {
  totalStudents: number
}

export default function Dashboard({ totalStudents }: DashboardProps) {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Students Card */}
          <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Total Students</h2>
              <p className="text-3xl font-bold text-green-600">
                {totalStudents}
              </p>
            </div>
            <Link
              href="/students"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              View Students →
            </Link>
          </div>

          {/* Classes Card */}
          <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Classes</h2>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <Link
              href="/classes"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              View Classes →
            </Link>
          </div>

          {/* Pending Admissions Card */}
          <div className="p-6 border rounded shadow bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Pending Admissions</h2>
              <p className="text-3xl font-bold text-orange-600">3</p>
            </div>
            <Link
              href="/admissions"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              Review Admissions →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'students.json')
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const students = JSON.parse(fileData)

  return {
    props: {
      totalStudents: students.length,
    },
  }
}
