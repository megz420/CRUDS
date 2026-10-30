/*
 * CRUDS product tracker.
 *
 * This classic script is loaded at the end of maged2_copy.html. Its functions
 * remain global because the HTML calls them from inline event handlers.
 */
// Product form and page elements, looked up by their IDs in the HTML.
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
let totalall = document.getElementById('totalall')
let total_removal = document.getElementById('total_removal')

// moodsearch chooses the search field; mood switches create() between create/update.
let moodsearch = 'title'
let mood = 'create'
let indix= 0



/** Show price + taxes + ads - discount beside the product form. */
function sum(){
   if (add1.value !=''){
dii.innerHTML = (+add1.value + +add2.value + +add3.value - +add4.value  )
 dii.style.backgroundColor='green' 
}else{
   dii.innerHTML = '' 
   dii.style.backgroundColor='brown'
}

}
// Active products persist in "item". Each record stores form values and total.
let array1=[];
if (localStorage.item != null){
   array1= JSON.parse(localStorage.item)
}else{
   array1=[]
}

// Sold products persist in "name" until restored or included in a day summary.
let delete_and_get_new_day = document.getElementById('delete_and_get_new_day')
let deleted_array =[]
if (localStorage.name != null){
   deleted_array= JSON.parse(localStorage.name)
   delete_and_get_new_day.classList.remove('btn4')
}else{
   deleted_array=[]
   delete_and_get_new_day.classList.add('btn4')
}

/** Clear all product fields and the live total display. */
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

/**
 * Create the requested number of identical records or save an edited record.
 * The input advertises a 1-100 range; values above 100 are ignored here.
 */
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
   total_removal.classList.remove('btn4')
   adad.innerHTML = '(' + array1.length +')'
   sum()
}
btn1.innerHTML= 'create'
mood = 'create'
}
items()

/** Append one active product row, with its update and sell actions. */
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
   '<button onclick="deletee('+ i +')" id="delete" >sell</button></td></tr>'

return titl}

/** Render active products and update the displayed sum of their totals. */
function items (){
let titl =''
let total_assistant = 0
for(let i = 0; array1.length >i ; i++){
  titl= titlee(i ,titl)
  
  total_assistant = +array1[i].total + +total_assistant
  totalall.innerHTML=total_assistant

}
document.getElementById('titl').innerHTML=titl
}
// Render sold products from saved data when the page loads.
if (localStorage.name != null){
  deleted_array= JSON.parse(localStorage.name)
  items_n()
}else{
   deleted_array=[]
}





