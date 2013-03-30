angular.module('JSON', []).directive("editobject", function($templateCache) {
    // self template
    var template =
'<pre>{<span ng-repeat="propertyname in sortedKeysArray(object)"><editpropertyvalue object="object"></editpropertyvalue></span>}</pre>';
    $templateCache.put('editobject.html', template);
    
    return {
        restrict : 'E',
        //*
        templateUrl: 'editobject.html',
        /*/
        template : template,
        //*/
        scope : {
            object : '='
        },
        controller : function($scope) {
            $scope.sortedKeysArray = function(o) {
                var keysArray = [];
                for (var prop in $scope.object) {
                    if (typeof prop === 'function') {
                        continue;
                    }
                    if (prop == '$$hashKey') {
                        continue;
                    }
                    keysArray.push(prop);
                }
                return keysArray.sort(/* function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                } */);
            }
        }
    };
}).directive("editpropertyvalue", function($templateCache) {
    // recursion template
    var subPropertyValueTemplate =
'<div><div ng-repeat="subObject in propertyValueHolder"><editobjectproperty object="subObject"></editobjectproperty></div></div>'
    $templateCache.put('editsubpropertyvalue.html', subPropertyValueTemplate);
    
    // self template
    var template = 
'<div><span style="padding-left:15px;">"{{propertyname}}": </span><input type="text" ng-show="isPrimitive()" ng-model="propertyValue" ng-change="propertyValueStyle={\'background-color\':\'yellow\'}" ng-style="propertyValueStyle" editenter="updateProperty()" placeholder="value" title="Type ENTER to update"/><select style="width:1.5em;" ng-model="valueType" ng-options="vt for vt in valueTypeEnum"></select><button ng-visible="removeVisible" ng-click="removeProperty()" title="Remove"><b>-</b></button></span><div style="font-family: monospace;padding-left: 15px" ng-show="isObject()"><div ng-include="\'editsubpropertyvalue.html\'"></div></div><div style="font-family: monospace;padding-left: 15px" ng-show="isArray()">[<br/>]</div></div>';
    $templateCache.put('editpropertyvalue.html', template);

    return {
        restrict : 'E',
        //*
        templateUrl: 'editpropertyvalue.html',
        /*/
        template : template,
        //*/
        scope : {
            object : '='
        },
        controller : function($scope) {
            $scope.propertyname = $scope.$parent.propertyname;
            $scope.propertyValueHolder = [];
            $scope.propertyValue = $scope.object[$scope.propertyname];
            $scope.propertyValueStyle = {};
            $scope.valueTypeEnum = [
                'Primitive',
                'Object',
                'Array'
            ];
            $scope.valueType = $scope.valueTypeEnum[0];
            $scope.operation = '=';
            $scope.operationTitle = 'Update';
            $scope.removeVisibility = false;

            function adjustAddUpdateDisabled() {
                $scope.operation = '=';
                $scope.operationTitle = 'Update';
                $scope.removeVisible = true;
                if (valueToSet($scope.propertyValue) === $scope.object[$scope.propertyname]) {
                    $scope.operationTitle += '(change value to enable)';
                }
            }

            function valueToSet(value) {
                var f = parseFloat(value);
                if (f !== NaN && f == value) {
                    return f;
                } else {
                    var i = parseInt(value);
                    if (i !== NaN && i == value) {
                        return i;
                    }
                }
                return value;
            }
            
            function watchPropertyValue() {
                if ($scope.propertyValue instanceof Array) {
                    $scope.propertyValueHolder.splice(0,1);
                    $scope.valueType = $scope.valueTypeEnum[2];
                } else if (typeof $scope.propertyValue === 'object') {
                    $scope.propertyValueHolder.push($scope.propertyValue);
                    $scope.valueType = $scope.valueTypeEnum[1];
                } else {
                    $scope.propertyValueHolder.splice(0,1);
                    $scope.valueType = $scope.valueTypeEnum[0];
                }
                adjustAddUpdateDisabled();
            }
            
            $scope.$watch('propertyValue', watchPropertyValue);

            $scope.$watch('valueType', function() {
                if ($scope.valueType === $scope.valueTypeEnum[2]) {
                    if (!($scope.propertyValue instanceof Array)) {
                        $scope.propertyValue = [];
                    }
                } else if ($scope.valueType === $scope.valueTypeEnum[1]) {
                    if (typeof $scope.propertyValue !== 'object') {
                        $scope.propertyValue = {};
                    }
                } else {
                    if (typeof $scope.propertyValue === 'object' || $scope.propertyValue instanceof Array) {
                        $scope.propertyValue = '';
                    }
                }
            });
            
            $scope.isPrimitive = function() {
                return ($scope.valueType === $scope.valueTypeEnum[0]);
            }
            
            $scope.isObject = function() {
                return ($scope.valueType === $scope.valueTypeEnum[1]);
            }
            
            $scope.isArray = function() {
                return ($scope.valueType === $scope.valueTypeEnum[2]);
            }
            
            $scope.updateProperty = function() {
                $scope.propertyValueStyle = {};
                if ($scope.valueType == $scope.valueTypeEnum[2]) {
                    $scope.object[$scope.propertyName] = [];
                } else if ($scope.valueType == $scope.valueTypeEnum[1]) {
                    $scope.object[$scope.propertyname] = {};
                } else {
                    $scope.object[$scope.propertyname] = valueToSet($scope.propertyValue);
                }
                adjustAddUpdateDisabled();
            };
            
            $scope.removeProperty = function() {
                delete $scope.object[$scope.propertyname];
            };

            adjustAddUpdateDisabled();
        }
    };
}).directive("editproperty", function($templateCache) {
    
    // recursion template
    var subTemplate =
'<div><div ng-repeat="subProperty in $parent.propertyValueHolder"><editproperty object="subProperty" nojson="true"></editproperty></div></div>'
    $templateCache.put('editsubobject.html', subTemplate);

    // self template
    var template = 
'<div><pre ng-hide="nojson">{{object|json}}</pre><input type="text" ng-model="propertyName" ng-change="propertyNameStyle={\'background-color\':\'yellow\'}" ng-style="propertyNameStyle" editenter="addProperty()" placeholder="property name" title="Type property name"/><select style="width:1.5em;" ng-hide="onlyadd" ng-model="propertyName" ng-options="p as p for (p,v) in object | removeDollarDollarProperties:this"></select><span>:</span><input type="text" ng-show="isPrimitive()" ng-disabled="onlyadd && addUpdateDisabled" ng-model="propertyValue" ng-change="propertyValueStyle={\'background-color\':\'yellow\'}" ng-style="propertyValueStyle" editenter="addProperty()" placeholder="value" title="Type ENTER to add/update"/><select style="width:1.5em;" ng-hide="onlyadd && addUpdateDisabled" ng-model="valueType" ng-options="vt for vt in valueTypeEnum"></select><label></label></button><button ng-visible="removeVisible" ng-click="removeProperty()" title="Remove"><b>-</b></button><div style="font-family: monospace; padding-left: 15px" ng-show="isObject()"><div ng-include="\'editsubobject.html\'"></div></div><div style="font-family: monospace;; padding-left: 15px" ng-show="isArray()">[<br/>]</div></div>';
    $templateCache.put('editproperty.html', template);
    
    return {
        restrict : 'E',
        //*
        templateUrl: 'editproperty.html',
        /*/
        template : template,
        //*/
        scope : {
            object : '=',
            nojson: '@',
            onlyadd: '@',
        },
        controller : function($scope) {
            $scope.propertyName = '';
            $scope.propertyNameStyle = {};
            $scope.propertyValue = '';
            $scope.propertyValueHolder = [];
            $scope.propertyValueStyle = {};
            $scope.valueTypeEnum = [
                'Primitive',
                'Object',
                'Array'
            ];
            $scope.valueType = $scope.valueTypeEnum[0];
            $scope.operation = '+';
            $scope.operationTitle = 'Add';
            $scope.addUpdateDisabled = false;
            $scope.removeVisibility = false;

            function adjustAddUpdateDisabled() {
                $scope.addUpdateDisabled = false;
                if ($scope.propertyName === '') {
                    $scope.addUpdateDisabled = true;
                    $scope.operation = '+';
                    $scope.operationTitle = 'Add';
                    $scope.removeVisible = false;
                } else {
                    if ($scope.object.hasOwnProperty($scope.propertyName)) {
                        if ($scope.onlyadd) {
                            $scope.operation = '+';
                            $scope.operationTitle = 'Add';
                            $scope.addUpdateDisabled = true;
                            $scope.removeVisible = false;
                        } else {
                            $scope.operation = '=';
                            $scope.operationTitle = 'Update';
                            $scope.removeVisible = true;
                            if (valueToSet($scope.propertyValue) === $scope.object[$scope.propertyName]) {
                                $scope.addUpdateDisabled = true;
                                $scope.operationTitle += '(change value to enable)';
                            }                           
                        }
                    } else {
                        $scope.operation = '+';
                        $scope.operationTitle = 'Add';
                        $scope.removeVisible = false;
                    }
                }
            }

            function valueToSet(value) {
                var f = parseFloat(value);
                if (f !== NaN && f == value) {
                    return f;
                } else {
                    var i = parseInt(value);
                    if (i !== NaN && i == value) {
                        return i;
                    }
                }
                return value;
            }
            
            function watchPropertyValue() {
                if ($scope.propertyValue instanceof Array) {
                    $scope.propertyValueHolder.splice(0,1);
                    $scope.valueType = $scope.valueTypeEnum[2];
                } else if (typeof $scope.propertyValue === 'object') {
                    $scope.propertyValueHolder.push($scope.propertyValue);
                    $scope.valueType = $scope.valueTypeEnum[1];
                } else {
                    $scope.propertyValueHolder.splice(0,1);
                    $scope.valueType = $scope.valueTypeEnum[0];
                }
                adjustAddUpdateDisabled();
            }
            
            $scope.$watch('propertyValue', watchPropertyValue);

            $scope.$watch('propertyName', function() {
                if ($scope.propertyName !== '' && $scope.object.hasOwnProperty($scope.propertyName)) {
                    $scope.propertyNameStyle = {};
                    $scope.propertyValue = $scope.object[$scope.propertyName];
                } else {
                    $scope.propertyValue = '';
                }
                adjustAddUpdateDisabled();
            });

            $scope.$watch('valueType', function() {
                if ($scope.valueType === $scope.valueTypeEnum[2]) {
                    if (!($scope.propertyValue instanceof Array)) {
                        $scope.propertyValue = [];
                        $scope.addProperty();
                        $scope.valueType = $scope.valueTypeEnum[0];
                    }
                } else if ($scope.valueType === $scope.valueTypeEnum[1]) {
                    if (typeof $scope.propertyValue !== 'object') {
                        $scope.propertyValue = {};
                        $scope.addProperty();
                        $scope.valueType = $scope.valueTypeEnum[0];
                    }
                } else {
                    if (typeof $scope.propertyValue === 'object' || $scope.propertyValue instanceof Array) {
                        $scope.propertyValue = '';
                    }
                }
            });
            
            $scope.isPrimitive = function() {
                return ($scope.valueType === $scope.valueTypeEnum[0]);
            }
            
            $scope.isObject = function() {
                return ($scope.valueType === $scope.valueTypeEnum[1]);
            }
            
            $scope.isArray = function() {
                return ($scope.valueType === $scope.valueTypeEnum[2]);
            }
            
            $scope.addProperty = function() {
                $scope.propertyNameStyle = {};
                $scope.propertyValueStyle = {};
                if ($scope.valueType == $scope.valueTypeEnum[2]) {
                    $scope.object[$scope.propertyName] = [];
                } else if ($scope.valueType == $scope.valueTypeEnum[1]) {
                    $scope.object[$scope.propertyName] = {};
                } else {
                    $scope.object[$scope.propertyName] = valueToSet($scope.propertyValue);
                }
                if ($scope.onlyadd) {
                        $scope.propertyName = '';
                        $scope.propertyValue = '';
                }
                adjustAddUpdateDisabled();
            };
            
            $scope.removeProperty = function() {
                delete $scope.object[$scope.propertyName];
                $scope.propertyName = '';
                $scope.propertyValue = '';

                adjustAddUpdateDisabled();
            };

            adjustAddUpdateDisabled();
        }
    };
}).directive("editobjectproperty", function($templateCache) {
    // self template
    var template =
'<editobject object="object"></editobject><editproperty object="object" nojson="true" onlyadd="true"></editproperty>';
    $templateCache.put('editobjectproperty.html', template);

    return {
        restrict : 'E',
        //*
        templateUrl: 'editobjectproperty.html',
        /*/
        template : template,
        //*/
        scope : {
            object : '='
        }
    };
}).filter('removeDollarDollarProperties', function() {
    return function(input, scope) {
        input = angular.copy(input);
        angular.forEach( input, function(v,k)
        {
            if(k === '$$hashKey') {
                delete input[k];
            }
        });
        return input;
    }
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
}).directive('editenter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.keyCode === 13) {
                scope[attrs.ngModel] = this.value;
                scope.$apply(attrs.editenter);
            }
        });
    };
});
