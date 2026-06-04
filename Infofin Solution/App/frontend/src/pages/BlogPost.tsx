import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import PublicLayout from "@/layouts/PublicLayout";
import { useGetBlogPost } from "@workspace/api-client-react";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useGetBlogPost(Number(id));

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-16 max-w-3xl mx-auto px-6">
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-200 rounded-xl w-3/4" />
            <div className="h-4 bg-slate-200 rounded-xl w-1/2" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !post) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-16 max-w-3xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-lg mb-4">Blog post not found.</p>
          <Link href="/blog" className="text-blue-600 font-semibold text-sm hover:underline">Back to Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="hero-gradient pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">{post.title}</h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-5">{post.excerpt}</p>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              {post.content.split("\n\n").map((para, i) => (
                <p key={i} className="mb-5 leading-loose">{para}</p>
              ))}
            </div>
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Need expert help?</h3>
              <p className="text-slate-600 text-sm mb-5">Our team of specialists is ready to help you with your specific situation. Book a free consultation today.</p>
              <Link href="/book-consultation" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