/** Move an active product to the sold list, then remove it from active data. */
function deletee( i ){
   
   let createob_n  = {
      title_n:array1[i].title,
      price_n:array1[i].price,
      taxes_n:array1[i].taxes,
      ads_n:array1[i].ads,
      discount_n:array1[i].discount,
      total_n:array1[i].total,
      count_n:array1[i].count,
      category_n:array1[i].category
   }
   
   deleted_array.push(createob_n)




   localStorage.setItem('name', JSON.stringify(deleted_array))
items_n()
   
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
/** Load an active product into the form and enter update mode. */
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
/** Save the form values to the active product selected by updatee(). */
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

// Initialize the delete-all control from the saved active-product list.
if (array1.length != 0){
   deleteal.classList.remove('btn4')
   adad.innerHTML = '(' + array1.length +')'
}
/** Open the delete-all confirmation controls. */
function yaaaa(){
   deleteal.classList.add('btn4')
   yesyes.classList.remove('btn4')
}
/** Cancel the delete-all confirmation. */
function notsure(){
   deleteal.classList.remove('btn4')
   yesyes.classList.add('btn4')  
}

/** Remove all active products; sold products and history are left unchanged. */
function deleteall (){
   array1.splice(0)
   localStorage.removeItem('item')
   deleteal.classList.add('btn4')
   yesyes.classList.add('btn4')
  
   items()
 total_removal.classList.add('btn4')

}

/** Set whether search() checks title or category. */
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
/** Render rows whose selected field contains the current search text. */
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

// Retained helper for changing the delete-button label; not currently wired.
 function yesorno (){
  deleteal.innerHTML= 'sure'
 }

// Sold-item table and day-total elements.
let totalall_new=document.getElementById('totalall_new')

/** Append one sold-product row, with an action to restore it. */
function titlee_n(i ,titl_n ){
   let m = i+1
   titl_n += '<tr id="trrr" ><td>' + m +'</td><td>' + deleted_array[i].title_n + 
   '</td><td>' + deleted_array[i].price_n + 
   '</td><td>' + deleted_array[i].taxes_n + 
   '</td> <td>'+ deleted_array[i].ads_n + 
   '</td><td>' + deleted_array[i].discount_n + 
   '</td><td>' + deleted_array[i].total_n + 
   '</td><td>' + deleted_array[i].category_n + 
   '</td><td><button onclick="back_new(' + i + ')">back</button></td><td>';
   delete_and_get_new_day.classList.remove('btn4')
return titl_n }


/** Restore one sold product as an active record and remove its sold copy. */
function back_new (i){
   add0.value = deleted_array[i].title_n 
   add1.value = deleted_array[i].price_n 
   add2.value = deleted_array[i].taxes_n 
   add3.value = deleted_array[i].ads_n 
   add4.value = deleted_array[i].discount_n 
   dii.innerHTML = deleted_array[i].total_n 
   add6.value = deleted_array[i].category_n =add6.value
   add5.value = 1
   create()
   deleted_array.splice(i,1)
   localStorage.name=JSON.stringify(deleted_array)
   items_n()
 }

/** Render the current sold-product list. */
function items_n (){
   let titl_n =' '

   for(let i = 0; deleted_array.length >i ; i++){
     titl_n = titlee_n(i,titl_n)
   
   }
   
   document.getElementById('title_of_new_day').innerHTML=titl_n
   }
  

 

// Containers used to switch between the product screen and day screen.
let invisible1 = document.getElementById('invisible1')
let invisible2 = document.getElementById('invisible2')
let history_table = document.getElementById('history_table')

invisible1.classList.remove('btn4')
      invisible2.classList.add('btn4')

// Running day totals. These are accumulated when invisible_1() is called.
      let total_price=0
      let total_discount =0
      let total_assistant_n =0

/** Show the day screen and accumulate totals from sold products. */
   function invisible_1(){
      invisible1.classList.add('btn4')
      invisible2.classList.remove('btn4')
    
      for(let i = 0; deleted_array.length >i ; i++){
      
        total_assistant_n = +deleted_array[i].total_n  + +total_assistant_n
        totalall_new.innerHTML=total_assistant_n

        total_price = +deleted_array[i].price_n  + +total_price
        total_discount = +deleted_array[i].discount_n  + +total_discount


   
   }

   }

   // Day summaries persist separately under the "history" storage key.
   let history_array =[]
   if (localStorage.history != null){
      history_array= JSON.parse(localStorage.history)
      items_history()
    }else{
       history_array=[]
    }

/** Save the current day totals, then clear the sold-product list. */
function history_created(){
   
   delete_and_get_new_day.classList.add('btn4')
   let createob_history  = {
      
      price_history:total_price,
      discount_history:total_discount,
      total_history:total_assistant_n,
      
   }
   
   history_array.push(createob_history)
 localStorage.setItem('history', JSON.stringify(history_array))

 items_history()


 deleted_array.splice(0)
   localStorage.removeItem('name')
   items_n()
    total_price=0
    total_discount =0
    total_assistant_n =0
    totalall_new.innerHTML=total_assistant_n

   
}
items_history()
/** Render saved day summaries in the previous-days table. */
function items_history(){
   let titl_history =' '

   for(let i = 0; history_array.length >i ; i++){
     titl_history  = titlee_history(i,titl_history )
   
   }
   
   document.getElementById('history_table').innerHTML=titl_history
}
   /** Return to the product-management screen. */
   function invisible_2(){
      invisible1.classList.remove('btn4')
      invisible2.classList.add('btn4')
   }

   // Remove only sold-product data; this helper is not currently wired in HTML.
   function get_new_day(){
      localStorage.removeItem('name')
      
   }
   /** Placeholder for a future history action; currently has no behavior. */
   function history_of_days(){

   }


   /** Append one saved day summary to the history table markup. */
   function titlee_history(i,history_table){
      let m = i+1
      history_table += '<tr id="trrr" ><td>' + m +'</td><td>' +history_array[i].price_history+ 
      '</td><td>' +history_array[i].discount_history+ 
      '</td><td>' +history_array[i]. total_history;
     
   return history_table }

// Controls for showing and hiding the previous-days table.
let hide_table_of_history =document.getElementById('hide_table_of_history')
let button_for_hide =document.getElementById('button_for_hide')
let button_for_view =document.getElementById('button_for_view')

/** Show the history table and its hide button. */
   function hide_history(){
hide_table_of_history.classList.remove('btn4')
button_for_view.classList.add('btn4')
button_for_hide.classList.remove('btn4')
   }

/** Hide the history table and show its view button. */
   function show_history(){
      hide_table_of_history.classList.add('btn4')
button_for_view.classList.remove('btn4')
button_for_hide.classList.add('btn4')
   }
