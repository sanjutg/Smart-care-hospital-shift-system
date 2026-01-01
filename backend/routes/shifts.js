const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const ShiftRequest = require('../models/ShiftRequest');
const User = require('../models/User');

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate('assignedUsers', 'name role department contactNumber')
      .sort({ date: 1, startTime: 1 });
    
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shifts for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const shifts = await Shift.find({ assignedUsers: req.params.userId })
      .populate('assignedUsers', 'name role department')
      .sort({ date: 1, startTime: 1 });
    
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a shift request
router.post('/request', async (req, res) => {
  try {
    const { requestedBy, shiftId, requestType, requestedDate, reason } = req.body;

    const shiftRequest = new ShiftRequest({
      requestedBy,
      shift: shiftId,
      requestType,
      requestedDate: new Date(requestedDate),
      reason,
      status: 'pending'
    });

    await shiftRequest.save();
    await shiftRequest.populate('requestedBy', 'name role department');
    await shiftRequest.populate('shift');

    res.status(201).json(shiftRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all shift requests (for admins)
router.get('/requests', async (req, res) => {
  try {
    const requests = await ShiftRequest.find()
      .populate('requestedBy', 'name role department contactNumber')
      .populate('shift')
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shift requests for a specific user
router.get('/requests/user/:userId', async (req, res) => {
  try {
    const requests = await ShiftRequest.find({ requestedBy: req.params.userId })
      .populate('shift')
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve or reject a shift request (admin only)
router.patch('/requests/:requestId', async (req, res) => {
  try {
    const { status, reviewedBy } = req.body;

    const request = await ShiftRequest.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    request.reviewedBy = reviewedBy;
    request.reviewedAt = new Date();

    await request.save();
    await request.populate('requestedBy', 'name role department');
    await request.populate('shift');
    await request.populate('reviewedBy', 'name role');

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update a shift
router.post('/', async (req, res) => {
  try {
    const { date, startTime, endTime, department, assignedUsers } = req.body;

    const shift = new Shift({
      date: new Date(date),
      startTime,
      endTime,
      department,
      assignedUsers
    });

    await shift.save();
    await shift.populate('assignedUsers', 'name role department');

    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


