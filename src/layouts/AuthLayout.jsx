import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden relative">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>

      <div className="flex justify-center items-center min-h-screen px-5">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-10">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-yellow-500"
            />

            <h1 className="text-4xl font-extrabold text-yellow-400 mt-4">
              Shedge Stores
            </h1>

            <p className="text-gray-300 mt-2">{subtitle}</p>
          </div>

          <h2 className="text-white text-3xl font-bold text-center mt-8 mb-8">
            {title}
          </h2>

          {children}

          <div className="mt-8 text-center text-gray-300">
            {footerText}

            <Link
              to={footerLink}
              className="text-yellow-400 ml-2 font-semibold hover:underline"
            >
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
