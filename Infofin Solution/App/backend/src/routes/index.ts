import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { consultationsRouter } from "./consultations";
import { contactsRouter } from "./contacts";
import { blogPostsRouter } from "./blog-posts";
import { careersRouter } from "./careers";
import { testimonialsRouter } from "./testimonials";
import { servicesRouter } from "./services-route";
import { adminRouter } from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(consultationsRouter);
router.use(contactsRouter);
router.use(blogPostsRouter);
router.use(careersRouter);
router.use(testimonialsRouter);
router.use(servicesRouter);
router.use(adminRouter);

export default router;
