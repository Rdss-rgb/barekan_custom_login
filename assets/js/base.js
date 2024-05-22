var parent_nav = document.getElementById('parent-nav');
var side_nav = document.getElementById('side-nav');
var parent_nav_bot = document.getElementById('parent-nav-bot');
var bottom_nav = document.getElementById('bottom-nav');
var parent_nav_right = document.getElementById('parent-nav-right');
var right_nav = document.getElementById('right-nav');
var settings = document.getElementById('settingspage');
var l = document.getElementById('left')
var r = document.getElementById('right')
var b = document.getElementById('bottom')
var animated_btn= document.getElementById('crazy-btn')
var fixed_btn= document.getElementById('fixed-btn')
var item =localStorage.getItem('navfixed')

parent_nav.addEventListener('mouseover', navin);
parent_nav.addEventListener('mouseout', navout);

parent_nav_bot.addEventListener('mouseover', navin);
parent_nav_bot.addEventListener('mouseout', navout);

parent_nav_right.addEventListener('mouseover', navin);
parent_nav_right.addEventListener('mouseout', navout);

function fixed(e) {
    side_nav.style.transform = 'translateX(0px)';
    bottom_nav.style.transform = 'translateY(0px)';
    right_nav.style.transform = 'translateX(0px)';
    parent_nav.removeEventListener("mouseover", navin);
    parent_nav.removeEventListener("mouseout", navout);
    parent_nav_bot.removeEventListener("mouseover", navin);
    parent_nav_bot.removeEventListener("mouseout", navout);
    parent_nav_right.removeEventListener("mouseover", navin);
    parent_nav_right.removeEventListener("mouseout", navout);
    animated_btn.classList.remove('hidden');
    e.classList.add('hidden');
    localStorage.setItem('navfixed', 'true');

}
function notfixed(e) {
    parent_nav.addEventListener("mouseover", navin);
    parent_nav.addEventListener("mouseout", navout);
    parent_nav_bot.addEventListener("mouseover", navin);
    parent_nav_bot.addEventListener("mouseout", navout);
    parent_nav_right.addEventListener("mouseover", navin);
    parent_nav_right.addEventListener("mouseout", navout);
    fixed_btn.classList.remove('hidden');
    e.classList.add('hidden');
    localStorage.setItem('navfixed', 'false');
}
function navin() {
    side_nav.style.transform = 'translateX(0px)';
    bottom_nav.style.transform = 'translateY(0px)';
    right_nav.style.transform = 'translateX(0px)';
}
function navout() {
    side_nav.style.transform = 'translateX(-77px)';
    bottom_nav.style.transform = 'translateY(77px)';
    right_nav.style.transform = 'translateX(77px)';
}
function setnav(e) {
    switch (e) {
        case 'left':
            parent_nav.classList.remove('hidden');
            parent_nav_bot.classList.add('hidden');
            parent_nav_right.classList.add('hidden');
            l.classList.add('bg-yellow-500' ,'text-white');
            r.classList.remove('bg-yellow-500' ,'text-white' );
            b.classList.remove('bg-yellow-500' ,'text-white' );
            break;
        case 'bottom':
            parent_nav.classList.add('hidden');
            parent_nav_bot.classList.remove('hidden');
            parent_nav_right.classList.add('hidden');
            l.classList.remove('bg-yellow-500' ,'text-white' );
            r.classList.remove('bg-yellow-500' ,'text-white' );
            b.classList.add('bg-yellow-500' ,'text-white' );
            break;
        case 'right':
            parent_nav.classList.add('hidden');
            parent_nav_bot.classList.add('hidden');
            parent_nav_right.classList.remove('hidden');
            l.classList.remove('bg-yellow-500' ,'text-white' );
            r.classList.add('bg-yellow-500' ,'text-white' );
            b.classList.remove('bg-yellow-500' ,'text-white' );
            break;

        default:
            break;
    }
}

function togglesettings() {
    settings.classList.toggle("hidden");
}
function logout(){
    window.location = "index.html";
}


if(item!='true'){
    var e=animated_btn;
    notfixed(e)
    e.classList.remove('hidden')
    fixed_btn.classList.add('hidden')
    console.log(item)
}
else{
    var e=fixed_btn;

    fixed(e)
    e.classList.remove('hidden')
    animated_btn.classList.add('hidden')
    console.log(item)
}