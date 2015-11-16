	$(function () {
	  $('[data-toggle="popover"]').popover();
	});
	
	$(document).ready(function () {
    $("#filter").keyup(function () {

        var filter = $(this).val(),
            count = 0;


        $("#root li").each(function () {

            if ($(this).find('.title').text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
            }
            else {
                $(this).show();
                count++;
            }
        });


    });
});