let randomizer = Math.floor(Math.random() * (4 - 1) + 1);
const counter = randomizer;
let checkedBlocks = [];

document.addEventListener('DOMContentLoaded', function() {

    let wrapper = document.getElementById('wrapper');
    let blocks = [];

    function create_colored_block() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 96);
        let bgColor = `rgb(${r},${g},${b})`;
        let square = document.createElement('div');
        square.classList.add('square', 'randomColor');
        square.style.background = bgColor;
        blocks.push(square);
    }

    function create_blue_block() {
        let blueSquare = document.createElement('div');
        blueSquare.classList.add('square', 'blue');
        blocks.push(blueSquare);
    }

    function shuffle_array(arr){
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    function append_blocks() {
        for (let i = 0; i < 6; i++) {
            randomizer > 0 ? create_blue_block() : create_colored_block();
            randomizer--;
        }
        shuffle_array(blocks);
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].addEventListener('click', item => {
                addYellowBorder(item);
            })
            wrapper.appendChild(blocks[i]);
        }
    }

    append_blocks();
});

function addYellowBorder(el) {
    if (el.target.classList.contains('border')) {
        el.target.classList.remove('border');
        const index = checkedBlocks.indexOf(el.target);
        checkedBlocks.splice(index, 1);
    } else {
        el.target.classList.add('border');
        checkedBlocks.push(el.target);
    }
}

function checkBlueBlocks() {
    let resultArray = [];
    for (const item of checkedBlocks) {
        if (!item.classList.contains('blue')) {
            alert('Please check only blue blocks.')
            return;
        } else {
            resultArray.push(item);
        }
    }
    if (resultArray.length === counter) {
        alert('U checked correctly, reloading.');
        document.location.reload();
    } else {
        alert('Please check all blue blocks.')
    }
}