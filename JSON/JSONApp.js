angular.module('JSONApp', ['JSON']).controller('JSONController', function($scope) {
    $scope.person = {
        'firstName' : 'Sheldon',
        'lastName' : 'Cooper',
        'GPA' : 4.5,
        'profession' : 'Theoretical Physicist',
        'roommate' : {
            'firtName' : 'Leonard',
            'lastName' : 'Hofstadter',
            'GPA' : 4.2,
            'profession' : 'Experimental Physicist',
            'girlfriend' : {
                'firtName' : 'Penny',
                'profession' : 'Waitress'
            }
        }
    };
}); 