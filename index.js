let old_theme = JSON.parse(localStorage.getItem("Dark_mode"));
let old_cols = JSON.parse(localStorage.getItem("Cols"));
let dark_mode = 0;
let change_cols = 0;
let dark_mode_button = document.getElementById("dark_mode_button");
let arrange_button = document.getElementById("arrange_button");
let create_button = document.getElementById("create_button");
let setting_button = document.getElementById("settings_button");
arrange_button.value = old_cols === null ? 1 : old_cols;
arrange_button.innerText = `Cols ${arrange_button.value}`;
let colours2 = ["#00a8ff", "#9c88ff", "#fbc531", "#4cd137", "#487eb0", "#0097e6",
    "#8c7ae6", "#e1b12c", "#44bd32", "#40739e", "#e84118", "#7f8fa6", "#c23616", "#718093", "#6a89cc", "#82ccdd",
    "#f6b93b", "#e55039", "#4a69bd", "#60a3bc", "#78e08f", "#fa983a", "#eb2f06", "#3c6382", "#38ada9", "#e58e26",
    "#b71540", "#079992", "#ff7f50", "#ff6b81", "#57606f", "#ffa502", "#ff6348", "#ff4757", "#747d8c", "#7bed9f",
    "#70a1ff", "#5352ed", "#2ed573", "#1e90ff", "#3742fa", "#FFC312", "#C4E538", "#12CBC4", "#FDA7DF", "#ED4C67",
    "#F79F1F", "#A3CB38", "#1289A7", "#D980FA", "#B53471", "#EE5A24", "#009432", "#9980FA", "#833471", "#EA2027",
    "#5758BB", "#FC427B", "#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#CAD3C8", "#F97F51", "#1B9CFC", "#58B19F",
    "#9AECDB", "#FD7272", "#D6A2E8", "#FC427B", "#BDC581", "#cd84f1", "#ff4d4d", "#ffaf40", "#c56cf0", "#ffb8b8",
    "#ff3838", "#ff9f1a", "#32ff7e", "#18dcff", "#7d5fff", "#3ae374", "#67e6dc", "#17c0eb", "#7158e2"]
let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let old_notes = JSON.parse(localStorage.getItem("Notes"));
if (old_notes) {
    for (let old_note of old_notes) {
        let note_div = document.createElement("div");
        note_div.className = "note_box";
        let note_title_time_div = document.createElement("div");
        note_title_time_div.classList = "note_title_time_div";
        let note_title = document.createElement("h3");
        note_title.className = "note_titles";
        let note = document.createElement("p");
        note.className = "notes";
        let date_time_field = document.createElement('p');
        date_time_field.className = "date_time_fields";
        note_title_time_div.appendChild(note_title);
        note_title_time_div.appendChild(date_time_field);
        note_div.appendChild(note_title_time_div);
        note_div.appendChild(note);
        note_div.addEventListener("click", () => { view(old_note) })
        note_title.innerText = old_note.note_title;
        date_time_field.innerText = old_note.time_string;
        note.innerText = old_note.note;
        old_note.htmlelement = note_div;
    }
}
let notes_array = old_notes ? old_notes : [];
renderer(notes_array);
if (old_theme !== null) {
    if (old_theme === 1) {
        Dark_mode()
    }
}
function Dark_mode() {
    dark_mode = Number(!dark_mode);
    dark_mode ? dark_mode_button.innerHTML = "Light mode" : dark_mode_button.innerHTML = "Dark mode";
    dark_mode ? document.body.style.backgroundColor = "rgb(130,130,130)" : document.body.style.backgroundColor = "#ECECEC";
    dark_mode ? document.getElementById("note_container").style.backgroundColor = "rgb(130,130,130)" : document.getElementById("note_container").style.backgroundColor = " #ECECEC";
    dark_mode ? document.getElementById("page_title").style.backgroundColor = "rgb(130,130,130)" : document.getElementById("page_title").style.backgroundColor = "#ECECEC";
    dark_mode ? document.getElementById("page_title_1").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("page_title_1").style.backgroundColor = "#30a8dc";
    dark_mode ? document.getElementById("page_title_2").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("page_title_2").style.backgroundColor = "#e84a5f";
    dark_mode ? document.getElementById("page_title_3").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("page_title_3").style.backgroundColor = "#805ad5";
    dark_mode ? document.getElementById("page_title_4").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("page_title_4").style.backgroundColor = "#2ac78a";
    dark_mode ? document.getElementById("page_title_5").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("page_title_5").style.backgroundColor = "#ff5e3a";
    dark_mode ? create_button.style.backgroundColor = "rgb(30,30,30)" : create_button.style.backgroundColor = "#525FE1";
    dark_mode ? arrange_button.style.backgroundColor = "rgb(30,30,30)" : arrange_button.style.backgroundColor = "#DC143C";
    dark_mode ? dark_mode_button.style.backgroundColor = "rgb(30,30,30)" : dark_mode_button.style.backgroundColor = "#252525";
    dark_mode ? document.getElementById("erase_button").style.backgroundColor = "rgb(30,30,30)" : document.getElementById("erase_button").style.backgroundColor = "navy";
    dark_mode ? setting_button.style.backgroundColor = "white" : setting_button.style.backgroundColor = "white";
    if (setting_button.value === "true") {
        dark_mode ? setting_button.style.fill = "rgb(30,30,30)" : setting_button.style.fill = "#fbc531";
        dark_mode ? setting_button.style.backgroundColor = "white" : setting_button.style.backgroundColor = "white";
    }
    else {
        dark_mode ? setting_button.style.fill = "white" : setting_button.style.fill = "#fbc531";
        dark_mode ? setting_button.style.backgroundColor = "rgb(30,30,30)" : setting_button.style.backgroundColor = "white";
    }
    localStorage.setItem("Dark_mode", JSON.stringify(dark_mode));
    renderer(notes_array);
}
function arrange() {
    let columns = Math.min(Math.floor(window.innerWidth / 150), 6);
    let cols_button = document.getElementById("arrange_button");
    if (change_cols === 1) {
        if (cols_button.value < columns) {
            cols_button.value++;
        }
        else {
            cols_button.value = 1;
        }
        cols_button.innerHTML = `Cols ${cols_button.value}`;
        change_cols = 0;
    }
    let a = Math.round(100 / cols_button.value) - 1;
    let cols = "";
    for (let i = 0; i < (cols_button.value); i++) {
        cols = cols + String(a) + "% ";
    }
    document.getElementById("note_container").style.gridTemplateColumns = cols;
    localStorage.setItem("Cols", JSON.stringify(cols_button.value));
}

