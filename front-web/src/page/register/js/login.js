$(function () {
    // 登录界面
    $('.submit_btn').click(function () {

        let user_email = $('.login .email input').val();
        let user_password = $('.login .password input').val();
        let jsondata = {
            email: user_email,
            password: user_password,
        };
        $.ajax({
            type: "POST",
            data: jsondata,
            url: "http://localhost:5001/api/users/login",
            dataType: "json",
            success: (res) => {
                $.ajax({
                    type: "GET",
                    data: {},
                    url: "http://localhost:5001/api/users/current",
                    dataType: "json",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", res.token);
                    },
                    // headers: {
                    //     AUTHORIZATION: localStorage.token
                    // },
                    success: (data) => {
                        localStorage.user_name =data.name;
                        window.location.href = '../index.html'
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
                if (window.localStorage) {
                    //保存
                    localStorage.user_email = jsondata.email;
                    localStorage.token = res.token;
                } else {
                    //清空
                    localStorage.clear();
                }
            },
            error: (error) => {
                console.log(JSON.stringify(error.responseJSON));
                $('.blank').css('display', 'block');
                $('.blank').text(JSON.stringify(error.responseJSON))
            }
        })
    })

    //  注册界面

    $('.regist').click(function () {
        let user_name = $('.zuce .name input').val();
        let user_email = $('.zuce .email input').val();
        let user_password = $('.zuce .password input').val();
        let jsondata = {
            email: user_email,
            password: user_password,
            name: user_name
        };
        if (user_name == '' || user_password == '') {
            $('.notic').css('display', 'block');
            $('.notic').text('请输入用户名和密码！！！')
        } else {
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (reg.test(user_email)) {
                $.ajax({
                    type: "POST",
                    data: jsondata,
                    url: "http://localhost:5001/api/users/register",
                    dataType: "json",
                    success: (res) => {
                        res
                        console.log(res);
                        localStorage.user_avatar = res.avatar;
                        localStorage.user_name = res.name;
                        localStorage.user_id = res._id;
                        window.location.href = 'login.html'
                    },
                    error: (error) => {
                        // console.log(JSON.stringify(error))
                        // console.log(JSON.stringify(error.responseJSON));
                        $('.notic').css('display', 'block');
                        $('.notic').text(JSON.stringify(error.responseJSON))
                    }
                })
            } else {
                $('.notic').css('display', 'block');
                $('.notic').text('邮箱格式不正确！！！');
            }
        }



    })
})
