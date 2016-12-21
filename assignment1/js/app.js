(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.userLaunch = "";
		$scope.message = "";
		$scope.status = "";
		$scope.status2 = "";

		$scope.checkLaunch = function () {
			var launch = $scope.userLaunch;
			if(launch == "") {
				$scope.status = "failBorder";
				$scope.status2 = "fail";
				$scope.message = "Please enter data first";
			}
			else {
				$scope.success = true; 
				$scope.status = "successBorder";
				$scope.status2 = "success";
				var launchArray = launch.split(",");
				var launchCount = 0;
				for(var i = 0; i < launchArray.length; i++) {
					if(launchArray[i] != "")
						launchCount += 1;
				}

				if (launchCount <= 3) {
					$scope.message =  "Enjoy!";
				}
				else{
					$scope.message =  "Too much!";
				}
			}
		}
	}
	
})();