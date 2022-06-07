const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

router.get("/pelapor", adminController.viewPelapor);
router.post("/pelapor", uploadMultiple, adminController.addPelapor);
router.get("/pelapor/:id", adminController.responPelaporView);
router.post("/pelapor/:id", uploadMultiple, adminController.responPelapor);

module.exports = router;
