import { Router, type IRouter } from "express";
import { eq, desc, count, and } from "drizzle-orm";
import { db, adminsTable, consultationsTable, contactsTable, blogPostsTable, testimonialsTable, careersTable } from "../db";
import { AdminLoginBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import crypto from "node:crypto";

const router: IRouter = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "infofin_salt_2024").digest("hex");
}

async function ensureAdminExists() {
  const [existing] = await db.select().from(adminsTable).where(eq(adminsTable.username, "admin")).limit(1);
  if (!existing) {
    await db.insert(adminsTable).values({
      username: "admin",
      passwordHash: hashPassword("admin123"),
      role: "admin",
    });
    logger.info("Default admin user created");
  }
}

ensureAdminExists().catch((err) => logger.error({ err }, "Failed to ensure admin exists"));

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { username, password } = parsed.data;
  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, username)).limit(1);
  if (!admin || admin.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  (req.session as Record<string, unknown>).adminId = admin.id;
  res.json({
    success: true,
    user: { id: admin.id, username: admin.username, role: admin.role },
  });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  req.session.destroy(() => {
    res.sendStatus(204);
  });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  const adminId = (req.session as Record<string, unknown>).adminId as number | undefined;
  if (!adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.id, adminId)).limit(1);
  if (!admin) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ id: admin.id, username: admin.username, role: admin.role });
});

router.get("/admin/stats", async (req, res): Promise<void> => {
  const [[{ totalConsultations }], [{ totalContacts }], [{ newLeads }], [{ pendingConsultations }], [{ totalBlogPosts }], [{ totalTestimonials }], [{ activeCareers }], recentConsultations, recentContacts] = await Promise.all([
    db.select({ totalConsultations: count() }).from(consultationsTable),
    db.select({ totalContacts: count() }).from(contactsTable),
    db.select({ newLeads: count() }).from(consultationsTable).where(eq(consultationsTable.status, "new")),
    db.select({ pendingConsultations: count() }).from(consultationsTable).where(eq(consultationsTable.status, "pending")),
    db.select({ totalBlogPosts: count() }).from(blogPostsTable),
    db.select({ totalTestimonials: count() }).from(testimonialsTable),
    db.select({ activeCareers: count() }).from(careersTable).where(eq(careersTable.active, true)),
    db.select().from(consultationsTable).orderBy(desc(consultationsTable.createdAt)).limit(5),
    db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt)).limit(5),
  ]);

  res.json({
    totalConsultations,
    totalContacts,
    newLeads,
    pendingConsultations,
    totalBlogPosts,
    totalTestimonials,
    activeCareers,
    recentConsultations: recentConsultations.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() })),
    recentContacts: recentContacts.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() })),
  });
});

export { router as adminRouter };
