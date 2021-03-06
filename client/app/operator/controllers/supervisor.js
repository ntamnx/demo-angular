/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

var curentPageSupervisor = 1;
var keyWordSearchIndexSupervisor;
app.controller('supervisorIndexController', function ($scope, $http, $location, $filter, $window, Flash) {
    /**
     * index function
     */
    var getData = function () {
        $http.get('http://localhost:3000/todo').then(function (data) {
            $scope.supervisors = data.data;
            $scope.keyword = keyWordSearchIndexSupervisor;
            paginate($scope, $scope.supervisors, curentPageSupervisor);
            $scope.$watch('keyword', function (newValue, oldValue) {
                keyWordSearchIndexSupervisor = newValue;
                var newData = $filter('filter')(data.data, newValue);
                $scope.pageChangeSearch = function (page) {
                    curentPageSupervisor = 1;
                };
                $scope.supervisors = newData;
                paginate($scope, $scope.supervisors, curentPageSupervisor);
            });
            $scope.pageChange = function (page) {
                curentPageSupervisor = page;
            };
        });
    }
    getData();
    $scope.deleteSupervisor = function (id) {
        if ($window.confirm("Bạn có muốn xóa không?")) {
            $http({
                method: "DELETE",
                url: 'http://localhost:3000/todo/delete/' + id
            }).then(function successCallback(response) {
                getData();
                Flash.create('success', message_delete_success);
            }, function errorCallback(response) {
                Flash.create('danger', message_delete_error);
            });
        }
    };
});
/**
 * 
 */
app.controller('addSupervisorController', function ($scope, $location) {
    $scope.submitForm = function () {
        if ($scope.add.$valid) {

        }
    }
});
/**
 * 
 */
app.controller('detailController', function ($scope, $routeParams, $http, $location) {
    $http({
        method: 'GET',
        url: 'http://localhost:3000/todo/read/' + $routeParams.id,
    }).then(function successCallback(response) {
        $scope.supervisor = response.data;
    }, function errorCallback(response) {
        console.log('Có lỗi thôi!.');
    });
});