import { BookmarkCheck, ChartBarStacked, House, Images, MessageSquareMore, User, LogOut } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { icon: BookmarkCheck, label: 'Bookings', path: '/admin/bookings' },
    { icon: House, label: 'Rooms', path: '/admin/rooms' },
    { icon: ChartBarStacked, label: 'Categories', path: '/admin/categories' },
    { icon: User, label: 'Users', path: '/admin/users' },
    { icon: MessageSquareMore, label: 'Feedback', path: '/admin/feedback' },
    { icon: Images, label: 'Gallery', path: '/admin/gallery' },
  ];

  return (
    <div className='w-full h-screen overflow-hidden flex font-sans bg-slate-50'>
      {/* Sidebar */}
      <aside className='w-72 bg-primary flex flex-col shadow-2xl z-20'>
        <div className='p-8'>
          <h2 className='text-2xl font-display font-bold text-white tracking-tight'>
            Luxe<span className='text-secondary'>Sphere</span>
          </h2>
          <p className='text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mt-2'>Admin Portal</p>
        </div>

        <nav className='flex-1 px-4 space-y-2'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                  ? 'bg-secondary text-primary font-bold shadow-lg shadow-black/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={22} className='transition-transform group-hover:scale-110' />
              <span className='font-medium'>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className='p-6 border-t border-white/5'>
          <button
            onClick={handleLogout}
            className='flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all duration-300'
          >
            <LogOut size={20} />
            <span className='font-bold uppercase tracking-widest text-[10px]'>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col h-screen overflow-hidden'>
        {/* Top Header */}
        <header className='h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shadow-sm z-10'>
          <h2 className='text-primary font-display font-bold text-xl'>Dashboard Overview</h2>
          <div className='flex items-center gap-4'>
            <div className='text-right hidden sm:block'>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Active Session</p>
              <p className='text-sm font-bold text-primary'>Administrator</p>
            </div>
            <div className='w-10 h-10 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center text-primary'>
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className='flex-1 overflow-y-auto p-8 scrollbar-hide'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin
