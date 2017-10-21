$(document).ready(function () {
    var chack = 0;
    //register
    $("#signup").click(function () {
        $.post("http://localhost:3000/regis", {
            email: $("#email").val(),
            name: $("#name").val(),
            username: $("#user").val(),
            password: $("#pass").val()
        });
        console.log($("#name").val() + " Complete");
    });
    //login
    $("#login").click(function () {
        $.getJSON("http://localhost:3000/regis", function (data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].username == $("#name_login").val() && data[i].password == $("#pass_login").val()) {
                    localStorage.setItem("id", data[i].id);
                    window.location = "pageHome.html";
                    chack++;
                }
                if (i == data.length - 1 && chack == 0) {
                    alert("Username or Password your are wrong !!");
                }
            }
        });
    });
    //logout
    $("#logout").click(function () {
        localStorage.removeItem("id");
    });
    //picture
    $("#pic").click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $("#show_location").text("Geolocation is not supported by this browser.");
        }
    });
    function showPosition(position) {
        var lat = position.coords.latitude;
        var log = position.coords.longitude;
        function initMap() {
            var uluru = {lat: -25.363, lng: 131.044};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 4,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
          }
    }

});