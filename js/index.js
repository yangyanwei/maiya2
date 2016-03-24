$(function(){

    var index = 0;
    var lunbo  =  function(){
        $('.lunbo img').hide();
        var el = $('.lunbo img')[index];
        $(el).show();

        $('.dians').removeClass('dians-yellow');
        $($('.dians')[index]).addClass('dians-yellow');

        index += 1;
        if( index === $('.dians').length ){
            index = 0;
        }
    };
    $('.dians').each(function(i){
        $(this).data('index',i)
    });

    $('.dians').hover(function(){
        clearInterval(timerId);
        $('.dians').removeClass('dians-yellow');
        $(this).addClass('dians-yellow');
        var i = $(this).data('index');
        $('.lunbo img').hide();
        $( $('.lunbo img')[i] ).show();
        index = i;
    },function(){
        clearInterval(timerId);
        timerId = setInterval(lunbo,2000);
    });
    var timerId = setInterval(lunbo,2000);


});