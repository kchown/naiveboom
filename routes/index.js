var express = require('express');
var router = express.Router();
var conf = require('../config.js');
var mtool = new (require('../lib/tools.js'))(conf);// 消息操作工具

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Naiveboom - 比较安全', isZhao: conf.isZhao});
});

/**
 * 提取信息
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {	var        guid [description]
 * @return {[type]}      [description]
 */
router.get(conf.reg_guid, function(req, res) {
	res.render('look', {title: '查看内容 - naiveBoom!', reg_guid: conf.reg_guid});
})

module.exports = router;
