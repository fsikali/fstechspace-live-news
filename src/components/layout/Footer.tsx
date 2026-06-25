export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-10">
      
      <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-400">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-white font-semibold mb-1">
              FSTechSpace TV
            </h2>
            <p className="text-gray-500 text-xs">
              Latest updates in AI, startups, and technology.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              About
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Tech Today. All rights reserved.
        </div>

      </div>

    </footer>
  );
}
