$(document).ready(function () {
    $(".btn").on("click", function (event) {
        event.preventDefault();
        let mail = $("#mail").val();
        let pass = $("#pass").val() + "ccc";
        $.ajax({
            method: "POST",
            url: "https://7febcf9c.ngrok.io/token",
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify({"Email": mail, "Password": pass}),
            crossDomain: true,
            success: function (data) {
                localStorage.setItem("access_token", data.access_token);
                location.assign("https://7febcf9c.ngrok.io/");
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
                    return;
                else
                    alert('Вы ввели некорректные данные \n Пожалуйста, попробуйте еще раз');
            }
        });
    });
});