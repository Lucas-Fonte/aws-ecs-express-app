import express from 'express';
import {
  InvalidPartnerIdError,
  PartnerController,
  PartnerNotFound,
} from '../controllers/PartnerController';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const controller = new PartnerController();
    const response = await controller.getPartners();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const controller = new PartnerController();
    const response = await controller.createPartner(req.body);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.get('/search', async (req, res) => {
  try {
    if (!req.query.longitude || !req.query.latitude)
      return res.status(400).json({ message: 'Missing params' });

    const controller = new PartnerController();
    const response = await controller.getNearestPartner(
      Number(req.query.longitude),
      Number(req.query.latitude)
    );
    return res.send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof PartnerNotFound) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const controller = new PartnerController();
    const response = await controller.getPartner(req.params.id);
    return res.send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidPartnerIdError) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof PartnerNotFound) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

export default router;
