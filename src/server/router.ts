import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "./data-source";
import { LogEntry } from "../entity/LogEntry";

const router = express.Router();

router.all('/health', (req, res) => {
  res.sendStatus(200);
});

router.get("/logEntries", async function (req: Request, res: Response, next: NextFunction) {
  try {
    const logEntries = await AppDataSource.getRepository(LogEntry).find();
    return res.json(logEntries);
  }
  catch (error) {
    next(error);
  }
});
	

router.post("/logEntries", async function (req: Request, res: Response, next: NextFunction) {
	try {
    const logEntry = await AppDataSource.getRepository(LogEntry).create(req.body.data);
    const results = await AppDataSource.getRepository(LogEntry).save(logEntry);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.put("/logEntries/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    const logEntry = await AppDataSource.getRepository(LogEntry).findOneBy({
        id: Number(req.params.id),
    });

    if (!logEntry) {
        return res.status(404).send({ message: "LogEntry not found" });
    }

    AppDataSource.getRepository(LogEntry).merge(logEntry, req.body.data);
    const results = await AppDataSource.getRepository(LogEntry).save(logEntry);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/logEntries/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    const results = await AppDataSource.getRepository(LogEntry).delete(req.params.id);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

export default router;
