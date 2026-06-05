import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

const services = [
  { name: "GST & Taxation", href: "/services/gst-taxation" },
  { name: "Bookkeeping & Accounting", href: "/services" },
  { name: "Audit Support", href: "/services/audit-support" },
  { name: "ERP Solutions", href: "/services/erp-solutions" },
  { name: "AI & Automation", href: "/services/ai-automation" },
  { name: "Business Registration", href: "/services" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to simplify your business operations?</h3>
            <p className="text-blue-100 text-sm">Join 500+ businesses that trust Infofin for their financial and technology needs.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/book-consultation" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap">
              Book Free Consultation
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-blue-700/50 text-white font-semibold rounded-xl border border-white/20 hover:bg-blue-700/80 transition-colors text-sm whitespace-nowrap">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">IF</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none">Infofin</span>
                <span className="block text-[10px] text-slate-400 leading-none font-medium tracking-wide">SOLUTIONS LLP</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              India's trusted partner for financial services, GST compliance, ERP solutions, and AI-powered business automation.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-slate-400 hover:text-white text-sm flex items-center gap-1.5 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.name}>
                  <Link href={c.href} className="text-slate-400 hover:text-white text-sm flex items-center gap-1.5 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>I-2 105 Amits Colori Undri, Near Atur Nagar<br />Pune, Maharashtra 411060</span>
              </li>
              <li>
                <a href="tel:+917758891773" className="flex gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  +91 77588 91773
                </a>
              </li>
              <li>
                <a href="mailto:Info@infofinsolutions.com" className="flex gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  Info@infofinsolutions.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 mb-1">Business Hours</p>
              <p className="text-sm text-white font-medium">Mon – Sat: 9 AM – 6 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Infofin Solutions LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
