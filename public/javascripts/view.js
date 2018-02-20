// 查看消息需要用到的JS
app = new Vue({
	el: '#app',
	data: {
		// 解析GUID需要的正则
		guidregEx: /[?a-zA-Z0-9]{8}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{4}-[?a-zA-Z0-9]{12}/,
		status: -1,
		text: null,
	},
	methods: {
		getMsg: function() {
			// 从URL获取GUID，然后透过POST获取消息
			var guid = this.guidregEx.exec(window.location.href)[0];
			axios.post('/api/get-msg', {
				guid: guid
			}).then(function (response) {
				var data = response.data;
				app.status = data.status;
				app.text = data.text;
				console.log(data);
			}).catch(function (error) {
				throw error;
				alert('发生错误！')
			});
		}
	},
	mounted: function() {
		this.getMsg();// 开始获取消息
	}
});
