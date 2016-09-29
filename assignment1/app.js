(function () {
 'use strict';
 angular.module('LunchCheck', [])
 .controller('LunchCheckController', LunchCheckController);
 
 function LunchCheckController($scope){
    $scope.menu = "";
 	$scope.check = function() {
 		var menulist = $scope.menu.split(',');
 		 $scope.msgcolor = "green";

 		// first check for whitespaces and remove all items from menulist if not min. one char
 		for (var i = menulist.length - 1; i >= 0; i--) {
 			var item = menulist[i].trim();
 			if ( item.length <= 0 ) menulist.splice(i,1); 
 		}
 		
 		// create message
	 	if ( menulist.length <= 0 || $scope.menu.length <= 0 ){
	 	 $scope.message = "Please enter data first";
	 	 $scope.msgcolor = "red";
	 	}
	 	else if(menulist.length >=4 ){
	 	 $scope.message = "Too much!";
	 	}
	 	else{
	 	 $scope.message = "Enjoy!";
	 	 
	 	}
 	}

 }

})();