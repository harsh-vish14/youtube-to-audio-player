let mouseCursor = document.querySelector('.cursor');
let text = document.querySelectorAll('.text');
window.addEventListener('mousemove', cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseleave', function(){
        mouseCursor.classList.remove('link-grow');
    })
    link.addEventListener('mouseover', function(){
        mouseCursor.classList.add('link-grow')
    })
});

text.forEach(link => {
    link.addEventListener('mouseleave', function(){
        mouseCursor.classList.remove('link-grow');
    })
    link.addEventListener('mouseover', function(){
        mouseCursor.classList.add('link-grow')
    })
})

document.querySelector('.form-group').addEventListener('mouseleave', function () {
    mouseCursor.classList.remove('link-grow');
})
document.querySelector('.form-group').addEventListener('mouseover', function () {
    mouseCursor.classList.add('link-grow');
})

