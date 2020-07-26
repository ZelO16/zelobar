//Dongte特效
var tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
tl.set(".word.in, .word.too, .word.deep", { opacity: 0 });

const bgColor = "hsl(190, 100%, 75%)";

// Lines
tl.fromTo(
  ".bottom-side",
  {
    width: 0,
    background: bgColor,
    immediateRender: false,
    autoRound: false
  },
  {
    duration: 1.7,
    width: "100%",
    background: bgColor
  }
);
tl.fromTo(
  ".left-side",
  {
    height: 0,
    background: bgColor,
    immediateRender: false,
    autoRound: false
  },
  {
    duration: 1.7,
    height: "100%",
    background: bgColor,
    delay: -1.7
  }
);

// Dong
tl.fromTo(
  ".text1 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: 0.6 }
);
tl.fromTo(
  ".text2 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.3 }
);
tl.fromTo(
  ".text3 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text4 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text5 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text6 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text7 .word.dong",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);

// Tea
tl.fromTo(
  ".text1 .word.tea", 
  { opacity: 0 }, 
  { duration: 0.5, opacity: 1 });
tl.fromTo(
  ".text2 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.3 }
);
tl.fromTo(
  ".text3 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text4 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text5 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text6 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
tl.fromTo(
  ".text7 .word.tea",
  { opacity: 0 },
  { duration: 1.3, opacity: 1, delay: -1.2 }
);
// Rotate
tl.to(".text", 1, { transform: "rotate(-20deg) skew(0deg, 0deg)", delay: 0.5 });

// Fade Out
tl.to(".text1, .text2", 0.6, { opacity: 0, delay: 1.2 });
tl.to(".text3", 0.6, { opacity: 0, delay: -0.5 });
tl.to(".text4", 0.6, { opacity: 0, delay: -0.5 });
tl.to(".text5", 0.6, { opacity: 0, delay: -0.5 });
tl.to(".text6", 0.6, { opacity: 0, delay: -0.5 });
tl.to(".text7", 0.6, { opacity: 0, delay: -0.5 });


//選單特效
console.clear();

const listEls = Array.from(document.querySelectorAll("li"));
const button = document.querySelector(".nav-button");
const links = Array.from(document.querySelectorAll("li a"));
const listItems = Array.from(document.querySelectorAll("li"));

let menuActive = false;
let mousePos = { x: 0, y: 0 };

links.forEach(item => {
	innerText = item.innerText;
	item.setAttribute("data-text", innerText);
});

button.addEventListener("click", () => {
	menuActive = !menuActive;
	button.classList.toggle("close");
	animateOpenCloseMenu();
});
function animateOpenCloseMenu() {
	let navBG = document.querySelector(".nav__background");
	let tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.45 } });
	if (menuActive) {
		tl.fromTo(
			navBG,
			{ scaleY: 0, transformOrigin: "bottom" },
			{ scaleY: 1, transformOrigin: "top" }
		);
		tl.fromTo(links, { opacity: 0, top: "100%" }, { opacity: 1, top: "0%", stagger: 0.05, delay: -0.35 });
	} else {
		tl.fromTo(links, { opacity: 1, top: "0%" }, { opacity: 0, top: "100%", stagger: -0.05 });
		tl.fromTo(
			navBG,
			{ scaleY: 1, transformOrigin: "top" },
			{ scaleY: 0, transformOrigin: "bottom", delay: -0.35 }
		);
	}
}
animateOpenCloseMenu();

const options = {
	distanceToMove: 15,
};
function updatePos(el) {
	let dist = calculateDistance(el).distance;
	let angle = calculateDistance(el).angle;
	if (dist < 80) {
		options.distanceToMove = dist;
		gsap.to(el, 0.3, {
			x: (Math.cos(angle) * options.distanceToMove) / 2,
			y: (Math.sin(angle) * options.distanceToMove) / 12,
		});
	} else {
		gsap.to(el, 0.3, {
			x: 0,
			y: 0,
		});
	}
}

function calculateDistance(el) {
	let dx = mousePos.x - (el.getBoundingClientRect().left + el.offsetWidth / 2);
	let dy = mousePos.y - (el.getBoundingClientRect().top + el.offsetHeight / 2);
	let angle = Math.atan2(dy, dx);
	let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	return { distance, angle };
}

document.body.addEventListener("mousemove", e => {
	mousePos.x = e.x;
	mousePos.y = e.y;
	if (menuActive) {
		listEls.forEach(listEl => {
			updatePos(listEl);
		});
	}
});
