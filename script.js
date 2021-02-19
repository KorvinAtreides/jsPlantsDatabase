var N1 = 1;
var N2 = 1;
var myMap = new Map();

function Plant(name, family, species, age, area, first) {
  this.name = name;
  this.family = family;
  this.species = species;
  this.age = age;
  this.area = area;
  this.first = first;
  this.getName = function () {
    return this.name;
  };
  this.getFamily = function () {
    return this.family;
  };
  this.getSpecies = function () {
    return this.name;
  };
  this.getAge = function () {
    return this.age;
  };
  this.getArea = function () {
    return this.area;
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
function Needles(heigth, length) {
  Plant.call(this);
  this.heigth = heigth;
  this.length = length;
  this.getHeigth = function () {
    return this.heigth;
  };
  this.getLength = function () {
    return this.length;
  };
}

newPlantBtn.onclick = function () {
  if (select1.style.display != "block") {
    select1.style.display = "block";
  }
};

select1.addEventListener("change", function () {
  makeMaketVisible(this.value);
});

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
    Heigth.style.display = "none";
    Length.style.display = "none";
    Flower.style.display = "block";
    KindFlower.style.display = "block";
    inHeigth.removeAttribute("required");
    inLength.removeAttribute("required");
    inFlower.setAttribute("required", "required");
    inKindFlower.setAttribute("required", "required");
  } else {
    Flower.style.display = "none";
    KindFlower.style.display = "none";
    Heigth.style.display = "block";
    Length.style.display = "block";
    inHeigth.setAttribute("required", "required");
    inLength.setAttribute("required", "required");
    inFlower.removeAttribute("required");
    inKindFlower.removeAttribute("required");
  }
}

function inpytVal() {
  maket.addEventListener("input", function (event) {
    if (event.target.validity.valid == false) {
      event.target.nextElementSibling.style.cssText = `
             display: inline-block;
              color: red;
              font-size: large;`;
    } else {
      event.target.nextElementSibling.style.cssText = `display: none;`;
    }
  });
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
      newplant.family = inFamily.value;
      newplant.species = inSpecies.value;
      newplant.age = inAge.value;
      newplant.area = inArea.value;
      newplant.first = inFirst.value;
      N1++;
      gridCont1.style.setProperty("grid-template-rows", `repeat( ${N1}, 50px)`);
      addGrids(
        1,
        newplant.name,
        newplant.family,
        newplant.species,
        newplant.age,
        newplant.area,
        newplant.first,
        newplant.flower,
        newplant.kindFlower,
        today
      );
      myMap.set(
        `change${today.getHours()}${today.getMinutes()}${today.getSeconds()}0`,
        newplant
      );
    } else {
      let newplant = new Needles(inHeigth.value, inLength.value);
      newplant.name = inName.value;
      newplant.family = inFamily.value;
      newplant.species = inSpecies.value;
      newplant.age = inAge.value;
      newplant.area = inArea.value;
      newplant.first = inFirst.value;
      N2++;
      gridCont2.style.setProperty("grid-template-rows", `repeat( ${N2}, 50px)`);
      addGrids(
        2,
        newplant.name,
        newplant.family,
        newplant.species,
        newplant.age,
        newplant.area,
        newplant.first,
        newplant.heigth,
        newplant.length,
        today
      );
      myMap.set(
        `change${today.getHours()}${today.getMinutes()}${today.getSeconds()}0`,
        newplant
      );
    }
    for (let inpyt of inpyts) {
      inpyt.value = "";
    }
    select1.style.display = "none";
    select1.value = "noneVol";
    maket.style.display = "none";
  }
});

tablesDiv.addEventListener("click", function (event) {
  if (event.target.type == "button") {
    if (event.target.classList.value == "changeBtn") {
      changePlant(event.target);
    }
    if (event.target.classList.value == "deleteBtn") {
      deletePlant(event.target);
    }
  }
});

