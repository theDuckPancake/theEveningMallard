/* local storage to store some settings */
if (localStorage.getItem("autoplay") === null) {
    localStorage.setItem("autoplay", "true");
}
if (localStorage.getItem("automute") === null) {
    localStorage.setItem("automute", "true");
}
if (localStorage.getItem("accessibility") === null) {
  localStorage.setItem("accessibility", "false");
}
if (localStorage.getItem("img_style") === null) {
  localStorage.setItem("img_style", "cover");
}

let vid_autoplay = localStorage.getItem("autoplay");
let automute = localStorage.getItem("automute");
let accessibility = localStorage.getItem("accessibility");
let img_style = localStorage.getItem("img_style")

let image_data = {};
fetch("../Days.json")
  .then(res => res.json())
  .then(data => {
    image_data = data;
  });

async function loadArtData() {
  const res = await fetch("art_item.json");
  const art = await res.json();
  return art; 
}

const slideshow_days = {'Day 281':2, 'Day 316':2, 'Day 526':2, 'Day 527':2, 'Day 528':2, 'Day 529':2, 'Day 530':2, 'Day 542':2, 'Day 672':3, 
  'Day 679':4, 'Day 682':2, 'Day 687':2, 'Day 698':2, 'Day 699':2, 'Day 703':4, 'Day 707':2,  'Day 713':2, 'Day 721':2, 'Day 778':3, 
  'Day 786':2, 'Day 802':2, 'Day 826':2, 'Day 833':3, 'Day 858':2, 'Day 865':2, 'Day 892':2, 'Day 893':2, 'Day 894':3, 'Day 897':2, 'Day 899':2, 
  'Day 902':2, 'Day 907':2, 'Day 914':2, 'Day 789':2, 'H-6':2, 'Day 392':2, 'Day 847':2, 'O-2':2, 'Day 87':2, 'Day 137':2, 'Day 156':2, 'Day 376':2
};

/* TODO : 
  - All the notes... ALL of them [Kill me]
  - Make comic panel for Day 913 Bonus Content [HARD]
    - Get reference images online (Rhea, Link, Seteth, Garreg Mach Monastery)
  - Contact u/HornyPhoenixWright and u/awkward_potatoess WITH VPN [EASY] */

const video_days = ['Day 118', 'Day 289', 'Day 671', 'Day 700', 'Day 729'];

const gif_days = ['Day 507', 'Day 674', 'Day 861'];

/* Key name (div.id) : [chapter number, starting number, ending number-1]*/
const chapters_st1 = {'A':[1,1,7], 'B':[2,1,15], 'C':[3,1,17], 'D':[4,1,17], 'E':[5,1,16], 'F':[6,1,10], 'G':[7,1,2], 'H':['Bonus',0,6], 'W': ['Preface',0,1]};
const chapters_st2 = {'A':[1,1,18], 'B':[2,1,18], 'C':[3,1,37], 'D':[4,1,52], 'E':[5,1,35], 'F':[6,1,4]}
/* Key name (div.id) : [start num, end num-1] */
const miscallaneous = {'U':[1,2], 'O':[1,9]}

