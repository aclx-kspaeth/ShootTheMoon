var autoCompleteDates = ["December 10, 2018", "December 11, 2018", "December 12, 2018", "December 13, 2018", "December 14, 2018"];
var searchInput = document.getElementById("search-input");
var hasError = false;

function processAutoComplete(input, array) {
  var currentFocus;

  input.addEventListener("input", function (e) {
    var autoCompleteDiv, autoCompleteItemDiv, autoCompleteValue = this.value;
    closeAllLists();

    if (!autoCompleteValue) {
      return false;
    } else {
      currentFocus = -1;
      autoCompleteDiv = document.createElement("DIV");
      autoCompleteDiv.setAttribute("id", this.id + "autocomplete-list");
      autoCompleteDiv.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(autoCompleteDiv);

      for (var i = 0; i < array.length; i++) {
        if (array[i].substr(0, autoCompleteValue.length).toUpperCase() == autoCompleteValue.toUpperCase()) {
          autoCompleteItemDiv = document.createElement("DIV");
          autoCompleteItemDiv.innerHTML = "<strong>" + array[i].substr(0, autoCompleteValue.length) + "</strong>";
          autoCompleteItemDiv.innerHTML += array[i].substr(autoCompleteValue.length);
          autoCompleteItemDiv.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

          autoCompleteItemDiv.addEventListener("click", function (e) {
            input.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });

          autoCompleteDiv.appendChild(autoCompleteItemDiv);
        }
      }

      return true;
    }
  });

  input.addEventListener("keydown", function (event) {
    var autoCompleteList = document.getElementById(this.id + "autocomplete-list");

    if (autoCompleteList) {
      autoCompleteList = autoCompleteList.getElementsByTagName("div");
    }

    if (event.keyCode == 40) {
      currentFocus++;
      addActive(autoCompleteList);
    } else if (event.keyCode == 38) {
      currentFocus--;
      addActive(autoCompleteList);
    } else if (event.keyCode == 13) {
      event.preventDefault();
      if (currentFocus > -1 && autoCompleteList) {
        autoCompleteList[currentFocus].click();
      }
    }
  });

  document.addEventListener("click", function (event) {
    closeAllLists(event.target);
  });

  /* Function Definitions */

  function addActive(autoCompleteItems) {
    if (!autoCompleteItems) {
      return false;
    } else {
      removeActive(autoCompleteItems);

      if (currentFocus >= autoCompleteItems.length) {
        currentFocus = 0;
      }

      if (currentFocus < 0) {
        currentFocus = (autoCompleteItems.length - 1);
      }

      autoCompleteItems[currentFocus].classList.add("autocomplete-active");
      return true;
    }
  }

  function removeActive(autoCompleteItems) {
    for (var i = 0; i < autoCompleteItems.length; i++) {
      autoCompleteItems[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(listElement) {
    var autoCompleteItems = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < autoCompleteItems.length; i++) {
      if (listElement != autoCompleteItems[i] && listElement != input) {
        autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i]);
      }
    }
  }

}

