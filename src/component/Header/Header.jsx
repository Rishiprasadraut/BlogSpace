import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "🏠 Home",
      slug: "/",
      active: true,
    },
    {
      name: "🔐 Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "📝 Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "📚 All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "✍️ Write Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Logo width="24px" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BlogSpace
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/50 bg-white/90 backdrop-blur-lg shadow-lg">
            <ul className="py-4 px-6 space-y-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all duration-300 font-medium hover:scale-[1.02] hover:shadow-sm"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="pt-2 border-t border-slate-200">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
