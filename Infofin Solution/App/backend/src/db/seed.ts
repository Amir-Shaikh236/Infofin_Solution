import { db } from "./index";
import { blogPostsTable, careersTable, consultationsTable, servicesTable, testimonialsTable, adminsTable } from "./schema";
import { exit } from "process";

const blogData = [
    {
        title: "Simplifying GST Compliance for Indian Startups",
        slug: "simplifying-gst-compliance-startups",
        excerpt: "Everything you need to know about GST registration, filing, and automation.",
        content: "GST compliance is a critical pillar for any growing business in India. Using the Enterprise Asset Suite, you can automate your filing process...",
        category: "Taxation",
        author: "Mohammed Amer",
        coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        published: true,
    },
    {
        title: "The Future of AI in Modern Bookkeeping",
        slug: "ai-modern-bookkeeping",
        excerpt: "How Artificial Intelligence is reducing manual data entry and improving accuracy.",
        content: "Modern accounting is shifting from manual spreadsheets to AI-driven insights. Our latest module uses OCR to scan invoices automatically...",
        category: "AI & Automation",
        author: "Admin Team",
        coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        published: true,
    }
];

const careerData = [
    {
        title: "Junior Full-Stack Developer (MERN)",
        department: "Engineering",
        location: "Pune, MH (Hybrid)",
        type: "Full-time",
        description: "Join our core team to build AI-driven financial tools. You will work on React frontends and Node.js microservices.",
        requirements: "Experience with MongoDB, Express, React, and Node.js. Knowledge of TypeScript and Drizzle ORM is a plus.",
        active: true,
    },
    {
        title: "Taxation & GST Consultant",
        department: "Finance",
        location: "Remote / Pune",
        type: "Contract",
        description: "Help our clients navigate complex GST filings and taxation workflows using our automated ERP platform.",
        requirements: "CA Inter or equivalent. Deep understanding of Indian GST laws and electronic invoicing.",
        active: true,
    },
    {
        title: "Product Designer (UI/UX)",
        department: "Design",
        location: "Bangalore, KA",
        type: "Full-time",
        description: "Design the next generation of business management dashboards. Focus on clarity, data visualization, and user efficiency.",
        requirements: "Proficiency in Figma and experience designing complex SaaS dashboards.",
        active: true,
    }
];

const consultationData = [
    {
        name: "Rajesh Kumar",
        companyName: "Kumar Manufacturing Ltd",
        email: "rajesh@kumar-mfg.com",
        phone: "+91 98765 43210",
        serviceInterested: "GST & Taxation",
        message: "We are looking to automate our monthly GST filing process and need a technical audit of our current systems.",
        status: "new",
    },
    {
        name: "Sneha Patil",
        companyName: "FreshBasket E-commerce",
        email: "sneha.p@freshbasket.in",
        phone: "+91 88888 77777",
        serviceInterested: "ERP Solutions",
        message: "Need a custom inventory management system that integrates with our existing billing software.",
        status: "in-progress",
    },
    {
        name: "Amitabh Shah",
        companyName: "Global Logistics Pune",
        email: "ashah@globallogistics.com",
        phone: "+91 77766 55544",
        serviceInterested: "AI & Automation",
        message: "Interested in AI-powered invoice scanning to reduce manual data entry for our accounts team.",
        status: "new",
    }
];

const serviceData = [
    {
        name: "GST & Taxation",
        category: "Compliance",
        description: "Complete GST compliance management including registration, monthly filing, and audit support.",
        icon: "FileText",
        features: "Registration,Monthly Returns,E-invoicing,Tax Planning",
        active: true,
    },
    {
        name: "AI & Automation",
        category: "Technology",
        description: "Transform your accounting with smart invoice scanning and automated financial reporting.",
        icon: "Cpu",
        features: "OCR Scanning,Automated Workflows,Real-time Alerts",
        active: true,
    },
    {
        name: "ERP Solutions",
        category: "Technology",
        description: "Cloud-based enterprise resource planning for billing, inventory, and payroll management.",
        icon: "Building2",
        features: "Inventory Tracking,Payroll Management,Multi-branch Sync",
        active: true,
    },
    {
        name: "Audit Support",
        category: "Compliance",
        description: "Comprehensive internal and statutory audit documentation for seamless compliance.",
        icon: "Shield",
        features: "Internal Audit,Stock Verification,Compliance Review",
        active: true,
    }
];

const testimonialData = [
    {
        clientName: "Vikram Deshmukh",
        company: "Deshmukh Tech Solutions",
        designation: "Founder & CEO",
        content: "Infofin has completely transformed how we handle our monthly GST filings. The automation is seamless, and the real-time alerts have saved us from numerous penalties.",
        rating: 5,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        active: true,
    },
    {
        clientName: "Priya Sharma",
        company: "Creative Studio Pune",
        designation: "Operations Manager",
        content: "The ERP module is a lifesaver. Tracking multi-branch inventory used to take days; now it happens in real-time. Highly recommend for any growing business.",
        rating: 5,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        active: true,
    },
    {
        clientName: "Anil Kulkarni",
        company: "Kulkarni & Sons Manufacturing",
        designation: "Managing Director",
        content: "Finally, a financial suite that understands the Indian market. The AI invoice scanning is fast and incredibly accurate. A great investment for our accounts team.",
        rating: 4,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
        active: true,
    }
];

// const adminData = [
//     {
//         username: "admin",
//         // This is the bcrypt hash for the word "admin"
//         // If your backend uses a different hashing method, you'll need to generate a new hash.
//         passwordHash: "$2b$10$YourHashedPasswordExampleHere...",
//         role: "admin"
//     }
// ];

async function main() {
    console.log("🚀 Starting Global Database Seed...");

    try {
        console.log("  - Clearing tables...");
        await db.delete(testimonialsTable);
        await db.delete(servicesTable);
        await db.delete(careersTable);
        await db.delete(consultationsTable);
        await db.delete(blogPostsTable);
        await db.delete(adminsTable);

        console.log("  - Seeding Testimonials...");
        await db.insert(testimonialsTable).values(testimonialData);

        console.log("  - Seeding Services...");
        await db.insert(servicesTable).values(serviceData);

        console.log("  - Seeding Careers...");
        await db.insert(careersTable).values(careerData);

        console.log("  - Seeding Consultations...");
        await db.insert(consultationsTable).values(consultationData);

        console.log("  - Seeding Blog Posts...");
        await db.insert(blogPostsTable).values(blogData);

        // console.log("  - Seeding Admin User...");
        // await db.insert(adminsTable).values(adminData);

        console.log("✅ All data seeded successfully!");
        exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        exit(1);
    }
}

main();