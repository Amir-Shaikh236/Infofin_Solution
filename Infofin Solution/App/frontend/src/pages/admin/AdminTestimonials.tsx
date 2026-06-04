import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "@workspace/api-client-react";
import { Plus, Trash2, Edit3, X, Star } from "lucide-react";

const EMPTY = { clientName: "", designation: "", company: "", content: "", rating: 5, featured: false };

export default function AdminTestimonials() {
  const { data: testimonials, refetch } = useListTestimonials();
  const create = useCreateTestimonial();
  const update = useUpdateTestimonial();
  const remove = useDeleteTestimonial();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);

  const openNew = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (t: any) => {
    setForm({ clientName: t.clientName, designation: t.designation, company: t.company, content: t.content, rating: t.rating, featured: t.featured });
    setEditId(t.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) await update.mutateAsync({ testimonialId: editId, data: form });
    else await create.mutateAsync({ data: form });
    setShowForm(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await remove.mutateAsync({ testimonialId: id });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
            <p className="text-slate-500 text-sm mt-0.5">{testimonials?.length ?? 0} testimonials</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">{editId ? "Edit Testimonial" : "New Testimonial"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name *</label>
                    <input required value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Designation</label>
                    <input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="CEO, Director..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Testimonial *</label>
                  <textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} className={`p-1.5 rounded-lg transition-colors ${form.rating >= r ? "text-amber-400" : "text-slate-200"}`}>
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Featured on homepage</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={create.isPending || update.isPending} className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 text-sm">
                    {editId ? "Update" : "Add Testimonial"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(testimonials ?? []).length === 0 ? (
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center text-slate-400 text-sm">No testimonials yet.</div>
          ) : (testimonials ?? []).map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <div className="flex gap-1.5">
                  {t.featured && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Featured</span>}
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-slate-600 text-sm italic mb-4 line-clamp-3">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.clientName[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.clientName}</p>
                  <p className="text-xs text-slate-400">{t.designation}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
