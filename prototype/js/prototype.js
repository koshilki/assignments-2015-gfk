var BaseClass = function(){};
BaseClass.prototype.method1 = function(){
    return 'Base class method is accessible';
};

var ExtendingClass = function(){};
ExtendingClass.prototype = new BaseClass();
ExtendingClass.prototype.method2 = function(){
    return 'Extending class method is accessible';
};

var OtherClass = function(){};
