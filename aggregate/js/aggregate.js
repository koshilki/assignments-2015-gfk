;(function($){
    'use strict';

    window.aggregateData = function(urls, callback) {
        $.when.apply($, urls.map(function(url){
            return $.ajax(url);
        })).done(function(){
            var data = Array.prototype.map.call(arguments, function(res){
                return res[0];
            }).join(' ');
            callback(data);
        });
    };
})(jQuery);
