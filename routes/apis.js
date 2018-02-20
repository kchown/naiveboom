var express = require('express');
var router = express.Router();
var conf = require('../config.js');
var mtool = new (require('../lib/tools.js'))(conf);// 消息操作工具

/* GET home page. */
router.post('/get-temp', function(req, res, next) {
	// 用户输出的内容
	var text = req.body.text;

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
