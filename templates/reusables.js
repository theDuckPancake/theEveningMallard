class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class = "topnav" id = "mainTopnav">
            <a href="../../index.html" id='index' class="main"><img src="../../art/images/2026/2026 1.png" class="logo" alt="The Evening Mallard"><div id="logo_text">The Evening Mallard</div></a>
            <div class="other_pages">
                <a href="../../about.html" id='about'>About</a>
                <a href="../../art/files/art.html" id='Art'>Art</a>
                <a href ="../../DBUTOTK/pages/1-100.html" id="DBUBOTW2">DBUBOTW2</a>
                <a class="disabled">Coming Soon</a>
                <a href="../../blog.html" id='blog'>Blog</a>
                <div id='options' class="dropdown_div">
                    <div id="opt_btn" class="dropdown" onclick="openDropdown()">Options</div>
                    <div id="options_dropdown" class="dropdown_contents">
                        <a onclick="enableAutoplay()">Enable Autoplay<div id="vid_autoplay" class="check">T</div></a>
                        <a onclick="enableAutomute()">Enable Automute<div id="automute" class="check">T</div></a>
                        <a onclick="enableAccessibility()">Accessible Mode<div id="accessibility" class="check">F</div></a>
                        <a onclick="changeImgDisplay()">Image Style: <div id="display_mode" class="check">F</div></a>
                    </div>
                </div>
            </div>
            <a href="#toggle" class="icon" onclick="hamburgerToggle()">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <i class="fa fa-bars"></i>
            </a>
        </div>
        `;
    }
}

class ImgNotes extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="notes">
            <h2 id="day_no" class="pic_note"></h2>
            <i><h4 id="pub_date" class="pic_note"></h4></i>
            <div id="notes_content" class="pic_note"></div>
            <br>
            <a id="link" href="#" class="highlight"></a>
        </div>
        `
    }
}

class PageSelect extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <label for="page">Select a page:
            <select class="pg_slct" name="page" id="page" oninput="page_switch()">
                <option value="select">(select)</option>
                <option value="Day 1-100">Days 1-100</option>
                <option value="Day 101-200">Days 101-200</option>
                <option value="Day 201-300">Days 201-300</option>
                <option value="Day 301-400">Days 301-400</option>
                <option value="Day 401-500">Days 401-500</option>
                <option value="Day 501-600">Days 501-600</option>
                <option value="Day 601-700">Days 601-615/667-700</option>
                <option value="Day 616-666">Days 616-666 (Story 1)</option>
                <option value="Day 701-800">Days 701-800</option>
                <option value="Day 801-900">Days 801-900</option>
                <option value="Day 900">Day 900 (High Quality)</option>
                <option value="Day 901-914">Days 901-914</option>
                <option value="Day 913">Day 913 (Story 2)</option>
                <option value="Final Day">Final Day (High Quality)</option>
                <option value="Misc">Miscallaneous Drawings</option>
            </select>
        </label>
        `
    }
}

customElements.define("site-navbar", SiteNavbar);
customElements.define("img-notes", ImgNotes);
customElements.define("page-select", PageSelect);