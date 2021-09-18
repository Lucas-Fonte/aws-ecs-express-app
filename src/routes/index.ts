import express from 'express';
import PartnerRouter from './PartnerRouter';
import HealthRouter from './HealthRouter';

const router = express.Router();

router.use('/health', HealthRouter);
router.use('/partners', PartnerRouter);

export default router;
