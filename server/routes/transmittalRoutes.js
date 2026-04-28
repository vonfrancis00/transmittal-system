const express = require("express");
const router = express.Router();
const Transmittal = require("../models/Transmittal");

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const newRecord = new Transmittal({
      ref: req.body.ref,
      to: req.body.to,
      charge: req.body.charge || "",
      from: req.body.from,
      position: req.body.position || "",
      subject: req.body.subject,
      date: req.body.date,
      body: req.body.body,
    });

    const saved = await newRecord.save();

    res.status(201).json({
      message: "Saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const data = await Transmittal.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("FETCH ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* VERIFY DOCUMENT */
router.get("/verify/:code", async (req, res) => {
  try {
    const code = decodeURIComponent(req.params.code).trim();

    let record = await Transmittal.findOne({
      ref: { $regex: `^${code}$`, $options: "i" },
    });

    if (!record && /^[0-9a-fA-F]{24}$/.test(code)) {
      record = await Transmittal.findById(code);
    }

    if (!record) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json({
      found: true,
      _id: record._id,
      ref: record.ref,
      to: record.to,
      charge: record.charge,
      from: record.from,
      position: record.position,
      subject: record.subject,
      date: record.date,
      body: record.body,
      createdAt: record.createdAt,
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* DELETE RECORD */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transmittal.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;