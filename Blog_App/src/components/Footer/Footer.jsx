import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-12 mt-10">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div className="flex flex-col justify-between">
            <Link to="/" className="mb-4 inline-flex items-center">
              <Logo width="120px" />
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved by{" "}
              <span className="text-blue-400 font-semibold">DevUI</span>.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-100 transition">
                <FaGithub size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="hover:text-white hover:pl-1 transition-all duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="hover:text-white hover:pl-1 transition-all duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="hover:text-white hover:pl-1 transition-all duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ using React + Tailwind
        </div>
      </div>
    </footer>
  );
}

export default Footer;
