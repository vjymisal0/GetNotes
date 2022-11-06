// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function () {
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    const title = addTitle.value;
    const description = addTxt.value;

    if (title === "" && description === "")
        return alert("Please add a title and a description");
    else if (title === "") return alert("Please add a title");
    else if (description === "") return alert("Please add a description");

    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // addTxt.value = "";
    // addTitle.value = "";
    //   console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="note">
                <div class="left">
                    <p class="note-counter">${index + 1}</p>
                </div>
                <div class="content">
                    <h3 class="note-title">${element.title}</h3>
                    <p class="note-text">${element.text}</p>
                </div>
                <div class="actions">
                    <button
                        id="${index}"
                        onclick="deleteNote(this.id)"
                        class="note-btn"
                    >
                        Delete Note
                    </button>
                    <button
                        id="${index}"
                        onclick="editNote(this.id)"
                        class="note-btn edit-btn"
                    >
                        Edit Note
                    </button>
                </div>
            </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p class='default-text'>'No Notes Yet! Add a note using the form above.</p>`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel) {
        let notes = localStorage.getItem("notes");
        // if (notes == null) {
        //     notesObj = [];
        // } else {
        //     notesObj = JSON.parse(notes);
        // }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form before editing a note");
    }

    let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    const note = notesObj[index];
    addTitle.value = note.title;
    addTxt.value = note.text;

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();

window.onscroll = function () {
    myFunction();
};

var navbar = document.querySelector("section");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}
