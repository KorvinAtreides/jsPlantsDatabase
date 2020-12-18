var N1 = 1;
var N2 = 1;
var myMap = new Map();

//create select
newPlantbtn.onclick = function () {
  if (select1.style.display != "block") {
    select1.style.display = "block";
  }
};

function makeMaketVisible(val1) {
  maket.style.display = "block";
  let spans = document.querySelectorAll("form span");
  for (let span of spans) {
    span.style.cssText = `
    display: none;
    color: red;
    font-size: large;`;
  }

  if (val1 == "value1") {
    Width.style.display = "none";
    Length.style.display = "none";
    Flower.style.display = "block";
    KindFlower.style.display = "block";
    inWidth.removeAttribute("required");
    inLength.removeAttribute("required");
    inFlower.setAttribute("required", "required");
    inKindFlower.setAttribute("required", "required");
  } else {
    Flower.style.display = "none";
    KindFlower.style.display = "none";
    Width.style.display = "block";
    Length.style.display = "block";
    inWidth.setAttribute("required", "required");
    inLength.setAttribute("required", "required");
    inFlower.removeAttribute("required");
    inKindFlower.removeAttribute("required");
  }
}

select1.addEventListener("change", function () {
  makeMaketVisible(this.value);
});

function Plant(name, vid, age, kind, areal, first) {
  this.name = name;
  this.vid = vid;
  this.age = age;
  this.kind = kind;
  this.areal = areal;
  this.first = first;
  this.getName = function () {
    return this.name;
  };
  this.getVid = function () {
    return this.name;
  };
  this.getAge = function () {
    return this.age;
  };
  this.getKind = function () {
    return this.kind;
  };
  this.getAreal = function () {
    return this.areal;
  };
  this.getFirst = function () {
    return this.first;
  };
}
function Leaves(flower, kindFlower) {
  Plant.call(this);
  this.flower = flower;
  this.kindFlower = kindFlower;
  this.getFlower = function () {
    return this.flower;
  };
  this.getKindFlower = function () {
    return this.kindFlower;
  };
}
function Needles(width, length) {
  Plant.call(this);
  this.width = width;
  this.length = length;
  this.getWidth = function () {
    return this.width;
  };
  this.getLength = function () {
    return this.length;
  };
}

function inpytVal() {
  let inpyts = document.getElementsByTagName("input");
  for (let inpyt of inpyts) {
    inpyt.addEventListener("input", function (event) {
      if (inpyt.validity.valid == false) {
        inpyt.nextElementSibling.style.cssText = `
          display: inline-block;
          color: red;
          font-size: large;`;
      } else {
        inpyt.nextElementSibling.style.cssText = `display: none;`;
      }
    });
  }
}
inpytVal();

saveBtn.addEventListener("click", function () {
  let inpyts = document.getElementsByTagName("input");
  let valid = true;
  for (let inpyt of inpyts) {
    if (!inpyt.validity.valid) {
      valid = false;
    }
  }
  if (!valid) {
    alert("Error: check validity of the form");
  } else {
    let today = new Date();
    if (select1.value == "value1") {
      let newplant = new Leaves(inFlower.value, inKindFlower.value);
      newplant.name = inName.value;
      newplant.vid = inVid.value;
      newplant.age = inAge.value;
      newplant.kind = inKind.value;
      newplant.areal = inAreal.value;
      newplant.first = inFirst.value;
      N1++;
      gridCont1.style.setProperty(
        "grid-template-rows",
        "repeat(" + N1 + ", 50px)"
      );
      addGrids(
        1,
        newplant.name,
        newplant.vid,
        newplant.age,
        newplant.kind,
        newplant.areal,
        newplant.first,
        newplant.flower,
        newplant.kindFlower,
        today
      );
      myMap.set(
        "change" +
          today.getHours() +
          today.getMinutes() +
          today.getSeconds() +
          "0",
        newplant
      );
    } else {
      let newplant = new Needles(inWidth.value, inLength.value);
      newplant.name = inName.value;
      newplant.vid = inVid.value;
      newplant.age = inAge.value;
      newplant.kind = inKind.value;
      newplant.areal = inAreal.value;
      newplant.first = inFirst.value;
      N2++;
      gridCont2.style.setProperty(
        "grid-template-rows",
        "repeat(" + N2 + ", 50px)"
      );
      addGrids(
        2,
        newplant.name,
        newplant.vid,
        newplant.age,
        newplant.kind,
        newplant.areal,
        newplant.first,
        newplant.width,
        newplant.length,
        today
      );
      myMap.set(
        "change" +
          today.getHours() +
          today.getMinutes() +
          today.getSeconds() +
          "0",
        newplant
      );
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
    select1.style.display = "none";
    select1.value = "noneVol";
    maket.style.display = "none";
  }
});

function changePlant() {
  let changeBtns = document.getElementsByClassName("changeBtn");
  for (let changeBtn of changeBtns) {
    changeBtn.addEventListener("click", function () {
      let el = changeBtn.parentNode;
      let newplant = myMap.get(el.id);
      select1.style.display = "block";
      inName.value = newplant.name;
      inVid.value = newplant.vid;
      inAge.value = newplant.age;
      inKind.value = newplant.kind;
      inAreal.value = newplant.areal;
      inFirst.value = newplant.first;
      if (el.parentNode == gridCont1) {
        N1--;
        gridCont1.style.setProperty(
          "grid-template-rows",
          "repeat(" + N1 + ", 50px)"
        );
        select1.value = "value1";
        makeMaketVisible("value1");
        inFlower.value = newplant.flower;
        inKindFlower.value = newplant.kindFlower;
        inWidth.value = "";
        inLength.value = "";
      }
      if (el.parentNode == gridCont2) {
        N2--;
        gridCont2.style.setProperty(
          "grid-template-rows",
          "repeat(" + N2 + ", 50px)"
        );
        select1.value = "value2";
        makeMaketVisible("value2");
        inWidth.value = newplant.width;
        inLength.value = newplant.length;
      }
      myMap.delete(el.id);
      for (let i = 1; i < 9; i++) {
        el.previousSibling.remove();
      }
      el.remove();
    });
  }
}

function deletePlant() {
  let deleteBtns = document.getElementsByClassName("deleteBtn");
  for (let deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click", function () {
      let el = deleteBtn.parentNode;
      if (el.parentNode == gridCont1) {
        N1--;
        gridCont1.style.setProperty(
          "grid-template-rows",
          "repeat(" + N1 + ", 50px)"
        );
      }
      if (el.parentNode == gridCont2) {
        N2--;
        gridCont2.style.setProperty(
          "grid-template-rows",
          "repeat(" + N2 + ", 50px)"
        );
      }
      myMap.delete(el.id);
      for (let i = 1; i < 9; i++) {
        el.previousSibling.remove();
      }
      el.remove();
    });
  }
}

