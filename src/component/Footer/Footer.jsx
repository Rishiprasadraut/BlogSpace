import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  // SVG Background (fixed for JSX safety)
  const pattern =
    "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 opacity-95"></div>

      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("${pattern}")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Logo width="24px" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                BlogSpace
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              A modern platform for writers and readers to share stories and
              explore fresh content. Join the community and start your blogging
              journey today.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {["twitter", "facebook", "linkedin", "github"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="
                      M24 4.557c-.883.392-1.832.656-2.828.775
                      1.017-.609 1.798-1.574 2.165-2.724-.951.564
                      -2.005.974-3.127 1.195-.897-.957-2.178-1.555
                      -3.594-1.555-3.179 0-5.515 2.966-4.797 6.045
                      -4.091-.205-7.719-2.165-10.148-5.144-1.29
                      2.213-.669 5.108 1.523 6.574-.806-.026
                      -1.566-.247-2.229-.616-.054 2.281 1.581 
                      4.415 3.949 4.89-.693.188-1.452.232-2.224.084
                      .626 1.956 2.444 3.379 4.6 3.419-2.07 
                      1.623-4.678 2.348-7.29 2.04 2.179 
                      1.397 4.768 2.212 7.548 2.212 9.142 0 
                      14.307-7.721 13.995-14.646.962-.695 
                      1.797-1.562 2.457-2.549z"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", to: "/" },
                { name: "All Posts", to: "/all-posts" },
                { name: "Write Post", to: "/add-post" },
                { name: "About Us", to: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    className="text-slate-300 hover:text-indigo-400 transition flex items-center space-x-2"
                    to={link.to}
                  >
                    <span>•</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {[
                { name: "Help Center", to: "#" },
                { name: "Contact Us", to: "#" },
                { name: "Privacy Policy", to: "#" },
                { name: "Terms of Service", to: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    className="text-slate-300 hover:text-indigo-400 transition flex items-center space-x-2"
                    to={link.to}
                  >
                    <span>•</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} BlogSpace. All rights reserved.
            </p>

            <div className="flex items-center space-x-4 text-slate-400 text-sm">
              <span>Built with React & Tailwind CSS</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
