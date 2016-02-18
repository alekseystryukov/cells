//var input = '0112592471115849461150781161382116525288139490034';
var input = '0112512471115819181394910313426212111517111611821165212811213428';

matrix = input_to_matrix(input);
var field = document.getElementById('field');
draw_field(field, matrix);


function findNeighbors(matrix, r, c, val){

    c = parseInt(c);
    r = parseInt(r);



    neighbor_rules = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    var size = matrix.length;

    var trying = 0;
    var founded_neighbors = [];
    var discover_neighbors = function (dr, dc){
        var neighbors = [];  // neighbors founded in current iteration
        for(var i=0; i<neighbor_rules.length;i++){
            var rule = neighbor_rules[i];
            var row = dr + rule[0];
            var col = dc + rule[1];
            if(row > -1 && row < size
            && col > -1 && col < size
            && matrix[row][col] === val){
                var cell = [row, col].join(" ");
                if(founded_neighbors.indexOf(cell) === -1){
                    neighbors.push(cell);
                }
            }
        }
        founded_neighbors = founded_neighbors.concat(neighbors);
        for(var j=0; j<neighbors.length;j++){
            var neighbor = neighbors[j].split(" ");
            var neighbor_of_neighbor = discover_neighbors(parseInt(neighbor[0]), parseInt(neighbor[1]));
        }
    }
    discover_neighbors(r, c, [[r,c].join(' ')]);
    return founded_neighbors;
}

function input_to_matrix(input){
    var matrix = [];
    var size = Math.sqrt(input.length);
    if(size % 1 === 0){  // is integer
        for(var i=0;i<input.length;i++){
            if(i % size === 0){
                matrix[i/size] = [];
            }
            matrix[Math.floor(i/size)].push(input[i]);
        }
    }else{
        console.error('Invalid input length for matrix!')
    }
    return matrix;
}


function draw_field(element, matrix){
    element.innerHTML = "";
    var size = (element.offsetWidth / matrix.length) + 'px';
    for(var row=0;row<matrix.length;row++){
        for(var col=0;col<matrix[row].length;col++){
            var text = document.createTextNode(matrix[row][col]);
            var cell = document.createElement("div");
            cell.setAttribute('row', row);
            cell.setAttribute('col', col);
            cell.style.width = size;
            cell.style.lineHeight = size;
            cell.appendChild(text);
            element.appendChild(cell);
        }
    }
    element.onmouseover = function(event){
        var target = event.target;
        var neighbors = findNeighbors(matrix, target.getAttribute('row'), target.getAttribute('col'), target.innerHTML);
        highlightCells(element, neighbors, matrix.length);
    };
    element.onmouseout = function(event){
        clearHighlighted(element);
    }
}

function highlightCells(element, neighbors, size){
    var child_s = element.children;
    for(var i=0;i<neighbors.length;i++){
        var cell = neighbors[i].split(" ");
        var num = parseInt(cell[0]) * size + parseInt(cell[1]);
        child_s[num].className = 'highlighted';
    }
}

function clearHighlighted(element){
    var elements = element.querySelectorAll('.highlighted');
    for(var i=0;i<elements.length;i++){
        elements[i].className = '';
    }
}

function cl(e){
    console.log(e);
}


