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
            $("#submit").click(function (event) {
                event.preventDefault();
                let correct = new Array();
                $.ajax({
                    method: "Get",
                    url: "https://wolfskillsproject.azurewebsites.net/api/Task?Id=5",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                    },
                    contentType: "application/json",
                    crossDomain: true,
                    success: function (data) {
                        correct = data;
                        let answers = new Array();
                        let allChecked = true;
                        $(".answers").toArray().forEach(item => {
                            let answered = false;
                            for (let option of item.children) {
                                if (option.getElementsByTagName('input')[0].checked) {
                                    answers.push(option.getElementsByTagName('label')[0].innerText);
                                    answered = true;
                                    return;
                                }
                            }
                            if (!answered) {
                                allChecked = false;
                            }
                        });
                        if (allChecked) {
                            let level = "Волчонок";
                            let points = 0;
                            for (i = 0; i < 15; ++i) {
                                if (answers[i] === correct[i]) {
                                    ++points;
                                }
                            }
                            if (points > 3) {
                                level = "Волчонок";
                                if (points > 6) {
                                    level = "Шакал";
                                    if (points > 9) {
                                        level = "Волк";
                                        if (points > 12) {
                                            level = "Оборотень";
                                            if (points == 15) {
                                                level = "Вожак стаи";
                                            }
                                        }
                                    }
                                }
                            }
                            console.log(points);
                            let answer = "Ваш результат: " + points + " баллов из 15 \n";
                            let levelstr = "Предполагаемый уровень: " + level;
                            $('.cont-qestions').attr('hidden', true);
                            $('section').append('<h2>' + answer + '</h2>' + '<h2>' + levelstr + '</h2>');
                        }
                        else {
                            alert('Please, complete all the tasks');
                        }
                    }
                });
            })
        },
        error: function () {
            location.replace("https://wolfskillsproject.azurewebsites.net/Login");
        }
    });
}
else {
    location.replace("https://wolfskillsproject.azurewebsites.net/Login");
}