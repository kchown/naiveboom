var util = require('util');
var express = require('express');
var router = express.Router();
var conf = require('../config.js');
var mtool = new (require('../lib/tools.js'))(conf);// 消息操作工具
var RateLimit = require('express-rate-limit');

// 限制生成临时链接API的访问次数
var apiLimiter = new RateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: conf.rate_limit,    // 频次
    delayMs: 0,               // disabled 延迟响应
});

/* 生成消息的GUID */
router.post('/get-temp', apiLimiter, function(req, res, next) {
	// 用户输出的内容
	var text = req.body.text;
	// 插入消息
	mtool.insert(text, (status, guid) => {
		rep = { status: status, guid: guid };
		res.send(rep);
	});
});

/**
 * 提取信息
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {	var        guid [description]
 * @return {[type]}      [description]
 */
router.post('/get-msg', function(req, res) {
	var guid = req.body.guid;
	console.log("GUID", guid);
	mtool.exists(guid, (exists) => {
		var rep = {status: 0, text: null};
		if (exists) {
			mtool.get(guid, (text) => {
				rep.status = 1; rep.text = text;
				mtool.delete(guid);// 删除消息
				res.send(rep);
			});
		} else {
			res.send(rep);
		}
	});
})

module.exports = router;
