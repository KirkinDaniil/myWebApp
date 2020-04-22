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
            $.ajax({
                method: "Get",
                url: "https://7febcf9c.ngrok.io/api/User",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                },
                contentType: "application/json",
                crossDomain: true,
                success: function (data) {
                    $("#email").val(data.email);
                    $("#first-name").val(data.name);
                    $("#username").val(data.login);
                    $('#last-name').val(data.surname);
                    let date = new Date(Date.parse(data.birthDate));
                    console.log(date);

                    var dd = date.getDate();
                    var mm = date.getMonth() + 1; //January is 0!

                    var yyyy = date.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }
                    let today = yyyy + '-' + mm + '-' + dd;

                    $('#birthday').val(today);
                    console.log(data);
                    $('#bio').val(data.about);
                    document.querySelectorAll('.user-data').forEach(item => {
                        item.addEventListener('change', event => {
                            $('#save').removeAttr('disabled');
                        })
                    })
                    $('#save').click(function (event) {
                        event.preventDefault();
                        let login = $("#username").val();
                        let mail = $("#email").val();
                        let name = $('#first-name').val();
                        let surname = $('#last-name').val();
                        $.ajax({
                            method: "PUT",
                            url: "https://7febcf9c.ngrok.io/api/User",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ "Login": login, "Name": name, "Surname": surname, "Email": mail }),
                            crossDomain: true,
                            success: function (data) {
                                window.location.reload(false);
                            },
                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                $('#save').attr('disabled', true);
                            }
                        });
                    });
                    document.querySelectorAll('.user-data2').forEach(item => {
                        item.addEventListener('change', event => {
                            $('#save2').removeAttr('disabled');
                        })
                    });
                    $('#save2').click(function (event) {
                        event.preventDefault();
                        let birth = $("#birthday").val();
                        let bio = $("#bio").val();
                        $.ajax({
                            method: "PUT",
                            url: "https://7febcf9c.ngrok.io/api/Account",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ "BirthDate":birth, "About":bio }),
                            crossDomain: true,
                            success: function (data) {
                                $('#save2').attr('disabled', true);
                            },
                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                window.location.reload(false);
                            }
                        });
                    });
                },
                error: function () {
                    location.assign("https://7febcf9c.ngrok.io/Home/Login");
                }
            });
        },
        error: function () {
            location.assign("https://7febcf9c.ngrok.io/Home/Login");
        }
    });
}
else {
    location.assign("https://7febcf9c.ngrok.io/Home/Login");
}
    