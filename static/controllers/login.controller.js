(function() {
	var app = angular.module('login', []);
	app.controller('loginController', ['$scope', '$window', '$http', loginController]);

	function loginController($scope, $window, $http) {
		$scope.validateLogin = validateLogin;
		$scope.register = register;
		const PATH = "http://localhost:5000";
		var username = "";

		function validateLogin() {
			//TODO: add validations
			var username = document.getElementById("usr_name").value;  
			var password = document.getElementById("usr_pwd").value;
			if (username && password) {
				//todo: validate users
				validateUser(username, password);
			} else {
				invalidInfo();	
			}
		}

		function register() {
			$window.location.href ="/register";
		}

		function invalidInfo() {
			console.log('show invalid info');
			document.getElementById("login_error").innerHTML = "wrong username or password";
		}

		function validateUser(username, password) {
			$http.post( PATH + '/api/login', 
                    {
                    'username': username,
                    'password': password
                    }
                ).then( (response) => {
                	if (response.data.success) {
						$window.location.href ="/hives?username="+response.data.username;
                	}
                }, (error) => {
                	invalidInfo();
                });
        }
	}
})();
