import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo/Logo";

const Footer = () => (
  <footer className="w-full glass-footer text-ink ">
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      {/* Company Logo and Description Row */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <Logo
          textClassName="text-2xl font-bold mb-4 tracking-wide"
        />
        <p className="voice-base text-ink/70 leading-relaxed">
          Premium quality papers and office supplies for all your creative and business needs.
        </p>
      </div>

      {/* Links Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
        {/* Customer Service Column */}
        <div className="">
          <h3 className="text-sm font-semibold mb-4">
            <span className="text-primary-500 text-base">C</span>
            <span className="text-ink">USTOMER </span>
            <span className="text-primary-500 text-base">S</span>
            <span className="text-ink">ERVICE</span>
          </h3>
          <ul className="voice-base space-y-2">
            <li><Link href="/contact" className="hover:text-primary-400">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-primary-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Information Column */}
        <div className="">
          <h3 className="text-sm font-semibold mb-4">
            <span className="text-primary-500 text-base">I</span>
            <span className="text-ink">NFORMATION</span>
          </h3>
          <ul className="voice-base space-y-2">
            <li><Link href="/about" className="hover:text-primary-400">About Us</Link></li>
            <li><Link href="/terms" className="hover:text-primary-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-primary-400">Privacy Setting and Policy</Link></li>
          </ul>
        </div>

        {/* Follow Us Column */}
        <div className="">
          <h3 className="text-sm font-semibold mb-4">
            <span className="text-primary-500 text-base">F</span>
            <span className="text-ink">OLLOW </span>
            <span className="text-primary-500 text-base">U</span>
            <span className="text-ink">S</span>
          </h3>
          <ul className="voice-base space-y-2">
            <li><Link href="https://instagram.com" className="hover:text-primary-400">Instagram</Link></li>
            <li><Link href="https://facebook.com" className="hover:text-primary-400">Facebook</Link></li>
            <li><Link href="https://tiktok.com" className="hover:text-primary-400">Tiktok</Link></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Copyright Section */}
    <div className="text-center py-4 border-t border-border">
      <p className="text-sm">© <Logo className="inline" textClassName="text-sm" /> {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;
