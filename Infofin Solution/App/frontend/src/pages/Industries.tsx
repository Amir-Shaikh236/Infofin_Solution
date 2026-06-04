import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { ArrowRight, ShoppingBag, Factory, Globe, Activity, UtensilsCrossed, Rocket, Truck, GraduationCap, Briefcase, Users } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const industries = [
  { icon: ShoppingBag, name: "Retail", desc: "GST billing, inventory management, and multi-store ERP for retail chains and standalone stores.", color: "from-blue-500 to-blue-600", challenges: ["Complex GST rates on products", "Multi-store inventory sync", "Daily sales reconciliation", "Customer loyalty programs"] },
  { icon: Factory, name: "Manufacturing", desc: "Production planning, raw material tracking, GST compliance, and factory management systems.", color: "from-emerald-500 to-emerald-600", challenges: ["Input credit on raw materials", "Job work GST treatment", "Batch and lot tracking", "Waste and scrap accounting"] },
  { icon: Globe, name: "E-Commerce", desc: "Multi-platform order management, marketplace GST compliance, and integrated accounting.", color: "from-violet-500 to-violet-600", challenges: ["TCS on marketplace sales", "Multi-state IGST", "Return order accounting", "Platform reconciliation"] },
  { icon: Activity, name: "Healthcare", desc: "Healthcare-specific accounting, GST on medical services, and compliance management.", color: "from-red-500 to-red-600", challenges: ["Exempt vs taxable services", "Drug and medicine GST", "Insurance billing", "Regulatory compliance"] },
  { icon: UtensilsCrossed, name: "Restaurants & F&B", desc: "Restaurant billing, GST on food services, inventory management, and POS integration.", color: "from-orange-500 to-orange-600", challenges: ["Composite supply rules", "Input credit restrictions", "Zomato/Swiggy TCS", "Perishable inventory"] },
  { icon: Rocket, name: "Startups", desc: "Startup-friendly compliance packages, funding documentation, and scalable ERP solutions.", color: "from-cyan-500 to-cyan-600", challenges: ["Incorporation & compliance", "Investor-ready books", "ESOP accounting", "Startup India benefits"] },
  { icon: Truck, name: "Logistics", desc: "E-way bill management, fleet expense tracking, and logistics-specific GST compliance.", color: "from-yellow-500 to-yellow-600", challenges: ["E-way bill automation", "RCM on freight", "Multi-state operations", "Vehicle expense tracking"] },
  { icon: GraduationCap, name: "Education", desc: "Fees management, payroll, and compliance for schools, colleges, and coaching institutes.", color: "from-pink-500 to-pink-600", challenges: ["Exemption applicability", "Fee collection accounting", "Staff payroll compliance", "Trust/society filing"] },
  { icon: Users, name: "Agencies & Consultants", desc: "Time and billing management, project accounting, and GST compliance for service businesses.", color: "from-indigo-500 to-indigo-600", challenges: ["Service-based invoicing", "Retainer billing", "Contractor payments", "Project-wise P&L"] },
  { icon: Briefcase, name: "Professional Services", desc: "Billing automation, compliance management, and accounting for law firms, CA firms, and consultants.", color: "from-slate-500 to-slate-600", challenges: ["Professional tax", "TDS on professional fees", "Trust account management", "Statutory compliance"] },
];

export default function Industries() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Industries We Serve</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Solutions built for<br /><span className="gradient-text">your industry</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed">
              Every industry has unique compliance challenges. We've built specialized solutions for ten major industry verticals across India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.1 }} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color} flex items-center justify-center shrink-0 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{ind.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{ind.desc}</p>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Key Challenges We Solve</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ind.challenges.map((c) => (
                            <div key={c} className="flex items-center gap-1.5 text-xs text-slate-600">
                              <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Don't see your industry?</h2>
          <p className="text-blue-100 mb-8">We work with businesses across all sectors. Contact us to discuss your specific needs.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Talk to Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
