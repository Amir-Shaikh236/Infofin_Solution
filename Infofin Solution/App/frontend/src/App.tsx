import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGetAdminMe } from "@workspace/api-client-react";
import { ReactNode } from "react";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import GstTaxation from "@/pages/GstTaxation";
import AuditSupport from "@/pages/AuditSupport";
import ErpSolutions from "@/pages/ErpSolutions";
import SoftwareProducts from "@/pages/SoftwareProducts";
import AiAutomation from "@/pages/AiAutomation";
import Industries from "@/pages/Industries";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import BookConsultation from "@/pages/BookConsultation";
import ClientPortal from "@/pages/ClientPortal";
import NotFound from "@/pages/not-found";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminConsultations from "@/pages/admin/AdminConsultations";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminCareers from "@/pages/admin/AdminCareers";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminServices from "@/pages/admin/AdminServices";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function AdminGuard({ children }: { children: ReactNode }) {
  const { data: me, isLoading } = useGetAdminMe({ query: { retry: false } });
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!me) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/gst-taxation" component={GstTaxation} />
      <Route path="/services/audit-support" component={AuditSupport} />
      <Route path="/services/erp-solutions" component={ErpSolutions} />
      <Route path="/services/software-products" component={SoftwareProducts} />
      <Route path="/services/ai-automation" component={AiAutomation} />
      <Route path="/industries" component={Industries} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/client-portal" component={ClientPortal} />

      {/* Admin routes — all behind auth guard */}
      <Route path="/admin">
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      </Route>
      <Route path="/admin/dashboard">
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      </Route>
      <Route path="/admin/consultations">
        <AdminGuard>
          <AdminConsultations />
        </AdminGuard>
      </Route>
      <Route path="/admin/contacts">
        <AdminGuard>
          <AdminContacts />
        </AdminGuard>
      </Route>
      <Route path="/admin/blog">
        <AdminGuard>
          <AdminBlog />
        </AdminGuard>
      </Route>
      <Route path="/admin/careers">
        <AdminGuard>
          <AdminCareers />
        </AdminGuard>
      </Route>
      <Route path="/admin/testimonials">
        <AdminGuard>
          <AdminTestimonials />
        </AdminGuard>
      </Route>
      <Route path="/admin/services">
        <AdminGuard>
          <AdminServices />
        </AdminGuard>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
