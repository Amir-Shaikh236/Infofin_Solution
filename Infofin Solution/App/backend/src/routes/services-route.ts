import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, servicesTable } from "../db";
import {
  CreateServiceBody,
  UpdateServiceBody,
  UpdateServiceParams,
  DeleteServiceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/services", async (req, res): Promise<void> => {
  const items = await db
    .select()
    .from(servicesTable)
    .orderBy(desc(servicesTable.createdAt));
  res.json(items.map(toDto));
});

router.post("/services", async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(servicesTable).values(parsed.data).returning();
  res.status(201).json(toDto(item));
});

router.patch("/services/:id", async (req, res): Promise<void> => {
  const params = UpdateServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db
    .update(servicesTable)
    .set(parsed.data)
    .where(eq(servicesTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(toDto(item));
});

router.delete("/services/:id", async (req, res): Promise<void> => {
  const params = DeleteServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(servicesTable).where(eq(servicesTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.sendStatus(204);
});

function toDto(item: typeof servicesTable.$inferSelect) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

export { router as servicesRouter };
