import { motion } from "framer-motion";
import { Link } from "wouter";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Users, MessageSquare, FileText, Briefcase, Star, Layers, TrendingUp } from "lucide-react";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
};

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  const statCards = stats ? [
    { label: "Total Consultations", value: stats.totalConsultations, icon: Users, color: "bg-blue-50 text-blue-600", link: "/admin/consultations" },
    { label: "Contact Inquiries", value: stats.totalContacts, icon: MessageSquare, color: "bg-violet-50 text-violet-600", link: "/admin/contacts" },
    { label: "New Leads", value: stats.newLeads, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600", link: "/admin/consultations" },
    { label: "Blog Posts", value: stats.totalBlogPosts, icon: FileText, color: "bg-cyan-50 text-cyan-600", link: "/admin/blog" },
    { label: "Testimonials", value: stats.totalTestimonials, icon: Star, color: "bg-amber-50 text-amber-600", link: "/admin/testimonials" },
    { label: "Active Careers", value: stats.activeCareers, icon: Briefcase, color: "bg-pink-50 text-pink-600", link: "/admin/careers" },
  ] : [];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-slate-500 text-sm">Overview of your Infofin platform activity</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 bg-slate-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div key={card.label} variants={fadeUp}>
                    <Link href={card.link} className="block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-slate-900 mb-0.5">{card.value}</p>
                      <p className="text-sm text-slate-500">{card.label}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Recent Consultations</h2>
                <Link href="/admin/consultations" className="text-blue-600 text-xs font-semibold hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {stats?.recentConsultations?.slice(0, 5).map((c) => (
                  <div key={c.id} className="px-6 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.serviceInterested}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[c.status] ?? "bg-slate-100 text-slate-600"}`}>{c.status}</span>
                  </div>
                ))}
                {(!stats?.recentConsultations?.length) && (
                  <div className="px-6 py-8 text-center text-slate-400 text-sm">No consultations yet</div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Recent Contact Inquiries</h2>
                <Link href="/admin/contacts" className="text-blue-600 text-xs font-semibold hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {stats?.recentContacts?.slice(0, 5).map((c) => (
                  <div key={c.id} className="px-6 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.subject}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[c.status] ?? "bg-slate-100 text-slate-600"}`}>{c.status}</span>
                  </div>
                ))}
                {(!stats?.recentContacts?.length) && (
                  <div className="px-6 py-8 text-center text-slate-400 text-sm">No contacts yet</div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
