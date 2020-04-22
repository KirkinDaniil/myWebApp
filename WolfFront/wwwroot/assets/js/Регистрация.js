$(document).ready(function () {
    $(".btn").on("click", function (event) {
        event.preventDefault();
        let name = $("#name").val();
        let surname = $("#surname").val();
        let mail = $("#mail").val();
        let login = $("#login").val();
        let pass = $("#pass").val() + "ccc";
        let conf = $("#confirm").val() + "ccc";
        $.ajax({
            method: "POST",
            url: "https://7febcf9c.ngrok.io/api/Account",
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify({ "Login": login, "Name": name, "Surname": surname, "Email": mail, "Password": pass, "ConfirmPassword": conf }),
            crossDomain: true,
            success: function (data) {
                alert("Завершите регистрацию, перейдя по ссылке, отправленной на почту");
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
