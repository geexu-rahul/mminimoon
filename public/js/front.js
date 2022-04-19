$(document).on("change", "#calendar_dropdown", function () {
    var year_month = $(this).val();
    year_month = year_month.split("-");
    var year = year_month[0];
    var month = year_month[1];
    set_calendar(month, year);
});

$(document).on("click", ".month-nav-next", function (e) {
    e.preventDefault();
    var year = $(this).attr("data-year");
    var month = $(this).attr("data-month");
    set_calendar(month, year);
});

$(document).on("click", ".month-nav-previous", function (e) {
    e.preventDefault();
    var year = $(this).attr("data-year");
    var month = $(this).attr("data-month");
    set_calendar(month, year);
});

$(document).on("keyup", "#header-search-form", function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("header-search-form")
    );
    google.maps.event.addListener(autocomplete, "place_changed", function () {
        mapDropDownActive();
    });
});

$(document).on("keyup", "#sidenav-search-form", function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("sidenav-search-form")
    );
    google.maps.event.addListener(autocomplete, "place_changed", function () {
        document
            .getElementById("sidenav-search-drop-down")
            .classList.toggle("sm-show");
        $("#sidenav-search-checkin").datepicker("show");
    });
});

$(document).on("keyup", "#front-search-field", function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("front-search-field")
    );
});

$(document).on("keyup", "#location-search-google", function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("location-search-google")
    );
});

function set_calendar(month, year) {
    //console.log("hellow");
    var property_id = $("#dtpc_property_id").val();
    var dataURL = APP_URL + "/ajax-calender/" + property_id;
    var calendar = "";
    $.ajax({
        url: dataURL,

        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
            month: month,
            year: year,
        },
        type: "post",
        dataType: "json",
        success: function (result) {
            $("#calender-dv").html(result.calendar);
            $("#hotel_date_package").modal("hide");
        },
        error: function (request, error) {
            console.log("error");
        },
    });
}

$(document.body).on("click", ".date-package-modal", function () {
    $("#model-message").html("");
    var sdate = $(this).attr("id");
    var div = sdate.split("-");
    var day = div[2];
    var month = div[1];
    var year = div[0];
    var price = $(this).attr("data-price");
    var status = $(this).attr("data-status");
    var minday = $(this).attr("data-minday");

    if (day.length < 2) {
        day = "0" + day;
    }
    var date = day + "-" + month + "-" + year;
    var dateFormat = $("#front_date_format_type").val();

    date = $.datepicker.formatDate(
        dateFormat,
        $.datepicker.parseDate("dd-mm-yy", date)
    );

    $("#dtpc_start").val(date);
    $("#dtpc_end").val(date);

    $("#dtpc_price").val(price);
    $("#dtpc_stay").val(minday);
    $("#dtpc_status").val(status).change();
    $("#dtpc_start").datepicker({
        dateFormat: $("#front_date_format_type").val(),
        onSelect: function (date) {
            var a = $("#dtpc_start").val();
            var b = $("#dtpc_end").val();
            $("#error-dtpc-start").html("");
            $("#error-dtpc-end").html("");
            if (dateConvert(a, dateFormat) > dateConvert(b, dateFormat)) {
                $("#error-dtpc-start").html(
                    "Start date not greater than end date."
                );
            }
        },
    });
    $("#dtpc_end").datepicker({
        dateFormat: $("#front_date_format_type").val(),
        onSelect: function (date) {
            var a = $("#dtpc_start").val();
            var b = $("#dtpc_end").val();
            $("#error-dtpc-start").html("");
            $("#error-dtpc-end").html("");

            if (dateConvert(a, dateFormat) > dateConvert(b, dateFormat)) {
                $("#error-dtpc-end").html("End date not less than start date.");
            }
        },
    });
    $("#price_btn").removeClass("disabled");
    $("#price_spinner").addClass("d-none");
    $("#price_next-text").text("Submit");

    $("#hotel_date_package").modal();
    //}
});

//Icalenar Modal Code Starts here

$(document.body).on("click", ".imporpt_calendar", function () {
    $("#import_calendar_package").modal();
});
$(document.body).on("change", "#color", function () {
    var color = $("#color").val();
    if (color == "custom") {
        $(".colorCustom").css("display", "block");
    } else {
        $(".colorCustom").css("display", "none");
    }
});

