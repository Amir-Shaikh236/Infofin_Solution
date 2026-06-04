import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { name: "GST & Taxation", href: "/services/gst-taxation", desc: "GST filing, registration & compliance" },
  { name: "Audit Support", href: "/services/audit-support", desc: "Internal, tax & compliance audits" },
  { name: "ERP Solutions", href: "/services/erp-solutions", desc: "Enterprise resource planning software" },
  { name: "Software Products", href: "/services/software-products", desc: "Billing, CRM, Payroll & more" },
  { name: "AI Automation", href: "/services/ai-automation", desc: "AI-powered accounting & workflows" },
  { name: "All Services", href: "/services", desc: "View complete service catalog" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasMenu: true },
  { name: "Industries", href: "/industries" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "nav-blur border-b border-slate-100 shadow-sm" : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className="hidden lg:flex bg-slate-50 border-b border-slate-100 py-1.5">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="mailto:info@infofinllp.com" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Mail className="w-3 h-3" />
              info@infofinllp.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Phone className="w-3 h-3" />
              +91 98765 43210
            </a>
          </div>
          <span className="text-xs text-slate-500">Mon – Sat: 9:00 AM – 6:00 PM IST</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 bg-white rounded p-1 shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Infofin Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-slate-900 text-xl tracking-tight">
              Infofin
            </span>

            <span className="text-[11px] text-slate-500 font-semibold tracking-[0.25em] mt-1">
              SOLUTIONS LLP
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    location.startsWith("/services") ? "text-blue-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {link.name}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 glass rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-2">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group"
                          >
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{s.name}</span>
                            <span className="text-xs text-slate-500">{s.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  location === link.href ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/client-portal" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
            Client Portal
          </Link>
          <Link href="/book-consultation" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
            Book Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <Link href="/book-consultation" className="block px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl text-center">
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
