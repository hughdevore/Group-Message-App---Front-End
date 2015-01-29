$(document).ready(function() {
	var getMessages = function() {
		$.get(
			'https://group-message4792.herokuapp.com/',
			function(messages) {
				render(messages);
			},
			'json'
		);
	};

	var render = function(messages) {
		var messageRow = _.template('<div class="row"><div><%= message %></div><div><%= name %></div></div>')
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			if(messages[i].message && messages[i].name) {
				$('#message-board').append(messageRow(messages[i]));
			}
		}
	};

	getMessages();

	setInterval(getMessages, 1000);

	function postMessage() {
		$.post(
			'https://group-message4792.herokuapp.com/',
			{
				name: $('#username').val(),
				message: $('#message').val(),
			},
			function(message) {
				console.log(message)
				// render(messages);
			},
			'json'
		);
	}

	$('#send').on('click',postMessage);

});