angular.module('JSONApp', ['JSON']).controller('JSONController', function($scope) {
    $scope.person = {
        'GPA' : 3.9,
        'ticket' : '$200',
    };
});