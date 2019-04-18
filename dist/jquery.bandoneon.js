/**
 * jQuery Bandoneon v1.0.0
 * A simple menu plugin for jQuery
 * Copyright 2015 Emmanuel Antico
 * Licensed under the MIT License
 */

(function ($) {
    $.fn.bandoneon = function (options) {
        var defaults = {
            classParent: 'bdn-parent',
            classActive: 'active',
            speed: 200,
            autoClose: true
        };

        var _opts = $.extend({}, defaults, options || {});

        var initEl = function ($el) {
            var classParentLi = _opts.classParent + '-li';
            $('> ul', $el).show();

            $('li', $el).each(function () {
                if ($('> ul', this).length > 0) {
                    $(this).addClass(classParentLi);
                    $('> a', this).addClass(_opts.classParent);
                }
            });

            $('> ul', $el).hide();
        };

        var resetEl = function ($el) {
            $('ul', $el).hide();
            $allActiveLi = $('a.' + _opts.classActive, $el);
            $allActiveLi.siblings('ul').show();
        };

        this.each(function (options) {
            var obj = this;
            initEl(obj);
            resetEl(obj);

            $('li a', obj).click(function (e) {
                $activeLi = $(this).parent('li');
                $parentsLi = $activeLi.parents('li');
                $parentsUl = $activeLi.parents('ul');

                if ($(this).siblings('ul').length > 0) {
                    e.preventDefault();
                }

                if (_opts.autoClose === true) {
                    $('ul', obj).not($parentsUl).slideUp(_opts.speed);
                    $('a', obj).removeClass(_opts.classActive);
                    $('> a', $parentsLi).addClass(_opts.classActive);
                }

                if ($('> ul', $activeLi).is(':visible')) {
                    $('ul', $activeLi).slideUp(_opts.speed);
                    $('a', $activeLi).removeClass(_opts.classActive);
                } else {
                    $(this).siblings('ul').slideToggle(_opts.speed);
                    $('> a', $activeLi).addClass(_opts.classActive);
                }
            });
        });
    };
})(jQuery);
