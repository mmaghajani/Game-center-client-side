// Test Funcs
// See Inspect Element's Console Log Output

var gameInformation = [];
var mines = [] ;
var currentInformation = [] ;

processGameInformation();

createBasicElement();

newGame();

initializeCurrentInformation();

setEventListeners();

function initializeCurrentInformation() {
    currentInformation["numOfClicks"] = 0 ;
    if( (gameInformation["levels"])[0].timer == true ){
        document.getElementById("timer").textContent = (gameInformation["levels"])[0].time ;
    }else{
        document.getElementById("timer").textContent = "000" ;
    }

    if((gameInformation["levels"])[0].mines / 10 < 1 ) {
        document.getElementById("mines").textContent = "00" + (gameInformation["levels"])[0].mines;
    }
    else if((gameInformation["levels"])[0].mines / 10 < 10){
        document.getElementById("mines").textContent = "0" + (gameInformation["levels"])[0].mines;
    }else{
        document.getElementById("mines").textContent = (gameInformation["levels"])[0].mines;
    }
}

function setEventListeners() {
    // var grid = document.getElementById("grid");
    // grid.onclick = clickOnCells ;
    var okBtn = document.getElementById("ok-button");
    okBtn.onclick = okBtnClicked ;
    var nameBox = document.getElementById("name");
    nameBox.addEventListener("keyup" , function(e) {
        console.log(e.keyCode);
        if (e.keyCode < 65 || e.keyCode > 90) {
            nameBox.value = nameBox.value.substring(0 , nameBox.value.length-1);
        }
    }) ;

    var cells = document.getElementById("grid").childNodes ;
    for( var i = 0 ; i < cells.length ; i++ ){
        cells[i].addEventListener("click" , function(e){
            clickOnCells(e);
        })
    }
}

function okBtnClicked(){
    var nameBox = document.getElementById("name");
    if( nameBox.value == "" ) {
        alert("please enter name")
    }
    else{
        var modal = document.getElementById("alert-modal");
        document.body.removeChild(modal);
    }

}

function clickOnCells(element) {
    var grid = document.getElementById("grid");
    if( currentInformation["numOfClicks"] == 0 ){
        if( (gameInformation["levels"])[0].timer == "true" ){
            //TODO start timer
        }else{
            document.getElementById("timer").textContent = "001" ;
        }
        currentInformation["numOfClicks"]++ ;
        console.log(currentInformation['numOfClicks'])
    }else{
        if( (gameInformation["levels"])[0].timer == "false" ) {
            document.getElementById("timer").textContent = 1 + Number(document.getElementById("timer").textContent) + 1000;
            document.getElementById("timer").textContent = document.getElementById("timer").textContent.substr(1);
        }
        currentInformation["numOfClicks"]++;
        // console.log(currentInformation['numOfClicks'])
        // console.log(element.srcElement.id)
    }
}

function createModal() {
    var modal = createCustomElement("div", "modal", "alert-modal", null);

    var modal_content = createCustomElement("div", "modal-content", null, null);

    var name = createCustomElement("input", "field", "name", null);
    name.placeholder = "Enter your name";

    var OKButton = createCustomElement("button", "btn", "ok-button", "OK");
    OKButton.style.marginLeft = "10px";

    modal_content.appendChild(name);
    modal_content.appendChild(OKButton);
    modal.appendChild(modal_content);

    return modal;
}

function createWindow() {
    var window = createCustomElement("div", "window", "window", null);

    var titleBar = createCustomElement("div", "title-bar", null, null);

    var gameTitle = createCustomElement("span", null, "game-title", gameInformation["game_title"] + " - " +
        gameInformation["levels"][0].title);

    var div = document.createElement("div");
    var btnMinimize = createCustomElement("span", "btn", "btn-minimize", '-');
    var btnClose = createCustomElement("span", "btn", "btn-close", 'x');

    var top = createCustomElement("div", "top", null, null);

    var remainingMines = createCustomElement("span", "counter", "mines", "123");
    var smile = createCustomElement("span", "smile", null, null);
    smile.setAttribute("data-value", "normal");
    var timer = createCustomElement("span", "counter", "timer", "321");

    // var grid = createCustomElement("div", "grid", "grid", null);

    div.appendChild(btnMinimize);
    div.appendChild(btnClose);
    titleBar.appendChild(gameTitle);
    titleBar.appendChild(div);
    top.appendChild(remainingMines);
    top.appendChild(smile);
    top.appendChild(timer);
    window.appendChild(titleBar);
    window.appendChild(top);
    // window.appendChild(grid);

    return window;
}