function create_note() {
    if (setting_button.value === "true") {
        settings();
    }
    let color1 = colours2[Math.floor(Math.random() * colours2.length)];
    let note_object = { "note_title": "", "note": "", "color1": color1 };
    popup(note_object)
}
function popup(note_object, view) {
    let box = document.createElement('div');
    box.id = "popup_box";
    let title_input = document.createElement('input');
    title_input.type = "text";
    title_input.autocomplete = "off";
    title_input.placeholder = "Title";
    title_input.id = "title_input";
    dark_mode ? title_input.style.backgroundColor = "rgb(30,30,30)" : title_input.style.backgroundColor = note_object.color1;
    title_input.value = note_object.note_title;
    let text_input = document.createElement('textarea');
    text_input.id = "text_input";
    text_input.rows = "15";
    window.innerWidth > 500 ? text_input.cols = "60" : text_input.cols = "30";
    text_input.placeholder = "notes"
    text_input.value = note_object.note;
    text_input.autocomplete = "off";
    let buttons = document.createElement("div");
    buttons.id = "popup_buttons";
    let delete_button = document.createElement('button');
    delete_button.id = "delete_button";
    delete_button.innerText = "Delete";
    dark_mode ? delete_button.style.backgroundColor = "rgb(30,30,30)" : delete_button.style.backgroundColor = "rgb(30,30,30)";
    delete_button.addEventListener("click", () => { deleter(note_object) });
    let close_button = document.createElement('button');
    close_button.id = "close_button";
    close_button.style.backgroundColor = title_input.style.backgroundColor;
    close_button.innerText = "Close";
    close_button.addEventListener("click", close_view)
    buttons.appendChild(close_button);
    view ? title_input.addEventListener("click", () => { editing(), edit(note_object) }) : 0;
    view ? text_input.addEventListener("click", () => { editing(), edit(note_object) }) : 0;
    view ? 0 : editing();
    buttons.appendChild(delete_button);
    box.appendChild(title_input);
    box.appendChild(text_input);
    box.appendChild(buttons);
    setTimeout(() => {
        document.getElementById('blur').style.visibility = "visible";
        document.body.appendChild(box);
        box.style.left = `${(window.innerWidth - box.clientWidth) / 2}px`;
    }, 70)
    function save_note_obj() {
        save(note_object);
    }
    function editing() {
        if (!document.getElementById("save_button")) {
            let save_button = document.createElement('button');
            save_button.id = "save_button";
            save_button.style.backgroundColor = title_input.style.backgroundColor;
            save_button.innerText = "Save";
            save_button.addEventListener("click", save_note_obj);
            buttons.appendChild(save_button);
            close_button.remove();
            delete_button.remove();
            buttons.appendChild(delete_button);
            title_input.removeEventListener("click", () => { editing(), edit(note_object) })
            text_input.removeEventListener("click", () => { editing(), edit(note_object) });
        }
    }
}
function save(note_object) {
    if (document.getElementById('title_input').value === "" && document.getElementById('text_input').value === "") {
        empty_note_alert();
        deleter(note_object);
    }
    else {
        let time = new Date();
        note_object.time = time;
        let note_div = document.createElement("div");
        note_div.className = "note_box";
        let note_title_time_div = document.createElement("div");
        note_title_time_div.classList = "note_title_time_div";
        let note_title = document.createElement("h3");
        note_title.className = "note_titles";
        let note = document.createElement("p");
        note.className = "notes";
        let date_time_field = document.createElement('p');
        date_time_field.className = "date_time_fields";
        note_title_time_div.appendChild(note_title);
        note_title_time_div.appendChild(date_time_field);
        note_div.appendChild(note_title_time_div);
        note_div.appendChild(note);
        note_div.addEventListener("click", () => { view(note_object) })
        note_title.innerText = note_object.note_title = document.getElementById('title_input').value;
        date_time_field.innerText = note_object.time_string = `${note_object.time.getDate()} ${Months[note_object.time.getMonth()]} ${note_object.time.getHours() > 12 ? (-12 + note_object.time.getHours()) : note_object.time.getHours()}:${note_object.time.getMinutes()} `
        note.innerText = note_object.note = document.getElementById('text_input').value;
        document.body.removeChild(document.getElementById('popup_box'));
        note_object.htmlelement = note_div;
        notes_array.push(note_object);
        renderer(notes_array);
        document.getElementById('blur').style.visibility = "hidden";
    }
}
function view(note_object) {
    let view = 1;
    popup(note_object, view);
}
function close_view() {
    document.getElementById('blur').style.visibility = "hidden"; document.getElementById("popup_box").remove();
}
function deleter(note_object) {
    if (notes_array.length === 1) { delete localStorage.Notes };
    if (notes_array.indexOf(note_object) === -1) {
        document.getElementById('popup_box').remove();
        document.getElementById('blur').style.visibility = "hidden";
        renderer(notes_array);
    }
    else {
        let arr2 = notes_array.splice(notes_array.indexOf(note_object) + 1);
        notes_array.pop()
        notes_array = [...notes_array, ...arr2];
        document.body.removeChild(document.getElementById('popup_box'));
        renderer(notes_array);
        document.getElementById('blur').style.visibility = "hidden";
    }
}
function renderer(notes_array) {
    if (notes_array.length === 0) {
        delete localStorage.Notes; document.body.removeChild(document.getElementById("note_container")); let note_container = document.createElement('div');
        if (notes_array.length === 1) { arrange() };
        note_container.id = "note_container";
        document.body.appendChild(note_container); return 0
    };
    document.body.removeChild(document.getElementById("note_container"));
    let note_container = document.createElement('div');
    note_container.id = "note_container";
    document.body.appendChild(note_container);
    arrange();
    for (let i = (notes_array.length - 1); i >= 0; i--) {
        notes_array[i].htmlelement.h3;
        dark_mode ? notes_array[i].htmlelement.style.backgroundColor = ("rgb(30,30,30)") : notes_array[i].htmlelement.style.backgroundColor = (notes_array[i].color1);
        document.getElementById('note_container').appendChild(notes_array[i].htmlelement);
    }
    for (let i of document.getElementsByClassName('notes')) {
        i.style.color = "black";
    }
    scroll_shadow();
    localStorage.setItem("Notes", JSON.stringify(notes_array));
}
function edit(note_object) {
    if (setting_button.value === "true") {
        settings();
    }
    if (notes_array.indexOf(note_object) !== -1) {
        let arr2 = notes_array.splice(notes_array.indexOf(note_object) + 1);
        notes_array.pop()
        notes_array = [...notes_array, ...arr2];
    }
}
function scroll_shadow() {
    for (let i of document.getElementsByClassName("notes")) {
        if (i.scrollHeight > i.clientHeight) {
            i.style.boxShadow = "0 0 10px 0px #444444 inset";
        }
    }
}
function settings() {
    if (setting_button.value === "false") {
        setting_button.style.backgroundColor = "white";
        dark_mode ? setting_button.style.fill = "rgb(30,30,30)" : setting_button.style.fill = "#fbc531";
        dark_mode_button.style.display = "inline";
        arrange_button.style.display = "inline";
        document.getElementById("erase_button").style.display = "inline";
        setting_button.value = "true";
    }
    else {
        dark_mode_button.style.display = "none";
        arrange_button.style.display = "none";
        document.getElementById("erase_button").style.display = "none";
        setting_button.value = "false";
        dark_mode ? setting_button.style.backgroundColor = "rgb(30,30,30)" : setting_button.style.backgroundColor = "#fbc531";
        setting_button.style.fill = "white";
    }
}
function empty_note_alert() {
    setTimeout(() => {
        document.getElementById('blur').style.visibility = "visible";
    }, 0)
    let alert = document.createElement('p');
    alert.innerText = "Empty note discarded";
    alert.style = "width:fit-content;height:fit-content;padding:10px;border:2px solid white;box-shadow:0px 2px 2px black;border-radius:5px;position:fixed"
    dark_mode ? alert.style.backgroundColor = "rgb(30,30,30)" : alert.style.backgroundColor = "red";
    document.body.appendChild(alert);
    alert.style.left = `${(window.innerWidth - alert.clientWidth) / 2}px`;
    alert.style.top = `${(window.innerHeight - alert.clientHeight) / 3}px`;
    alert.style.zIndex = "3"
    setTimeout(() => {
        alert.remove();
        document.getElementById('blur').style.visibility = "hidden";
    }, 600)
}