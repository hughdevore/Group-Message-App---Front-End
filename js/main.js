$(document).ready(function() {

	var getMessages = function() {
		$.get(
			'https://group-message4792.herokuapp.com/users.json',
			function(users) {
				
				// users = users.keys(obj).sort().reverse();
				render(users);
			},
			'json'
		);
		console.log('Got!')
	};

	var render = function(user) {

		var messageRow = _.template('<div class="instance"><div class="user">User:</div><div class="name"><%= username %></div><div class="message">Message:</div><div class="content"><%= message %></div><div class="stamp">Time:</div><div class="time"><%= time_stamp %></div></div>')

		$('#message-board').html('');

		var room = $('#chatroom').val();
		
		for(var i=0; i<user.length; i++) {

			if (room == user[i].chatroom) {
				$('#message-board').prepend(messageRow(user[i]));
			}

		}
	};

	getMessages();

	setInterval(getMessages, 1000);

	function postMessage() {
		$.post(
			'https://group-message4792.herokuapp.com/users',
			{user: {username: $('#username').val(),
					message: $('#message').val(),
					chatroom: $('#chatroom').val()}
			},
			function(users) {
				console.log(users)
				render(users);
			},
			'json'
		);
	}

	$('#send').on('click',postMessage);

	$('#message').emoticonize();

});