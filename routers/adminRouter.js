const express = require("express");

const { getGround, createGround, updateGround, deleteGround } = require('../controller/adminController');

 const { protect } = require("../middlewares/auth");



const router = express.Router();

router.get("/", protect, getGround);
router.post("/create",protect, createGround );
router.put("/update/:id",protect, updateGround );
router.delete("/delete/:id",protect, deleteGround );

module.exports = router ;