import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="w-full leading-7 text-center border-t border-border bg-paper text-ink pt-8">
    <h2 className="text-2xl sm:text-xl font-bold font-display">#ThePaperCompany</h2>
    <p className="mt-4 mb-5 text-xs sm:text-base font-body text-base-700">
      Tel: 123-456-7890 | Email: info@thepapercompany.ca
    </p>
    <Link href="" className="mx-auto block w-fit">
      <Image
        alt="back to top arrow"
        width={44}
        height={44}
        src="/back-to-top.png"
        className="mx-auto"
      />
      <span className="font-body text-base-600">Back to Top</span>
    </Link>
    <div className="mt-4 h-12 leading-loose bg-base-950 text-center text-base-400 text-sm font-body">
      © 2024 by The Paper Company. Powered and secured by{" "}
      <Link href="https://www.wix.com" className="text-primary-400 hover:text-primary-300">Wix</Link>
    </div>
  </footer>
);

export default Footer;
