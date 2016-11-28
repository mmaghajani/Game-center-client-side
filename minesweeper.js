// Test Funcs
// See Inspect Element's Console Log Output
createBasicElement();

function createModal() {
    var modal = document.createElement("div");
    modal.id = "alert-modal" ;
    modal.className = "modal";
    var modal_content = document.createElement("div");
    modal_content.className = "modal-content";
    var name = document.createElement("input");
    name.id = "name";
    name.className = "field";
    name.placeholder = "Enter your name";
    var OKButton = document.createElement("button");
    var text = document.createTextNode("OK");
    OKButton.appendChild(text);
    modal_content.appendChild(name);
    modal_content.appendChild(OKButton);
    modal.appendChild(modal_content);

    return modal ;
}

function createBasicElement() {
    var modal = createModal();

    document.body.appendChild(modal);
}
getGameXML();

getNewGame('<request>'+
    '<rows>3</rows>'+
    '<cols>3</cols>'+
    '<mines>3</mines>'+
    '</request>');