function processSearchInput() {
  var searchButton = document.getElementById("search-button");
  var searchInput = document.getElementById("search-input");
  var mainContainer = document.getElementById("main-container");

  if (searchButton) {
    searchButton.addEventListener("click", function (event) {
      event.preventDefault();

      if (searchInput && autoCompleteDates.includes(searchInput.value)) {
        updatePage(searchInput.value.toLowerCase());
      } else {
        if (!hasError) {
          showErrorModal(searchInput.value);
          hasError = true;
        }
      }
    });
  }

  /* Function Definitions */

  function updatePage(searchValue) {
    var graphFolder = deriveGraphFolder(searchValue);
    updateGraphs(graphFolder)

    function deriveGraphFolder(searchValue) {
      var graphFolder, searchValueParts = searchValue.split(" ");

      switch (searchValueParts[0]) {
        case "january":
          graphFolder = "01";
          break;
        case "februrary":
          graphFolder = "02";
          break;
        case "march":
          graphFolder = "03";
          break;
        case "april":
          graphFolder = "04";
          break;
        case "may":
          graphFolder = "05";
          break;
        case "june":
          graphFolder = "06";
          break;
        case "july":
          graphFolder = "07";
          break;
        case "august":
          graphFolder = "08";
          break;
        case "september":
          graphFolder = "09";
          break;
        case "october":
          graphFolder = "10";
          break;
        case "november":
          graphFolder = "11";
          break;
        case "december":
          graphFolder = "12";
          break;
      }

      graphFolder += searchValueParts[1].substr(0, 2);
      graphFolder += searchValueParts[2];

      return graphFolder;
    }

    function updateGraphs(graphFolder) {
      var oldPieChart, oldPieChartParent, newPieChart;
      var oldBarGraph, oldBarGraphParent, newBarGraph;
      var oldBoxPlot, oldBoxPlotParent, newBoxPlot;

      oldPieChart = document.getElementById("pie-chart");
      oldPieChartParent = oldPieChart.parentElement;
      newPieChart = document.createElement("object");
      newPieChart.setAttribute("data", "assets/graphs/" + graphFolder + "/" + graphFolder + "-pie.html");
      newPieChart.setAttribute("width", "100%");
      newPieChart.setAttribute("height", "350rem");
      newPieChart.setAttribute("id", "pie-chart");
      oldPieChartParent.removeChild(oldPieChart);
      oldPieChartParent.appendChild(newPieChart);

      oldBarGraph = document.getElementById("bar-graph");
      oldBarGraphParent = oldBarGraph.parentElement;
      newBarGraph = document.createElement("object");
      newBarGraph.setAttribute("data", "assets/graphs/" + graphFolder + "/" + graphFolder + "-bar.html");
      newBarGraph.setAttribute("width", "100%");
      newBarGraph.setAttribute("height", "350rem");
      newBarGraph.setAttribute("id", "bar-graph");
      oldBarGraphParent.removeChild(oldBarGraph);
      oldBarGraphParent.appendChild(newBarGraph);

      oldBoxPlot = document.getElementById("box-plot");
      oldBoxPlotParent = oldBoxPlot.parentElement;
      newBoxPlot = document.createElement("object");
      newBoxPlot.setAttribute("data", "assets/graphs/" + graphFolder + "/" + graphFolder + "-box.html");
      newBoxPlot.setAttribute("width", "100%");
      newBoxPlot.setAttribute("height", "350rem");
      newBoxPlot.setAttribute("id", "box-plot");
      oldBoxPlotParent.removeChild(oldBoxPlot);
      oldBoxPlotParent.appendChild(newBoxPlot);
    }

  }

  function showErrorModal(searchValue) {
    var errorAlertDiv, errorAlertDivCol, errorAlertDivRow;

    errorAlertDivRow = document.createElement("div");
    errorAlertDivRow.setAttribute("class", "row");
    errorAlertDivCol = document.createElement("div");
    errorAlertDivCol.setAttribute("class", "col-lg-12");
    errorAlertDiv = document.createElement("div");
    errorAlertDiv.setAttribute("class", "alert alert-dismissible alert-danger");
    errorAlertDiv.innerHTML = "<button id='error-close-button' type='button' class='close' data-dismiss='alert'>&times;</button>";
    errorAlertDiv.innerHTML += "<h4 class='alert-heading'>Oh snap!</h4>";
    errorAlertDiv.innerHTML += "<p style='margin-bottom: 0'>We couldn't find any data for the date you entered (" +
      (searchValue ? searchValue : "no value") + "). Change a few things up and try again.</p>";
    errorAlertDivRow.appendChild(errorAlertDivCol);
    errorAlertDivCol.appendChild(errorAlertDiv);
    mainContainer.insertBefore(errorAlertDivRow, mainContainer.firstChild);

    processErrorModalInput();

    function processErrorModalInput() {
      var errorModalCloseButton = document.getElementById("error-close-button");

      if (errorModalCloseButton) {
        errorModalCloseButton.addEventListener("click", function (event) {
          hasError = false;
        });
      }
    }

  }

}

/* Main Function Calls */

processAutoComplete(searchInput, autoCompleteDates);
processSearchInput();