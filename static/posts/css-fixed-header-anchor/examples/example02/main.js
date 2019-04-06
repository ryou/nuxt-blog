/**
 ** Smooth Scroll
 **/
$(function() {
    $('a[href^="#"]').on('click', function() {
        var $anchor = $(this);
        var duration = 300;
        var href = $anchor.attr("href");
        var target = $(href === "#" || href === "" ? 'html' : href);
        if (target.length === 0) return false;
        target.addClass('js-scroll-target');
        var position = target.offset().top;

        $('html,body').stop().animate(
            { scrollTop: position },
            duration,
            'swing'
        );

        return false;
    });
});
