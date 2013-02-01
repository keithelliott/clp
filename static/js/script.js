/* Author: YOUR NAME HERE
*/

$(document).ready(function() {

    $('#sendmessagebtn').click(function(event){
        event.preventDefault();

        $.post("/sendcontact", $('#contact').serialize(), function(data) {
            alert(data.message);
            if(typeof(data.error) === 'undefined'){
                $('#name').val('');
                $('#phone').val('');
                $('#email').val('');
                $('#TxtAreaMessage').val('');
            }
            else{
                console.log(data.error);
            }
        });

    });

    var startSlide = 1;
    // Get slide number if it exists
    if (window.location.hash) {
        startSlide = window.location.hash.replace('#','');
    }

    $('#slides').slides({
        preload: true,
        preloadImage: 'images/loading.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true,
        animationStart: function(current){
            $('.caption').animate({
                bottom:-65
            },100);
            if (window.console && console.log) {
                // example return of current slide number
                console.log('animationStart on slide: ', current);
            };
        },
        animationComplete: function(current){
            $('.caption').animate({
                bottom:0
            },200);
            if (window.console && console.log) {
                // example return of current slide number
                console.log('animationComplete on slide: ', current);
            };
        },
        slidesLoaded: function() {
            $('.caption').animate({
                bottom:0
            },200);
        }
    });
});