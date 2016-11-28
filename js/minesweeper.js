// Test Funcs
// See Inspect Element's Console Log Output

var gameInformation = [];

processGameInformation();

createBasicElement();

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
    var window = createCustomElement("div", "window", null, null);

    var titleBar = createCustomElement("div", "title-bar", null, null);

    var gameTitle = createCustomElement("span", null, "game-title", "Minesweeper Online - " +
        gameInformation["game-title"]);

    var div = document.createElement("div");
    var btnMinimize = createCustomElement("span", "btn", "btn-minimize", '-');
    var btnClose = createCustomElement("span", "btn", "btn-close", 'x');

    var top = createCustomElement("div", "top", null, null);

    var counter1 = createCustomElement("span", "counter", null, "123");
    var smile = createCustomElement("span", "smile", null, null);
    smile.setAttribute("data-value", "normal");
    var counter2 = createCustomElement("span", "counter", null, "321");

    div.appendChild(btnMinimize);
    div.appendChild(btnClose);
    titleBar.appendChild(gameTitle);
    titleBar.appendChild(div);
    top.appendChild(counter1);
    top.appendChild(smile);
    top.appendChild(counter2);
    window.appendChild(titleBar);
    window.appendChild(top);

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
    gameInformation["game_title"] = xmlDoc.getElementsByTagName("game")[0].title;
    gameInformation["game_id"] = xmlDoc.getElementsByTagName("game")[0].id;
    var levels = xmlDoc.getElementsByTagName("levels")[0].children;
    for (var i = 0; i < levels.length; i++) {
        gameInformation["levels"][i] = {
            id: levels[i].id,
            title: levels[i].title,
            timer: levels[i].timer,
            rows: levels[i].children[0],
            cols: levels[i].children[1],
            mines: levels[i].children[2],
            time: levels[i].children[3]
        }
    }
}

getNewGame('<request>' +
    '<rows>3</rows>' +
    '<cols>3</cols>' +
    '<mines>3</mines>' +
    '</request>');
