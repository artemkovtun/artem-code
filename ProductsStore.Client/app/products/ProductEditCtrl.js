(function () {
    "use strict";

    angular
        .module("productsStore")
        .controller("ProductEditCtrl",
                     ProductEditCtrl);

    function ProductEditCtrl($routeParams,$window, productResource) {
        
        var vm = this;
        vm.product = {};
        vm.message = '';

        productResource.get({ id: $routeParams.id },
            function (data) {
                vm.product = data;
                vm.originalProduct = angular.copy(data);
            });

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.submit = function () {
            vm.message = '';
            if (vm.product.productId) {
                vm.product.$update({ id: vm.product.productId },
                    function (data) {
                        vm.message = "... Save Complete";
                    })
            }
            else {
                vm.product.$save(
                    function (data) {
                        vm.originalProduct = angular.copy(data);
                        vm.message = "... Save Complete";
                    })
            }
        };

        vm.cancel = function (editForm) {            
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };
               
        vm.delete = function (id) {
            if (vm.product.productId) {
                vm.product.$delete({ id: vm.product.productId },
                    function (data) {
                        vm.originalProduct = angular.copy(data);
                        vm.message = "... Delete Complete";
                    })
            }
            setTimeout($window.history.back(), 4000);
        }

        vm.goback = function () {
            $window.history.back();
        };
    }
}());