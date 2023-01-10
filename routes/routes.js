const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const RateLimit = require("../Middlewares/RateLimiter")
const userController = require('../Controllers/userController')

const cache = apicache.middleware;

// if you cache all routes then simply use
//app.use(cache("2 minutes"))



router.use(RateLimit);

router.get("/users", cache("2 minutes")  , userController.getAllUsers);

router.get("/accessToken", userController.getAccessToken);

router.route("/users/:id").get(userController.getOneUser);

router.route("/users").post(userController.createNewUser);

router.post("/login" , userController.verifyOneUser)

module.exports = router;
