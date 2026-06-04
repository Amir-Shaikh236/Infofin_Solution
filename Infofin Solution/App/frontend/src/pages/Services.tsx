import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { FileText, BarChart3, Shield, Building2, Cpu, TrendingUp, ChevronRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const categories = [
  {
    icon: FileText, title: "GST & Taxation", color: "from-blue-500 to-blue-600", href: "/services/gst-taxation",
    desc: "End-to-end GST compliance — from registration to filing, notice handling, and tax planning.",
    services: ["GST Registration", "GST Filing (GSTR-1, 3B, 9)", "E-Invoice & E-Way Bill", "TDS Filing", "Income Tax Filing", "Tax Planning & Advisory", "GST Audit Support", "GST Notice Handling"],
  },
  {
    icon: BarChart3, title: "Bookkeeping & Accounting", color: "from-cyan-500 to-cyan-600", href: "/services",
    desc: "Professional bookkeeping and accounting services for accurate financial records.",
    services: ["Daily Bookkeeping", "Ledger Maintenance", "Bank Reconciliation", "P&L Statements", "Balance Sheet", "Cash Flow Reports", "Expense Tracking", "Financial Reporting"],
  },
  {
    icon: Shield, title: "Audit Support", color: "from-violet-500 to-violet-600", href: "/services/audit-support",
    desc: "Comprehensive audit services including documentation, compliance, and representation.",
    services: ["Internal Audit", "Tax Audit Support", "Stock Audit", "Compliance Audit", "Audit Documentation", "Process Reviews", "Risk Assessment", "Management Reports"],
  },
  {
    icon: Building2, title: "ERP & Software", color: "from-emerald-500 to-emerald-600", href: "/services/erp-solutions",
    desc: "Enterprise-grade software for billing, inventory, CRM, payroll, and more.",
    services: ["ERP Software", "Billing Software", "Inventory Management", "CRM System", "Payroll Software", "GST Software", "Multi-Branch Management", "Accounting Software"],
  },
  {
    icon: Cpu, title: "AI & Automation", color: "from-orange-500 to-orange-600", href: "/services/ai-automation",
    desc: "AI-powered tools that automate accounting, alert on compliance issues, and provide insights.",
    services: ["AI Accounting Assistant", "Smart GST Alerts", "Workflow Automation", "Invoice Scanning", "AI Analytics Dashboard", "Real-Time Monitoring", "Data Integration", "Predictive Reports"],
  },
  {
    icon: TrendingUp, title: "Business Registration", color: "from-pink-500 to-pink-600", href: "/services",
    desc: "Complete business registration and ROC compliance services for new and existing businesses.",
    services: ["LLP Registration", "Pvt Ltd Registration", "OPC Registration", "MSME Registration", "Startup India", "Trademark Assistance", "ROC Compliance", "Digital Signature"],
  },
];

export default function Services() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Our Services</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              <span className="gradient-text">Complete coverage</span><br />for your business
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed">
              Six integrated service areas covering every aspect of business compliance, accounting, and technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-3">
                  <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{cat.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{cat.desc}</p>
                    <Link href={cat.href} className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:gap-2 transition-all">
                      Explore <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="col-span-2 p-8">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Included Services</p>
                    <div className="grid grid-cols-2 gap-3">
                      {cat.services.map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-slate-700 text-sm">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
