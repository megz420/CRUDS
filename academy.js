console.log('maged mohamed')
let stars =document.getElementById('img1')
let moon =document.getElementById('img2')
let mount1 =document.getElementById('img3')
let mount2 =document.getElementById('img4')
let river =document.getElementById('img5')
let boat =document.getElementById('img6')
let final =document.getElementById('img7')
let maged =document.getElementById('maged')
let fatherr =document.getElementById('fatherr')
let maged2 =document.querySelector('.mother')
window.onscroll = function(){
    stars.style.left=window.scrollY +'px'
    moon.style.top=window.scrollY*2 +'px'
    moon.style.right=window.scrollY*2 +'px'
    mount1.style.top=window.scrollY*1.5 +'px'
    mount2.style.top=window.scrollY*1.1 +'px'
    river.style.top=window.scrollY +'px'
    boat.style.left=window.scrollY*1.5 +'px'
    boat.style.top=window.scrollY +'px'
   
     if(window.scrollY <= 101 ){
    maged.style.fontSize=window.scrollY*0.5 +'px'
    maged.classList.remove('tot')
     
    }else{
        maged.style.fontSize=50.5+'px' 
        maged.classList.add('tot')
    }
    if (window.scrollY >= 176){
fatherr.classList.add('tot2')
    }else{
        fatherr.classList.remove('tot2')     
    }
}