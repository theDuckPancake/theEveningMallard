class LinksBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="floor" id="floor">
            <a href="https://www.reddit.com/user/theDuckPancake"><button class="btn reddit">
                <picture>
                    <source srcset="https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png" media="(max-width: 768px)">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Reddit_logo.png" class="btn_img" alt="Reddit">
                </picture>
            </button></a>
            <a href="https://www.buymeacoffee.com/theDuckPancake"><button class="btn coffee">
                <picture>
                    <source srcset="https://meta-q.cdn.bubble.io/f1717430248197x973206105055277800/buymeacoffee.png" media="(max-width: 768px)">
                    <img src="https://adamharkus.b-cdn.net/wp-content/uploads/2020/11/BMC-logowordmark-Black-compress.png" class="btn_img" alt="Buy me a Coffee">
                </picture>
            </button></a>
            <a href="mailto:theduckpancake@gmail.com"><button class="btn gmail">
                <picture>
                    <source srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/3840px-Gmail_icon_%282020%29.svg.png" media="(max-width: 768px)">
                    <img src="https://brandlogos.net/wp-content/uploads/2025/04/gmail-logo_brandlogos.net_eqenr.png" class="btn_img">
                </picture>
            </button></a>
            <a href="https://www.instagram.com/tdp_thepancakecut/"><button class="btn insta">
                <picture>
                    <source srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/960px-Instagram_logo_2022.svg.png" media="(max-width: 768px)">
                    <img src="https://www.evmux.com/blog/wp-content/uploads/2023/12/instagram-copy-e1702584672389.png" class="btn_img">
                </picture>
            </button></a>
        </div>
        `;
    }
}

class FooterRights extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<footer>©TheEveningMallard.com 2026. All Rights Reserved.</footer>`
    }
}

customElements.define("links-bar", LinksBar);
customElements.define("foot-c", FooterRights);