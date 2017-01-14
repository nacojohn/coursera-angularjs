(function() {
'use strict';

angular.module('MenuApp')
.controller('FetchAllCategoriesController', FetchAllCategoriesController)
.controller('FetchItemsController', FetchItemsController);

FetchAllCategoriesController.$inject = ['MenuDataService','categories'];
function FetchAllCategoriesController(MenuDataService, categories) {
	var allCategories = this;

	allCategories.categories = categories;
}

FetchItemsController.$inject = ['items'];
function FetchItemsController(items) {
	var allItems = this;

	allItems.items = items;
}

})();