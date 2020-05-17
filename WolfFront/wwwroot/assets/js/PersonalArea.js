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
            $('#photo').click(function () {
                var fd = new FormData;
                fd.append('img', $('input[name$="uploadedFile"]').prop('files')[0]);
                $.ajax({
                    method: "POST",
                    url: "https://wolfskillsproject.azurewebsites.net/Home/Upload",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                    },
                    contentType: false,
                    data: fd,
                    processData: false,
                    crossDomain: true,
                    success: location.reload()
                });
            })
            
            $.ajax({
                method: "Get",
                url: "https://wolfskillsproject.azurewebsites.net/api/User",
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
                    if (data.imagePath) {
                        $('.img').attr('src', 'Files/' + data.imagePath);
                    }
                    if (data.gender) {
                        $('#male').attr("checked", "checked");
                    }
                    else {
                        $('#female').attr("checked", "checked");
                    }
                    let date = new Date(Date.parse(data.birthDate));

                    var dd = date.getDate();
                    var mm = date.getMonth() + 1; 

                    var yyyy = date.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }
                    let today = yyyy + '-' + mm + '-' + dd;

                    $('#birthday').val(today);
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
                            url: "https://wolfskillsproject.azurewebsites.net/api/User",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ "Login": login, "Name": name, "Surname": surname, "Email": mail }),
                            crossDomain: true,
                            success: function (data) {
                                $('#save').attr('disabled', true);
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
                        let gender;
                        if ($('#male')[0].checked) {
                            gender = true;
                        }
                        else {
                            gender = false;
                        }
                        $.ajax({
                            method: "PUT",
                            url: "https://wolfskillsproject.azurewebsites.net/api/Account",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ "BirthDate":birth, "About":bio, "Gender":gender}),
                            crossDomain: true,
                            success: function (data) {
                                $('#save2').attr('disabled', true);
                            },
                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                $('#save2').attr('disabled', true);
                            }
                        });
                    });
                    $('#new-pass').change(function (event) {
                        event.preventDefault();
                        $('#new-pass2').removeAttr("readonly");
                        $('#change-pass').removeAttr('disabled');
                    });
                    $('#change-pass').click(function (event) {
                        event.preventDefault();
                        if ($('#new-pass2').val() == $('#new-pass').val()) {
                            let new_pass = $('#new-pass').val();
                            $.ajax({
                                method: "PUT",
                                url: "https://wolfskillsproject.azurewebsites.net/api/Password",
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                                },
                                contentType: "application/json",
                                data: JSON.stringify(new_pass),
                                crossDomain: true,
                                success: function (data) {
                                    $('#change-pass').attr('disabled', true);
                                    $('#new-pass2').attr("readonly", true);
                                },
                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                    $('#change-pass').attr('disabled', true);
                                    $('#new-pass2').attr("readonly", true);
                                }
                            });
                        }
                        else {
                            $('#new-pass2').css({ "color": "red", "border": "1px solid red" });
                        }
                    });
                },
                error: function () {
                    location.assign("https://wolfskillsproject.azurewebsites.net/Home/Login");
                }
            });
        },
        error: function () {
            location.assign("https://wolfskillsproject.azurewebsites.net/Home/Login");
        }
    });
}
else {
    location.assign("https://wolfskillsproject.azurewebsites.net/Home/Login");
}
    