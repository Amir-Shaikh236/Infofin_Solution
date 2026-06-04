import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { CheckCircle, ArrowRight, FileText, AlertTriangle, Calculator, Receipt } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const services = [
  { icon: FileText, title: "GST Registration", items: ["New business registration", "Voluntary registration", "Cancellation & amendments", "Certificate delivery"] },
  { icon: Receipt, title: "GST Filing", items: ["GSTR-1 (Monthly/Quarterly)", "GSTR-3B (Monthly)", "GSTR-9 (Annual Return)", "GSTR-4, GSTR-7, GSTR-8"] },
  { icon: AlertTriangle, title: "Notice Handling", items: ["SCN response preparation", "Assessment order appeals", "Departmental hearing support", "Penalty mitigation"] },
  { icon: Calculator, title: "Tax Planning", items: ["Input tax credit optimization", "Reverse charge advisory", "Export refund claims", "Composition scheme advisory"] },
];

export default function GstTaxation() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">GST & Taxation</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Zero-stress<br /><span className="gradient-text">GST compliance</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-8">
              Complete GST services — registration, filing, audit support, notice handling, and tax planning. We handle every aspect of your GST compliance so you can focus on growth.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-3">
              <Link href="/book-consultation" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">Get Started</Link>
              <Link href="/contact" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">Talk to Expert</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Complete GST Service Suite</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">From initial registration to complex notice responses — we cover every aspect of your GST compliance journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                      <ul className="space-y-2">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Get your GST compliance in order today</h2>
          <p className="text-blue-100 mb-8">Schedule a free consultation with our GST experts and get a compliance health check.</p>
          <Link href="/book-consultation" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
