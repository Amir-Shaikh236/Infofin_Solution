import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useListCareers, useCreateCareer, useUpdateCareer, useDeleteCareer } from "@workspace/api-client-react";
import { Plus, Trash2, Edit3, X, MapPin, Clock } from "lucide-react";

const departments = ["Finance & Accounting", "Technology", "Operations", "Sales & Marketing", "HR & Admin"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const EMPTY = { title: "", department: "Finance & Accounting", location: "Mumbai", type: "Full-time", description: "", requirements: "", active: true };

export default function AdminCareers() {
  const { data: careers, refetch } = useListCareers();
  const create = useCreateCareer();
  const update = useUpdateCareer();
  const remove = useDeleteCareer();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);

  const openNew = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (c: any) => {
    setForm({ title: c.title, department: c.department, location: c.location, type: c.type, description: c.description, requirements: c.requirements ?? "", active: c.active });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) await update.mutateAsync({ careerId: editId, data: form });
    else await create.mutateAsync({ data: form });
    setShowForm(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this career posting?")) return;
    await remove.mutateAsync({ careerId: id });
    refetch();
  };

  const toggleActive = async (id: number, active: boolean) => {
    await update.mutateAsync({ careerId: id, data: { active: !active } });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
            <p className="text-slate-500 text-sm mt-0.5">{careers?.length ?? 0} positions</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Add Position
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">{editId ? "Edit Position" : "New Position"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      {departments.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      {jobTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
                  <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Requirements</label>
                  <textarea rows={3} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="List key requirements..." />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Active (publicly visible)</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={create.isPending || update.isPending} className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 text-sm">
                    {editId ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {(careers ?? []).length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center text-slate-400 text-sm">No career positions yet.</div>
          ) : (careers ?? []).map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{job.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${job.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{job.active ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{job.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleActive(job.id, job.active)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${job.active ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
                  {job.active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => openEdit(job)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(job.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
