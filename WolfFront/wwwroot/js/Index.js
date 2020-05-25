$(document).ready(function () {
    let token = localStorage.getItem("access_token");
    if (token != null) {
        $.ajax({
            method: "Get",
            url: "https://wolfskillsproject.azurewebsites.net/api/Login",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            crossDomain: true,
            success: function () {
                $("#Reg").text("Личный кабинет").attr('href', 'https://wolfskillsproject.azurewebsites.net/Home/PersonalArea');
                $("#Enter").html("Выход").attr('href', 'https://wolfskillsproject.azurewebsites.net/').click(function (event) {
                    localStorage.clear();
                });
            },
            error: function () {
                return;
            }
        });
    }
});