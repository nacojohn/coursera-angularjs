(function() {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
	templateUrl: 'templates/categorieslist.template.html',
	bindings: {
		categories: '<'		
	}
})

.component('items', {
	templateUrl: 'templates/items.template.html',
	bindings: {
		items: '<'
	}
})

})();