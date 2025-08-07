import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="w-full glass-footer text-ink ">
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Customer Service Column */}
        <div className="">
          <h3 className="voice-2l mb-4">CUSTOMER SERVICE</h3>
          <ul className="voice-base space-y-2">
            <li><Link href="/shipping" className="hover:text-primary-400">Shipping and Returns</Link></li>
            <li><Link href="/contact" className="hover:text-primary-400">Contact Us</Link></li>
            <li><Link href="/gift-card" className="hover:text-primary-400">Gift Card</Link></li>
            <li><Link href="/faq" className="hover:text-primary-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Information Column */}
        <div className="">
          <h3 className="voice-2l mb-4">INFORMATION</h3>
          <ul className="voice-base space-y-2">
            <li><Link href="/about" className="hover:text-primary-400">About Us</Link></li>
            <li><Link href="/terms" className="hover:text-primary-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-primary-400">Privacy Setting and Policy</Link></li>
          </ul>
        </div>

        {/* Follow Us Column */}
        <div className="">
          <h3 className="voice-2l mb-4">FOLLOW US</h3>
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
      <p className="text-sm">© The Paper Company {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;
