var slider = document.querySelector("#slider");
var login = document.querySelector("#login-form");
var signup = document.querySelector("#signup-form");
var showpass=document.getElementById('show-password');
var showpass_sign=document.getElementById('show-password-sign');
var show=document.getElementById('show');
var hide=document.getElementById('hide');
var show1=document.getElementById('showsign');
var hide1=document.getElementById('hidesign');
var password=document.getElementById('pswd');
var passwordsign=document.querySelectorAll('.password-sign');
var slider_img=document.getElementById('slider-img');
var first_pass=document.getElementById('password');
var confirm_pass=document.getElementById('confirm_password');
var message=document.getElementById('msg');
var stats=true;
var stats_sign=true;


function next() {
    slider.style.transform = 'translateX(120%)';
    login.classList.add('opacity-0')
    setTimeout(() => {
        slider_img.src='assets/img/img1.jpg';
        signup.classList.add('opacity-100')
        signup.classList.add('z-50')
    }, 500);
}
function back() {
    slider.style.transform = 'translateX(0)';
    signup.classList.remove('z-50');
    signup.classList.remove('opacity-100')
    setTimeout(() => {
        login.classList.remove('opacity-0')
        slider_img.src='assets/img/sliders.jpg';
    }, 500);

}


showpass.addEventListener('click',()=>{
    if(stats==true){
        hide.classList.remove('hidden');
        show.classList.add('hidden');
        password.type='text'
        stats=false;
    }
    else{
        show.classList.remove('hidden');
        hide.classList.add('hidden');
        password.type='password'
        stats=true;
    }
})

showpass_sign.addEventListener('click',()=>{
    if(stats_sign==true){
        hide1.classList.remove('hidden');
        show1.classList.add('hidden');
        passwordsign.forEach(element => {
            element.type='text';
        });
        stats_sign=false;
    }
    else{
        show1.classList.remove('hidden');
        hide1.classList.add('hidden');
        passwordsign.forEach(element => {
            element.type='password';
        });
        stats_sign=true;
    }
})

confirm_pass.addEventListener('change',()=>{
    if(first_pass.value != confirm_pass.value){
        first_pass.classList.remove('bg-lime-200')
        confirm_pass.classList.remove('bg-lime-200')
        first_pass.classList.add('bg-red-100')
        confirm_pass.classList.add('bg-red-100')
        message.classList.remove('text-lime-500')
        message.innerHTML=`<div class="flex gap-2 items-center"> <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" fill="#d60505"></path> <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#d60505"></path> <path d="M12 17.2499C11.87 17.2499 11.74 17.2198 11.62 17.1698C11.49 17.1198 11.39 17.0499 11.29 16.9599C11.2 16.8599 11.13 16.7499 11.07 16.6299C11.02 16.5099 11 16.3799 11 16.2499C11 15.9899 11.1 15.7298 11.29 15.5398C11.39 15.4498 11.49 15.3799 11.62 15.3299C11.99 15.1699 12.43 15.2598 12.71 15.5398C12.8 15.6398 12.87 15.7399 12.92 15.8699C12.97 15.9899 13 16.1199 13 16.2499C13 16.3799 12.97 16.5099 12.92 16.6299C12.87 16.7499 12.8 16.8599 12.71 16.9599C12.52 17.1499 12.27 17.2499 12 17.2499Z" fill="#d60505"></path> </g></svg> <span> Password do not match! </span> </div>`;
    }
    else{
        first_pass.classList.add('bg-lime-200')
        confirm_pass.classList.add('bg-lime-200')
        first_pass.classList.remove('bg-red-100')
        confirm_pass.classList.remove('bg-red-100')
        message.classList.add('text-lime-500')
        message.innerHTML=`<div class="flex gap-2 items-center"> <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#3dd232"></path> <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#3dd232"></path> </g></svg> <span> Password match! </span> </div>`;
    }
})






