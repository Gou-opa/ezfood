$(function() {
    console.log('hello');
    $('.button_menu').click(function (e) { 
        $('.left_menu').addClass('ra');
        $('.st_table_1').removeClass('col-sm-12').addClass('col-9 offset-3 col-sm-10 offset-sm-2 col-md-11 offset-md-1');
        e.preventDefault();
        
    });
    $('.tat').click(function (e) { 
        $('.left_menu').removeClass('ra');
        $('.st_table_1').removeClass('col-9 offset-3 col-sm-10 offset-sm-2 col-md-11 offset-md-1').addClass('col-sm-12');
        e.preventDefault(); 
    });
    


    
})
