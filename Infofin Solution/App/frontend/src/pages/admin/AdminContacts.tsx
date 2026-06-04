import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useListContacts, useUpdateContact, useDeleteContact } from "@workspace/api-client-react";
import { Search, Trash2, Mail, Phone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const statusOptions = ["new", "in-progress", "closed"];
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  closed: "bg-slate-100 text-slate-600",
};

export default function AdminContacts() {
  const { data: contacts, refetch } = useListContacts();
  const update = useUpdateContact();
  const remove = useDeleteContact();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = (contacts ?? []).filter((c) => {
    const matchSearch = [c.name, c.email, c.phone, c.subject, c.companyName].some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: number, status: string) => {
    await update.mutateAsync({ contactId: id, data: { status } });
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this contact?")) return;
    await remove.mutateAsync({ contactId: id });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} contact{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Search contacts..." />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              <option value="all">All Status</option>
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Name", "Contact", "Subject", "Message", "Status", "Date", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">No contacts found</td></tr>
                ) : filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                      {c.companyName && <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Building2 className="w-3 h-3" />{c.companyName}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${c.email}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</a>
                        <a href={`tel:${c.phone}`} className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</a>
                      </div>
                    </td>
                    <td className="px-5 py-4"><p className="text-sm text-slate-700 max-w-[140px]">{c.subject}</p></td>
                    <td className="px-5 py-4"><p className="text-xs text-slate-500 max-w-[180px] line-clamp-2">{c.message}</p></td>
                    <td className="px-5 py-4">
                      <select value={c.status} onChange={(e) => handleStatusChange(c.id, e.target.value)} className={cn("px-2.5 py-1.5 rounded-lg text-xs font-semibold border-0 focus:outline-none cursor-pointer", statusColors[c.status] ?? "bg-slate-100 text-slate-600")}>
                        {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
