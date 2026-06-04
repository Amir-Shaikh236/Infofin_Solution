import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useListBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from "@workspace/api-client-react";
import { Plus, Trash2, Edit3, CheckCircle, XCircle, X } from "lucide-react";

const categories = ["GST & Taxation", "ERP Solutions", "AI Automation", "Audit Support", "Bookkeeping", "Business Registration", "General"];

const EMPTY = { title: "", excerpt: "", content: "", author: "Infofin Team", category: "GST & Taxation", published: false };

export default function AdminBlog() {
  const { data: posts, refetch } = useListBlogPosts();
  const create = useCreateBlogPost();
  const update = useUpdateBlogPost();
  const remove = useDeleteBlogPost();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);

  const openNew = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (p: any) => { setForm({ title: p.title, excerpt: p.excerpt, content: p.content, author: p.author, category: p.category, published: p.published }); setEditId(p.id); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) await update.mutateAsync({ blogPostId: editId, data: form });
    else await create.mutateAsync({ data: form });
    setShowForm(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    await remove.mutateAsync({ blogPostId: id });
    refetch();
  };

  const togglePublish = async (id: number, published: boolean) => {
    await update.mutateAsync({ blogPostId: id, data: { published: !published } });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
            <p className="text-slate-500 text-sm mt-0.5">{posts?.length ?? 0} posts</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">{editId ? "Edit Post" : "New Blog Post"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Author</label>
                    <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt *</label>
                  <textarea required rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Content *</label>
                  <textarea required rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Published</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={create.isPending || update.isPending} className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm">
                    {editId ? "Update Post" : "Create Post"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {(posts ?? []).length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">No blog posts yet. Create your first post.</div>
            ) : (posts ?? []).map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-slate-900 text-sm truncate">{p.title}</h3>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${p.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{p.published ? "Published" : "Draft"}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{p.category}</span>
                    <span>{p.author}</span>
                    <span>{new Date(p.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(p.id, p.published)} title={p.published ? "Unpublish" : "Publish"} className={`p-1.5 rounded-lg transition-colors ${p.published ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}>
                    {p.published ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
