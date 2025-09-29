import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Header({ setSidebarOpen }: { setSidebarOpen: (v: boolean) => void }) {
  return (
    <header className="flex items-center justify-between bg-white border-b p-4 md:p-6">
      {/* Mobile Hamburger */}
      <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>


      {/* Page title */}
      <h1 className="text-xl font-semibold">Student Management</h1>

      {/* Right-side placeholder */}
      <div className="space-x-2">{/* Add buttons here if needed */}</div>
    </header>
  )
}
