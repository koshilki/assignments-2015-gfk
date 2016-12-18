describe('BizzAppz', function(){

    describe('by default', function(){
        var outputStr;
        beforeEach(function(){
            outputStr = bizzappz();
        });

        it('should be a function', function(){
            expect(bizzappz).toEqual(jasmine.any(Function));
        });

        it('should produce array of 100 elements', function(){
            expect(outputStr).toEqual(jasmine.any(Array));
            expect(outputStr.length).toEqual(100);
        });

        it('should produce "Bizz" for multiples of three', function(){
            expect(outputStr[3-1]).toEqual('Bizz');
            expect(outputStr[33-1]).toEqual('Bizz');
            expect(outputStr[66-1]).toEqual('Bizz');
        });

        it('should produce "Appz" for multiples of five', function(){
            expect(outputStr[5-1]).toEqual('Appz');
            expect(outputStr[55-1]).toEqual('Appz');
            expect(outputStr[25-1]).toEqual('Appz');
        });

        it('should produce "BizzAppz" for multiples of five', function(){
            expect(outputStr[15-1]).toEqual('BizzAppz');
            expect(outputStr[45-1]).toEqual('BizzAppz');
            expect(outputStr[60-1]).toEqual('BizzAppz');
        });
    });
});
