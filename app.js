$(document).ready(function() {

  // Element Variables
  var $stickyCompare = $(".sticky-compare");
  var $button = "#show";
  var $label = $("label.product-label");
  var $checkmark = $("label");
  var $productContainer = $(".product-container");
	var $compareButton = $(".sticky-compare__compare-btn");
	var $compareButtonDisabled = $(".sticky-compare__compare-btn_disabled");
  // var $uncheckedCheckboxes = $("input:checkbox:not(:checked)");

  // Class Variables
  var classVisible = "sticky-compare_display-visible";
  var classDisabledLabel = "disabled-label";
	var classCompareButtonDisabled = "sticky-compare__compare-btn_disabled";

	// Compare Array
  var productsArray = [];

	// Location of Images
	var redCardImagePath = "/nfcu/images/credit-card_red.png";
	var blueCardImagePath = "/nfcu/images/credit-card_blue.png";
	var greenCardImagePath = "/nfcu/images/credit-card_green.png";
	var pinkCardImagePath = "/nfcu/images/credit-card_pink.png";
	var purpleCardImagePath = "/nfcu/images/credit-card_purple.png";
	var productImagePathBlank = "/nfcu/images/credit-card_blank.png";

  function showFooter() {
    $stickyCompare.addClass(classVisible);
		// $stickyCompare.animate({
		// 	bottom: "0px",
		// 	height: "180px"
		// }, 500, "linear");
		// $stickyCompare.animate({
		// 	bottom: "0px"
		// }, 500, "linear");
  }

  function hideFooter() {
    $stickyCompare.removeClass(classVisible);
  }

  function disableUncheckedCheckboxes() {
    var $uncheckedCheckboxes = $("input:checkbox:not(:checked)")
    $uncheckedCheckboxes.attr('disabled', true);
    $uncheckedCheckboxes.next().addClass(classDisabledLabel);
  }

  function disableUncheckedInputs(array) {
    if (allSlotsFilled) {
      setTimeout(function() {
        var $uncheckedCheckboxes = $("input:checkbox:not(:checked)")
        $uncheckedCheckboxes.attr('disabled', true);
        $uncheckedCheckboxes.next().addClass(classDisabledLabel);
      }, 10);
    }
  }

  function checkForEmptySlots(array) {
    allSlotsFilled = true;
    $.each(array, function(index, value) {
      if (value === null) {
        allSlotsFilled = false;
        return allSlotsFilled;
      }
    });
    return allSlotsFilled;
  }

  function setUpProductsArray(productsArray, clickedProduct) {
    productsArray.push(clickedProduct);
    productsArray[1] = null;
    productsArray[2] = null;
    return productsArray;
  }

  function addProductIntoEmptySlot(productsArray, clickedProduct) {
    $.each(productsArray, function(index, value) {
      if (value === null) {
        productsArray[index] = clickedProduct;
        return false;
      }
    });
    return productsArray;
  }

  function disableUnselectedInputs(allSlotsFilled) {
    if (allSlotsFilled) {
      setTimeout(disableUncheckedCheckboxes, 10);
    }
  }

  function redrawCompareBottom(productsArray) {
    var content = "";
    $.each(productsArray, function(index, value) {
			switch (value) {
				case "Green Card":
					content += "<div class='cell'><img src='" + greenCardImagePath + "' class='sticky-compare__image'></div>";
					break;
				case "Blue Card":
					content += "<div class='cell'><img src='" + blueCardImagePath + "' class='sticky-compare__image'></div>";
					break;
				case "Purple Card":
					content += "<div class='cell'><img src='" + purpleCardImagePath + "' class='sticky-compare__image'></div>";
					break;
				case "Pink Card":
					content += "<div class='cell'><img src='" + pinkCardImagePath + "' class='sticky-compare__image'></div>";
					break;
				default:
					content += "<div class='cell'><img src='" + productImagePathBlank + "' class='sticky-compare__image'></div>";
			}

    });
    $productContainer.html(content);
    // console.log(content);
  }

	function countProductsSelectedInArray(productsArray) {
		var count = 0;
		$.each(productsArray, function(index, value) {
			if (value !== null) {
				count++;
			}
		});
		return count;
	}

	function modifyCompareButtonState(productsArray) {
		var length = countProductsSelectedInArray(productsArray);
		console.log("length: ", length);
		if (length > 1) {
			$compareButton.removeClass("sticky-compare__compare-btn_disabled")
										.prop("disabled", false);
		}
	}

	function disableCompareButton() {
		$compareButton.prop("disabled", true);
	}

	function setEventListeners() {
		$label.on("click", function(e) {
			// The target is the label. A clicked label marks the input element right before it as "checked."
			var $clickedLabel = $(e.target);
			var $input = $clickedLabel.prev();
			var clickedInputNotChecked = !$input[0].checked;

				// Click events for if the checkbox is unchecked and being selected...
				if (clickedInputNotChecked) {
					var clickedProduct = $clickedLabel.text();
					console.log(clickedProduct);

					// If array is initially empty, add the first product and set the other slots as NULL.
					if ($.isEmptyObject(productsArray)) {
						productsArray = setUpProductsArray(productsArray, clickedProduct);
						console.log(productsArray);
						redrawCompareBottom(productsArray);
						showFooter();
						modifyCompareButtonState(productsArray);
						return;
					} else {
						// Find the first NULL spot and insert product in there.
						productsArray = addProductIntoEmptySlot(productsArray, clickedProduct);
					}

					console.log(productsArray);

					// Check if all 3 products have been selected. If so, disable the other checkboxes.
					allSlotsFilled = checkForEmptySlots(productsArray);
					if (allSlotsFilled) {
						disableUncheckedInputs(productsArray);
					}
					// If a lable with the class of disabled is clicked, do nothing.
					if ( $clickedLabel.hasClass(classDisabledLabel) ) {
						return false;
					}

					// Redraw the Compare Bottom with every click.
					redrawCompareBottom(productsArray);
					modifyCompareButtonState(productsArray);

			} else {  // If a checkbox is being deselected...
				console.log(productsArray);
				console.log("It is now unchecked");
			}
		});

		$compareButton.on("click", function(e) {
			if ( $(this).hasClass(classCompareButtonDisabled) ) {
				e.preventDefault();
				return false;
				console.log("disabled");
			} else {
				console.log("regular button clicked");
			}
		});

	}

	function init() {
		setEventListeners();
		disableCompareButton();
	}

	if ($stickyCompare.length > 0) {
		init();
	}

});
