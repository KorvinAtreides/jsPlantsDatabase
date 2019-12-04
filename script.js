var inName = document.getElementById("inName");
var inVid = document.getElementById("inVid");
var inAge = document.getElementById("inAge");
var inKind = document.getElementById("inKind");
var inAreal = document.getElementById("inAreal");
var inFirst = document.getElementById("inFirst");
var inFlower = document.getElementById("inFlower");
var inKindFlower = document.getElementById("inKindFlower");
var inWidth = document.getElementById("inWidth");
var inLength = document.getElementById("inLength");
var gridCont1 = document.getElementById("gridCont1");
var gridCont2 = document.getElementById("gridCont2");
var N1 =1;
var N2 =1;
var myMap = new Map();
var changeBtns = document.getElementsByClassName("changeBtn");
var deleteBtns = document.getElementsByClassName("deleteBtn");

var inpyts = document.getElementsByTagName("input");

btn1.innerHTML = '<p>Create<p>';
btn1.style.cssText =`color: red;
background-color: green;
width: 100px;
text-align: center;
margin-top: 25px;
font-size: 22px;
height: 30px;
`;
select1.style.cssText =`
width: 200px;
font-size: 18px;
display: none;
margin-top: 20px;
`;

btn2.innerHTML = '<p>Save<p>';
btn2.style.cssText = btn1.style.cssText;

btn3.innerHTML = '<p>Clear<p>';
btn3.style.cssText = btn1.style.cssText;
saveAllBtn.innerHTML = '<p>Save tables<p>';
saveAllBtn.style.cssText = btn1.style.cssText;
saveAllBtn.style.display ='none';
putServBtn.style.cssText = btn1.style.cssText;
putServBtn.style.display ='none';
takeFromServBtn.style.cssText = btn1.style.cssText;
takeFromServBtn.style.display ='none';

document.getElementById("btn1").onclick = function(){
    addSelect();
}
function addSelect(){
    if(document.getElementById("select1").style.display =='none'){
        document.getElementById("select1").style.display ='block';
    }
}

document.getElementById('select1').addEventListener('change', function() {
    val = this.value;
    document.getElementById("maket").style.display ='block';
    document.getElementById("lef").style.display ='block';
    document.getElementById("rif").style.display ='block';
    saveAllBtn.style.display ='block';
    putServBtn.style.display ='block';
    takeFromServBtn.style.display ='block';
    
    gridCont1.style.setProperty('display', 'grid', "important");
    gridCont2.style.setProperty('display', 'grid', "important");

    if(val == 'value1'){
        document.getElementById("Width").style.display ='none';
        document.getElementById("Length").style.display ='none';
        document.getElementById("Flower").style.display ='block';
        document.getElementById("KindFlower").style.display ='block';
        inWidth.removeAttribute("required");
        inLength.removeAttribute("required");
        inFlower.setAttribute("required", "required");
        inKindFlower.setAttribute("required", "required");
    }
    else{
        document.getElementById("Flower").style.display ='none';
        document.getElementById("KindFlower").style.display ='none';
        document.getElementById("Width").style.display ='block';
        document.getElementById("Length").style.display ='block';
        inWidth.setAttribute("required", "required");
        inLength.setAttribute("required", "required");
        inFlower.removeAttribute("required");
        inKindFlower.removeAttribute("required");
    }
  })


