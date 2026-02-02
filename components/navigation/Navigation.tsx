'use client';

/**
 * Navigation Component
 * Glassmorphism navigation bar with 3D glassy feel
 * Fixed sticky position - content scrolls below
 * Dropdown: Separate popup (like Mastercard) - Show headings first, expand items when clicked
 * High contrast for excellent visibility
 */

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems, type NavigationItem } from '@/lib/navigation';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width?: number } | null>(null);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const navigationItems = getNavigationItems();

  // Calculate dropdown position based on nav bar position (positioned below nav bar, not overlaying)
  const updateDropdownPosition = (item: NavigationItem) => {
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      
      // Position dropdown below the nav bar, matching its width and position
      setDropdownPosition({
        top: navRect.bottom + 8, // Start below nav bar with small gap
        left: navRect.left, // Align with nav bar left edge
        width: navRect.width, // Match nav bar width exactly
      });
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        // Start closing animation
        setIsDropdownClosing(true);
        // Close after animation completes
        setTimeout(() => {
        setActiveDropdown(null);
        setExpandedCategory(null);
        setDropdownPosition(null);
          setIsDropdownClosing(false);
        }, 250); // Match animation duration
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Update dropdown position on scroll/resize
  useEffect(() => {
    if (activeDropdown) {
      const item = navigationItems.find(item => item.href === activeDropdown);
      if (item) {
        updateDropdownPosition(item);
        
        const handleResize = () => updateDropdownPosition(item);
        const handleScroll = () => updateDropdownPosition(item);
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleScroll, true);
        };
      }
    }
  }, [activeDropdown]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setMobileExpandedItem(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string): boolean => {
    return pathname === href || pathname === `${href}`;
  };

  const toggleDropdown = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      if (activeDropdown === item.href) {
        // Start closing animation
        setIsDropdownClosing(true);
        // Close after animation completes
        setTimeout(() => {
        setActiveDropdown(null);
        setExpandedCategory(null);
        setDropdownPosition(null);
          setIsDropdownClosing(false);
        }, 250); // Match animation duration
      } else {
        setIsDropdownClosing(false);
        setActiveDropdown(item.href);
        setExpandedCategory(null); // Reset expanded category when opening dropdown
        // Position will be calculated in useEffect, but trigger immediately
        setTimeout(() => updateDropdownPosition(item), 0);
      }
    }
  };

  const toggleCategory = (categoryKey: string) => {
    // Only expand the clicked category, close others
    // If clicking the same category that's already expanded, close it
    // Otherwise, expand the clicked one and close others
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  // English only - fixed layout

  return (
    <>
      {/* Parent Wrapper - Fixed, Full Width, Pointer Events None */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
        {/* Flex Container - Holds Nav + WhatsApp with Responsive Widths */}
        <div className="pointer-events-auto flex items-center gap-3 w-[90vw] md:w-[85vw] lg:w-fit lg:min-w-[600px] lg:max-w-7xl">
      {/* Glassmorphism Navigation Bar - Capsule Shape - White Glassy Design */}
      <nav 
            className="flex-1 lg:flex-none lg:w-fit lg:min-w-[700px] rounded-full transition-all duration-300"
        style={{
          background: 'rgba(160, 160, 160, 0.25)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        }}
        ref={navRef}
      >
        <div className="w-full px-4 sm:px-5 md:px-6 lg:pl-6 lg:pr-8 py-0 lg:py-0">
          {/* Main Navigation Row - Compact Height - Matches WhatsApp Button (h-12 = 48px) */}
          <div className="flex items-center flex-nowrap justify-between h-10 sm:h-11 md:h-12 lg:h-12 min-h-0 lg:gap-8">
            {/* Logo - Compact Size - Left Anchored */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center z-10 group">
              {/* Company Logo */}
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/images/logo/msgLogo.svg" 
                  alt="Maelstrom Global Logo" 
                  className="object-contain w-full h-full"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
                  }}
                />
              </div>
          </Link>
            </div>

            {/* Desktop Navigation - Links Wrapper - Separate from Logo */}
            <div className="hidden lg:flex items-center gap-6 whitespace-nowrap flex-1" style={{ boxSizing: 'border-box' }}>
            {navigationItems.map((item, index) => {
              const textSize = 'text-xs lg:text-sm xl:text-sm font-semibold';
              
              return (
                <div key={item.href} className="relative flex-shrink-0 flex items-center" style={{ boxSizing: 'border-box' }}>
                {item.children && item.children.length > 0 ? (
                  <div className="relative flex items-center">
                    <button
                      ref={(el) => {
                        if (el) {
                          buttonRefs.current.set(item.href, el);
                        } else {
                          buttonRefs.current.delete(item.href);
                        }
                      }}
                      onClick={() => toggleDropdown(item)}
                          className={`group flex items-center gap-1 px-1.5 lg:px-2 py-1.5 ${textSize} transition-colors duration-200 whitespace-nowrap leading-none ${
                            isActive(item.href) || activeDropdown === item.href
                              ? 'text-[#f26533] font-semibold'
                              : 'text-white hover:text-[#f26533]'
                      }`}
                          style={{ 
                            boxSizing: 'border-box',
                            borderBottom: (isActive(item.href) || activeDropdown === item.href) 
                              ? '2px solid currentColor' 
                              : '2px solid transparent',
                            lineHeight: '1.2',
                          }}
                      aria-expanded={activeDropdown === item.href}
                      title={item.label}
                    >
                          <span className="inline-block align-middle">
                      {item.label}
                          </span>
                      <svg
                            className="w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-300 flex-shrink-0 ml-0.5 inline-block align-middle"
                            style={{
                              transform: activeDropdown === item.href ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                              strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                        className={`group flex items-center px-1.5 lg:px-2 py-1.5 ${textSize} transition-colors duration-200 whitespace-nowrap leading-none ${
                      isActive(item.href)
                            ? 'text-[#f26533] font-semibold'
                            : 'text-white hover:text-[#f26533]'
                    }`}
                        style={{ 
                          boxSizing: 'border-box',
                          borderBottom: isActive(item.href) 
                            ? '2px solid currentColor' 
                            : '2px solid transparent',
                          lineHeight: '1.2',
                        }}
                        title={item.label}
                  >
                    <span className="inline-block align-middle">{item.label}</span>
                  </Link>
                )}
              </div>
                );
              })}
              
          </div>


            {/* Mobile/Tablet Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-[#f26533] transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-5 h-5 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                  strokeWidth={2.5}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          </div>
      </nav>

          {/* WhatsApp Contact Button - Separate Circular Button Next to Nav Bar */}
      <a
        href="https://wa.me/1234567890?text=Hello%20Maelstrom%20Global,%20I%20would%20like%20to%20get%20in%20touch."
        target="_blank"
        rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'rgba(160, 160, 160, 0.25)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        }}
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp"
      >
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-[#25D366] group-hover:text-[#f26533] transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
        </div>
      </div>

      {/* Mobile/Tablet Menu Popup Overlay - Mastercard Style */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setMobileExpandedItem(null);
            }}
          />
          
          {/* Popup Menu */}
        <div
          ref={mobileMenuRef}
            className="fixed top-20 sm:top-24 left-1/2 z-[60] w-[90%] sm:w-[85%] max-w-md lg:hidden rounded-2xl shadow-2xl mobile-menu-scroll"
            style={{
              background: 'rgba(160, 160, 160, 0.25)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              animation: 'mobileMenuFadeIn 0.3s ease-out',
              transform: 'translateX(-50%)',
            }}
        >
            <div className="px-6 py-6 space-y-1">
            {navigationItems.map((item) => (
                <div key={item.href} className="border-b border-white/20 last:border-b-0">
                {item.children && item.children.length > 0 ? (
                  <div>
                      {/* Parent Item with Expand Button */}
                    <button
                        onClick={() => {
                          setMobileExpandedItem(mobileExpandedItem === item.href ? null : item.href);
                            setExpandedCategory(null);
                        }}
                        className={`w-full flex items-center justify-between py-4 text-left transition-colors duration-200 ${
                        isActive(item.href)
                            ? 'text-[#f26533] font-semibold'
                            : 'text-white hover:text-[#f26533]'
                      }`}
                    >
                        <span className="text-base font-semibold">
                      {item.label}
                        </span>
                      <svg
                          className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                            mobileExpandedItem === item.href ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                      {/* Expanded Sub-items */}
                      <div 
                        className="overflow-hidden"
                        style={{
                          maxHeight: mobileExpandedItem === item.href ? '1000px' : '0px',
                          opacity: mobileExpandedItem === item.href ? 1 : 0,
                          transform: mobileExpandedItem === item.href ? 'translateY(0)' : 'translateY(-10px)',
                          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {mobileExpandedItem === item.href && (
                        <div className="pb-4 space-y-1">
                          {item.children?.map((category, categoryIndex) => {
                            const categoryKey = `${item.href}-${categoryIndex}`;
                            const isCategoryExpanded = expandedCategory === categoryKey;
                            
                            return (
                              <div key={categoryIndex} className="pl-4 border-l-2 border-white/20">
                                {/* Category Heading */}
                                <button
                                  onClick={() => toggleCategory(categoryKey)}
                                  className="w-full flex items-center justify-between py-3 text-left transition-colors duration-200 group hover:text-[#f26533]"
                                >
                                  <h3 className="text-xs font-semibold uppercase text-white tracking-wider transition-colors duration-200 flex-1 pr-2">
                              {category.label}
                                  </h3>
                                  {category.children && category.children.length > 0 && (
                                    <svg
                                      className={`w-4 h-4 text-white/70 transition-transform duration-300 ease-in-out ${
                                        isCategoryExpanded ? 'rotate-180' : ''
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  )}
                                </button>

                                {/* Category Items */}
                                {category.children && category.children.length > 0 && (
                                  <div 
                                    className="overflow-hidden"
                                    style={{
                                      maxHeight: isCategoryExpanded ? `${category.children.length * 44 + 16}px` : '0px',
                                      opacity: isCategoryExpanded ? 1 : 0,
                                      transform: isCategoryExpanded ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                      transitionDelay: isCategoryExpanded ? '0s' : '0s',
                                    }}
                                  >
                                    <div className="pt-2 pb-3 pl-6 space-y-1">
                                      {category.children.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                            setMobileExpandedItem(null);
                                            setExpandedCategory(null);
                                  }}
                                          className="block py-2 text-sm text-white/90 hover:text-[#f26533] transition-colors duration-200"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                          </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        )}
                      </div>
                </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-4 text-base font-semibold transition-colors duration-200 ${
                      isActive(item.href)
                          ? 'text-[#f26533]'
                          : 'text-white hover:text-[#f26533]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        </>
      )}

      {/* Desktop Dropdown Popup - Mastercard Style - Desktop Only */}
      {activeDropdown && dropdownPosition && (
        <div
          ref={dropdownRef}
          className={`fixed z-[60] hidden lg:block ${isDropdownClosing ? 'animate-dropdown-fade-out' : 'animate-dropdown-fade-in'}`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          <div
            className="rounded-2xl shadow-2xl w-full"
            style={{
              background: 'rgba(160, 160, 160, 0.25)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            <div className="px-6 py-5 space-y-1.5">
              {navigationItems
                .filter((item) => item.href === activeDropdown && item.children && item.children.length > 0)
                .map((item) => (
                  <div key={item.href} className="space-y-1.5">
                    {item.children?.map((category, categoryIndex) => {
                      // Create truly unique key that includes dropdown context
                      const categoryKey = `${activeDropdown}-${categoryIndex}`;
                      const isExpanded = expandedCategory === categoryKey;
                      const itemCount = category.children?.length || 0;
                      
                      return (
                        <div 
                          key={categoryIndex} 
                          className="overflow-hidden"
                        >
                          {/* Category Heading - Clickable to expand (Stacked Vertically) */}
                          <button
                            onClick={() => toggleCategory(categoryKey)}
                            className="w-full flex items-center justify-between py-3 text-left transition-colors duration-200 group hover:text-[#f26533]"
                          >
                              <h3 
                                className={`text-xs font-semibold uppercase text-white tracking-wider transition-colors duration-200 flex-1 pr-2`}
                                title={category.label}
                              >
                                {category.label}
                              </h3>
                            {category.children && category.children.length > 0 && (
                              <svg
                                className={`w-4 h-4 text-white/70 transition-transform duration-300 ease-in-out ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            )}
                          </button>
                          
                          {/* Category Items - Smooth Expand Animation (ONLY EXPANDED ONE) */}
                          {category.children && category.children.length > 0 && (
                            <div 
                              className="overflow-hidden transition-all duration-400 ease-out"
                              style={{
                                maxHeight: isExpanded ? `${itemCount * 44 + 16}px` : '0px',
                                opacity: isExpanded ? 1 : 0,
                                transform: isExpanded ? 'translateY(0)' : 'translateY(-8px)',
                                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease-out, transform 0.35s ease-out',
                              }}
                            >
                              <div className="pt-2 pb-3 pl-8 space-y-1">
                                {category.children.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    onClick={() => {
                                      // Start closing animation
                                      setIsDropdownClosing(true);
                                      // Close after animation completes
                                      setTimeout(() => {
                                      setActiveDropdown(null);
                                      setExpandedCategory(null);
                                      setDropdownPosition(null);
                                        setIsDropdownClosing(false);
                                      }, 250);
                                    }}
                                    className="block py-2 text-sm text-white/90 hover:text-[#f26533] transition-colors duration-200"
                                    title={subItem.label}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer to push content below fixed nav - Compact Height */}
      <div className="h-14 sm:h-16 md:h-[72px] lg:h-16 transition-all duration-300 ease-in-out" />
    </>
  );
};
