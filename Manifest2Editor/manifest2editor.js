angular.module('Manifest2EditorApp', []).controller('Manifest2EditorController', function($scope) {
    $scope.manifest2 = {
        'name' : 'App Name',
        'version' : '0.0.1',
        'manifest_version' : 2
    };
    
    $scope.hasDescription = false;
    $scope.description = 'App description';

    $scope.computeHasDescription = function($event) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.manifest2.description = $scope.description;
            $scope.hasDescription = true;
        } else {
            $scope.hasDescription = false;
            $scope.description = $scope.manifest2.description;
            delete $scope.manifest2.description;
        }
    };

    $scope.hasIcons = false;
    $scope.icons = {
        '128' : '128.png'
    };

    $scope.computeHasIcons = function($event) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.manifest2.icons = $scope.icons;
            $scope.iconsCopy = angular.copy($scope.manifest2.icons);
            $scope.hasIcons = true;
        } else {
            $scope.hasIcons = false;
            $scope.icons = $scope.manifest2.icons;
            delete $scope.manifest2.icons;
            delete $scope.iconsCopy;
        }
    };
    
    $scope.removeIcon = function(iconSize) {
        delete $scope.manifest2.icons[iconSize];
        delete $scope.iconsCopy[iconSize];
    }
    
    $scope.selectedIconSize = '16';

    $scope.addIcon = function(iconSize) {
        $scope.manifest2.icons[iconSize] = iconSize + ".png";
        $scope.iconsCopy[iconSize] = iconSize + ".png";
    }
    
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
}).directive('jsonproperty', function() {
    return {
        restrict : "E",
        scope : {
            name : "@"
        },
        template: '<div>{{name}}</div>'    
    };
});