function Plant(name, vid, age, kind, areal, first){
    this.name = name;
    this.vid = vid;
    this.age = age;
    this.kind = kind;
    this.areal = areal;
    this.first = first;
    this.getName = function(){        return this.name;    }
    this.getVid = function(){        return this.name;    }
    this.getAge = function(){        return this.age;    }
    this.getKind = function(){        return this.kind;    }
    this.getAreal = function(){        return this.areal;    }
    this.getFirst = function(){        return this.first;    }
}
function Leaves(flower, kindFlower) {
        Plant.call(this);
        this.flower = flower;
        this.kindFlower = kindFlower;
    this.getFlower = function(){        return this.flower;    }
    this.getKindFlower = function(){        return this.kindFlower;    }
}
function Needles(width, length) {
        Plant.call(this);
        this.width = width;
        this.length = length;
    this.getWidth = function(){        return this.width;    }
    this.getLength = function(){        return this.length;    }
}    
function inpytVal(){
    for(let inpyt of inpyts){
        inpyt.addEventListener ("input", function (event) {
            if (inpyt.validity.valid == false) {
                inpyt.value = ""; 
                alert('неверное значение');
              }        
      });
    }
}
inpytVal(); 
document.getElementById("btn2").addEventListener('click', function(){
    if ((inName.value == '' || inVid.value == '' || inAge.value == '' || inKind.value == '' || inAreal.value == '' || inFirst.value == '')
    ||(val == 'value1'&&(inFlower.value == ''|| inKindFlower.value == ''))||(val == 'value2'&&(inWidth.value == ''|| inLength.value == ''))){
        alert('не все поля заполнены')
    }
    else{
        document.getElementById("select1").style.display ='none';
        document.getElementById("select1").value = "noneVol";
        document.getElementById("maket").style.display ='none';
        var today = new Date();
        if (val == 'value1') {
            var newplant = new Leaves(inFlower.value,inKindFlower.value);
            newplant.name = inName.value;
            newplant.vid = inVid.value;
            newplant.age =  inAge.value;
            newplant.kind = inKind.value;
            newplant.areal = inAreal.value;
            newplant.first = inFirst.value;
            N1++;
            gridCont1.style.setProperty('grid-template-rows', 'repeat('+N1+', 50px)');
            gridCont1.innerHTML+='<div class="gridIt">'+newplant.name+'</div>'+'<div class="gridIt">'+newplant.vid+'</div>'+
            '<div class="gridIt">'+newplant.age+'</div>'+'<div class="gridIt">'+newplant.kind+'</div>'+'<div class="gridIt">'+newplant.areal+'</div>'+
            '<div class="gridIt">'+newplant.first+'</div>'+'<div class="gridIt">'+newplant.flower+'</div>'+'<div class="gridIt">'+newplant.kindFlower+'</div>'+
            '<div class="gridIt" id="change'+today.getHours()+today.getMinutes() +today.getSeconds()+'"><button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button></div>';
            myMap.set('change'+today.getHours()+today.getMinutes() +today.getSeconds(),newplant);
        }
        else{
            var newplant = new Needles(inWidth.value,inLength.value);
            newplant.name = inName.value;
            newplant.vid = inVid.value;
            newplant.age =  inAge.value;
            newplant.kind = inKind.value;
            newplant.areal = inAreal.value;
            newplant.first = inFirst.value;
            N2++;
            gridCont2.style.setProperty('grid-template-rows', 'repeat('+N2+', 50px)');
            gridCont2.innerHTML+='<div class="gridIt">'+newplant.name+'</div>'+'<div class="gridIt">'+newplant.vid+'</div>'+
            '<div class="gridIt">'+newplant.age+'</div>'+'<div class="gridIt">'+newplant.kind+'</div>'+'<div class="gridIt">'+newplant.areal+'</div>'+
            '<div class="gridIt">'+newplant.first+'</div>'+'<div class="gridIt">'+newplant.width+'</div>'+'<div class="gridIt">'+newplant.length+'</div>'+
            '<div class="gridIt" id="change'+today.getHours()+today.getMinutes() +today.getSeconds()+'"><button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button></div>';
            myMap.set('change'+today.getHours()+today.getMinutes() +today.getSeconds()+'',newplant);
        }
        changePlant();
        deletePlant();
        inName.value = "";
        inVid.value = "";
        inAge.value = "";
        inKind.value = "";
        inAreal.value = "";
        inFirst.value = "";  
        inFlower.value = "";
        inKindFlower.value = "";
        inWidth.value = "";
        inLength.value = "";      
    }
});

function changePlant(){
    for(let changeBtn of changeBtns){
        changeBtn.addEventListener ("click",function (){
        var el = changeBtn.parentNode;
        var newplant = myMap.get(el.id);
            inName.value= newplant.name;
            inVid.value=newplant.vid ;
            inAge.value=newplant.age  ;
            inKind.value = newplant.kind;
            inAreal.value =newplant.areal ;
            inFirst.value =newplant.first ;
        if (el.parentNode == gridCont1) {
            val = 'value1';
            N1--;
            gridCont1.style.setProperty('grid-template-rows', 'repeat('+N1+', 50px)');
            document.getElementById("select1").style.display ='block';
            document.getElementById("select1").value = "value1";
            document.getElementById("maket").style.display ='block';
            document.getElementById("Width").style.display ='none';
            document.getElementById("Length").style.display ='none';
            document.getElementById("Flower").style.display ='block';
            document.getElementById("KindFlower").style.display ='block';
            inFlower.value = newplant.flower;
            inKindFlower.value = newplant.kindFlower;
            inWidth.value = "";
            inLength.value = "";
        }
        if (el.parentNode == gridCont2) {val = 'value2';
            N2--;
            gridCont2.style.setProperty('grid-template-rows', 'repeat('+N2+', 50px)');
             document.getElementById("select1").style.display ='block';
             document.getElementById("select1").value = "value1";
             document.getElementById("maket").style.display ='block';
             document.getElementById("Flower").style.display ='none';
             document.getElementById("KindFlower").style.display ='none';
             document.getElementById("Width").style.display ='block';
             document.getElementById("Length").style.display ='block';
            inFlower.value = "";
            inKindFlower.value = "";
            inWidth.value = newplant.width;
            inLength.value = newplant.length;
    }
        myMap.delete(el.id);
    for (let i = 1; i < 9; i++) {
        el.previousSibling.remove();
    }
        changeBtn.parentElement.remove();
        event.stopPropagation();
      });
    }
}