putServBtn.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/helps", false);
  request.send();
  let responseObj = JSON.parse(request.response);
  let data = [];
  for (
    let i = responseObj.length + 1;
    i < responseObj.length + [...myMap].length + 1;
    i++
  ) {
    data[i] = { id: i, plant: [...myMap][i] };
  }
  console.log(data);
  //   fetch("http://localhost:3000/helps", {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
});

getData.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/helps", false);
  request.send();
  let responseObj = JSON.parse(request.response);
  console.log(responseObj);
  for (let i = 0; i < responseObj.length; i++) {
    myMap.set(responseObj[i].plant[0], responseObj[i].plant[1]);
  }
  console.log(myMap);
});

takeFromServBtn.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/helps", false);
  request.send();
  let status = request.status;
  if (status == 200) {
    let responseObj = new Map(JSON.parse(request.response));
    let today = new Date();
    let i = 0;
    for (let [key, value] of responseObj) {
      myMap.set(
        "change" +
          today.getHours() +
          today.getMinutes() +
          today.getSeconds() +
          i,
        responseObj.get(key)
      );
      let newplant = responseObj.get(key);
      if (newplant.flower != undefined) {
        N1++;
        gridCont1.style.setProperty(
          "grid-template-rows",
          "repeat(" + N1 + ", 50px)"
        );
        addGrids(
          1,
          newplant.name,
          newplant.vid,
          newplant.age,
          newplant.kind,
          newplant.areal,
          newplant.first,
          newplant.flower,
          newplant.kindFlower,
          today,
          i
        );
      } else {
        N2++;
        gridCont2.style.setProperty(
          "grid-template-rows",
          "repeat(" + N2 + ", 50px)"
        );
        addGrids(
          2,
          newplant.name,
          newplant.vid,
          newplant.age,
          newplant.kind,
          newplant.areal,
          newplant.first,
          newplant.width,
          newplant.length,
          today,
          i
        );
      }
      i++;
    }
    changePlant();
    deletePlant();
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
  }
});

function addGrids(
  type,
  par1,
  par2,
  par3,
  par4,
  par5,
  par6,
  par7,
  par8,
  time,
  i = 0
) {
  document.getElementById(`gridCont` + String(type)).innerHTML +=
    '<div class="gridIt">' +
    par1 +
    "</div>" +
    '<div class="gridIt">' +
    par2 +
    "</div>" +
    '<div class="gridIt">' +
    par3 +
    "</div>" +
    '<div class="gridIt">' +
    par4 +
    "</div>" +
    '<div class="gridIt">' +
    par5 +
    "</div>" +
    '<div class="gridIt">' +
    par6 +
    "</div>" +
    '<div class="gridIt">' +
    par7 +
    "</div>" +
    '<div class="gridIt">' +
    par8 +
    "</div>" +
    '<div class="gridIt" id="change' +
    time.getHours() +
    time.getMinutes() +
    time.getSeconds() +
    i +
    '"><button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button></div>';
}

changePlant();
deletePlant();
