var Navigation = function() {
	var siteURL = "http://civitas-hack.azurewebsites.net";

	var selectNavOption = function(cssClass) {
		var buttons = $(cssClass);

		$.each(buttons, function(item){
			item.attr('background', '#009688');
        	item.attr('color', '#ffffff');
        	item.find('a').attr('color', '#ffffff');
		});
        		
	}; 

	var handleToggleComment = function() {
		$('.comment').on('click', function(){
			var a = $(this).parent();
			var b = a.next();
			var c = b.find('.card-footer');
			console.log(c);
			c.slideToggle();
		});
	};

	var handleRegister = function(){
		$('#registerSubmit').on('click', function(e){
			e.preventDefault();

			var abilData = [];

			$('#abilities').children('div.chip').each(function(){
				abilData.push($(this).text());
			});

			var data = { 
				fullName: $('#full_name').val(),
			    email: $('#email').val(), 
			    occupation: $('#occupation').val(), 
			    abilities: abilData, 
			    description: $('#description').val(),
			    location: $('#location').val(),
			    password: $('#password').val()
			};

			$.ajax({
            	type: "POST",
            	url: siteURL + "/Profile/RegisterNew",
            	dataType: "json",
            	data: JSON.stringify(data),
            	contentType: "application/json; charset=utf-8",
            complete: function(content){
            	window.location.replace(siteURL);
			}
            });
		});
	};

	var handleLogin = function(){
		$('#loginSubmit').on('click', function(e){
			e.preventDefault();

			var data = { email: $('#email').val(), password: $('#password').val()};
			$.ajax({
            type: "POST",
            url: siteURL + "/Profile/LoginUser",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            complete: function(content){
            	window.location.replace(siteURL);
			}
            });
		});
	};

	return {
        InitHome: function () {
        	//selectNavOption('.home');
        	handleToggleComment();
        },
        InitVolunteers: function () {
            selectNavOption('.volunteers');
        },
        InitCommunities: function () {
            selectNavOption('.communities');
        },
        InitProfile: function () {
            selectNavOption('.profile');
        },
        InitEvents: function () {
            selectNavOption('.events');
        },
        InitRegister: function () {
        	handleRegister();
        },
        InitLogin: function () {
        	handleLogin();
        }
    }
}();