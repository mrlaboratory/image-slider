console.log('%cDeveloped by \nMd Mijanur Rahaman 😎\nFacebook:: \nhttps://fb.com/mdmijanurrahaman.mr \nWebsite:: \nhttps://www.mrlaboratory.com \nNumber:: \n+8801854650673', 'font:2.5em Roboto;color:#ff0000;text-decoration:none');
 /*  
Hey Dear, I'm Md Mijanur Rahaman, 
Founder & CEO of MR Laboratory.
I have 2 years experience of Blogger template Development. I have enough ideas about HTML CSS and JavaScript to develop blogger theme. Inshaallah I will do better things for you. I can solve Blogger's problem. If you have any problem you can let me know, I will try my best to solve your problem.
Hire me for your work.
Email: admin@mrlaboratory.com
Fb: fb.com/mdmijanurrahaman.mr
Phone No: 01854650673
*/
(function ($) {
    $.fn.EasySlides = function (options) {
        var settings = $.extend({
            'autoplay': false,
            'timeout': 1000,
            'show': 5,
            'vertical': false,
            'reverse': false,
            'touchevents': true,
            'delayaftershow': 300,
            'stepbystep': true,
            'loop': true,
            'startslide': 0,
            'distancetochange': 10,
            'beforeshow': function () {},
            'aftershow': function () {},

        }, options);
        return this.each(function () {
            var this_slider = this;
            var EasySlidesTimer;
            var EasySlidesCanChange = true;

            var count = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)').length;
            var cur_slide = 0;
            var mousedowned = false;
            var need_slide = 0;
            var slides;
            if (count > 0) {

                while (count < settings['show']) {
                    var html = $(this_slider).html();
                    $(html).appendTo(this_slider);
                    $(this_slider).children('.next_button:eq(0), .prev_button:eq(0), .nav_indicators:eq(0)').remove();
                    slides = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)');

                    count = $(slides).length;
                }
                slides = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)');

               
               
                var EasySlidesNext = function (nextslide) {
                    if (EasySlidesCanChange) {
                        EasySlidesCanChange = false;
                        setTimeout(function () {
                            EasySlidesCanChange = true;
                        }, settings['delayaftershow']);
                        clearTimeout(EasySlidesTimer);
                        if (typeof settings['beforeshow'] == 'function') {
                            settings['beforeshow']();
                        }
                        var i = 0;
                        if (count > 0) {
                            if (typeof nextslide == 'number') {
                                cur_slide = nextslide;
                            } else {
                                cur_slide++;
                                nextslide = cur_slide;
                            }
                            if (settings['loop'] == true) {
                                while (cur_slide < 0) {
                                    cur_slide = cur_slide + count;
                                }
                                while (cur_slide >= count) {
                                    cur_slide = cur_slide - count;
                                }
                                while (nextslide < 0) {
                                    nextslide = nextslide + count;
                                }
                                while (nextslide >= count) {
                                    nextslide = nextslide - count;
                                }
                                
                            } else {
                                if (cur_slide < 0) {
                                    cur_slide = 0;
                                }
                                if (cur_slide >= count) {
                                    cur_slide = count - 1;
                                }
                                if (nextslide < 0) {
                                    nextslide = 0;
                                }
                                if (nextslide >= count) {
                                    nextslide = count - 1;
                                }
                            }
                            $(this_slider).children('.nav_indicators').find('ul').find('li').removeClass('active');

                            $(this_slider).find('.nav_indicators ul li:nth-child(' + (nextslide + 1) + ')').addClass('active');
                            i = 0;
                            /*
                            $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)').each(function() {
                            */
                            $(slides).each(function () {


                                var cssclass = '';
                                var icount = 0;
                                icount = i - nextslide;
                                while (icount < 0) {
                                    icount = icount + count;
                                }

                                while (icount > count) {
                                    icount = icount - count;
                                }
                                if (icount == 0) {
                                    cssclass = 'active';
                                    $(this_slider).find('.' + cssclass + ':not(.nav_indicators ul li)').removeClass(cssclass);
                                    $(this).removeClass('hidden');
                                    $(this).addClass(cssclass);
                                } else if (icount < settings['show'] / 2) {
                                    cssclass = 'next' + icount;
                                    $(this_slider).find('.' + cssclass).removeClass(cssclass);
                                    $(this).removeClass('hidden');
                                    $(this).addClass(cssclass);
                                } else if (icount > count - (settings['show'] / 2)) {
                                    cssclass = 'prev' + (count - icount);
                                    $(this_slider).find('.' + cssclass).removeClass(cssclass);
                                    $(this).removeClass('hidden');
                                    $(this).addClass(cssclass);
                                } else {
                                    $(this).addClass('hidden');
                                }
                             
                                i++;
                            });
                            if (settings['autoplay']) {
                                clearTimeout(EasySlidesTimer);
                                EasySlidesTimer = setTimeout(function () {
                                    EasySlidesNext();
                                }, settings['timeout']);
                            }
                        }
                        if (typeof settings['aftershow'] == 'function') {
                            settings['aftershow']();
                        }

                    }
                }
                EasySlidesNext(settings['startslide']);
                /*
                $(this_slider).children(':not(.next_button, .prev_button, .nav_indicators)').click(function () {
                */
                $(slides).click(function () {
                    need_slide = $(this_slider).children().index(this);
                    if (settings['stepbystep']) {
                        EasySlidesLoopToNeeded()
                    } else {
                        EasySlidesNext(need_slide);
                    }
                });
                $(this_slider).children('.nav_indicators').find('ul').find('li').click(function () {
                    need_slide = $(this_slider).find('.nav_indicators ul li').index(this);
                    if (settings['stepbystep']) {
                        EasySlidesLoopToNeeded()
                    } else {
                        EasySlidesNext(need_slide);
                    }
                });

                $(this_slider).find('.next_button').click(function () {
                    EasySlidesCanChange = true;
                    EasySlidesNext();
                });
                $(this_slider).find('.prev_button').click(function () {
                    EasySlidesCanChange = true;
                    cur_slide--;
                    EasySlidesNext(cur_slide);
                });
                if (settings['touchevents']) {
                    var EasySliderMoved = function (xcur, ycur) {
                        var offset = $(slides).find('.active').offset();
                        var left = 0;
                        var top = 0;
                        if (typeof offset !== 'undefined') {
                            left = offset.left;
                            top = offset.top;
                        }

                        var p0 = $(this_slider).data('posstart'),
                            p1 = {
                                x: xcur,
                                y: ycur,
                                l: left,
                                t: top,
                            },
                            d = 0;
                        if (typeof p0 === 'undefined') {
                            p0 = p1;
                            $(this_slider).data('posstart', p1);
                        }

                        if (settings['vertical']) {
                            d = p1.y - p0.y;
                            top = p0.t + d;
                            //$(this_slider).find('.active:not(.nav_indicators ul li)').offset({'top': top});
                        } else {
                            d = p1.x - p0.x;
                            left = p0.l + d;
                            //$(this_slider).find('.active:not(.nav_indicators ul li)').offset({'left': left});
                        }
                        if (settings['reverse']) {
                            d = -d;
                        }
                        if ((Math.abs(d) > settings['distancetochange']) && (EasySlidesCanChange)) {
                            $(this_slider).data('posstart', p1);

                            if (d > 0) {
                                cur_slide--;
                            } else {
                                cur_slide++;
                            }
                            EasySlidesNext(cur_slide);
                        }
                    }

        

                
              
                }
            }
        });
    }
})(jQuery);
