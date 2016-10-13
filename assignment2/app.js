(function () {
 'use strict';
 angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

 ToBuyController.$inject = ['ShoppingListCheckOffService'];
 function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getBuyItems();
    console.log('toBuy ', toBuy.items);

    toBuy.removeItem = function (itemIndex){

      console.log('Remove ', itemIndex);
      ShoppingListCheckOffService.addBoughtItem(toBuy.items[itemIndex].name, toBuy.items[itemIndex].quantity )
      ShoppingListCheckOffService.removeBuyItem(itemIndex);
    };
 }

 AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

 }

 function ShoppingListCheckOffService(){
   var service = this;

   // list of to buy items
   var buyItems = [
     {name: 'cars', quantity: '5'},
     {name: 'balls', quantity: '2'},
     {name: 'houses', quantity: '1'},
     {name: 'trees', quantity: '10'},
     {name: 'desks', quantity: '2'}];

   service.removeBuyItem = function(itemIndex){
     buyItems.splice(itemIndex, 1);
   };

   service.getBuyItems = function (){
     return buyItems;
   };

   // list of bought items
   var boughtItems = [];

   service.addBoughtItem = function(itemName, quantity){
     var item = {
       name: itemName,
       quantity: quantity
     };
     boughtItems.push(item);
   };

   service.getBoughtItems = function (){
     return boughtItems;
   };

 }

})();
