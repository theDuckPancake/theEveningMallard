localStorage.setItem("current-page", "2026");

const year_list = ["Pre 2026", "2026"]

let current_page = localStorage.getItem("current-page");

class YearSelect extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <label for="page">Select a year:
            <select class="pg_slct" name="page" id="page">
                <option value="select">(select)</option>
                <option value="Pre 2026">Pre 2026</option>
                <option value="2026">2026</option>
            </select>
        </label>
        `;

        const year_select = document.querySelector(".pg_slct");

        year_select.addEventListener("change", (event) => {
            if (year_list.includes(event.target.value) && event.target.value != current_page) {
                commitChange(event.target.value);
            }
            else {
                year_select.value = "select";
                return;
            }
            year_select.value = "select";
        })
    }
}

class ControlButtons extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="nav_btn_row">
            <button class="prev">Prev</button>
            <button class="next" disabled>Next</button>
        </div>
        `
        const page = document.getElementById("page_title");

        const button_prev = document.querySelector(".prev");
        const button_next = document.querySelector(".next");

        let change_to;

        button_prev.addEventListener("click", (event) => {
            if (current_page == "Pre 2026") {
                window.alert("You cheeky bugger, what'd you think you're trying here, eh?")
                return;
            }
            if (current_page == "2026") {
                commitChange("Pre 2026");
            }
            else {
                commitChange(toString(parseInt(page.textContent)-1));
            }
        });

        button_next.addEventListener("click", (event) => {
            if (current_page == "2026") {
                window.alert("You cheeky bugger, what'd you think you're trying here, eh?")
                return;
            }
            if (current_page == "Pre 2026") {
                commitChange("2026");
            }
            else {
                commitChange(toString(parseInt(page.textContent)+1));
            }
        });
    }
}

function commitChange(event)  {
    const used_galleries = document.querySelectorAll("#gallery used");
    used_galleries.forEach(gallery => gallery.id = "gallery");

    const preface = document.querySelector(".desc");

    const buttons = document.querySelectorAll(".btn_drawings");
    buttons.forEach(btn => {
        btn.remove();
    })

    localStorage.setItem("current-page", event);
    current_page = localStorage.getItem("current-page");

    const button_prev = document.querySelector(".prev");
    const button_next = document.querySelector(".next");

    const heading = document.getElementById("page_title");

    switch (event) {
        case "Pre 2026":
            heading.textContent = "Pre 2026"
            preface.textContent = "There are more drawings, but for reasons that shall remain unbeknownst to you, I'm not showing them."
            displayImages("Pre 2026", 1, 1, "Pre");
            break;
        case "2026":
            heading.textContent = "2026";
            preface.textContent = "Click the images for a better view and some notes! It's pretty barren for now, but hopefully (if I stick with it), it'll slowly fill up as the year progresses."
            displayImages("2026", 1, 0, "2026")
            break;
    }

    if (heading.textContent == "Pre 2026") {
        button_prev.disabled = true;
        button_next.disabled = false;
    }
    else if (heading.textContent == "2026") {
        button_next.disabled = true;
        button_prev.disabled = false;
    }
    else {
        button_prev.disabled = false;
        button_next.disabled = false;
    }
}

customElements.define("year-select", YearSelect)
customElements.define("control-buttons", ControlButtons)