function createBasicElement() {
    var modal = createModal();
    var window = createWindow();
    document.body.appendChild(modal);
    document.body.appendChild(window);
}

/**
 * This method create an element with DOM and sets class or id  or text if are not null
 * @param tagName name of element
 * @param className css class for this element
 * @param id an id for element
 * @param text a text label for element
 * @returns {Element}
 */
function createCustomElement(tagName, className, id, text) {
    var element = document.createElement(tagName);

    if (className != null) {
        element.className = className;
    }
    if (id != null) {
        element.id = id;
    }
    if (text != null) {
        var text = document.createTextNode(text);
        element.appendChild(text);
    }

    return element;
}

function processGameInformation() {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(getGameXML(), "text/xml");
    gameInformation["game_title"] = xmlDoc.getElementsByTagName("game")[0].getAttribute("title");
    gameInformation["game_id"] = xmlDoc.getElementsByTagName("game")[0].getAttribute("id");
    var levels = xmlDoc.getElementsByTagName("levels")[0].children;
    var levelArray = [];
    for (var i = 0; i < levels.length; i++) {
        levelArray[i] = {
            id: levels[i].getAttribute("id"),
            title: levels[i].getAttribute("title"),
            timer: levels[i].getAttribute("timer"),
            rows: levels[i].getElementsByTagName("rows")[0].childNodes[0].nodeValue,
            cols: levels[i].getElementsByTagName("cols")[0].childNodes[0].nodeValue,
            mines: levels[i].getElementsByTagName("mines")[0].childNodes[0].nodeValue,
            time: levels[i].getElementsByTagName("time")[0].childNodes[0].nodeValue
        }
    }
    gameInformation["levels"] = levelArray;
    console.log(gameInformation);
}

function makeXSL() {
    // This XSL Should Convert level.xml to
    // appreciate DOM elements for #grid.
    var xml = '<?xml version="1.0" encoding="UTF-8"?>'
        + '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'
        + '<xsl:template match="/">'
        + '<div class=\'grid\' id=\'grid\'>' +
        '<xsl:for-each select=\'grid/row\'>' +
        '<xsl:for-each select=\'./col\'>' +
        '<span></span>' +
        '</xsl:for-each>'+
        '</xsl:for-each>' +
        '</div>'
        + '</xsl:template>'
        + '</xsl:stylesheet>';
    return new DOMParser().parseFromString(xml, "text/xml");
}

function newGame() {
    var requestXML = '<request>' +
        '<rows>9</rows>' +
        '<cols>9</cols>' +
        '<mines>9</mines>' +
        '</request>';

    (gameInformation['levels'])[0].mines = 9 ;
    (gameInformation['levels'])[0].rows = 9 ;
    (gameInformation['levels'])[0].cols = 9 ;
    var game = getNewGame(requestXML);
    game = new DOMParser().parseFromString(game, "text/xml") ;

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(makeXSL());
    var resultDocument = xsltProcessor.transformToFragment( game , document);
    resultDocument.id = "grid";
    document.getElementById('window').appendChild(resultDocument);
    //Adds ID for cells
    var cells = document.getElementById("grid").childNodes ;
    for( var i =0 ; i < cells.length ; i++){
        cells[i].id = 'c' + i ;
    }
    //Get position of mines
    var rows = game.getElementsByTagName("row");
    for( var i = 0 ; i < rows.length ; i++){
        var cols = rows[i].getElementsByTagName("col");
        for( var j = 0 ; j < cols.length ; j++ ){
            if( cols[j].getAttribute("mine") == "true"){
                mines[(i)*cols.length + j+1] = true ;
            }
        }
    }
}
