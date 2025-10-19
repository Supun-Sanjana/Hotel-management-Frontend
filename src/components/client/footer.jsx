import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-20">
      <div className="container mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">LuxeSphere</h2>
          <p className="text-gray-400">
            Experience luxury and comfort with our carefully curated rooms and top-notch facilities.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-orange-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-400"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-orange-400">Home</a></li>
            <li><a href="#" className="hover:text-orange-400">Rooms</a></li>
            <li><a href="#" className="hover:text-orange-400">Facilities</a></li>
            <li><a href="#" className="hover:text-orange-400">About Us</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="flex items-center text-gray-400 mb-2">
            <Phone size={18} className="mr-2" /> +94 123 456 789
          </p>
          <p className="flex items-center text-gray-400 mb-2">
            <Mail size={18} className="mr-2" /> info@luxesphere.com
          </p>
          <p className="text-gray-400">
            123 Ocean Drive, Colombo, Sri Lanka
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LuxeSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
