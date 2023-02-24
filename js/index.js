const colour = document.querySelectorAll('.colour');
const btnChangeColour = document.querySelector('.btnColourChange');
const setOfCodes = [];



document.addEventListener('keydown', event => {
    event.preventDefault();
    if(event.key === ' ' || event.key === 'Spacebar ') {
        setRandomColours();
//        console.log(setOfCodes);
        document.querySelector('.btnCopyColoures').innerText = 'copy colour codes';
    }    
});

btnChangeColour.addEventListener('click', colourRotate); 

document.addEventListener('click', event => {
    const locker = event.target;
    const infoCopyingBtn = document.querySelector('.btnCopyColoures')

    if (locker.className === 'fa-solid fa-lock-open') {
        locker.classList.toggle('fa-lock-open');
        locker.classList.toggle('fa-lock');
    } else 
    if (locker.className === 'fa-solid fa-lock') {
        locker.classList.toggle('fa-lock');
        locker.classList.toggle('fa-lock-open');
    }
    copyColourCode(event.target.textContent.replace(/\s/g,''));   
    
    if ((event.target.className === "btnCopyColoures") || 
        (event.target.className === "colour") || 
        (event.target.className === "colourCode") ) {
        copyColourCode(String(setOfCodes).split(',').join(', '));
//        console.log(String(setOfCodes).split(',').join(', '));
        infoCopyingBtn.innerText = 'all codes are copied to the clipboard...';
    }
    if (event.target.className === "colourCode") {
        copyColourCode(event.target.textContent.replace(/\s/g,''));
//        console.log(event.target.textContent.replace(/\s/g,''));
        infoCopyingBtn.innerText = 'this code has been copied...';
    }
    if (event.target.className === "colour") {
    copyColourCode(event.target.textContent.replace(/\s/g,''));
//        console.log(event.target.textContent.replace(/\s/g,''));
    infoCopyingBtn.innerText = 'the color of this stripe has been copied...';
}

});

function setRandomColours() {
    setOfCodes.splice(0, setOfCodes.length);
    function generateRandomColourCode() {
        //RGB (RRGGBB)
        const hexCodes = '0123456789ABCDEF';
        let colourRGB = '';
        for (let i = 0; i < 6; i++) {
            colourRGB += hexCodes[Math.floor(Math.random()*hexCodes.length)];
        }
        return '#' + colourRGB;
    };
    colour.forEach(item => {
        const code = generateRandomColourCode();
        const isLocked = item.querySelector('.fa-solid').className;
        const text = item.querySelector('.colourCode');        
        if (isLocked === 'fa-solid fa-lock-open') {
            text.textContent = code;
            item.style.background = code;
            setOfCodes.push(code);
        } else {
            setOfCodes.push(item.querySelector('.colourCode').innerText);
        }
    });
//    console.log(setOfCodes);        
};

function copyColourCode(colourCode) {
    return navigator.clipboard.writeText(colourCode);    
}


function colourRotate() {
    setRandomColours();
//    console.log(setOfCodes);
    document.querySelector('.btnCopyColoures').innerText = 'copy colour codes';
};

setRandomColours();
