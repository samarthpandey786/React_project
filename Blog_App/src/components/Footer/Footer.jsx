import { NavLink, Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-12 mt-10">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo + About */}
          <div className="flex flex-col justify-between">
            <Link to="/" className="mb-4 inline-flex items-center pr-12 pb-4">
              <Logo width="120px" />
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved by{" "}
              <span className="text-blue-400 font-semibold">MG</span>.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://x.com/samarthpandey69" className="hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/samarth__pandey/" className="hover:text-pink-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://github.com/samarthpandey786" className="hover:text-gray-100 transition">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/samarth-pandey-2a541837a/" className="hover:text-blue-600 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* links */}
        <div className="flex flex-col gap-10">
          {/* Support */}
          <div>
            <h3 className=" text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">
              Support
            </h3>
            <ul className="flex flex-row gap-4 ">
              {[
                { name: "Account", path: "/account_page" },
                { name: "Help", path: "/help" },
                { name: "Contact Us", path: "/contact" },
                { name: "Customer Support", path: "/support" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `hover:text-white hover:pl-1 transition-all duration-300 ${
                        isActive
                          ? "text-emerald-600 hover:text-emerald-200 text-xl"
                          : "text-gray-400 font-semibold"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  </li>
                  ))}
              </ul>

          </div>
        </div>
          </div>


        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ + React + Tailwind
        </div>
      </div>
    </footer>
  );
}

export default Footer;
