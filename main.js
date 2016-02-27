"use strict";

console.log("main.js");

var app = angular.module("mainApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {url: "/", templateUrl: "./partials/home.html", controller: "homeCtrl"})
    .state("blog", {url: "/blog", templateUrl: "./partials/blog.html", controller: "blogCtrl"})

    $urlRouterProvider.otherwise("/");
});

app.controller("homeCtrl", function($http, $scope) {
  console.log("homeCtrl");
  $http.get("/projects.json")
    .then((res) => {
      $scope.projects = res.data;
    });

    $scope.switchImg = function($event, imagePath) {
      $event.target.parentElement.style.backgroundImage = `url("images/${imagePath}")`;
    }
});

app.controller("blogCtrl", function() {
  console.log("blogCtrl");
});
