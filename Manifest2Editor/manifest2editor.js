angular.module('Manifest2EditorApp', []).controller('Manifest2EditorController', function($scope) {
    $scope.close = function() {
        window.close();
    }
    
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

    $scope.hasHomePageUrl = false;
    $scope.homepage_url = 'http://';

    $scope.computeHasHomePageUrl = function($event) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.manifest2.homepage_url = $scope.homepage_url;
            $scope.hasHomePageUrl = true;
        } else {
            $scope.hasHomePageUrl = false;
            $scope.homepage_url = $scope.manifest2.homepage_url;
            delete $scope.manifest2.homepage_url;
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
    
    
    $scope.hasPermissions = false;
    $scope.permissions = [];

    $scope.computeHasPermissions = function($event) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.manifest2.permissions = $scope.permissions;
            $scope.hasPermissions = true;
        } else {
            $scope.hasPermissions = false;
            $scope.permissions = $scope.manifest2.permissions;
            delete $scope.manifest2.permissions;
            delete $scope.permissionsCopy;
        }
    };
    
    $scope.removePermission = function(index) {
        $scope.manifest2.permissions.splice(index, 1);
    }
    
    $scope.selectedPermission = 'background';

    $scope.addPermission = function(permission) {
        if ($scope.manifest2.permissions.indexOf(permission) === -1) {
            $scope.manifest2.permissions.push(permission);
        }
    }

    
    $scope.hasDefaultLocale = false;
    $scope.selectedDefaultLocale = 'en';
    
    $scope.computeHasDefaultLocale = function($event) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.manifest2.default_locale = $scope.selectedDefaultLocale;
            $scope.hasDefaultLocale = true;
        } else {
            $scope.hasDefaultLocale = false;
            $scope.selectedDefaultLocale = $scope.manifest2.default_locale;
            delete $scope.manifest2.default_locale;
        }
    };
    
    $scope.setDefaultLocale = function() {
        $scope.manifest2.default_locale = $scope.selectedDefaultLocale;
    }
    
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
});
