const express = require("express");
const router = express.Router();
const { insertActivityDetails, getActivityByUser, getActivityByType } = require("../models/activityModal/activity.modal");
const {userAuthorization}=require("../middlewares/authorization.middleware")



router.post("/insertActivity", async (req, res) => {
    try {
        const activityDetails = await insertActivityDetails(req.body);
        res.send(activityDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);

router.post("/getActivityByUser", userAuthorization, async (req, res) => {
    try {
        const clientId = req.userId;
        const type = req.body.activityType;
        const activityDetails = await getActivityByUser(clientId, type);
        res.send(activityDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);

router.get("/getActivityByType", userAuthorization, async (req, res) => {
    try {
        const type = req.query.type;
        const activityDetails = await getActivityByType(type);
        res.send(activityDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);





module.exports = router;
