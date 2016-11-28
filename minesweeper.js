// Test Funcs
// See Inspect Element's Console Log Output
createBasicElement();

function createModal() {
    var modal = createElementWithAttrs("div" , "modal" , "alert-modal" , null);

    var modal_content = createElementWithAttrs("div" , "modal-content" , null , null);

    var name = createElementWithAttrs("input" , "field" , "name" , null);
    name.placeholder = "Enter your name";

    var OKButton = createElementWithAttrs("button" , null , null , "OK");

    modal_content.appendChild(name);
    modal_content.appendChild(OKButton);
    modal.appendChild(modal_content);

    return modal ;
}

// function createWindow() {
//     var window = document.createElement("div");
//     window.className = "window";
//     var titleBar = document.createElement("div");
//     titleBar.className = "title-bar";
//     var gameTitle = document.createElement("span");
//     gameTitle.id = "game-title";
//     var text = document.createElement("Minesweeper Online - Beginner!");
//     gameTitle.appendChild(text);
//     var div = document.createElement("div");
//     var btnMinimize = document.createElement("span");
//     var btnClose = document.createElement("span");
//     btnMinimize.className = "btn";
//     btnClose.className = "btn";
//     btnMinimize.id = "btn-minimize";
//     btnClose.id = "btn-close";
//     var text = document.createTextNode("-");
//     btnMinimize.appendChild(text);
//     var top = document.createElement("div");
//     top.className = "top";
//
//     window.appendChild(titleBar);
//     window.appendChild(top);
// }
function createBasicElement() {
    var modal = createModal();
    // var window = createWindow();
    document.body.appendChild(modal);
}

/**
 * This method create an element with DOM and sets class or id  or text if are not null
 * @param tagName name of element
 * @param className css class for this element
 * @param id an id for element
 * @param text a text label for element
 * @returns {Element}
 */
function createElementWithAttrs(tagName , className , id , text){
    var element = document.createElement(tagName);

    if( className != null ){
        element.className = className ;
    }
    if( id != null ){
        element.id = id ;
    }
    if( text != null ){
        var text = document.createTextNode(text);
        element.appendChild(text);
    }

    return element ;
}
getGameXML();

getNewGame('<request>'+
    '<rows>3</rows>'+
    '<cols>3</cols>'+
    '<mines>3</mines>'+
    '</request>');
