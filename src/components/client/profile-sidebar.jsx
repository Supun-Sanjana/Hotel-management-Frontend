import {
  User,
  Settings,
  LogOut,
  CalendarCheck2,
  CreditCard,
  Heart,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import CustomNav from "./custom-nav";

const ProfileSidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Account",
      links: [{ label: "Profile", icon: <User size={16} />, path: "/profile/view" }],
    },
    {
      title: "Bookings",
      links: [
       
        {
          label: "History",
          icon: <CalendarCheck2 size={16} />,
          path: "/profile/bookings/history",
        },
      ],
    },
    {
      title: "Payments",
      links: [
        {
          label: "Payment History",
          icon: <CreditCard size={16} />,
          path: "/profile/payments",
        },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", icon: <HelpCircle size={16} />, path: "/profile/help" },
        {
          label: "Feedback",
          icon: <MessageSquare size={16} />,
          path: "/profile/feedback",
        },
      ],
    },
  ];

  const image = JSON.parse(localStorage.getItem("user")).image;

  return (
    <>
      <CustomNav />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 flex flex-col justify-between p-4 border-r border-gray-300 bg-gray-100">
          {/* User Info */}
          <div>
            <div className="flex items-center gap-3 mb-6 mt-15">
              <img
                src={image }
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-600 object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm">{user?.userName}</h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-5">
              {menuItems.map((section, index) => (
                <div key={index}>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.links.map((link, i) => (
                      <li
                        key={i}
                        onClick={() => navigate(link.path)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300/70 transition-all text-sm"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-300 pt-4 flex flex-col gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-red-600/70 transition-all text-red-500 hover:text-red-100"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8 mt-15">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
