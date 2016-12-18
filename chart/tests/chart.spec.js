describe('Chart generator', function(){
    describe('SVG Utils', function(){
        it('should be defined', function(){
            expect(svgUtils).toBeDefined();
            expect(svgUtils.createElement).toEqual(jasmine.any(Function));
        });

        it('should create svg element', function () {
            var svg = svgUtils.createElement('svg', {width: 100, height: 200});
            expect(svg).toBeDefined();
            expect(svg).toEqual(jasmine.any(Element));
            expect(svg.nodeName).toEqual('svg');
            expect(parseInt(svg.getAttribute('width'))).toEqual(100);
            expect(parseInt(svg.getAttribute('height'))).toEqual(200);
        });

        it('should create text element', function () {
            var text = svgUtils.createText(0, 0, 'Some text');
            expect(text).toBeDefined();
            expect(text).toEqual(jasmine.any(Element));
            expect(text.nodeName).toEqual('text');
            expect(text.innerHTML).toEqual('Some text');
        });
    });

    describe('Data parser', function(){
        it('should be defined', function(){
            expect(parseResponse).toBeDefined();
        });

        it('Should process response data', function(cb){
            var callback = jasmine.createSpy('callback');
            var fn = parseResponse(callback);
            expect(fn).toEqual(jasmine.any(Function));
            fn.call({responseText: 'DATE;ID;ANSWER\r\n1-1-2015;1;yes\r\n1-1-2015;1;no'});
            expect(callback).toHaveBeenCalledWith({dates: ['1-1-2015'], values: [50]});
            cb();
        });
    });

    describe('Chart drawing', function(){
        it('should create svg element in document', function(){
            drawChart();
        });
    });
});
