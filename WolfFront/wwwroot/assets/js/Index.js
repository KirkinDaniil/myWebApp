$(document).ready(function () {
    let token = localStorage.getItem("access_token");
    if (token != null) {
        $.ajax({
            method: "Get",
            url: "https://7febcf9c.ngrok.io/api/Login",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            crossDomain: true,
            success: function () {
                $("#Reg").text("Личный кабинет").attr('href', 'https://7febcf9c.ngrok.io/Home/PersonalArea');
                $("#Enter").html("Выход").attr('href', 'https://7febcf9c.ngrok.io/').click(function (event) {
                    localStorage.clear();
                });
            },
            error: function () {
                return;
            }
        });
    }
});