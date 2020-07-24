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
        console.log(aTemp + dCt);
        $(aTemp + dCt).before('<input type="checkbox" class="check" value="' + numVal + '"id=cb'+ dCt +' />'); // add before img tag so checkbox is in front of img 
        //reset values
        numVal = "";
        dCt += 1;
    });

    // only allow 2 checkboxes at a time
    var max = 2;
    var bTemp = 'label[for="';
    $('.check').on('change', function() {
        if ($('.check:checked').length > max) {
            $(this).prop('checked', false);
            alert("You can only select 2 images at a time.");
        }
    });

    // get info from what boxes are checked
    var selected = [];
    $("button").click(function() {
        $.each($(".check:checked"), function() {
            selected.push($(this).val());
        });

        console.log(selected + "yerrr");
        var firstCheck = imageDir + selected[0] + imageExt;
        var secondCheck = imageDir + selected[1] + imageExt;
    });


});

var swapCounter = 0;

function swap() {
    swapCounter += 1;
    document.getElementById("swapCounter").innerHTML = swapCounter;
    $.each($(".check:checked"), function() {
        $(this).prop('checked', false);
    });


};