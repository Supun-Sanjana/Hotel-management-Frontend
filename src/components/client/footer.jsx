import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-primary text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center md:text-left">
        {/* Brand & About */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Luxe<span className="text-secondary">Sphere</span>
          </h2>
          <p className="text-white/60 font-light leading-relaxed text-sm md:text-base max-w-sm mx-auto md:mx-0">
            Experience the pinnacle of hospitality and refined elegance.
            LuxeSphere offers a sanctuary of luxury in the heart of metropolitan life.
          </p>
          <div className="flex justify-center md:justify-start space-x-5">
            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-secondary hover:text-primary transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:pl-10">
          <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-6 md:mb-8">Navigation</h3>
          <ul className="space-y-3 md:space-y-4 text-white/60 font-medium text-sm md:text-base">
            {["Home", "Rooms", "Facilities", "Gallery", "About Us"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-secondary transition-colors inline-flex items-center group">
                  <span className="hidden md:inline-block w-0 h-px bg-secondary mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:pl-5">
          <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-6 md:mb-8">Contact</h3>
          <ul className="space-y-5 md:space-y-6">
            <li className="flex flex-col md:flex-row items-center md:items-start group">
              <Phone size={20} className="text-secondary mb-2 md:mb-0 md:mr-4 shrink-0 transition-transform group-hover:scale-110" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Call Us</span>
                <a href="tel:+94123456789" className="text-white/80 hover:text-secondary transition-colors text-sm md:text-base">+94 123 456 789</a>
              </div>
            </li>
            <li className="flex flex-col md:flex-row items-center md:items-start group">
              <Mail size={20} className="text-secondary mb-2 md:mb-0 md:mr-4 shrink-0 transition-transform group-hover:scale-110" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Email Us</span>
                <a href="mailto:info@luxesphere.com" className="text-white/80 hover:text-secondary transition-colors text-sm md:text-base">info@luxesphere.com</a>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter / Address */}
        <div>
          <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-6 md:mb-8">Location</h3>
          <p className="text-white/60 font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
            123 Ocean Drive, Galle Face, <br />
            Colombo 01, Sri Lanka.
          </p>
          <div className="p-1 glass rounded-xl flex max-w-sm mx-auto md:mx-0">
            <input type="email" placeholder="Email Address" className="bg-transparent px-4 py-2 outline-none text-xs md:text-sm flex-1" />
            <button className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg text-[10px] md:text-xs uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 md:py-8 text-center text-white/30 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] px-4">
        &copy; {new Date().getFullYear()} LuxeSphere &mdash; Excellence in Hospitality
      </div>
    </footer>
  );
};

export default Footer;
