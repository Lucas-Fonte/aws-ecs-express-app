import express from 'express';
import HealthController from '../controllers/HealthController';

const router = express.Router();

router.get('/', async (_req, res) => {
  const controller = new HealthController();
  const response = await controller.health();
  return res.send(response);
});

export default router;
