// 查看消息需要用到的JS
app = new Vue({
	el: '#app',
	data: {
		status: -1,
		text: null,
	},
	mounted: function() {
		// 从URL获取GUID，然后透过POST获取消息
		var guid = reg_guid.exec(window.location.href)[0];
		axios.post('/api/get-msg', {
			guid: guid
		}).then(function (response) {
			var data = response.data;
			app.status = data.status;
			app.text = data.text;
		}).catch(function (error) {
			throw error;
			alert('发生错误！')
		});
	}
});
