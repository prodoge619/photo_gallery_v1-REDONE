

var itemArray = [];

// ---------------------------- LIGHTBOX CODES ---------------------------- //


var counter = 0;


var $overlay = $('<div id="overlay"></div>');
var $img = $("<img>");
var $vid = $('<iframe src=""></iframe>');
var $caption = $("<p></p>");
var $prevBtn = $('<i class="fa fa-arrow-circle-left fa-2x" id="btn-prev"></i>');
var $nextBtn = $('<i class="fa fa-arrow-circle-right fa-2x" id="btn-next"></i>');
var $closeBtn = $('<i class="fa fa-times fa-2x" id="btn-close"></i>');


$overlay.append($closeBtn);
$overlay.append($img);
$overlay.append($vid);
$overlay.append($prevBtn);
$overlay.append($nextBtn);
$overlay.append($caption);
$("body").append($overlay);


function populateArray() {
	$(".gallery-item a").each(function() {

		var itemObject = {	itemURL : $(this).attr("href"),
							itemCaption : $(this).children("img").attr("alt"),
							itemType : "image" };


		if ( $(this).hasClass("video") ) {
			itemObject.itemType = "video";
		}

		itemArray.push(itemObject);

	});
}


function findItemInArray(arrayOfObj, theURL) {
	for (var i = 0; i < arrayOfObj.length; i++) {
		if (arrayOfObj[i].itemURL === theURL) {
			return i;
		}
	}
}

function getNextItem() {

	if (counter < itemArray.length - 1 && counter >= 0) {
		counter++;
	} else {
		counter = 0;
	}
	updateOverlay();
}

function getPrevItem() {

	if (counter <= itemArray.length - 1 && counter > 0) {
		counter--;
	} else {
		counter = itemArray.length - 1;
	}
	updateOverlay();
}

function updateOverlay() {

	if ( itemArray[counter].itemType === 'video' ) {

		$img.hide();

		$vid.attr("src", itemArray[counter].itemURL);
		$caption.text(itemArray[counter].itemCaption);


		$vid.hide();
		$vid.fadeIn(500);

	} else {

		$vid.hide();

		$img.attr("src", itemArray[counter].itemURL);
		$caption.text(itemArray[counter].itemCaption);


		$img.hide();
		$img.fadeIn();
	}


	$caption.hide();
	$caption.fadeIn();

}

function checkKeyPress(e) {
	if (e.keyCode === 37) {

       getPrevItem();
    }
    else if (e.keyCode === 39) {

       getNextItem();
    }
}


$(".gallery-item a").click(function(event) {
	event.preventDefault();


	var itemLocation = $(this).attr("href");
	counter = findItemInArray(itemArray, itemLocation);


	updateOverlay();


	$overlay.fadeIn();

});


$closeBtn.click(function() {

	$overlay.fadeOut();
});


$nextBtn.click(function() {
	getNextItem();
});


$prevBtn.click(function() {
	getPrevItem();
});


// ---------------------------- SEARCH FILTER CODES ---------------------------- //


var $items = $(".gallery-item");

$("#user-search").keyup(function() {
	var term = $.trim($(this).val()).toLowerCase();



		$items.each(function(){

			var altText = $(this).children("a").children("img").attr("alt").toLowerCase();


	        if (altText.indexOf(term) > -1) {
	        	$(this).removeClass("hide").fadeIn();
	        } else {
	        	$(this).fadeOut().addClass("hide");
	        }

		});

});


// ---------------------------- DOCUMENT FUNCTION CALLS ---------------------------- //
populateArray();
document.onkeydown = checkKeyPress;
