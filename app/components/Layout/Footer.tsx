import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo/Logo';

// Fetch pages for dynamic links
async function fetchPages(): Promise<{ slug: string; title: string; showInFooter?: boolean; redirect?: string }[]> {
  try {
    const res = await fetch('https://the.papercompany.ca/api/pages', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return (data.items || []).map((item: any) => ({
      slug: item.slug,
      title: item.title,
      showInFooter: item.showInFooter,
      redirect: item.redirect,
    }));
  } catch (error) {
    return [];
  }
}

const Footer = async () => {
  const pages = await fetchPages();

  return (
    <footer className="w-full glass-footer text-ink ">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        {/* Company Logo and Description Row */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <Logo textClassName="text-2xl font-bold mb-4 tracking-wide" />
          <p className="voice-base text-ink/70 leading-relaxed">
            Premium quality papers and office supplies for all your creative and
            business needs.
          </p>
        </div>

        {/* Links Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto">
          {/* Pages Column */}
          <div className="">
            <h3 className="text-sm font-semibold mb-4">
              <span className="text-primary-500 text-base">P</span>
              <span className="text-ink">AGES</span>
            </h3>
            <ul className="voice-base space-y-2">
              {pages
                .filter((page) => page.slug !== 'template' && page.showInFooter !== false)
                .map((page) => (
                  <li key={page.slug}>
                    {page.redirect ? (
                      <a
                        href={page.redirect}
                        className="hover:text-primary-400"
                      >
                        {page.title}
                      </a>
                    ) : (
                      <Link
                        href={`/${page.slug}`}
                        className="hover:text-primary-400"
                      >
                        {page.title}
                      </Link>
                    )}
                  </li>
                ))}
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
              <li>
                <Link
                  href="https://instagram.com"
                  className="hover:text-primary-400"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  className="hover:text-primary-400"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://tiktok.com"
                  className="hover:text-primary-400"
                >
                  Tiktok
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center py-4 border-t border-border">
        <p className="text-sm">
          © <Logo className="inline" textClassName="text-sm" />{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
