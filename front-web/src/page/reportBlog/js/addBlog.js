
var ue = UE.getEditor('editor');
var blog = {
    title: "",
    content: "",
    contentTxt: "",
    categories: "",
    author: "",
    date: ""
};
function setFocus() {
    UE.getEditor('editor').focus();

}
function getContent() {
    blog.content = ue.getContent();
    blog.title = $('.title').val();
    blog.date = new Date().toLocaleDateString();
    blog.contentTxt = ue.getContentTxt();
    blog.author = localStorage.user_name;
    var obj = $('.classify input');
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            blog.categories = obj[i].value
        }
    }
}
$(function () {
    if (!localStorage.token) {
        $('article').css('display', 'none');
        $('#down').css('display', 'flex');
    }

})

$(function () {

    $("#btns input").click(function () {
        getContent();
        if ($('.title').val() != '' && ue.getContentTxt() != '') {
            $.ajax({
                type: "post",
                data: blog,
                url: "http://localhost:5001/api/profile/add",
                dataType: "json",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.token);
                },
                success: (res) => {
                    console.log(res)
                    layer.confirm('你的博客已发布成功！！！', {
                        btn: ['确定'], //可以无限个按钮
                        area: ['30vw', '200px'],
                    }, function (index, layero) {
                        window.location.href = '../index.html'
                    });
                },
                error: (error) => {
                    console.log(error);
                }
            })
        } else {
            $('#btns .blank').css('display', 'block')
        }
    });
})

