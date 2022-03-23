const searchWrapper = document.getElementById("search-input");
const searchWrapper1 = document.getElementById("search-input1");
const searchWrapper2 = document.getElementById("search-input2");

const inputBox = searchWrapper.querySelector("input");
const inputBox1 = searchWrapper1.querySelector("input");
const inputBox2 = searchWrapper2.querySelector("input");

const suggBox = searchWrapper.querySelector(".autocom-box");
const suggBox1 = searchWrapper1.querySelector(".autocom-box");
const suggBox2 = searchWrapper2.querySelector(".autocom-box");

let count = 0

inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){

        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray, suggBox, inputBox);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this,'search-input')");
        }
    }else{
        searchWrapper.classList.remove("active");
    }
}

inputBox1.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){

        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });

        searchWrapper1.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray, suggBox1, inputBox1);
        let allList = suggBox1.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this,'search-input1')");
        }
    }else{
        searchWrapper1.classList.remove("active"); //hide autocomplete box
    }
}


inputBox2.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){

        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });

        searchWrapper2.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray, suggBox2, inputBox2);
        let allList = suggBox2.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this,'search-input2')");
        }
    }else{
        searchWrapper2.classList.remove("active"); //hide autocomplete box
    }
}



function select(element, wrap){

    const sw = document.getElementById(wrap);

    let selectData = element.textContent;
    let ul = element.parentElement.parentElement.nextSibling.nextSibling;
    let inputField = element.parentElement.previousSibling.previousSibling;
    newElement(ul,selectData)
    //add the new person to below and before adding check idf that person is already percent there.

    element.textContent = ""
    inputField.value = ""
    sw.classList.remove("active");
}

function showSuggestions(list, ele, inp){
    let listData;
    if(!list.length){
        userValue = inp.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    ele.innerHTML = listData;
}
