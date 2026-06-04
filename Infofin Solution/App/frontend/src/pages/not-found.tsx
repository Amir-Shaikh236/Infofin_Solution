import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="hero-gradient min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
          <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
              <Home className="w-4 h-4" /> Go Home
            </Link>
            <button onClick={() => window.history.back()} className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
