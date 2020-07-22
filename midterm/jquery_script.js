
        $("document").ready(function() {
            // load images
            var images = [];
            var imageDir = "https://buminga.github.io/cs355/midterm/img/";
            var imageExt = ".png"
            for (var i = 1; i < 10; i++) {
                images.push(imageDir + i + imageExt);
            }

            // scramble images
            $('.container div:not(.row)').each(function() {
                var rand = Math.floor(Math.random() * images.length);
                $(this).append('<img class="imgBox" src="' + images[rand] + '"/>');
                images.splice(rand, 1);
            });


            // assign checkbox to respective img #
            var numVal = "";
            var dCt = 1;
            $('img.imgBox').each(function() {
                numVal = $(this).prop('src'); // get # from img file
                numVal = numVal.slice(44, 45); // slice to get just the char of img # 
                $('#d' + dCt).prepend('<input type="checkbox" class="check" value="' + numVal + '"/>'); // add before img tag so checkbox is in front of img 

                //reset values
                numVal = "";
                dCt += 1;
            });

            // only allow 2 checkboxes at a time
            var max = 2;
            $('.check').on('change', function() {
                if ($('.check:checked').length > max) {
                    $(this).prop('checked', false);
                    alert("You can only select 2 images at a time.");
                } else {
                    $(this).css({
                        'background': 'blue'
                    });
                }
            });

            $("button").click(function() {
                var favorite = [];
                $.each($(".check:checked"), function() {
                    favorite.push($(this).val());
                });
                alert("My favourite sports are: " + favorite.join(", "));
            });

        });

        $(function() {
            $('.check').on('change', function() {
                if ($(this).is(':checked')) {
                    $('.divImg').fadeTo('slow', 0.3, function() {
                        $(this).css({
                            'background': 'blue'
                        });
                    }).fadeTo('slow', 1);
                } else $(".divImg").css({
                    'background': ''
                });
            });

        });

        var swapCounter = 0;

        function swapCount() {
            swapCounter += 1;
            document.getElementById("swapCounter").innerHTML = swapCounter;
        };