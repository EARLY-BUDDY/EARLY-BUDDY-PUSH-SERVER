var express = require('express');
var router = express.Router();
const getNoticeTime = require('../controller/getNoticeTime')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//router.use('/scheduler', schedulerController);
router.post('/getNoticeTime', getNoticeTime.getNoticeTime)

module.exports = router;
