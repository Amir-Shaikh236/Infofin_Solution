import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { ArrowRight, Cpu, Zap, Brain, ScanLine, BarChart2, Bell, GitBranch, Database } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: Brain, title: "AI Accounting Assistant", desc: "Automatically categorize transactions, match invoices, and generate journal entries with AI-driven accuracy.", color: "from-blue-500 to-blue-600" },
  { icon: Bell, title: "Smart GST Alerts", desc: "Proactive alerts for filing deadlines, ITC mismatches, and compliance issues — before they become penalties.", color: "from-orange-500 to-orange-600" },
  { icon: GitBranch, title: "Workflow Automation", desc: "Automate repetitive compliance tasks like invoice matching, payment reminders, and report generation.", color: "from-violet-500 to-violet-600" },
  { icon: ScanLine, title: "Smart Invoice Scanner", desc: "AI-powered OCR that reads invoices, extracts data, and automatically posts entries to your books.", color: "from-cyan-500 to-cyan-600" },
  { icon: BarChart2, title: "AI Analytics Dashboard", desc: "Real-time business intelligence with AI-generated insights, trend analysis, and actionable recommendations.", color: "from-emerald-500 to-emerald-600" },
  { icon: Database, title: "Real-Time Monitoring", desc: "Continuous monitoring of your financial data with anomaly detection and instant alerts on unusual activity.", color: "from-pink-500 to-pink-600" },
];

export default function AiAutomation() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              AI-Powered Platform
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Automate your finances<br /><span className="gradient-text">with AI</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-8">
              Cutting-edge artificial intelligence and automation tools that eliminate manual work, prevent compliance errors, and give you real-time financial intelligence.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center gap-3">
              <Link href="/contact" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm inline-flex items-center gap-2"><Zap className="w-4 h-4" />See AI in Action</Link>
              <Link href="/book-consultation" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">Free Consultation</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3">AI-Powered Features</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Six powerful AI modules that work together to automate your financial operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to automate your business?</h2>
          <p className="text-blue-100 mb-8">Get a free demo of our AI automation platform and see the time savings in action.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Request Free Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