$(document.body).on("submit", "#icalendar_form", function (e) {
    e.preventDefault();
    $("#error-icalendar-url").html("");
    $("#error-icalendar-name").html("");
    var url = $("#icalendar_url").val();
    var name = $("#icalendar_name").val();
    var property_id = $("#icalendar_property_id").val();
    var color = $("#color").val();
    var customColor = $("#customcolor").val();
    if (color == "custom") {
        if (customColor == "") {
            $("#error-dtpc-customcolor").html("This field is required.");
        }
    } else {
        customColor = "none";
    }
    if (url == "") $("#error-icalendar-url").html("This field is required.");
    if (name == "") $("#error-icalendar-name").html("This field is required.");
    if (color == "") $("#error-dtpc-color").html("This field is required.");
    //checkCustomColor();
    else
        $.ajax({
            type: "POST",
            url: APP_URL + "/ajax-icalender-import/" + property_id,
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                url: url,
                name: name,
                property_id: property_id,
                color: color,
                customcolor: customColor,
            },
            success: function (msg) {
                if (msg.status == 1) {
                    $("#icalendar-model-message").html(msg.success_message);
                    $("#icalendar-model-message").removeClass("d-none");
                    $("#import_calendar_package").modal("hide");
                } else {
                    $("#error-icalendar-url").html(msg.error.url);
                    $("#error-icalendar-name").html(msg.error.name);
                    $("#error-dtpc-customcolor").html(msg.error.customcolor);
                    return false;
                }
            },
            error: function (request, error) {
                //console.log(error);
            },
        });
});

function dateConvert(date, format) {
    const months = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
    };
    let day = "";
    let mon = "";
    let year = "";
    let formats = format.split(/[./-]/g);
    let dateParts = date.split(/[./-]/g);
    formats.forEach((element, index) => {
        if (element === "dd") {
            day = dateParts[index];
        } else if (element === "mm") {
            mon = dateParts[index];
        } else if (element === "M") {
            mon = months[dateParts[index]];
        } else if (element.includes("yy")) {
            year = dateParts[index];
        }
    });
    return Date.parse(year + "-" + mon + "-" + day);
}

//Icalendar Modal Code End here

//Icalendar Export Modal Code Starts here

$(document.body).on("click", "#export_icalendar", function () {
    $("#calendar_export_package").modal();
});

//Icalendar Export Modal Code Ends here

$(document.body).on("submit", "#dtpc_form", function (e) {
    e.preventDefault();
    $("#error-dtpc-start").html("");
    $("#error-dtpc-end").html("");
    $("#error-dtpc-price").html("");
    $("#error-dtpc-status").html("");
    $("#error-dtpc-stay").html("");

    var start_date = $("#dtpc_start").val();
    var end_date = $("#dtpc_end").val();
    var price = $("#dtpc_price").val();
    var status = $("#dtpc_status").val();
    var property_id = $("#dtpc_property_id").val();
    var min_stay = $("#dtpc_stay").val();
    var url = APP_URL + "/ajax-calender-price/" + property_id;
    if (start_date == "") $("#error-dtpc-start").html("Start date not given.");
    if (end_date == "") $("#error-dtpc-end").html("End date not given.");
    if (price == "") $("#error-dtpc-price").html("Price not given.");
    if (status == "") $("#error-dtpc-status").html("Status not select.");

    if (start_date != "" && end_date != "" && price != "" && status != "") {
        $("#price_btn").addClass("disabled");
        $("#price_spinner").removeClass("d-none");
        $("#price_next-text").text("Submit..");
        $.ajax({
            type: "POST",
            url: url,
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                start_date: start_date,
                end_date: end_date,
                price: price,
                min_stay: min_stay,
                status: status,
            },
            success: function (msg) {
                //if(msg.status){
                var year_month = $("#calendar_dropdown").val();
                year_month = year_month.split("-");
                var year = year_month[0];
                var month = year_month[1];
                set_calendar(month, year);
                $("#model-message").append("Data save successfully");
                $("#model-message").removeClass("d-none");

                //}
            },
            error: function (request, error) {
                console.log(error);
            },
        });
    }
});

