import Link from 'next/link'
import clsx from 'clsx'

export default function LeftNav({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/30 z-20 md:hidden transition-opacity',
          open ? 'block' : 'hidden'
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'z-30 bg-white w-64 border-r transition-transform duration-300',
          // Mobile: fixed + slide
          'fixed left-0 top-0 bottom-0 transform md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible
          'md:static md:translate-x-0'
        )}
      >
        <div className="p-6 border-b">
          <h2 className="font-bold text-lg">Admission</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/" className="block p-2 rounded hover:bg-gray-100">
            Dashboard
          </Link>

          <Link href="/admission/addStudent" className="block p-2 rounded hover:bg-gray-100">
            Admit Student
          </Link>

           <Link href="/students/studentDetail"  className="block p-2 rounded hover:bg-gray-100">
            Student Detail
          </Link>
          
          <Link href="/students" className="block p-2 rounded hover:bg-gray-100">
            Students
          </Link>



        </nav>
      </aside>
    </>
  )
}
