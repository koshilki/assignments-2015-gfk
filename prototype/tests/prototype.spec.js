describe('Prototypal inheritance', function(){
    describe('Base class', function(){
        it('Should exist', function(){
            expect(BaseClass).toEqual(jasmine.any(Function));
        });
    });

    describe('Extending class', function(){
        var instance;
        beforeEach(function(){
            instance = new ExtendingClass();
        });
        it('should create new instance', function(){
            expect(instance).toBeDefined();
        });

        it('should produce instance of ExtendingClass', function(){
            expect(instance).toEqual(jasmine.any(ExtendingClass));
        });

        it('should produce instance of BaseClass', function(){
            expect(instance).toEqual(jasmine.any(BaseClass));
            expect(instance).not.toEqual(jasmine.any(OtherClass));
        });

        describe('Instance of extending class', function(){
            it('should have methods of BaseClass', function(){
                expect(instance.method1).toEqual(BaseClass.prototype.method1);
            });

            it('method of BaseClass can be invoked', function(){
                expect(instance.method1()).toEqual('Base class method is accessible');
            });

            it('method of ExtendingClass can be invoked', function(){
                expect(instance.method2()).toEqual('Extending class method is accessible');
            });
        });
    });
});
