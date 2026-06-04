import { motion } from "framer-motion";
import { Link } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const categoryColors: Record<string, string> = {
  "GST & Taxation": "bg-blue-100 text-blue-700",
  "ERP Solutions": "bg-emerald-100 text-emerald-700",
  "AI Automation": "bg-violet-100 text-violet-700",
  "Audit Support": "bg-orange-100 text-orange-700",
  "Bookkeeping": "bg-cyan-100 text-cyan-700",
};

export default function Blog() {
  const { data, isLoading } = useListBlogPosts();

  const posts = Array.isArray(data) ? data : data?.posts || [];

  const published = posts?.filter((p) => p.published) ?? [];

  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-2xl mx-auto">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Insights & Resources</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
              The Infofin<br /><span className="gradient-text">Knowledge Hub</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500">
              Expert insights on GST, taxation, ERP, and business technology from our team.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : published.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No blog posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {published.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}>
                  <Link href={`/blog/${post.id}`} className="block bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer h-full">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 h-36 flex items-center justify-center">
                      <Tag className="w-10 h-10 text-blue-300" />
                    </div>
                    <div className="p-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                        {post.category}
                      </span>
                      <h2 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
