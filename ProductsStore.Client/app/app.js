(function () {
    "use strict";
   
    var app = angular.module("productsStore", ["ngRoute", "common.services"]);
    
    app.config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "app/products/productListView.html",
            controller: "ProductListCtrl"
        }).when("/newProductForm", {
            templateUrl: "app/products/productEditView.html",
            controller: "ProductEditCtrl"
        }).when("/updateProductForm/:id", {
            templateUrl: "app/products/productEditView.html",
            controller: "ProductEditCtrl"
        }).otherwise({
             redirectTo: "/"
        });    
    });
}());

