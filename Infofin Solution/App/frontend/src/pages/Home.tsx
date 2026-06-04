import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import {
  ArrowRight, CheckCircle, Star, TrendingUp, Shield, Zap, BarChart3, FileText,
  Cpu, Building2, Users, Award, ChevronRight, Play
} from "lucide-react";
import { useListTestimonials } from "@workspace/api-client-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const serviceCategories = [
  { icon: FileText, title: "GST & Taxation", desc: "Complete GST compliance — registration, filing, notices, e-invoicing, and tax planning.", color: "from-blue-500 to-blue-600", href: "/services/gst-taxation" },
  { icon: BarChart3, title: "Bookkeeping & Accounting", desc: "Daily bookkeeping, P&L, balance sheets, bank reconciliation and financial reporting.", color: "from-cyan-500 to-cyan-600", href: "/services" },
  { icon: Shield, title: "Audit Support", desc: "Internal, tax, stock and compliance audits with complete documentation.", color: "from-violet-500 to-violet-600", href: "/services/audit-support" },
  { icon: Building2, title: "ERP Solutions", desc: "Billing, inventory, CRM, payroll and multi-branch management software.", color: "from-emerald-500 to-emerald-600", href: "/services/erp-solutions" },
  { icon: Cpu, title: "AI & Automation", desc: "Smart invoice scanning, automated workflows, real-time GST alerts and AI analytics.", color: "from-orange-500 to-orange-600", href: "/services/ai-automation" },
  { icon: TrendingUp, title: "Business Registration", desc: "LLP, Pvt Ltd, MSME, Startup India, Trademark and full ROC compliance.", color: "from-pink-500 to-pink-600", href: "/services" },
];

const stats = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Expert Team" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

const industries = [
  "Retail", "Manufacturing", "E-commerce", "Healthcare",
  "Restaurants", "Startups", "Logistics", "Education", "Agencies", "Professional Services"
];

const features = [
  "Dedicated relationship manager",
  "Real-time GST alerts & reminders",
  "Automated compliance calendar",
  "AI-powered financial insights",
  "Secure cloud document storage",
  "Multi-user team access",
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const { data: testimonials } = useListTestimonials();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero-gradient pt-36 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-100/50 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Trusted by 500+ Businesses Across India
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Smart Finance &{" "}
              <span className="gradient-text">Business Technology</span>{" "}
              Solutions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-10 max-w-3xl mx-auto">
              From GST Filing &amp; Audit Support to ERP, Inventory, Billing &amp; AI Automation — Infofin helps businesses simplify operations and scale faster.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/book-consultation" className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:shadow-xl text-sm">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services/software-products" className="flex items-center gap-2 px-7 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm text-sm">
                Explore Software
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-7 py-3.5 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                <Play className="w-4 h-4" />
                Request Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="glass rounded-2xl border border-slate-200/80 shadow-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">Infofin Dashboard — Analytics Overview</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Revenue", value: "₹24.8L", change: "+18%", color: "text-emerald-600" },
                  { label: "GST Filed", value: "47", change: "This Month", color: "text-blue-600" },
                  { label: "Pending Tasks", value: "12", change: "Due Today", color: "text-orange-600" },
                  { label: "Clients Active", value: "38", change: "+3 New", color: "text-violet-600" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-slate-900">{item.value}</p>
                    <p className={`text-xs font-medium ${item.color}`}>{item.change}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-3">Revenue Trend</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 50, 80, 60, 90, 75, 95, 70, 88, 92, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm"
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-3">GST Status</p>
                  <div className="space-y-2">
                    {[{ label: "Filed", pct: 78, color: "bg-emerald-500" }, { label: "Pending", pct: 15, color: "bg-orange-500" }, { label: "Overdue", pct: 7, color: "bg-red-500" }].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{s.label}</span><span>{s.pct}%</span></div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ delay: 0.8, duration: 0.5 }} className={`h-full ${s.color} rounded-full`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute -left-8 top-12 glass rounded-xl p-4 shadow-lg border border-slate-200/60 hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><TrendingUp className="w-3 h-3 text-emerald-600" /></div>
                <span className="text-xs font-semibold text-slate-700">GST Saved</span>
              </div>
              <p className="text-lg font-bold text-slate-900">₹4.2L</p>
              <p className="text-xs text-emerald-600 font-medium">This Quarter</p>
            </motion.div>

            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }} className="absolute -right-8 top-8 glass rounded-xl p-4 shadow-lg border border-slate-200/60 hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><Zap className="w-3 h-3 text-blue-600" /></div>
                <span className="text-xs font-semibold text-slate-700">AI Alerts</span>
              </div>
              <p className="text-lg font-bold text-slate-900">3 Active</p>
              <p className="text-xs text-blue-600 font-medium">Action Required</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <p className="text-4xl font-extrabold gradient-text mb-1">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-slate-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 section-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              One Platform,<br />
              <span className="gradient-text">Complete Business Coverage</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg max-w-2xl mx-auto">
              From compliance to technology, Infofin delivers enterprise-grade solutions that grow with your business.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={fadeUp} className="group">
                  <Link href={s.href} className="block bg-white rounded-2xl p-7 border border-slate-100 shadow-sm card-hover cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm text-sm">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Infofin */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Why Choose Us</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-slate-900 mb-5">
                The trusted partner for<br /><span className="gradient-text">modern businesses</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-lg mb-8 leading-relaxed">
                We combine deep financial expertise with cutting-edge technology to deliver compliance, clarity, and control — all in one place.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3 mb-8">
                {features.map((f) => (
                  <motion.li key={f} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{f}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp}>
                <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm">
                  Our Story <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Dedicated Support", desc: "Personal account manager always available", color: "bg-blue-50 text-blue-600" },
                  { icon: Shield, label: "100% Compliant", desc: "Zero penalty track record with GST", color: "bg-emerald-50 text-emerald-600" },
                  { icon: Zap, label: "Fast Turnaround", desc: "48-hour SLA on most filings", color: "bg-orange-50 text-orange-600" },
                  { icon: Award, label: "Expert Team", desc: "CA, CS and tech professionals on staff", color: "bg-violet-50 text-violet-600" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{item.label}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Industries We Serve</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Built for every type of business</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {ind}
              </motion.span>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Explore industry solutions <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {Array.isArray(testimonials) && testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Client Success Stories</p>
              <h2 className="text-4xl font-extrabold text-slate-900">
                Trusted by businesses<br /><span className="gradient-text">across India</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-5 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                      {t.clientName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.clientName}</p>
                      <p className="text-xs text-slate-400">{t.designation}, {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-300/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-5">
              Ready to transform<br />your business operations?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Get a free consultation with our experts and discover how Infofin can simplify your compliance, automate your workflows, and grow your business.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-consultation" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm">
                Book Free Consultation
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-blue-700/50 text-white font-bold rounded-xl border border-white/20 hover:bg-blue-700/80 transition-colors text-sm">
                Talk to an Expert
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
