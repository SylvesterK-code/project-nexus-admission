// import { ReactNode, useState } from 'react'
// import LeftNav from './LeftNav'

// export default function Layout({ children }: { children: ReactNode }) {
//   const [open, setOpen] = useState(false)
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <LeftNav open={open} setOpen={setOpen} />
//       <div className="flex-1">
//         <header className="p-4 border-b bg-white flex items-center">
//           <button
//             className="p-2 rounded-md md:hidden"
//             onClick={() => setOpen(v => !v)}
//             aria-label="Toggle menu"
//           >
//             {/* hamburger */}
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
//           </button>
//           <h1 className="ml-3 text-lg font-semibold">Project Nexus — Admission Portal</h1>
//         </header>

//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }




import { useState } from 'react'
import Header from './Header'
import LeftNav from './LeftNav'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <LeftNav open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
