const profile = document.querySelector(".profile");

profile.addEventListener("click", (e) => {
    e.stopPropagation();
    profile.classList.toggle("active");
});

document.addEventListener("click", () => {
    profile.classList.remove("active");
});

// Active Navbar Link
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", function () {
        links.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// Navbar Scroll Effect

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});