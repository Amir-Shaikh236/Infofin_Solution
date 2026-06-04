import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { CheckCircle, ArrowRight, Building2, Package, Users, CreditCard, FileText, Cpu } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const products = [
  { icon: Building2, name: "ERP Software", desc: "Full-suite ERP covering finance, inventory, sales, purchase, and operations in one integrated platform.", color: "from-blue-500 to-blue-600", features: ["Multi-branch support", "Real-time dashboards", "Custom workflows", "Role-based access"] },
  { icon: Package, name: "Inventory Management", desc: "Real-time stock tracking, multi-warehouse management, reorder alerts, and barcode scanning.", color: "from-emerald-500 to-emerald-600", features: ["Live stock levels", "Warehouse management", "Auto reorder alerts", "Barcode/QR support"] },
  { icon: CreditCard, name: "Billing Software", desc: "GST-compliant billing with e-invoice, e-way bill, payment links, and automated reminders.", color: "from-violet-500 to-violet-600", features: ["E-Invoice ready", "E-Way Bill automation", "Payment gateway integration", "Recurring billing"] },
  { icon: Users, name: "CRM System", desc: "Lead management, follow-up automation, customer history, and sales pipeline visualization.", color: "from-orange-500 to-orange-600", features: ["Lead tracking", "Sales pipeline", "Follow-up automation", "Customer insights"] },
  { icon: FileText, name: "Payroll Software", desc: "Automated salary processing, PF/ESI compliance, TDS on salary, and payslip generation.", color: "from-pink-500 to-pink-600", features: ["Salary computation", "PF/ESI filing", "TDS compliance", "Payslip generation"] },
  { icon: Cpu, name: "Accounting Software", desc: "Integrated accounting with GST, P&L, balance sheet, and financial reporting tools.", color: "from-cyan-500 to-cyan-600", features: ["GST-integrated", "P&L statements", "Balance sheet", "Bank reconciliation"] },
];

export default function ErpSolutions() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">ERP & Software Products</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Enterprise software<br /><span className="gradient-text">built for India</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-8">
              GST-compliant ERP, billing, inventory, CRM and payroll software designed for Indian businesses — integrated, powerful, and easy to use.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center gap-3">
              <Link href="/contact" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">Request Demo</Link>
              <Link href="/book-consultation" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">Talk to Expert</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">See our software in action</h2>
          <p className="text-blue-100 mb-8">Request a live demo and see how Infofin's software can transform your operations.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Request Live Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
