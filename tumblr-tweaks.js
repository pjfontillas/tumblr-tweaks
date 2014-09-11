(function () {
    $(document).ready(function () {
        console.log('Looking for Tumblr site...');
        if ($('#btn_tumblr')) {
            console.log('Tumblr found!');

            // add support for next navigation
            $(document).on('keydown', function (event) {
                //console.log(event.keyCode);
                //console.log(event);

                // support for next link
                if (event.keyCode == 39) {
                    //look for next link
                    $('#footer a').each(function (index, element) {
                        element = $(element);
                        if (element.html().toLowerCase().indexOf('next') !== -1) {
                            document.location = element.attr('href');
                        }
                    });
                }

                // support for previous link
                if (event.keyCode == 37) {
                    //look for previous link
                    $('#footer a').each(function (index, element) {
                        element = $(element);
                        if (element.html().toLowerCase().indexOf('previous') !== -1) {
                            document.location = element.attr('href');
                        }
                    });
                }

                // support for navigating through posts
                if (event.keyCode == 9 || event.keyCode == 40 || event.keyCode == 38) {
                    //console.log('tab navigating posts...');
                    // check if navigating posts is already turned on
                    var currentPost = $('.current.post');
                    if (currentPost.length == 0 && event.keyCode == 9) {
                        // no current post found, mark first one and scroll to it
                        //console.log('Marking first post as current...');
                        $('.post').first().addClass('current');
                    } else if (currentPost.length != 0) { // keyboard navigation only active after tab has been pressed
                        var nextPost;
                        if (event.keyCode == 38 || (event.keyCode == 9 && event.shiftKey)) {
                            //console.log('Moving to previous post...');

                            // look for previous post
                            nextPost = currentPost.prevAll('.post').first();
                            
                            // if at beginning of list do not remove current class
                            if (nextPost.length == 0) {
                                //console.log('At first post...');
                                if (event.keyCode == 9 && event.shiftKey) {
                                    currentPost.removeClass('current');
                                    nextPost = $('.post').last();
                                }
                            } else {
                                currentPost.removeClass('current');
                            }
                        } else {
                            //console.log('Moving to next post...');

                            // look for next post
                            nextPost = currentPost.nextAll('.post').first();
                            //console.log('currentPost:', currentPost);
                            //console.log('nextPost: ', nextPost);

                            // if at end of list and using tab go back to top
                            if (nextPost.length == 0 && event.keyCode == 9) {
                                //console.log('Moving to first post...');
                                currentPost.removeClass('current');
                                nextPost = $('.post').first();
                            } else {
                                // if at end of list do not remove current class
                                if (nextPost.length != 0) {
                                    currentPost.removeClass('current');
                                }
                            }
                        }

                        if (nextPost.length != 0) {
                            nextPost.addClass('current');
                        }
                    }

                    // keyboard navigation only active after tab has been pressed
                    currentPost = $('.current.post');
                    if (currentPost.length != 0) {
                        event.preventDefault()
                        var offset = currentPost.offset();
                        window.scrollTo(offset.left, offset.top);
                    }
                }
            });
        }
    });
}());
