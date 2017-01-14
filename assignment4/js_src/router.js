(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'templates/home.template.html'
	})

	.state('categories', {
		url: '/categories',
		templateUrl: 'templates/categories.template.html',
		controller: 'FetchAllCategoriesController as allCategories',
		resolve: {
			categories: ['MenuDataService', function(MenuDataService) {
				return MenuDataService.getAllCategories();
			}]
		}
	})

	.state('items', {
		url: '/items/{category}',
		templateUrl: 'templates/items.template.html',
		controller: 'FetchItemsController as items',
		resolve: {
			items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
				return MenuDataService.getItemsForCategory($stateParams.category);
			}]
		}
	})
}
})();