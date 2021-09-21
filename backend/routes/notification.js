const router = require('express').Router();

let Notification = require('../models/notification.model')

//endpoint for getting all notifications from database
router.route('/:userId').get((req, res) => {
    Notification.find({
        userId: req.params.userId
    })
        .then(notifications => res.json(notifications))
        .catch(err => res.status(400).json('Error ' + err))
})

//endpoint for creating Notification document in database
router.route('/create').post((req, res) => {
    const userId = req.body.userId
    const headerContent = req.body.headerContent;
    const bodyContent = req.body.bodyContent;
    const category = req.body.category

    const newNotification = new Notification({
        userId: userId,
        headerContent: headerContent,
        bodyContent: bodyContent,
        category: category
    })

    newNotification.save()
        .then((Notification) => res.json(Notification))
        .catch(err => { res.status(400).json('Error ' + err) })
});

//endpoint for removing Notification document from database
router.route('/:id').delete((req, res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then((notification) => res.json(notification))
        .catch(err => res.status(400).json('Error ' + err))
});

//endpoint for updating Notification document in database
router.route('/:id').patch((req, res) => {
    const updateObject = req.body;
    const id = req.params.id
    Notification.updateOne({ _id: Object(id) }, { $set: updateObject })
        .then((notification) => res.json(notification))
        .catch(err => res.status(400).json('Error ' + err))
});

module.exports = router;