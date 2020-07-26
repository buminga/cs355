/***** ---------------------------
    ** Brian Uminga
    ** CUNY ID: 23190424
    ** CS 355 - 17 (10:00 - 11:34)
    ** Midterm Part B
    ** Interactive Page: https://buminga.github.io/cs355/midterm/
    ** Code: https://github.com/buminga/cs355/tree/master/midterm
    **
    ** scripts.js
    ** ---------------------------
 *****/

$("document").ready(function() {

    // load image links into array
    var images = [];
    var imageDir = "https://buminga.github.io/cs355/midterm/img/";
    var imageExt = ".jpg"
    for (var i = 1; i < 10; i++) {
        images.push(imageDir + i + imageExt);
    }

    // scramble image order & insert <img> tags into 'div > label'
    $('label').each(function() {
        var rand = Math.floor(Math.random() * images.length);
        $(this).append('<img class="imgBox" src="' + images[rand] + '"/>');
        images.splice(rand, 1);
    });

    // insert checkbox input code before <img> tags
    var cbCt = 1;
    var labelStr = 'label[for="cb';
    $('img.imgBox').each(function() {
        $(labelStr + cbCt).before('<input type="checkbox" class="check" id=cb' + cbCt + ' />'); 
        cbCt += 1;
    });

    // send error if player chooses more than 2 boxes
    var max = 2;
    $('.check').on('change', function() {
        if ($('.check:checked').length > max) {
            $(this).prop('checked', false);
            alert("You can only select 2 images at a time.");
        }
    });


    // swap function
    var swapCt = 0;
    $('#swap').click(function() {
        // make sure 2 boxes are checked, send error if <= 1
        var checkedQty = $(".check:checked").length;
        if (checkedQty <= 1) {
            alert("Must select 2 pictures.");
            checkedQty = 0;
        } else {

            // save html of checked images
            var toSwitch = [];
            $.each($(".check:checked"), function() {
                toSwitch.push($(this).parent());
            });

            // swap html of checked images
            var tempToSwitch;
            tempToSwitch = toSwitch[0].html();
            ($(toSwitch[0].html(toSwitch[1].html())));
            ($(toSwitch[1].html(tempToSwitch)));

            // swap counter
            swapCt += 1;
            $(swapCounter).html(swapCt);

            // clear checkboxes and other values
            $.each($(".check:checked"), function() {
                $(this).prop('checked', false);
                theLength = 0;
                tempToSwitch = "";
                toSwitch = "";
                checkedQty = 0;
            });

            // save values of img files in the order of the grid
            var checkImgs = [];
            var toCheckCt = 0;
            $('img').each(function() {
                var toCheck = $(this).prop('src');
                checkImgs.push(toCheck.slice(44, 45));
            });

            // check if in order by comparing img #s
            var success = 0;
            for (var i = 1; i < 10; i++) {
                if (i == checkImgs[i-1]) {
                    success += 1;
                }
            }
            
            // display win message
            if (success == 9) {
                alert("Congratulations! You won in " + swapCt + " moves.");
                swapCt = 0;
            }
        }
    });
});