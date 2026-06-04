import { Router, type IRouter } from "express";
import { eq, desc, count } from "drizzle-orm";
import { db, consultationsTable } from "../db";
import {
  CreateConsultationBody,
  UpdateConsultationBody,
  UpdateConsultationParams,
  DeleteConsultationParams,
  GetConsultationParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/consultations", async (req, res): Promise<void> => {
  const items = await db
    .select()
    .from(consultationsTable)
    .orderBy(desc(consultationsTable.createdAt));
  res.json(items.map(toDto));
});

router.post("/consultations", async (req, res): Promise<void> => {
  const parsed = CreateConsultationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(consultationsTable).values(parsed.data).returning();
  res.status(201).json(toDto(item));
});

router.get("/consultations/:id", async (req, res): Promise<void> => {
  const params = GetConsultationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.select().from(consultationsTable).where(eq(consultationsTable.id, params.data.id));
  if (!item) {
    res.status(404).json({ error: "Consultation not found" });
    return;
  }
  res.json(toDto(item));
});

router.patch("/consultations/:id", async (req, res): Promise<void> => {
  const params = UpdateConsultationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateConsultationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db
    .update(consultationsTable)
    .set(parsed.data)
    .where(eq(consultationsTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Consultation not found" });
    return;
  }
  res.json(toDto(item));
});

router.delete("/consultations/:id", async (req, res): Promise<void> => {
  const params = DeleteConsultationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(consultationsTable).where(eq(consultationsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Consultation not found" });
    return;
  }
  res.sendStatus(204);
});

function toDto(item: typeof consultationsTable.$inferSelect) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

export { router as consultationsRouter };
export { count as countConsultations };
