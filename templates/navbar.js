class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class = "topnav" id = "mainTopnav">
            <a href="index.html" id='index' class="main"><img src="art/images/2026/2026 1.png" class="logo" alt="The Evening Mallard"><div id="logo_text">The Evening Mallard</div></a>
            <div class="other_pages">
                <a href="about.html" id='about'>About</a>
                <a href="art/art.html" id='art'>Art</a>
                <a href ="DBUTOTK/pages/1-100.html" id="DBUBOTW2">DBUBOTW2</a>
                <a class="disabled">Coming Soon</a>
                <a href="blog.html" id='blog'>Blog</a>
                <div id='options' class="dropdown_div">
                    <div id="opt_btn" class="dropdown" onclick="openDropdown()">Options</div>
                    <div id="options_dropdown" class="dropdown_contents">
                        <a onclick="enableAutoplay()">Enable Autoplay<div id="vid_autoplay" class="check">T</div></a>
                        <a onclick="enableAutomute()">Enable Automute<div id="automute" class="check">T</div></a>
                        <a onclick="enableAccessibility()">Accessible Mode<div id="accessibility" class="check">F</div></a>
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

customElements.define("site-navbar", SiteNavbar);