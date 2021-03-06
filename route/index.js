const router = require("express").Router();

const LoginRouter = require('./login');
const SignUpRouter = require('./signup');
const ClassRouter = require('./class');
const ClassSubjectCategory = require('./classSubjectCategory');
const EventRouter = require('./event');
const ResultRouter = require('./result');
const TaskRouter = require('./task');
const TestRouter = require('./test');
const TutorRouter = require('./tutor');


router.use("/login",LoginRouter);
router.use("/signup",SignUpRouter);
router.use("/class", ClassRouter);
router.use("/classsubjectcategories",ClassSubjectCategory);
router.use("/events", EventRouter);
router.use("/results", ResultRouter);
router.use("/tasks", TaskRouter);
router.use("/tests", TestRouter);
router.use("/tutor", TutorRouter);

router.use("*",(req, res) => {res.sendStatus(404);}); //Case where the router can't find the request

module.exports = router;