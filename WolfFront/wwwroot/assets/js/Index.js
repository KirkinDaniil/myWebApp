$(document).ready(function () {
    let token = localStorage.getItem("access_token");
    if (token != null) {
        $.ajax({
            method: "Get",
            url: "https://localhost:44318/api/Login",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            crossDomain: true,
            success: function () {
                $("#Reg").text("Личный кабинет").attr('href', 'https://localhost:44318/Home/PersonalArea');
                $("#Enter").html("Выход").attr('href', 'https://localhost:44318/').click(function (event) {
                    localStorage.clear();
                });
            },
            error: function () {
                return;
            }
        });
    }
});