import { motion } from "framer-motion";
import { useState } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import { useCreateConsultation } from "@workspace/api-client-react";
import { CheckCircle, Calendar, Clock, Phone } from "lucide-react";

const services = [
  "GST Registration", "GST Filing", "GST Notice Handling", "TDS Filing", "Income Tax Filing",
  "Tax Planning", "Bookkeeping & Accounting", "Internal Audit", "Tax Audit Support", "Stock Audit",
  "ERP Implementation", "Billing Software", "Inventory Management", "CRM System", "Payroll Software",
  "AI Automation", "LLP Registration", "Pvt Ltd Registration", "MSME Registration", "Other",
];

export default function BookConsultation() {
  const [form, setForm] = useState({ name: "", companyName: "", email: "", phone: "", serviceInterested: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const createConsultation = useCreateConsultation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createConsultation.mutateAsync({ data: form });
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Free Consultation</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              Book your free<br /><span className="gradient-text">expert consultation</span>
            </h1>
            <p className="text-xl text-slate-500">
              Speak with a dedicated expert who understands your industry. No obligation, no sales pressure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">What to expect</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Clock, title: "30-minute call", desc: "A focused discussion with a dedicated expert on your specific needs." },
                  { icon: CheckCircle, title: "No obligations", desc: "Free consultation with zero commitment required from your side." },
                  { icon: Calendar, title: "Quick scheduling", desc: "We'll confirm your appointment within 2 business hours." },
                  { icon: Phone, title: "Expert match", desc: "You'll be matched with a specialist for your service area." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm font-semibold text-slate-800 mb-1">Already a client?</p>
                <p className="text-xs text-slate-600">Log in to your client portal for faster support and direct access to your account manager.</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-20 text-center bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Consultation Booked!</h3>
                  <p className="text-slate-600 max-w-sm">We've received your request. Our team will contact you within 2 business hours to confirm your consultation slot.</p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Your Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Rajesh Sharma" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                      <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Company" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                      <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Interested In <span className="text-red-500">*</span></label>
                    <select required value={form.serviceInterested} onChange={(e) => setForm({ ...form, serviceInterested: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option value="">Select a service...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Details</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Tell us about your business and specific requirements..." />
                  </div>
                  <button type="submit" disabled={createConsultation.isPending} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-all shadow-sm text-sm">
                    {createConsultation.isPending ? "Booking..." : "Book Free Consultation"}
                  </button>
                  <p className="text-xs text-slate-400 text-center">By submitting, you agree to our privacy policy. We never share your information with third parties.</p>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
