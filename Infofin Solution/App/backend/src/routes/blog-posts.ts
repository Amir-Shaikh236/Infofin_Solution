import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogPostsTable } from "../db";
import {
  CreateBlogPostBody,
  UpdateBlogPostBody,
  UpdateBlogPostParams,
  DeleteBlogPostParams,
  GetBlogPostParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/blog-posts", async (req, res): Promise<void> => {
  const items = await db
    .select()
    .from(blogPostsTable)
    .orderBy(desc(blogPostsTable.createdAt));
  res.json(items.map(toDto));
});

router.post("/blog-posts", async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(blogPostsTable).values(parsed.data).returning();
  res.status(201).json(toDto(item));
});

router.get("/blog-posts/:id", async (req, res): Promise<void> => {
  const params = GetBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, params.data.id));
  if (!item) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.json(toDto(item));
});

router.patch("/blog-posts/:id", async (req, res): Promise<void> => {
  const params = UpdateBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db
    .update(blogPostsTable)
    .set(parsed.data)
    .where(eq(blogPostsTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.json(toDto(item));
});

router.delete("/blog-posts/:id", async (req, res): Promise<void> => {
  const params = DeleteBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(blogPostsTable).where(eq(blogPostsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.sendStatus(204);
});

function toDto(item: typeof blogPostsTable.$inferSelect) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

export { router as blogPostsRouter };
