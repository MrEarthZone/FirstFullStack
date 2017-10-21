$(document).ready(function () {
    //register
    $("#signup").click(function () {
        $.post("http://localhost:3000/regis", {
            email: $("#email").val(),
            name: $("#name").val(),
            username: $("#user").val(),
            password: $("#pass").val()
        });
        console.log($("#name").val()+" Complete");
    });
    //login
    
});