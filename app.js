$(document).ready(function() {

  // Element Variables
  var $stickyCompare = $(".sticky-compare");
  var $button = "#show";
  var $label = $("label.product-label");
  var $checkmark = $("label");
  var $productContainer = $(".product-container");
  // var $uncheckedCheckboxes = $("input:checkbox:not(:checked)");

  // Class Variables
  var classVisible = "sticky-compare_display-visible";
  var classDisabledLabel = "disabled-label";

  // State Variables
  stickyCompareDisplayed = false;
  isChecked = $(this)

  // Compare Array
  var productsArray = [];

	// Location of Images
	var productImagePath = "/nfcu/images/credit-card.png";
	var productImagePathBlank = "/nfcu/images/credit-card_blank.png";

  function showFooter() {
    $stickyCompare.addClass(classVisible);
  }

  function hideFooter() {
    $stickyCompare.removeClass(classVisible);
  }

  function disableUncheckedCheckboxes() {
    var $uncheckedCheckboxes = $("input:checkbox:not(:checked)")
    $uncheckedCheckboxes.attr('disabled', true);
    $uncheckedCheckboxes.next().addClass(classDisabledLabel);
  }

  function createStickyCompare(productsArray) {
    console.log(productsArray);
    // var content = "";
    // $.each(productsArray, function(index, product) {
    //   content += "<div class='cell'><p>" + product + "</p></div>";
    // });
    // $(".compare-btn").prepend(content);
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
			if (value === null) {
				content += "<div class='cell'><img src='" + productImagePathBlank + "' class='sticky-compare__image'></div>";
			} else {
				content += "<div class='cell'><img src='" + productImagePath + "' class='sticky-compare__image'></div>";
			}

    });
    $productContainer.html(content);
    // console.log(content);
  }

  $($label).on("click", function(e) {
    // The target is the label. A clicked label marks the input element right before it as "checked."
    var $clickedLabel = $(e.target);
    var $input = $clickedLabel.prev();
    var clickedInputNotChecked = !$input[0].checked;

      if (clickedInputNotChecked) {
        var clickedProduct = $clickedLabel.text();
				console.log(clickedProduct);
        // if (productsArray.length === 0) {
        if ($.isEmptyObject(productsArray)) {
          productsArray = setUpProductsArray(productsArray, clickedProduct);
          console.log(productsArray);
          redrawCompareBottom(productsArray);
          showFooter();
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

        redrawCompareBottom(productsArray);

        if ( $clickedLabel.hasClass(classDisabledLabel) ) {
          return false;
        }

    } else {  // If a checkbox is being deselcted...
      // console.log("It is now unchecked");
    }

  });

});
