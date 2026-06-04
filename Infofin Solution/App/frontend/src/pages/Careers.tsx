import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { useListCareers } from "@workspace/api-client-react";
import { MapPin, Clock, Briefcase, ArrowRight, Users, TrendingUp, Award } from "lucide-react";

const perks = [
  { icon: TrendingUp, title: "Growth-first culture", desc: "Regular training, certifications, and clear career paths." },
  { icon: Users, title: "Collaborative team", desc: "Work alongside CAs, engineers, and business experts." },
  { icon: Award, title: "Competitive compensation", desc: "Market-beating salaries, bonuses, and benefits." },
];

export default function Careers() {
  const { data, isLoading } = useListCareers();
  const careersList = Array.isArray(data) ? data : data?.careers || [];
  const active = careersList?.filter((c) => c.active) ?? [];

  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Join Our Team</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Build the future of<br /><span className="gradient-text">business finance</span>
            </h1>
            <p className="text-xl text-slate-500">
              Join a team of experts passionate about simplifying financial compliance and technology for Indian businesses.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{p.title}</h4>
                    <p className="text-slate-600 text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Open Positions</h2>
            <p className="text-slate-500 text-sm">{active.length} open role{active.length !== 1 ? "s" : ""} across our teams</p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : active.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-400 text-lg mb-2">No open positions right now</p>
              <p className="text-slate-400 text-sm">Check back soon or send your resume to careers@infofinllp.com</p>
            </div>
          ) : (
            <div className="space-y-4">
              {active.map((job, i) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{job.department}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3 max-w-2xl">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                      </div>
                    </div>
                    <Link href="/contact" className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Don't see a suitable role?</h3>
            <p className="text-slate-600 text-sm mb-5">We're always looking for talented people. Send your resume and we'll keep you in mind for future openings.</p>
            <a href="mailto:careers@infofinllp.com" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
