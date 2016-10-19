(function () {
 'use strict';
 angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('BasePath', "http://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrow = this;

  //var narrow.found = [];
  narrow.getMatchedMenuItems = function(searchTerm){
    if(searchTerm === undefined){
      narrow.message = "Nothing found";
      narrow.found = [];
      return;
    }else if(searchTerm.length <= 0){
      narrow.message = "Nothing found";
      narrow.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function(response){
        narrow.found = response;
        if(narrow.found.length <= 0){
          narrow.message = "Nothing found";
        }else{
          narrow.message = "";
        }
        console.log('narrow', response);
    }).catch(function(error){
					console.log("Something Wrong");
		});
    //console.log('narrow', narrow.found);
  }

  narrow.badRemove = function(item){
    console.log('in Remove ', item);
    narrow.found.splice(item, 1);
  }
}

function FoundItemsDirective(){
  var ddo = {
  templateUrl: 'foundItemsList.html',
  scope: {
    foundList: '<',
    badRemove: '&'
  }
};
return ddo;

}


MenuSearchService.$inject = ['$http', '$filter', 'BasePath'];
function MenuSearchService($http, $filter, BasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var found = $http.get(BasePath).then(function (result) {
      // process result and only keep items that match
      var menu_items = result.data.menu_items;
      var found = $filter('filter')(menu_items, {description: searchTerm}, false);
      console.log('found ',searchTerm ,':',  found);

      // return processed items
      return found;
    });
    return found;
  };

  //return service;
}

 })();
