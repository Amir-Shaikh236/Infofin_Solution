import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { CheckCircle, ArrowRight, Shield, ClipboardCheck, Search, FileCheck } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const auditTypes = [
  { icon: Shield, title: "Internal Audit", desc: "Systematic examination of your business processes, controls, and risk management systems to ensure operational efficiency and governance.", color: "bg-blue-50 text-blue-600" },
  { icon: ClipboardCheck, title: "Tax Audit Support", desc: "Complete support for Section 44AB tax audit including documentation, Form 3CD preparation, and auditor coordination.", color: "bg-violet-50 text-violet-600" },
  { icon: Search, title: "Stock Audit", desc: "Physical verification of inventory, reconciliation with books, valuation review, and identification of slow-moving and obsolete stock.", color: "bg-emerald-50 text-emerald-600" },
  { icon: FileCheck, title: "Compliance Audit", desc: "Review of compliance with GST, TDS, labour law, and other regulatory requirements to identify gaps before they become liabilities.", color: "bg-orange-50 text-orange-600" },
];

export default function AuditSupport() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Audit Support</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Audit-ready,<br /><span className="gradient-text">always</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-8">
              Comprehensive audit support services that keep your business compliant, organized, and prepared for any regulatory scrutiny.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-3">
              <Link href="/book-consultation" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">Get Audit Support</Link>
              <Link href="/contact" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">Learn More</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Types of Audit Services</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our audit support covers every type of audit your business may face — from routine internal reviews to statutory requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditTypes.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${a.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{a.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Need audit support? Start today.</h2>
          <p className="text-blue-100 mb-8">Our audit experts will assess your current state and create a compliance roadmap.</p>
          <Link href="/book-consultation" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
