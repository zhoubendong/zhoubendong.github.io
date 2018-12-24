var arr = [0,1,2,3,4,5,6,7,8,9];
for(var i = 65; i < 122; i ++) {
    if(i > 90 && i < 97) {  // 90——97不是英文字母
        continue;
    }
    arr.push(String.fromCharCode(i));
}
var canvasStr,
    value;
function createCanvas() {
    canvasStr = '';
    value = '';
    for(var i = 0; i < 6; i ++) {
        var a = arr[Math.floor(Math.random() * arr.length)]; // Math.floor向下取整
        canvasStr += a + ' ';
        value += a;
    }
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    ctx.clearRect(0,0,300,80)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ccc';
    ctx.font = '46px Roboto Slab'
    ctx.setTransform(1,-0.12,0.2,1,0,12);
    ctx.fillText(canvasStr,150,60);
}
createCanvas();
bindEvent();
function bindEvent() {
    var refresh = document.getElementsByClassName('refresh')[0];
    var submit = document.getElementsByClassName('submit')[0];
    refresh.addEventListener('click',function () {
        createCanvas();
    });
    submit.addEventListener('click',function () {
        showResult();
    });
}
function showResult() {
    var input = document.getElementsByClassName('myInput')[0];
    var errorText = document.getElementsByClassName('errorText')[0];
    var test = document.getElementsByClassName('test')[0];
    var inputValue = input.value;
    
    if(value !== inputValue) {
        errorText.style.display = 'inline-block';
        errorText.innerText = '验证码错误，请重新输入';
        test.style.display= 'inline-block';
        test.style.backgroundImage = 'url("./images/false.jpg")';
        createCanvas();
    }else {
        test.style.display= 'inline-block';
        test.style.backgroundImage = 'url("./images/true.png")';
        createCanvas();
    }
  }