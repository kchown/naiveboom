/**
 * naiveboom配置文件
 * @type {Object}
 */
module.exports = {
	// redis服务器配置
	redis_host: '127.0.0.1',
	redis_port: '6379',
	redis_pwd: null, // 没有redis密码则写 null
	// 列表Hash表名
	field_lists: 'naives',
	// 匹配GUID的正则表达式
	regex_guid: /[?a-zA-Z0-9]{8}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{12}$/,
}
