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
    //map
    $("#location").click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initMap);
        } else {
            $("#show_location").text("Geolocation is not supported by this browser.");
        }
    });

    function initMap(position) {
        var lat = position.coords.latitude;
        var log = position.coords.longitude;
        localStorage.setItem("lat", lat);
        localStorage.setItem("log", log);
        var uluru = { lat: lat, lng: log };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    //post
    $("#post").click(function () {
        var id_post = localStorage.getItem("id");
        var lat_post = localStorage.getItem("lat");
        var log_post = localStorage.getItem("log");
        var text_post = $("#comment").val();
        var img_post = localStorage.getItem("img");
        $.post("http://localhost:3000/posts", {
            post_id: id_post,
            image: img_post,
            text: text_post,
            log: log_post,
            lat: lat_post
        });
    });
});
//picture
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img')
                .attr('src', e.target.result)
                .width(400)
                .height(300);
            localStorage.setItem("img", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}