(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', MenuSearchDirective)
.constant('JSON_URL', 'https://davids-restaurant.herokuapp.com/menu_items.json');

function MenuSearchDirective() {
	var ddo = {
		templateUrl: 'foundItem.html',
		scope: {
			foundList: '<',
			title: '@',
			onRemove: '&'
		},
		controller: MenuSearchDirectiveController,
		controllerAs: 'foundItem',
		bindToController: true
	};

	return ddo;
}

function MenuSearchDirectiveController() {
	var dirController = this;

	dirController.errorState = function () {
		if(dirController.foundList.foundList.length > 0) {
			return false;
		}
		else {
			return true;
		}

		return false;
	}
}

MenuSearchService.$inject = ['$http','JSON_URL'];
function MenuSearchService ($http, JSON_URL) {
	var menuServer = this;

	this.getMatchedMenuItems = function(searchTerm) {
		return $http({
			method: "GET",
			url: JSON_URL,
		}).then(function(response) {
			var filteredMenu = [];
			for(var i = 0; i < response.data.menu_items.length; i++) {
				var desc = response.data.menu_items[i].description;
				if(desc.toLowerCase().indexOf(searchTerm) >= 0) {
					filteredMenu.push(response.data.menu_items[i]); 
				}
			}

			return filteredMenu;
		});
	}
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var menuController = this;

	menuController.searchValue = "";
	menuController.listTitle = "Filtered Menu"
	menuController.foundList = [];

	menuController.performSearch = function() {
		if(menuController.searchValue !== "") {
			menuController.searchValue = menuController.searchValue.toLowerCase();
			var promise = MenuSearchService.getMatchedMenuItems(menuController.searchValue);
			
			promise.then(function(response) {
				console.log(response)
				menuController.foundList = response
			})
			.catch(function(error) {
				console.log(error)
			})
		}
	}

	menuController.removeItem = function(itemIndex) {
		menuController.foundList.splice(itemIndex, 1);
	}
}
})();