function deletePlant(){
    for(let deleteBtn of deleteBtns){
        deleteBtn.addEventListener ("click",function (){
        var el = deleteBtn.parentNode;
        if (el.parentNode == gridCont1) {
            N1--;
            gridCont1.style.setProperty('grid-template-rows', 'repeat('+N1+', 50px)');
            myMap.delete(el.id);
            for (let i = 1; i < 9; i++) {
                el.previousSibling.remove();
            }
                el.remove();
                event.stopPropagation();
        }
        if (el.parentNode == gridCont2) {
            N2--;
            gridCont2.style.setProperty('grid-template-rows', 'repeat('+N2+', 50px)');
            myMap.delete(el.id);
            for (let i = 1; i < 9; i++) {
                el.previousSibling.remove();
            }
                el.remove();
                event.stopPropagation();
        }
      });
    }
}

saveAllBtn.addEventListener('click', function(){
    localStorage.setItem('grid1',gridCont1.innerHTML);
    localStorage.setItem('grid2',gridCont2.innerHTML);
    localStorage.setItem('N1',N1);
    localStorage.setItem('N2',N2);
    localStorage.setItem ('Map', JSON.stringify([...myMap]));
  });

function loadAll(){
    if(localStorage.getItem('grid1')){
        myMap = new Map(JSON.parse (localStorage.getItem ('Map')));
        gridCont1.innerHTML = localStorage.getItem('grid1');
        gridCont2.innerHTML = localStorage.getItem('grid2');
        document.getElementById("lef").style.display ='block';
        document.getElementById("rif").style.display ='block';
        saveAllBtn.style.display ='block';
        putServBtn.style.display ='block';
        takeFromServBtn.style.display ='block';
        gridCont1.style.setProperty('display', 'grid', "important");
        gridCont2.style.setProperty('display', 'grid', "important");
        N1 = localStorage.getItem('N1');
        N2 = localStorage.getItem('N2');
        gridCont1.style.setProperty('grid-template-rows', 'repeat('+N1+', 50px)');
        gridCont2.style.setProperty('grid-template-rows', 'repeat('+N2+', 50px)');
        changePlant();
        deletePlant();
    }
  }
  putServBtn.addEventListener('click', function(){
    fetch('http://localhost:3000/helps', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([...myMap])
    })
  });
  
  takeFromServBtn.addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/helps", false);
    request.send();
    var status = request.status;
    if(status==200){
    let responseObj = new Map(JSON.parse(request.response));
    var today = new Date();
    var i = 0;
    for (var [key, value] of responseObj) {
            myMap.set('change'+today.getHours()+today.getMinutes() +today.getSeconds()+i,responseObj.get(key));
            var newplant = myMap.get('change'+today.getHours()+today.getMinutes() +today.getSeconds()+i);
            if (newplant.flower != undefined) {
                N1++;
                gridCont1.style.setProperty('grid-template-rows', 'repeat('+N1+', 50px)');
                gridCont1.innerHTML+='<div class="gridIt">'+newplant.name+'</div>'+'<div class="gridIt">'+newplant.vid+'</div>'+
            '<div class="gridIt">'+newplant.age+'</div>'+'<div class="gridIt">'+newplant.kind+'</div>'+'<div class="gridIt">'+newplant.areal+'</div>'+
            '<div class="gridIt">'+newplant.first+'</div>'+'<div class="gridIt">'+newplant.flower+'</div>'+'<div class="gridIt">'+newplant.kindFlower+'</div>'+
            '<div class="gridIt" id="change'+today.getHours()+today.getMinutes() +today.getSeconds()+i+'"><button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button></div>';
            } else {
                N2++;
                gridCont2.style.setProperty('grid-template-rows', 'repeat('+N2+', 50px)');
                gridCont2.innerHTML+='<div class="gridIt">'+newplant.name+'</div>'+'<div class="gridIt">'+newplant.vid+'</div>'+
            '<div class="gridIt">'+newplant.age+'</div>'+'<div class="gridIt">'+newplant.kind+'</div>'+'<div class="gridIt">'+newplant.areal+'</div>'+
            '<div class="gridIt">'+newplant.first+'</div>'+'<div class="gridIt">'+newplant.width+'</div>'+'<div class="gridIt">'+newplant.length+'</div>'+
            '<div class="gridIt" id="change'+today.getHours()+today.getMinutes() +today.getSeconds()+i+'"><button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button></div>';
              }
            i++;
        }
        changePlant();
        deletePlant();
    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}

  });

  changePlant();
  deletePlant();
  loadAll();