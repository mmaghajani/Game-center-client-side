// Test Funcs
// See Inspect Element's Console Log Output

var gameInformation = [];

processGameInformation();

createBasicElement();

newGame();

function createModal() {
    var modal = createCustomElement("div", "modal", "alert-modal", null);

    var modal_content = createCustomElement("div", "modal-content", null, null);

    var name = createCustomElement("input", "field", "name", null);
    name.placeholder = "Enter your name";

    var OKButton = createCustomElement("button", "btn", null, "OK");
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

    var counter1 = createCustomElement("span", "counter", null, "123");
    var smile = createCustomElement("span", "smile", null, null);
    smile.setAttribute("data-value", "normal");
    var counter2 = createCustomElement("span", "counter", null, "321");

    // var grid = createCustomElement("div", "grid", "grid", null);

    div.appendChild(btnMinimize);
    div.appendChild(btnClose);
    titleBar.appendChild(gameTitle);
    titleBar.appendChild(div);
    top.appendChild(counter1);
    top.appendChild(smile);
    top.appendChild(counter2);
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
}

function makeXSL() {
    // This XSL Should Convert level.xml to
    // appreciate DOM elements for #grid.
    var xml = '<?xml version="1.0" encoding="UTF-8"?>'
        + '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'
        + '<xsl:template match="/">'
        + '<div class=\'grid\'>' +
        '<xsl:for-each select=\'grid/row\'>' +
        '<xsl:for-each select=\'./col\'>' +
        '<span class=\'active\'></span>' +
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

    var game = getNewGame(requestXML);

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(makeXSL());
    var resultDocument = xsltProcessor.transformToFragment(new DOMParser().parseFromString(game, "text/xml"), document);
    document.getElementById('window').appendChild(resultDocument);
}
