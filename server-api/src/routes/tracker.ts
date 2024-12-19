import { Router } from "express";
import { interviewController } from "../controllers/interviews";
import { authorization } from "../authorizationMiddleware";
import { trackerController } from "../controllers/tracker";
const tracker: Router = Router();

tracker.get("/tracker", authorization, trackerController.fetchTracker);
tracker.post("/tracker/column", authorization, trackerController.createColumn);
tracker.patch(
  "/tracker/column/:columnId",
  authorization,
  trackerController.updateColumnTitle
);
tracker.delete(
  "/tracker/column/:columnId",
  authorization,
  trackerController.removeColumn
);
tracker.post(
  "/tracker/job/:columnId",
  authorization,
  trackerController.createJob
);
tracker.delete(
  "/tracker/job/:columnId/:jobId",
  authorization,
  trackerController.removeJob
);

tracker.patch(
  "/tracker/swapcolumn",
  authorization,
  trackerController.swapTrackerColumn
);
tracker.patch(
  "/tracker/swapSamecolumn/:columnId",
  authorization,
  trackerController.swapSameColumn
);
tracker.patch(
  "/tracker/swapDifferentcolumn/:jobId",
  authorization,
  trackerController.swapDifferentColumn
);
export default tracker;
