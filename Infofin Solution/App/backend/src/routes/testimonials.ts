import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, testimonialsTable } from "../db";
import {
  CreateTestimonialBody,
  UpdateTestimonialBody,
  UpdateTestimonialParams,
  DeleteTestimonialParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (req, res): Promise<void> => {
  const items = await db
    .select()
    .from(testimonialsTable)
    .orderBy(desc(testimonialsTable.createdAt));
  res.json(items.map(toDto));
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(testimonialsTable).values(parsed.data).returning();
  res.status(201).json(toDto(item));
});

router.patch("/testimonials/:id", async (req, res): Promise<void> => {
  const params = UpdateTestimonialParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db
    .update(testimonialsTable)
    .set(parsed.data)
    .where(eq(testimonialsTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.json(toDto(item));
});

router.delete("/testimonials/:id", async (req, res): Promise<void> => {
  const params = DeleteTestimonialParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(testimonialsTable).where(eq(testimonialsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.sendStatus(204);
});

function toDto(item: typeof testimonialsTable.$inferSelect) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

export { router as testimonialsRouter };
