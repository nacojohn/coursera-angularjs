(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService) {
		var toBuy = this;
		toBuy.noValue = true;

		toBuy.getToBuyItems = ShoppingListCheckOffService.returnItemsToBuy();

		toBuy.boughtItem = function (boughtIndex) {
			ShoppingListCheckOffService.removeBoughtItem(boughtIndex);
			toBuy.noValue = false;

			var leftItem = ShoppingListCheckOffService.checkIfBoughtAllItem();
			if (leftItem === 0)
				toBuy.allBought = "Everything is bought!";
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController (ShoppingListCheckOffService) {
		var boughtItem = this;

		boughtItem.getBoughtItems = ShoppingListCheckOffService.returnItemsAlreadyBought();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var items = [
			{
				name: "Cookies",
				qty: 10
			},
			{
				name: "Biscuit",
				qty: 5
			},
			{
				name: "Malt",
				qty: 3
			},
			{
				name: "Groundut",
				qty: 20
			},
			{
				name: "SandWich",
				qty: 9
			},
			{
				name: "Youghurt",
				qty: 15
			}
		];

		var boughtItems = [];

		service.returnItemsToBuy = function () {
			return items;
		};

		service.returnItemsAlreadyBought = function () {
			return boughtItems;
		};

		service.removeBoughtItem = function (itemIndex) {
			boughtItems.push(items[itemIndex])
			items.splice(itemIndex, 1);
		};

		service.checkIfBoughtAllItem = function () {
			return items.length;
		};

		service.checkIfBoughtAnItem = function () {
			return boughtItems.length;
		}
	}

})();