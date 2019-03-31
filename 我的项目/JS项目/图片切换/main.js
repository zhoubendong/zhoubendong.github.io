

//  使用es6 解构
// const [current,imgs] = [document.querySelector('#current'),document.querySelectorAll('.imgs img')];
// imgs.forEach(img => img.addEventListener('click',(e) => current.src = e.target.src));


// 获取元素
const opacity = 0.4;
const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');

//  默认选中元素
imgs[0].style.opacity = opacity;

imgs.forEach(img => img.addEventListener('mouseenter',imgClick));
function imgClick(e) {
    imgs.forEach(img => (img.style.opacity = 1));
    current.src = e.target.src;

    //  动画效果 ，添加fadeIn类
    current.classList.add('fade-in')
    //  移除动画效果
    setTimeout(() => current.classList.remove('fade-in'),500);
    e.target.style.opacity = opacity;
}

