var redis = require("redis");
var uuidv4 = require('uuid/v4');

/**
 * Redis存档的Hash消息管理工具
 * @param  {Object} config  配置文件
 * @return {[type]}        [description]
 */
module.exports = function(conf)
{

	/**
	 * 初始化Redis连接
	 * @return {[type]} [description]
	 */
	var init = () => {
		this.conf = conf;
		// noderedis密码等选项
		var options = conf.redis_pwd ? { password: conf.redis_pwd } : null;
		// redis client instance
		this.client = redis.createClient(conf.redis_port, conf.redis_host, options);

		this.client.on("error", (err) => {
		    console.log("redis Error " + err);
		});
	}

	/**
	 * 删除Redis中的某条消息
	 * @param  {string}   guid     消息ID
	 * @param  {function} callback 回调函数 (status: 成功1，失败0)
	 * @return {[type]}            [description]
	 */
	this.delete = (guid, callback) => {
		this.client.hdel(this.conf.field_lists, guid,(err, status) => {
			if (callback) {
				callback(status);
			}
		});
	}

	/**
	 * 获取一个不会重复的唯一ID
	 * @param  {Function} callback 回调函数，({ guid })
	 * @return {[type]}            [description]
	 */
	this.getUniID = (callback) => {
		var guid = uuidv4();
		this.exists(guid, (exists) => {
			// 如果存在则递归重新获取，直到获取到不重复的GUID并返回
			exists ? this.getUniID(callback) : callback(guid);
		});
	}

	/**
	 * 插入一条消息
	 * @param  {string}    text       欲被插入的内容
	 * @param  {Function}  callback   回调函数，( status:1|0, guid:string )
	 * @example 回调函数 (status, guid) => { ... }
	 * @return {[type]}            [description]
	 */
	this.insert = (text, callback) => {
		this.getUniID((guid) => {
			// 存入消息
			this.client.hset(conf.field_lists, guid, text, (err, status) => {
				var _status, _guid = false;
				if (status) { _status = true; _guid = guid }
				callback(_status, _guid);
			});
		})
	}

	/**
	 * 检查是否存在某条消息
	 * @param  {string}   guid     消息ID
	 * @param  {Function} callback 回调函数 (status: 存在1，不存在0)
	 * @return {[type]}            [description]
	 */
	this.exists = (guid, callback) => {
		this.client.hexists(this.conf.field_lists, guid, (err, exists) => {
			callback(exists);
		});
	}

	/**
	 * 获取某条消息
	 * @param  {string}   guid     消息ID
	 * @param  {Function} callback 回调函数 (msg 消息内容)
	 * @return {[type]}            [description]
	 */
	this.get = (guid, callback) => {
		this.client.hget(this.conf.field_lists, guid, (err, msg) => {
			callback(msg);
		});
	}

	// 初始化
	init();
}