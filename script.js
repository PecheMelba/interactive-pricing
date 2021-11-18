let princingCursor = document.getElementById('princing-cursor');
let pricingBar = document.getElementById('pricing-bar');
let pricingBarFilled = document.getElementById('pricing-bar-filled');
let pricingAmount = document.getElementById('monthly-amount-nb');

// init pricing cursor position
princingCursor.style.left = ""+(pricingBar.offsetWidth / 2) - princingCursor.offsetWidth/2 +"px";
pricingAmount.innerText = "$50.00";

princingCursor.onmousedown = function(event) 
{
    event.preventDefault(); // prevent selection start (browser action)

    // price calc part
    let pricingBarRight = pricingBar.getBoundingClientRect().left + pricingBar.offsetWidth;

    let shiftX = event.clientX - princingCursor.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) 
    {
        let newXPosition = event.clientX - shiftX - pricingBar.getBoundingClientRect().left;
        let rightEdge = pricingBar.offsetWidth - princingCursor.offsetWidth;
        
        //If the mouse is out of pricingBar => lock the princingCursor within the boundaries of pricingBar
        //out from left side
        if (newXPosition < 0)
            newXPosition = 0;

        //out from right side
        else if (newXPosition > rightEdge) 
            newXPosition = rightEdge;
        
        princingCursor.style.left = newXPosition + 'px';

        // update price value 
        let tempPriceValue = (newXPosition * 100) / rightEdge;
        pricingAmount.innerText = "$" + tempPriceValue.toFixed(2);
        pricingBarFilled.style.width = "" + tempPriceValue + "%";
    }

    function onMouseUp() 
    {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }
};

princingCursor.ondragstart = function() {return false;};