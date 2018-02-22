/**
 * naiveboom配置文件
 * @type {Object}
 */
module.exports = {
	// redis服务器配置
	redis_host: '127.0.0.1',
	redis_port: '6379',
	redis_pwd: null, // 没有redis密码则写 null
	// redis Hash列表名
	field_lists: 'naives',
	// 1小时内单个IP可获取最多临时链接数
	rate_limit: 500,
	// 是否显示首页中的作死文本 eg.「☭赵」
	isZhao: false,
	// 用于匹配GUID的正则
	reg_guid: /[?a-zA-Z0-9]{8}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{12}$/,
}
