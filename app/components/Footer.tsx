import React from "react";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
];

const platformlinks = [
  { label: "Documentation", href: "/docs" },
  { label: "API Reference", href: "/api" },
];

const servicesLinks = [
  { label: "Support", href: "/support" },
  { label: "Contact Us", href: "/contact" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul>
              {platformlinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul>
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          {bottomLinks.map((link) => (
            <span key={link.label} className="mx-2">
              <a href={link.href} className="text-gray-400 hover:text-white">
                {link.label}
              </a>
            </span>
          ))}

          <section className="ml-4 border border-gray-300 rounded px-2 py-1 text-gray-400">
            <option>TW</option>
            <option>HK</option>
            <option>SG</option>
            <option>Other</option>
          </section>
        </div>
      </div>
    </footer>
  );
}
