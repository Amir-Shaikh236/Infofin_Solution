import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, careersTable } from "../db";
import {
  CreateCareerBody,
  UpdateCareerBody,
  UpdateCareerParams,
  DeleteCareerParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/careers", async (req, res): Promise<void> => {
  const items = await db
    .select()
    .from(careersTable)
    .orderBy(desc(careersTable.createdAt));
  res.json(items.map(toDto));
});

router.post("/careers", async (req, res): Promise<void> => {
  const parsed = CreateCareerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(careersTable).values(parsed.data).returning();
  res.status(201).json(toDto(item));
});

router.patch("/careers/:id", async (req, res): Promise<void> => {
  const params = UpdateCareerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCareerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db
    .update(careersTable)
    .set(parsed.data)
    .where(eq(careersTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Career not found" });
    return;
  }
  res.json(toDto(item));
});

router.delete("/careers/:id", async (req, res): Promise<void> => {
  const params = DeleteCareerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(careersTable).where(eq(careersTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Career not found" });
    return;
  }
  res.sendStatus(204);
});

function toDto(item: typeof careersTable.$inferSelect) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

export { router as careersRouter };