function hamburgerToggle() {
  var x = document.getElementById("mainTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

async function displayImages(days, start, end=99, identifier="Day", space=" "){

  let art_data = {};

  if (parseInt(days) >= 2026 || days == "Pre 2026") {
    art_data = await loadArtData();
  }

  const gallery = document.getElementById("gallery");

  const selected_img = document.getElementById("selected_img");
  const overlay = document.getElementById("overlay");
  const notes = document.getElementById("notes");
  const notes_content = document.getElementById("notes_content");
  const heading = document.getElementById("day_no");
  const pub_date = document.getElementById("pub_date");
  const drawing_url = document.getElementById("link");

  let set_autoplay;

  for (let i = start; i <= start+end; i++) {
      const button = document.createElement("button");
      // button.style.width = "20%";
      button.className = "btn_drawings"
      button.style.border = "none";
      button.style.padding = "0";
      button.style.background = "none";
      button.style.cursor = "pointer";

      const img = document.createElement("img");
      img.id = `${identifier}${i}`;
      img.alt = `${identifier} ${i}`;
      if (parseInt(days) >= 2026 || days == "Pre 2026") {
        const art_item = art_data[`${identifier} ${i}`];
        img.src = `../images/${days}/${identifier}${space}${i}.png`;
        img.alt = art_item.title;
      }
      else if (!(gif_days.includes(`Day ${i}`))) {
        img.src = `../images/Day ${days}/${identifier}${space}${i}.png`;
      }
      else {
        img.src = `../images/Day ${days}/${identifier}${space}${i}.gif`;
      }
      img.style.width = "100%";
      img.className = "square";
      img.style.objectFit = img_style;
      img.loading = "lazy";
      button.appendChild(img);
      
      /* makes the images 'expandable' */
      button.addEventListener("click", () => {
        if (!(`${identifier}${space}${i}` in slideshow_days || video_days.includes(`Day ${i}`))) {
          const expImg = getImage(i, identifier);
          selected_img.appendChild(expImg);
        }
        else if (video_days.includes(`Day ${i}`)) {
          const vid = document.createElement("video");
          vid.src = `../images/Videos/Day ${i}.webm`;
          vid.id = "delete_me";
          vid.className = "vid";

          vid.addEventListener('play',  () => {
            const playPromise = vid.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          });

          vid.controls = true;
          if (vid_autoplay == "true") {
            set_autoplay = true;
          }
          else {
            set_autoplay = false;
          }
          vid.autoplay = set_autoplay;
          if (automute == "true") {
            vid.muted = true;
          }
          
          selected_img.appendChild(vid);
          vid.style.display = "block";
        }
        else {
          const slideshow = createSlideshow(i, identifier, space);
          selected_img.appendChild(slideshow);
        }

        selected_img.style.display = "flex";
        overlay.style.display = "block";

        let item = image_data[`${identifier} ${i}`];
        if (`${identifier}${space}${i}` in slideshow_days) { item = image_data[`${identifier} ${i}-1`]; };

        if (identifier == "Day") {
          heading.textContent=`Day ${i}`;
        }
        else if (identifier in chapters_st1) {
          if (identifier == "W" || identifier == "H") {
            heading.textContent=`${chapters_st1[identifier][0]} - ${i}`;
          }
          else {
            heading.textContent=`Chapter ${chapters_st1[identifier][0]} - ${i}`;
          }
        }
        else if (identifier == 'U') {
          heading.textContent = `Unused - ${i}`;
        }
        else if (identifier == 'O') {
          heading.textContent = `Other - ${i}`;
        }
        else {
          item = art_data[`${identifier} ${i}`];
          heading.textContent = item.title;
          pub_date.textContent = item.date;
        }

        if (!(item === undefined)) {
          pub_date.textContent = item.date;
          if (!(item.text === undefined)) {
            notes_content.innerHTML = item.text.join("\n\n");
          }
          else {
            notes_content.innerHTML = null;
          }
          if (item.mask === null) {
            drawing_url.textContent = `Visit Day ${i}`;
          }
          else {
            drawing_url.textContent = item.mask;
          }
          drawing_url.setAttribute("href", item.url);
        }

        notes.style.display = "block";
      });

      hide_overlay(overlay);
      hide_overlay(notes);
      hide_overlay(selected_img);

      gallery.appendChild(button);
  }

  if (days == "616-666" || days == "913" || days == "misc") {
    gallery.id += "used";
  }
}

function initialiseDIVS(days) {

  const divs = document.querySelectorAll(".gallery-div");

  if (days == "616-666") {
    divs.forEach(div => displayImages(days, chapters_st1[div.id][1], chapters_st1[div.id][2], div.id, '-'));
  }
  else if (days == "913") {
    divs.forEach(div => {
      displayImages(days, chapters_st2[div.id][1], chapters_st2[div.id][2], div.id, "-");
    })
  }
  else if (days == "misc") {
    divs.forEach(div => {
      displayImages(days, miscallaneous[div.id][0], miscallaneous[div.id][1], div.id, "-");
    })
  }
}

function page_switch() {
  const page_select = document.querySelector(".pg_slct");

  page_select.addEventListener("change", (event) => {
      switch (event.target.value) {
        case "Day 1-100":
          location.assign("1-100.html");
          break;
        case "Day 101-200":
          location.assign("101-200.html");
          break;
        case "Day 201-300":
          location.assign("201-300.html");
          break;
        case "Day 301-400":
          location.assign("301-400.html");
          break;
        case "Day 401-500":
          location.assign("401-500.html");
          break;
        case "Day 501-600":
          location.assign("501-600.html");
          break;
        case "Day 601-700":
          location.assign("601-700.html");
          break;
        case "Day 701-800":
          location.assign("701-800.html");
          break;
        case "Day 801-900":
          location.assign("801-900.html");
          break;
        case "Day 900":
          location.assign("900.html");
          break;
        case "Day 901-914":
          location.assign("901-914.html");
          break;
        case "Day 616-666":
          location.assign("616-666.html");
          break;
        case "Day 913":
          location.assign("913.html");
          break;
        case "Final Day":
          location.assign("914.html");
          break;
        case "Misc":
          location.assign("misc.html");
          break;
        default:
          break;
      };
  });
}

let slide_index = 1;

function hide_overlay(obj) {
  obj.addEventListener("click", (e) => {
    if (e.target.closest(".slide") || e.target.closest(".prev_slide") || e.target.closest(".next_slide") || e.target.closest(".vid")) return;

    overlay.style.display = "none";
    selected_img.style.display = "none";
    notes.style.display = "none";
    const grabbedElement = document.getElementById("delete_me");
    if (grabbedElement) {
      if (grabbedElement.className == "vid") {
        grabbedElement.pause();
        grabbedElement.removeAttribute("src");
        grabbedElement.load();
      }
      grabbedElement.removeAttribute("src");
      grabbedElement.remove();
      slide_index = 1;
    }
  })
}

function getImage(i, ident="Day") {
  const imgElement = document.getElementById(`${ident}${i}`);
  const imgPath = imgElement.getAttribute('src');
  const expImg = document.createElement("img");
  expImg.className = 'clicked';
  expImg.id = "delete_me";
  expImg.src = imgPath;
  expImg.style.display = "block";

  return expImg;
}

function createSlideshow(i, identifier="Day", space=" ") {
  const slideshow = document.createElement("div");
  slideshow.id = "delete_me";

  const notes_content = document.getElementById("notes_content");

  /* loads the images in a loop */
  for (let j = 1; j <= slideshow_days[`${identifier}${space}${i}`]; j++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    const slide_no = document.createElement("div");
    slide_no.id = "slide_no";
    if (j == 1) {
      var slide_img = getImage(i, identifier);
    }
    else {
      var slide_img = document.createElement("img");
      let f = `../images/Expanded/${identifier}${space}${i}-${j}.png`;
      slide_img.src = f;
    }
    slide_img.id = "slide_img";
    slide_img.className = "inner_slide";

    slide.appendChild(slide_no);
    slide.appendChild(slide_img);

    slideshow.appendChild(slide);
  }

  let slides = slideshow.querySelectorAll(".slide");
  slides[slide_index-1].style.display = "flex";

  /* adding slide control html elements */
  const prev_slide_btn = document.createElement("a");
  prev_slide_btn.className = "prev_slide";
  prev_slide_btn.onclick = function() { slide_index-=1;
    for (let k = 0; k < slides.length; k++) {
      slides[k].style.display = "none";  
    }
    if (slide_index > slides.length) { slide_index = 1 }
    if (slide_index < 1) { slide_index = slides.length }
    slides[slide_index-1].style.display = "flex";
    changeText(notes_content, slide_index, identifier, i);
  }
  prev_slide_btn.textContent = "<";

  const next_slide_btn = document.createElement("a");
  next_slide_btn.className = "next_slide";
  next_slide_btn.onclick = function() { slide_index+=1;
    for (let k = 0; k < slides.length; k++) {
      slides[k].style.display = "none";  
    }
    if (slide_index > slides.length) { slide_index = 1 }
    if (slide_index < 1) { slide_index = slides.length }
    slides[slide_index-1].style.display = "flex";
    changeText(notes_content, slide_index, identifier, i);
  }
  next_slide_btn.textContent = ">";

  slideshow.appendChild(prev_slide_btn);
  slideshow.appendChild(next_slide_btn);

  slideshow.style.display = "flex";

  return slideshow;
}

function changeText(notes_content, slide_index, identifier, i) {
  let item = image_data[`Day ${i}-${slide_index}`];

  notes_content.innerHTML = item.text.join("\n\n");
}

function enableCheck(auto, name) {
  check = document.getElementById(name);
  if (auto == "true") {
    check.textContent = "✔";
  }
  else if (auto == "false") {
    check.textContent = "✘";
  }
  else if (auto == "scale-down") {
    check.textContent = "Fit";
  }
  else if (auto == "cover") {
    check.textContent = "Cover";
  }
}

function openDropdown() {
  nav_dropdown = document.getElementById("options_dropdown");
  if (nav_dropdown.style.display == "block") {
    nav_dropdown.style.display = "none";
  }
  else {
    nav_dropdown.style.display = "block";
  }
  enableCheck(vid_autoplay, "vid_autoplay");
  enableCheck(automute, "automute");
  enableCheck(accessibility, "accessibility");
  enableCheck(img_style, "display_mode");
}

function enableAutoplay() {
  if (vid_autoplay == "true") {
    vid_autoplay = "false";
  }
  else {
    vid_autoplay = "true";
  }
  localStorage.setItem("autoplay", vid_autoplay);
  enableCheck(vid_autoplay, "vid_autoplay");
  openDropdown();
}

function enableAutomute() {
  if (automute == "true") {
    automute = "false";
  }
  else {
    automute = "true";
  }
  localStorage.setItem("automute", automute);
  enableCheck(automute, "automute");
  openDropdown();
}

function enableAccessibility() {
  if (accessibility == "false") {
    accessibility = "true";
  }
  else {
    accessibility = "false";
  }
  localStorage.setItem("accessibility", accessibility);
  changeFont('body');
  openDropdown();
}

function changeFont(element_id) {
  var doc = document.getElementById(element_id);
  if (doc.className === "body" && accessibility == "true") {
    doc.className += " accessible";
  } else {
    doc.className = "body";
  }
}

function changeImgDisplay() {
  if (img_style == "scale-down") {
    img_style = "cover";
  }
  else {
    img_style = "scale-down";
  }
  localStorage.setItem("img_style", img_style);

  drawings = document.querySelectorAll(".square");
  drawings.forEach(i => {
    i.style.objectFit = img_style;
    if (img_style == "scale-down") { i.className += " scaled"; }
    else { i.className = "square"; }
  });
  if (document.getElementById("options_dropdown").style.display == "block") { openDropdown() }
}

/* document click listener to close dropdown when clicking outside of it */
document.addEventListener("click", function(e) {
  const dropdown = document.getElementById("options_dropdown");
  const option_button = document.getElementById("opt_btn");

  if (!dropdown.contains(e.target) && !option_button.contains(e.target) && dropdown.style.display == "block") {
    openDropdown();
  }
})

/* gathering all necessary fetches into functions */
function fetchFiller(year, month, file) {
  fetch(`articles/updates/${year}/${month}/${file}.html`)
      .then(response => response.text())
      .then(data => {
          document.getElementById("article-placeholder").innerHTML = data;
      });

  fetch(`articles/daily/${year}/${month}/${file}.txt`)
      .then(response => response.text())
      .then(data => {
          document.getElementById("daily-placeholder").textContent = data;
      });
}

function fetchBlog() {
  fetch("blog.txt")
    .then(response => response.text())
    .then(data => {
      document.getElementById("blog-placeholder").textContent = data;
    })
}