import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { Lock, Phone, Mail, FileText, BarChart2, MessageSquare } from "lucide-react";

export default function ClientPortal() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-20 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Client Portal</h1>
                <p className="text-slate-500 text-sm">Access your documents, reports, and compliance status</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  { icon: FileText, label: "Document Library", desc: "GST certificates, audit reports & filings" },
                  { icon: BarChart2, label: "Compliance Dashboard", desc: "Real-time status of all your filings" },
                  { icon: MessageSquare, label: "Direct Messaging", desc: "Chat with your account manager" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-100 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">Portal Access by Invitation</p>
                <p className="text-xs text-amber-700 leading-relaxed">Client portal access is provided to active Infofin clients. Contact us to receive your login credentials.</p>
              </div>

              <div className="space-y-3">
                <a href="mailto:info@infofinllp.com" className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  Request Access via Email
                </a>
                <a href="tel:+919876543210" className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  Call +91 98765 43210
                </a>
              </div>

              <p className="text-center text-xs text-slate-400 mt-5">
                Not a client yet?{" "}
                <Link href="/book-consultation" className="text-blue-600 font-medium hover:underline">
                  Book a free consultation
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
