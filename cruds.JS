//get total
//create product'
//save in localstorage
//clear inputs
//read
//count
//delete
//update
//search
let add0 = document.getElementById('add0')
let add1 = document.getElementById('add1')
let add2 = document.getElementById('add2')
let add3 = document.getElementById('add3')
let add4 = document.getElementById('add4')
let add5 = document.getElementById('add5')
let add6 = document.getElementById('add6')
let dii = document.getElementById('dii')
let deleteal = document.getElementById('deleteal')
let adad = document.getElementById('adad')
let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById('btn3')
let add7 = document.getElementById('add7')
let moodsearch = 'title'
let mood = 'create'
let indix= 0

function sum(){
   if (add1.value !=''){
dii.innerHTML = (+add1.value + +add2.value + +add3.value - +add4.value  )
 dii.style.backgroundColor='green' 
}else{
   dii.innerHTML = '' 
   dii.style.backgroundColor='brown'
}

}
let array1;
if (localStorage.item != null){
   array1= JSON.parse(localStorage.item)
}else{
   array1=[]
}
function clean (){
   add0.value=''
   add1.value=''
   add2.value=''
   add3.value=''
   add4.value=''
   dii.innerHTML=''
   add5.value=''
   add6.value=''
   add7.value=''
}

function create(){
  if (mood === 'create'){
   if( add5.value <= 100 ){
   for(let i = 0; add5.value >i ; i++){
let createob  = {
   title:add0.value,
   price:add1.value,
   taxes:add2.value,
   ads:add3.value,
   discount:add4.value,
   total:dii.innerHTML,
   count:add5.value,
   category:add6.value
}

array1.push(createob)
localStorage.setItem('item', JSON.stringify(array1))
}
  clean()
} 
}else{updateee(indix)}
   
   items()
   if (array1.length != 0){
   deleteal.classList.remove('btn4')
   adad.innerHTML = '(' + array1.length +')'
   sum()
}
btn1.innerHTML= 'create'
mood = 'create'
}
items()

function titlee(i ,titl){
   let m = i+1
titl += '<tr id="trrr" ><td>' + m +'</td><td>' + array1[i].title + 
   '</td><td>' + array1[i].price + 
   '</td><td>' + array1[i].taxes + 
   '</td> <td>'+ array1[i].ads   + 
   '</td><td>' + array1[i].discount + 
   '</td><td>' + array1[i].total    + 
   '</td><td>' + array1[i].category + 
   '</td><td><button onclick="updatee('+ i +')" id="update">update</button></td><td>'+
   '<button onclick="deletee('+ i +')" id="delete" >delete</button></td></tr>'
return titl}

function items (){
let titl =''
for(let i = 0; array1.length >i ; i++){
  titl= titlee(i ,titl)
}
document.getElementById('titl').innerHTML=titl
}


function deletee( i ){
  array1.splice( i , 1 )
   localStorage.item=JSON.stringify(array1)
   items()
   if (array1.length != 0){
   deleteal.classList.remove('btn4')
   adad.innerHTML = '(' + array1.length +')'
}else{
   deleteal.classList.add('btn4')
}
}
function updatee (i){
   mood = 'update'
   add0.value=array1[i].title
   add1.value=array1[i].price
   add2.value=array1[i].taxes
   add3.value=array1[i].ads
   add4.value=array1[i].discount
   dii.innerHTML=array1[i].total
   add5.classList.add('btn4')
   add6.value=array1[i].category
   btn1.innerHTML= 'update'
    indix = i
    window.scroll({
      left:0,
      top:0,
      behavior:"smooth"
    })
}
function updateee ( indix){
   array1[indix].title =add0.value
   array1[indix].price =add1.value
   array1[indix].taxes =add2.value
   array1[indix].ads =add3.value
   array1[indix].discount =add4.value
   array1[indix].total =dii.innerHTML
   array1[indix].category= add6.value
   add5.classList.remove('btn4')
localStorage.item=JSON.stringify(array1)
clean()
}

if (array1.length != 0){
   deleteal.classList.remove('btn4')
   adad.innerHTML = '(' + array1.length +')'
}
function deleteall (){
   array1.splice(0)
   localStorage.clear()
   deleteal.classList.add('btn4')
   items()
}

function searchengine ( i ){
if ( i === 'btn2'){
   moodsearch = 'title'
   add7.value = ''
}else{
   moodsearch = 'category'
   add7.value = ''
}
add7.placeholder = 'searching by '+ moodsearch
console.log(moodsearch)
add7.focus()
}
function search (){
      let titl='';
      
  for(let i=0 ; array1.length > i; i++){
if(moodsearch === 'title'){
   if(array1[i].title.includes(add7.value)){
    titl= titlee(i ,titl)} 
    
}
 else{
    if(array1[i].category.includes(add7.value)){
     titl= titlee(i ,titl)}
}
document.getElementById('titl').innerHTML=titl
}

 }