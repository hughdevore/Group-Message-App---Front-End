$(document).ready(function() {
	var getMessages = function() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
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
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
			{
				message: $('#text').val(),
				name: 'A-Team'
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