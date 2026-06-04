import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import {
  LayoutDashboard, Users, MessageSquare, FileText, Briefcase, Star, Settings, LogOut, ChevronRight, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminLogout, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const nav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Consultations", href: "/admin/consultations", icon: Users },
  { name: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Services", href: "/admin/services", icon: Layers },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const logout = useAdminLogout();
  const qc = useQueryClient();

  const handleLogout = async () => {
    await logout.mutateAsync({});
    qc.invalidateQueries({ queryKey: getGetAdminMeQueryKey() });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 fixed top-0 left-0 h-full z-40">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">IF</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm leading-none">Infofin</span>
              <span className="block text-[9px] text-slate-400 leading-none font-medium tracking-wide">ADMIN PANEL</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">Management</p>
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = location === item.href || location.startsWith(item.href + "/");
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.name}
                    {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-slate-100">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors mb-1">
            <Settings className="w-4 h-4" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64 min-h-screen">
        <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-medium capitalize">
              {nav.find((n) => location.startsWith(n.href))?.name ?? "Dashboard"}
            </span>
          </nav>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
