/***** ---------------------------
 ** Brian Uminga
 ** CUNY ID: 23190424
 ** CS 355 - 17 (10:00 - 11:34)
 ** Midterm Part B
 ** https://buminga.github.io/cs355/midterm/
 **
 ** jquery_script.js
 ** ---------------------------
 *****/
$("document").ready(function() {

    // load image links into array
    var images = [];
    var imageDir = "https://buminga.github.io/cs355/midterm/img/";
    var imageExt = ".png"
    for (var i = 1; i < 10; i++) {
        images.push(imageDir + i + imageExt);
    }

    // scramble image order & insert into divs
    var usedImg = [];
    $('label').each(function() {
        var rand = Math.floor(Math.random() * images.length);
        $(this).append('<img class="imgBox" src="' + images[rand] + '"/>');
        usedImg.push(images[rand]);
        images.splice(rand, 1);

    });

    // assign checkbox to respective img #
    var numVal = "";
    var dCt = 1;
    var aTemp = 'label[for="cb';
    $('img.imgBox').each(function() {
        numVal = $(this).prop('src'); // get # from img file
        numVal = numVal.slice(44, 45); // slice to get just the char of img #
        $(aTemp + dCt).before('<input type="checkbox" class="check" value="' + numVal + '"id=cb' + dCt + ' />'); // add before img tag so checkbox is in front of img 
        //reset values
        numVal = "";
        dCt += 1;
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
        // make sure 2 boxes are checked
        var theLength = $(".check:checked").length;
        if (theLength <= 1) {
            alert("Must select 2 pictures");
        } else {

            // save html and color values of checked images
            var toSwitch = [];
            $.each($(".check:checked"), function() {
                toSwitch.push($(this).parent());
            });

            // swap values of checked images
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
            });

            // save values of img files (#1-9)
            var haha = [];
            var toCheckCt = 0;
            var success = 0;
            $('img').each(function() {
                var toCheck = $(this).prop('src');
                haha.push(toCheck.slice(44, 45));
                console.log(haha);
            });

            // check if in order
            for (var i = 1; i < 10; i++) {
                if (i == haha[i-1]) {
                    success += 1;
                }
            }

            // display win message
            if (success == 9) {
                alert("Congratulations! You won in " + swapCt + " moves");
                swapCt = 0;
            }
        }
    });


});