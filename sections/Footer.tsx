"use client";

import Link from "next/link";

/**
 * Footer Component
 * Matches Squadra Media footer design exactly
 * Based on reference HTML structure
 */
export const Footer = () => {
  // Company links
  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Works", href: "#" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  // Services list - matching reference exactly
  const services = [
    { label: "Digital Marketing & PR", href: "/services/digital-marketing" },
    { label: "Branding & Creative", href: "/services/branding" },
    { label: "Technology & Development", href: "/services/technology" },
    { label: "Visual Impact", href: "/services/visual-impact" },
    { label: "Animation & E-learning", href: "#" },
  ];

  // Contact information
  const contactInfo = [
    {
      type: "location",
      text: "1134, 5th Floor, Shreeram Niwas, Opposite Vapour Brewery, 100 Ft Road, Indiranagar, Bengaluru, 560038",
    },
    {
      type: "location",
      text: "532, 16th Cross, 2nd Main Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038",
    },
    {
      type: "phone",
      text: "+91 6366726494",
      href: "tel:+916366726494",
    },
    {
      type: "email",
      text: "info@maelstromglobal.com",
      href: "mailto:info@maelstromglobal.com",
    },
  ];

  // Social media links
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/maelstromglobal",
      icon: (
        <svg
          className="transition-colors duration-300 group-hover:stroke-[#f26533]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@maelstromglobal",
      icon: (
        <svg
          className="transition-colors duration-300 group-hover:stroke-[#f26533]"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
          <path d="m10 15 5-3-5-3z"></path>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/maelstromglobal",
      icon: (
        <svg
          className="transition-colors duration-300 group-hover:stroke-[#f26533]"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/maelstromglobal",
      icon: (
        <svg
          className="transition-colors duration-300 group-hover:stroke-[#f26533]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
  ];

  // Icon component for contact info - using lucide-style icons
  const ContactIcon = ({ type }: { type: string }) => {
    const baseClasses = "h-5 w-5";
    if (type === "location") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={baseClasses}
        >
          <line x1="2" x2="5" y1="12" y2="12"></line>
          <line x1="19" x2="22" y1="12" y2="12"></line>
          <line x1="12" x2="12" y1="2" y2="5"></line>
          <line x1="12" x2="12" y1="19" y2="22"></line>
          <circle cx="12" cy="12" r="7"></circle>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      );
    }
    if (type === "phone") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={baseClasses}
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      );
    }
    if (type === "email") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={baseClasses}
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      );
    }
    return null;
  };

  return (
    <footer className="bg-black w-full text-gray-400 py-8 px-2 sm:py-12 sm:px-6 lg:py-16 xl:px-24">
      <style dangerouslySetInnerHTML={{
        __html: `
          .social-link-group:hover svg {
            stroke: #f26533 !important;
          }
        `
      }} />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 text-sm sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Company */}
          <div className="space-y-4 col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-medium">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div className="space-y-4 col-span-1 sm:col-span-1 lg:col-span-3">
            <h3 className="text-white text-lg font-medium">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="hover:text-white transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in touch */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Get in touch</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li
                  key={index}
                  className={
                    info.type === "location"
                      ? "flex max-w-xs items-start leading-relaxed"
                      : "flex items-center leading-relaxed"
                  }
                >
                  <span className="flex-shrink-0 mr-3 flex items-center justify-center">
                    <ContactIcon type={info.type} />
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="hover:text-white transition-colors flex-1"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="flex-1">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Slogan */}
          <div className="space-y-3 col-span-1 sm:col-span-2 lg:col-span-3">
            <h2 className="text-[#727272] text-[20px] sm:text-[24px] lg:text-[clamp(1.25rem,1.5vw+1rem,2rem)] font-medium leading-[150%] text-center sm:text-left">
              Developing Robust Skills to Strengthen Your{" "}
              <span className="text-[#f26533]">Brand's Impact.</span>
            </h2>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <Link 
            href="/" 
            className="inline-block transition-all duration-300 hover:scale-105"
            style={{ background: 'transparent' }}
          >
            <img
              src="/assets/images/logo/msgLogo.svg"
              alt="Maelstrom Global"
              loading="lazy"
              width={129}
              height={44}
              className="h-12"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(48%) sepia(93%) saturate(1352%) hue-rotate(350deg) brightness(98%) contrast(96%) drop-shadow(0 0 8px rgba(242, 101, 51, 0.4)) drop-shadow(0 0 16px rgba(242, 101, 51, 0.2))',
                opacity: '0.9',
                backgroundColor: 'transparent',
                color: "transparent" 
              }}
            />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Copyright and Legal Links */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center text-center sm:text-left">
              <div className="text-sm">
                © Copyright Maelstrom Global Private Limited 2024. All rights
                reserved
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-6 sm:ml-8">
                <Link
                  href="/terms"
                  className="text-sm hover:text-white transition-colors whitespace-nowrap"
                >
                  Terms of services
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-white transition-colors whitespace-nowrap"
                >
                  Privacy policy
                </Link>
              </div>
            </div>

            {/* Right: Social Media */}
            <div className="flex items-center justify-center lg:justify-end gap-4 text-white">
              <span className="text-sm text-gray-400 whitespace-nowrap flex items-center">
                Follow Us
              </span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.href}
                    className="social-link-group transition-colors flex items-center"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
