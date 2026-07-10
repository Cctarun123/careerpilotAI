const path = require('path');
const Resume = require('../models/Resume');
const { extractTextFromPdf } = require('../services/pdfParserService');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const filePath = path.join(req.file.destination, req.file.filename);
    const rawText = await extractTextFromPdf(filePath);

    if (!rawText) {
      return res.status(400).json({ error: 'Could not extract text from PDF' });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      fileUrl: `/uploads/${req.file.filename}`,
      rawText,
    });

    res.status(201).json({
      id: resume.id,
      fileUrl: resume.file_url,
      rawText: resume.raw_text,
      uploadedAt: resume.uploaded_at,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLatestResume = async (req, res, next) => {
  try {
    const resume = await Resume.findLatestByUserId(req.user.id);
    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }
    res.json({
      id: resume.id,
      fileUrl: resume.file_url,
      rawText: resume.raw_text,
      uploadedAt: resume.uploaded_at,
    });
  } catch (err) {
    next(err);
  }
};