function changePlant(changeBtn) {
  let el = changeBtn.parentNode;
  let newplant = myMap.get(el.id);
  select1.style.display = "block";
  inName.value = newplant.name;
  inFamily.value = newplant.family;
  inSpecies.value = newplant.species;
  inAge.value = newplant.age;
  inArea.value = newplant.area;
  inFirst.value = newplant.first;
  if (el.parentNode == gridCont1) {
    N1--;
    gridCont1.style.setProperty("grid-template-rows", `repeat( ${N1}, 50px)`);
    select1.value = "value1";
    makeMaketVisible("value1");
    inFlower.value = newplant.flower;
    inKindFlower.value = newplant.kindFlower;
    inHeigth.value = "";
    inLength.value = "";
  }
  if (el.parentNode == gridCont2) {
    N2--;
    gridCont2.style.setProperty("grid-template-rows", `repeat( ${N2}, 50px)`);
    select1.value = "value2";
    makeMaketVisible("value2");
    inHeigth.value = newplant.heigth;
    inLength.value = newplant.length;
  }
  myMap.delete(el.id);
  for (let i = 1; i < 9; i++) {
    el.previousElementSibling.remove();
  }
  el.remove();
}

function deletePlant(deleteBtn) {
  let el = deleteBtn.parentNode;
  if (el.parentNode == gridCont1) {
    N1--;
    gridCont1.style.setProperty("grid-template-rows", `repeat( ${N1}, 50px)`);
  }
  if (el.parentNode == gridCont2) {
    N2--;
    gridCont2.style.setProperty("grid-template-rows", `repeat( ${N2}, 50px)`);
  }
  myMap.delete(el.id);
  for (let i = 1; i < 9; i++) {
    el.previousElementSibling.remove();
  }
  el.remove();
}

putServBtn.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/plants", false);
  request.send();
  let responseObj = JSON.parse(request.response);
  let j = 0;
  for (
    let i = responseObj.length + 1;
    i < responseObj.length + [...myMap].length + 1;
    i++
  ) {
    fetch("http://localhost:3000/plants", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: i, plant: [...myMap][j][1] }),
    });
    j++;
  }
});

takeFromServBtn.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/plants", false);
  request.send();
  let status = request.status;
  if (status == 200) {
    let responseObj = JSON.parse(request.response);
    let today = new Date();
    for (let i = 0; i < responseObj.length; i++) {
      myMap.set(
        `change${today.getHours()}${today.getMinutes()}${today.getSeconds()}${i}`,
        responseObj[i].plant
      );
      let newplant = responseObj[i].plant;
      if (newplant.flower != undefined) {
        N1++;
        gridCont1.style.setProperty(
          "grid-template-rows",
          `repeat( ${N1}, 50px)`
        );
        addGrids(
          1,
          newplant.name,
          newplant.family,
          newplant.species,
          newplant.age,
          newplant.area,
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
          `repeat( ${N2}, 50px)`
        );
        addGrids(
          2,
          newplant.name,
          newplant.family,
          newplant.species,
          newplant.age,
          newplant.area,
          newplant.first,
          newplant.heigth,
          newplant.length,
          today,
          i
        );
      }
    }
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
  }
});

clearTable.addEventListener("click", function () {
  N1 = 1;
  N2 = 1;
  myMap.clear();
  gridCont1.style.setProperty("grid-template-rows", `repeat( ${N1}, 50px)`);
  gridCont2.style.setProperty("grid-template-rows", `repeat( ${N2}, 50px)`);
  gridCont1.innerHTML = `
    <div class="gridIt">Binomial name</div>
    <div class="gridIt">Family</div>
    <div class="gridIt">Species</div>
    <div class="gridIt">Age, years</div>
    <div class="gridIt">Habitat</div>
    <div class="gridIt">First describer</div>
    <div class="gridIt">Flowers size</div>
    <div class="gridIt">Flowers color</div>
    <div class="gridIt"></div>
  `;
  gridCont2.innerHTML = ` 
    <div class="gridIt">Binomial name</div>
    <div class="gridIt">Family</div>
    <div class="gridIt">Species</div>
    <div class="gridIt">Age, years</div>
    <div class="gridIt">Habitat</div>
    <div class="gridIt">First describer</div>
    <div class="gridIt">Tree heigth, m</div>
    <div class="gridIt">Cones length, cm</div>
    <div class="gridIt"></div>
  `;
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
  document.getElementById(`gridCont${type}`).innerHTML += `
    <div class="gridIt">${par1}</div>
    <div class="gridIt">${par2}</div>
    <div class="gridIt">${par3}</div>
    <div class="gridIt">${par4}</div>
    <div class="gridIt">${par5}</div>
    <div class="gridIt">${par6}</div>
    <div class="gridIt">${par7}</div>
    <div class="gridIt">${par8}</div>
    <div class="gridIt" id="change${time.getHours()}${time.getMinutes()}${time.getSeconds()}${i}">
      <button type="button" class="changeBtn">change</button><button type="button" class="deleteBtn">delete</button>
    </div>`;
}
