//Question 5
console.log("Question 5");

// From this
var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };
// var output = {
// '1': { id: 1, name: 'John', children: [2, 3] },
// '2': { id: 2, name: 'Sally' },
// '3': { id: 3, name: 'Mark', children: [4] },
// '4': { id: 4, name: 'Harry' },
// '5': { id: 5, name: 'Mike', children: [6] },
// '6': { id: 6, name: 'Peter' }
// };

var output = {};
function reduce(obj){
    var out = {};


    for(var i in obj){
        if(i === 'children'){
            var children = [];
            for(var j in obj[i]){
                children[j] = obj[i][j]['id'];
                reduce(obj[i][j]);
            }
            out[i] = children;
        }
        else{
            out[i] = obj[i];
        }
    }
    output[obj['id']] = out;

}

function normalize(initialObj){
    for(var i in initialObj){
        reduce(initialObj[i]);
    }
    
}
normalize(input);
console.log(output);