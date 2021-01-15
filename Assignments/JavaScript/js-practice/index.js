// Question 1
console.log("Question 1")
var i = 5;
while(i > 0){
    var str = "";
    for(var j = 0; j < i; j++){
        str = str + "*";
    }
    str = str + "\n";
    console.log(str);
    i = i-1;
}

//Question 2
console.log("Question 2")
var me = {
    name: "subin",
    address: "Home",
    email:"subin@gmail.com",
    interest:"sleeping",
    education:{
        Name: "abc school",
        Date: 2020}

}

// console.log(me);

keys = Object.keys(me);
for(var item in me){
    if(typeof(me[item]) == 'object'){
        var edu = "";
        for(i in me[item]){
            edu = edu + i + ":" + me[item][i] + ", ";
        }
        console.log(edu.slice(0,-2));
    }
}

//Question 3
console.log("Question 3")
var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(arr, value){
    for(i in arr){

        if(arr[i]["name"] === value){
            return arr[i];
        }
    }
    return "Not Found";
}

console.log(searchByName(fruits ,"Apple")); 

function searchByKey(arr, key, value){
    for(i in arr){
        if (arr[i][key] === value){
            return arr[i]
        }
    }
    return "Not Found";
}
console.log(searchByKey(fruits, 'name', 'Apple'));

//Question 4
console.log("Question 4")
var array = [{
    id: 1,
    name: 'John',
}, {
    id: 4,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
},{
    id: 2,
    name: 'Andrew',
}];

function sortBy(arr, key){
    var newArr = arr;

    for(var i = 1;i<newArr.length; i++  ){
        var k = newArr[i];
        var j = i -1;
        while (j >= 0 && k[key] < newArr[j][key]){
            newArr[j + 1] = newArr[j];
            j -= 1;  
        }
        arr[j+1] = k;
    }
    return newArr;
    
}

var sorted = sortBy(array, 'name');
console.log(sorted)

