(function() {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
	var dataService = this;

	var categories;

	dataService.getAllCategories = function() {
		return $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/categories.json"
		}).then(function(response) {
			categories = response.data;

			return categories;
		});
	};

	dataService.getItemsForCategory = function(categoryShortName) {
		return $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName
		}).then(function(response) {
			var items = response.data.menu_items;

			return items;
		});
	};
}
})();