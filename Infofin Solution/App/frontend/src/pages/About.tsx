import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { ArrowRight, Users, Award, TrendingUp, Shield, Target, Eye } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const values = [
  { icon: Shield, title: "Compliance First", desc: "We never compromise on accuracy and compliance. Your business stays clean, always." },
  { icon: Users, title: "Client-Centric", desc: "We build long-term relationships, not transactional engagements. Your success is our success." },
  { icon: TrendingUp, title: "Technology-Driven", desc: "We leverage AI and automation to deliver faster, smarter, and more accurate services." },
  { icon: Award, title: "Expert Team", desc: "Our team of CAs, CSs, and technology professionals brings decades of combined experience." },
];

const team = [
  { name: "Rajiv Sharma", role: "Founder & CEO", exp: "15+ years in finance & technology", bg: "from-blue-500 to-blue-600" },
  { name: "Priya Nair", role: "Head of Taxation", exp: "Chartered Accountant, 12 years GST", bg: "from-cyan-500 to-cyan-600" },
  { name: "Arjun Mehta", role: "Chief Technology Officer", exp: "ERP & AI systems architect, 10 years", bg: "from-violet-500 to-violet-600" },
  { name: "Sunita Joshi", role: "Head of Operations", exp: "Business operations & audit, 8 years", bg: "from-emerald-500 to-emerald-600" },
];

export default function About() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">About Infofin</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              India's trusted partner for<br /><span className="gradient-text">finance & technology</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed">
              Infofin Solutions LLP is not a CA firm — we are a full-spectrum business support company that combines financial expertise with enterprise technology to serve modern businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Built to solve real business problems</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Founded over a decade ago, Infofin Solutions LLP was born from a simple observation: Indian businesses — especially MSMEs and startups — were struggling with the complexity of GST compliance, bookkeeping, and technology adoption all at once.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                We set out to build a company that would bridge the gap between traditional accounting services and modern business technology. Today, we serve 500+ clients across India, providing everything from GST filing to AI-powered ERP systems.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                We are not a Chartered Accountant firm. We are a business support partner — one that understands both the regulatory landscape and the technology tools that modern businesses need to grow.
              </p>
              <Link href="/book-consultation" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">
                Work With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Active Clients", color: "bg-blue-50 border-blue-100" },
                  { value: "10+", label: "Years Experience", color: "bg-cyan-50 border-cyan-100" },
                  { value: "50+", label: "Team Members", color: "bg-violet-50 border-violet-100" },
                  { value: "99%", label: "Satisfaction Rate", color: "bg-emerald-50 border-emerald-100" },
                ].map((s) => (
                  <div key={s.label} className={`rounded-2xl p-8 border ${s.color} text-center`}>
                    <p className="text-4xl font-extrabold gradient-text mb-2">{s.value}</p>
                    <p className="text-slate-600 text-sm font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 section-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To democratize access to world-class financial services and business technology for every Indian business — from the corner store to the enterprise — by combining deep expertise with intelligent automation.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become India's most trusted business support platform — where every startup, MSME, and enterprise can access integrated financial, compliance, and technology services in one place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-4xl font-extrabold text-slate-900">What guides us every day</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{v.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Leadership Team</p>
            <h2 className="text-4xl font-extrabold text-slate-900">The people behind Infofin</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center card-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl`}>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{member.name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-slate-400 text-xs">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
