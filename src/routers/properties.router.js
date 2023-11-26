const express = require("express");
const router = express.Router();
const {userAuthorization}=require("../middlewares/authorization.middleware")
const { insertPropertyDetails, getPropertyByUser, getPropertyByToken } = require("../models/properties/properties.modal");
const multer = require('multer');
const storage = multer.memoryStorage(); // Store file in memory as a Buffer
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/json') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Please upload a JSON file.'));
        }
    },
    limits: {
        fileSize: 1024 * 1024, // Limit file size to 1 MB
    },
});
const fs = require('fs');
const path = require('path');




router.post("/insertProperty", upload.single('propertyFile'), async (req, res) => {
    try {
        const jsonData = JSON.parse(req.file.buffer.toString());
        console.log(jsonData, "jsonData");
        const propertyDetails = await insertPropertyDetails(jsonData);
        res.send({ status: "success", message: "Property details inserted successfully", data: propertyDetails });
    
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }
}
);

router.post("/getPropertyByUser", userAuthorization, async (req, res) => {
    try {
        const clientId = req.userId;
        const type = req.body.activityType;
        const propertyDetails = await getPropertyByUser(clientId, type);
        res.send(propertyDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);

router.get("/getPropertyByToken", async (req, res) => {
    try {
        const token = req.query.token;
        console.log(token,"token")
        const propertyDetails = await getPropertyByToken(token);
        // res.send(propertyDetails);
        res.json({ status: "success", message: "Property details fetched successfully", data: propertyDetails });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);

module.exports = router;




