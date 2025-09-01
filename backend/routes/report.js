const router = require('express').Router();
const bcrypt = require('bcryptjs')
const mail = require("../extra/mail");
const verify = require('../extra/verifyToken');
const { reportValidation } = require('../validation/reportValidation');
const Reports = require('../model/Reports');
const Subdomain = require('../model/Subdomain');
const User = require('../model/User');
const fs = require('fs');
const path = require('path')

router.post('/create', verify, async (req, res) => {

    //validations applying
    const { error } = reportValidation(req.body);
    if (error) return res.status(422).send({ "message": error.details[0].message })

    // //userdata
    const user = await Subdomain.findOne({ _id: req.user._id })
    if (!user) return res.status(404).send({ "message": "Username Not Found" });

    //Create new user
    const report = new Reports({
        title: req.body.title,
        content: req.body.content,
        images: req.body.images,
        userHandle: user.name,
    });

    try {
        const reportSave = await report.save();
        if (reportSave) {
            res.status(201).send({ "message": "Your report has been posted" })
        }
    } catch (error) {
        res.status(400).send(error);
    }
});



//reports
router.get('/', async (req, res) => {
    const allReport = await Reports.find({});
    let data = [];
    let i = 1;

    allReport.forEach(post => {
        data.push(Object.assign(post, { __v: i }));
        i++;
    });
    res.status(200).send({ "reports": Object.assign(data) })
});



//report delete
router.delete('/:id', verify, async (req, res) => {
    try {
        //Select single user
        const user = await User.findOne({ _id: req.user._id, })
        if (!user) return res.status(404).send({ "message": "Username Not Found" });

        //Select single page
        const report = await Reports.findOne({ _id: req.params.id, })
        if (!report) return res.status(404).send({ "message": "Report in not found" });

        // console.log(report)
        report.images.forEach((ele) => {
            fs.unlinkSync(path.normalize(__dirname + '/..' + ele.fileUrl));
        });

        const delone = await Reports.findByIdAndDelete(req.params.id);
        if (!delone) res.status(404).send("Sorry no file found");

        res.status(200).send({ "message": "The report has been deleted successfully" });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;