function mapDropDownActive() {
    document.getElementById("search-drop-down").classList.toggle("sm-show");
    $("#header-search-checkin").datepicker("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (
        !event.target.matches("#search-map") &&
        !event.target.matches(".sm-dropdown-content") &&
        !$(event.target).parents(".sm-dropdown-content").length &&
        !event.target.matches(".ui-state-default") &&
        !event.target.matches(".ui-icon") &&
        !event.target.matches(".ui-datepicker-month") &&
        !event.target.matches(".ui-datepicker-year") &&
        !event.target.matches(".month")
    ) {
        var dropdowns = document.getElementsByClassName("sm-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("sm-show")) {
                openDropdown.classList.remove("sm-show");
            }
        }
    }
};

$(".search-form").submit(function (e) {
    var t = $("#header-search-checkin").val(),
        a = $("#header-search-checkout").val(),
        o = $("#header-search-guests").val(),
        i = "";
    var n = $("#header-search-form").val(),
        c = n.replace(" ", "+");
    (window.location.href =
        APP_URL +
        "/s?location=" +
        c +
        "&checkin=" +
        t +
        "&checkout=" +
        a +
        "&guest=" +
        o),
        e.preventDefault();
});

function page_loader_start() {
    $("body").prepend('<div id="preloader"></div>');
}
function page_loader_stop() {
    $("#preloader").fadeOut("slow", function () {
        $(this).remove();
    });
}

function modal_alert(message, call_back) {
    $("#alert_model").modal("show");
}

$("#ok_id").on("click", function (e) {
    e.preventDefault();
    console.log("hello");
});
$("#front-search-form").submit(function (e) {
    e.preventDefault();
    var t = $("#startDate").val(),
        a = $("#endDate").val(),
        o = $("#front-search-guests").val(),
        i = "";
    var n = $("#front-search-field").val(),
        c = n.replace(" ", "+");
    (window.location.href =
        APP_URL +
        "/search?location=" +
        c +
        "&checkin=" +
        t +
        "&checkout=" +
        a +
        "&guest=" +
        o),
        e.preventDefault();
});

$(".search-form").submit(function (e) {
    var t = $("#header-search-checkin").val(),
        a = $("#header-search-checkout").val(),
        o = $("#header-search-guests").val(),
        i = "";

    var n = $("#header-search-form").val();
    if (n == "") {
        var t = $("#sidenav-search-checkin").val(),
            a = $("#sidenav-search-checkout").val(),
            o = $("#sidenav-search-guests").val(),
            i = "";
        n = $("#sidenav-search-form").val();
    }
    c = n.replace(" ", "+");
    (window.location.href =
        APP_URL +
        "/search?location=" +
        c +
        "&checkin=" +
        t +
        "&checkout=" +
        a +
        "&guest=" +
        o),
        e.preventDefault();
});

$(".room-list-status").change(function () {
    var status = $(this).val();
    var property = $(this).attr("data-room-id");
    $.ajax({
        type: "POST",
        url: APP_URL + "/listing/" + property + "/update_status",
        data: { _token: "{{ csrf_token() }}", status: status },
        success: function () {
            location.reload();
        },
    });
});

$("#message-form").submit(function (e) {
    e.preventDefault();
    var message = $("#message_text").val();
    if (message != "")
        $.ajax({
            type: "POST",
            url: APP_URL + "/messaging/qt_reply/" + $("#reservation_id").val(),
            data: { _token: "{{ csrf_token() }}", message: message },
            success: function (msg) {
                $("#message-list").prepend(msg);
            },
        });
});

$("#host-message-form").submit(function (e) {
    e.preventDefault();
    var message = $("#message_text").val();
    if (message != "")
        $.ajax({
            type: "POST",
            url: APP_URL + "/messaging/qt_reply/" + $("#reservation_id").val(),
            data: {
                _token: "{{ csrf_token() }}",
                message: message,
                pricing_room_id: $("#pricing_room_id").val(),
                pricing_checkin: $("#pricing_start_date").val(),
                pricing_checkout: $("#pricing_end_date").val(),
                pricing_guests: 1,
                pricing_price: $("#pricing_price").val(),
            },
            success: function (msg) {
                $("#message-list").prepend(msg);
            },
        });
});

function myFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copied").innerHTML = "Copied";
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML =
                    "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), allcities);

alert(allcities);
