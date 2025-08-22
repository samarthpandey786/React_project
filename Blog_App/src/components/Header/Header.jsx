import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // hamburger icons

function Header() {
  const authStatus = useSelector((state) => state.auth?.status ?? false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-md">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-start pl-5 size-16 pt-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4" >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} >
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-emerald-400 hover:text-white transition-all duration-300"
                      
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden pr-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="flex flex-row items-end gap-2 pb-4 md:hidden">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false);
                      }}
                      className="block w-full text-center px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-emerald-400 hover:text-white transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
