modal = new Vue({
	el: '#modal',
	data: {
		msg: '么有',
		title: '提示'
	},
	methods: {
		show: function(msg, title) {
			if (title) {
				this.title = title;
			}
			this.msg = msg;
			$('#mmodal').modal();
		}
	}
})


app = new Vue({
	el: '#app',
	data: {
		text: null,
		enurl: null,
		showtg: false,// is show the tugong ICON
		tgstyle: [],
	},
	watch: {
		showtg: function(status) {
			status ? this.tgstyle = ['show'] : this.tgstyle = [];
			if (status) {
				setTimeout(function() {
					app.showtg = false;// 显示2秒自动关闭
				}, 2700);
			}
		}
	},
	methods: {
		getTempURL: function() {
			$("#enurl").loading({
				message: '加载中...',
				onStop: function(loading) {
				    loading.overlay.fadeOut(650)
				  }
			});
			axios.post('/api/get-temp', {
				text: app.text
			}).then(function(response) {
				$("#enurl").loading('stop');
				var data = response.data;
				if (data.status == 1) {
					var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
					app.enurl = newURL + data.guid;
				} else {
					throw 'failure to get the tmp url!';
					modal.show("操作失败！<br>", '错误')
				}
				console.log(response);
			}).catch(function(error) {
				console.warn(error.response);
				$("#enurl").loading('stop');
				modal.show("操作失败！<br>" + error.response.data.message, '错误')
			})
		}
	}
})