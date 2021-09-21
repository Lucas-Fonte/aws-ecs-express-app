import express from 'express';
import PartnerRouter from './PartnerRouter';
import HealthRouter from './HealthRouter';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';

const router = express.Router();

if (process.env.NODE_ENV !== 'test') router.use(notFoundMiddleware);
router.use('/health', HealthRouter);
router.use('/partners', PartnerRouter);

export default router;
