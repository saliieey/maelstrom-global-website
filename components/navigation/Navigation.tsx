'use client';

/**
 * Navigation Component
 * Glassmorphism navigation bar with 3D glassy feel
 * Fixed sticky position - content scrolls below
 * Dropdown: Show headings first, expand items when clicked
 * High contrast for excellent visibility
 */

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems, type NavigationItem } from '@/lib/i18n/navigation';

export const Navigation = () => {
  const locale = 'en' as const; // English only
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = getNavigationItems();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setExpandedCategory(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setExpandedCategory(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string): boolean => {
    return pathname === href || pathname === `${href}`;
  };

  const toggleDropdown = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      if (activeDropdown === item.href) {
        setActiveDropdown(null);
        setExpandedCategory(null);
      } else {
        setActiveDropdown(item.href);
        setExpandedCategory(null); // Reset expanded category when opening dropdown
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
      {/* Glassmorphism Navigation Bar - English Only */}
      <nav 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px] lg:w-[90%] xl:w-[1200px] rounded-2xl transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(80px) saturate(200%)',
          WebkitBackdropFilter: 'blur(80px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.35)',
        }}
        ref={dropdownRef}
      >
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-14 py-0">
          {/* Main Navigation Row - Fixed Height for English with Perfect Spacing */}
          <div className="flex items-center flex-nowrap justify-between h-20 lg:h-24">
            {/* Logo - Perfect Alignment */}
            <Link href="/" className="flex items-center gap-3 z-10 flex-shrink-0">
              {/* Company Logo - Will be replaced when logo is provided */}
              <div className="relative w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0">
                {/* Placeholder - Remove when logo is added */}
                <div className="w-full h-full bg-white/25 rounded-xl flex items-center justify-center border border-white/35 backdrop-blur-sm shadow-sm">
                  <span className="text-xs md:text-sm font-bold text-gray-800">MG</span>
                </div>
                {/* Logo Image - Uncomment and update path when logo is provided */}
                {/* <Image 
                  src="/assets/images/logo/logo.svg" 
                  alt="Maelstrom Global Logo" 
                  width={56} 
                  height={56}
                  className="object-contain"
                /> */}
              </div>
              <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight hidden sm:block" 
                    style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)' }}>
              Maelstrom Global
            </span>
          </Link>

            {/* Desktop Navigation - Perfect Consistent Spacing for Best UI/UX */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-end" style={{ boxSizing: 'border-box' }}>
            {navigationItems.map((item, index) => {
              // Consistent font size - never changes on hover
              const textSize = 'text-sm font-semibold';
              
              return (
                <div key={item.href} className="relative flex-shrink-0" style={{ boxSizing: 'border-box' }}>
                {item.children && item.children.length > 0 ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item)}
                          className={`group flex items-center gap-1.5 px-2 py-2 ${textSize} transition-colors duration-200 whitespace-nowrap ${
                            isActive(item.href) || activeDropdown === item.href
                              ? 'text-orange-600 font-semibold'
                              : 'text-gray-900 hover:text-orange-600'
                      }`}
                          style={{ 
                            boxSizing: 'border-box',
                            borderBottom: (isActive(item.href) || activeDropdown === item.href) 
                              ? '2px solid currentColor' 
                              : '2px solid transparent',
                          }}
                      aria-expanded={activeDropdown === item.href}
                    >
                          <span title={item.label[locale]}>
                      {item.label[locale]}
                          </span>
                      <svg
                            className="w-4 h-4 transition-transform duration-300 flex-shrink-0 ml-0.5"
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
                        className={`group inline-block px-2 py-2 ${textSize} transition-colors duration-200 whitespace-nowrap ${
                      isActive(item.href)
                            ? 'text-orange-600 font-semibold'
                            : 'text-gray-900 hover:text-orange-600'
                    }`}
                        style={{ 
                          boxSizing: 'border-box',
                          borderBottom: isActive(item.href) 
                            ? '2px solid currentColor' 
                            : '2px solid transparent',
                        }}
                        title={item.label[locale]}
                  >
                    {item.label[locale]}
                  </Link>
                )}
              </div>
                );
              })}
          </div>

            {/* Mobile Menu Button - Perfect Alignment with Consistent Spacing */}
            <div className="flex items-center flex-shrink-0 ml-6 xl:ml-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-900 hover:text-orange-600 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
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

          {/* Dropdown Content - Clean Agency Style */}
          {activeDropdown && (
            <div className="border-t border-gray-200/40 pt-6 pb-5 hidden lg:block">
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
                            className="w-full flex items-center justify-between py-3 text-left transition-colors duration-200 group hover:text-orange-600"
                          >
                              <h3 
                                className={`text-xs font-semibold uppercase text-gray-700 tracking-wider transition-colors duration-200 truncate flex-1 pr-2`}
                                title={category.label[locale]}
                              >
                                {category.label[locale]}
                              </h3>
                            {category.children && category.children.length > 0 && (
                              <svg
                                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${
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
                                      setActiveDropdown(null);
                                      setExpandedCategory(null);
                                    }}
                                    className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 truncate"
                                    title={subItem.label[locale]}
                                  >
                                    {subItem.label[locale]}
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
          )}
      </div>

        {/* Mobile Menu - Glassmorphism Style (Professional - Same as Desktop) */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
            className="lg:hidden border-t border-gray-300/30"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
        >
            <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.href}>
                {item.children && item.children.length > 0 ? (
                  <div>
                    <button
                        onClick={() => {
                          if (activeDropdown === item.href) {
                            setActiveDropdown(null);
                            setExpandedCategory(null);
                          } else {
                            setActiveDropdown(item.href);
                            setExpandedCategory(null);
                          }
                        }}
                        className={`w-full flex items-center justify-between py-3 text-sm font-semibold transition-colors duration-200 min-w-0 ${
                        isActive(item.href)
                            ? 'text-orange-600'
                            : 'text-gray-900 hover:text-orange-600'
                      }`}
                    >
                        <span className="truncate flex-1 text-left pr-2" title={item.label[locale]}>
                      {item.label[locale]}
                        </span>
                      <svg
                          className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                          activeDropdown === item.href ? 'rotate-180' : ''
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

                      {/* Mobile Dropdown - Same Vertical Stack as Desktop */}
                    {activeDropdown === item.href && (
                        <div className="mt-2 ml-4 space-y-1.5">
                          {item.children.map((category, categoryIndex) => {
                            const mobileCategoryKey = `${activeDropdown}-${categoryIndex}`;
                            const isMobileExpanded = expandedCategory === mobileCategoryKey;
                            
                            return (
                              <div key={categoryIndex} className="overflow-hidden">
                                <button
                                  onClick={() => toggleCategory(mobileCategoryKey)}
                                  className="w-full flex items-center justify-between py-2.5 text-xs font-semibold uppercase text-gray-700 hover:text-orange-600 transition-colors min-w-0"
                                >
                                  <span className="truncate flex-1 text-left pr-2" title={category.label[locale]}>
                              {category.label[locale]}
                                  </span>
                                  {category.children && category.children.length > 0 && (
                                    <svg
                                      className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                                        isMobileExpanded ? 'rotate-180' : ''
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
                                {isMobileExpanded && category.children && category.children.length > 0 && (
                                  <div 
                                    className="overflow-hidden transition-all duration-400 ease-out"
                                    style={{
                                      maxHeight: isMobileExpanded ? `${category.children.length * 44 + 16}px` : '0px',
                                      opacity: isMobileExpanded ? 1 : 0,
                                      transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease-out',
                                    }}
                                  >
                                    <div className="pt-2 pb-3 pl-8 space-y-1">
                                      {category.children.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setActiveDropdown(null);
                                            setExpandedCategory(null);
                                  }}
                                          className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 truncate"
                                          title={subItem.label[locale]}
                                >
                                  {subItem.label[locale]}
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
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 text-sm font-semibold transition-colors duration-200 truncate ${
                      isActive(item.href)
                          ? 'text-orange-600'
                          : 'text-gray-900 hover:text-orange-600'
                    }`}
                      title={item.label[locale]}
                  >
                    {item.label[locale]}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
      
      {/* Spacer to push content below fixed nav - Fixed Height for English */}
      <div className={`transition-all duration-300 ease-in-out ${
        activeDropdown 
          ? 'h-32 md:h-36 lg:h-[280px]' 
          : 'h-24 md:h-28 lg:h-32'
      }`} />
    </>
  );
};

