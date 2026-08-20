console.log("Search JS Loaded");

const yearButtons = document.querySelectorAll(".year-btn");

const semesterSection = document.getElementById("semester-section");
const subjectSection = document.getElementById("subject-section");
const searchSection = document.getElementById("search-section");

const semesterButtons = document.querySelector(".semester-buttons");
const subjectButtons = document.querySelector(".subject-buttons");

const subjects = {

    FY: {
        1: [
            "Data Structure & Architecture",
            "DBMS (MySQL)",
            "Digital Marketing",
            "Communication Skills"
        ],
        2: [
            "Data Structures",
            "Calculus",
            "OOP using C++",
            "Professional Ethics",
            "Business Logic"
        ]
    },

    SY: {
        3: [
            "Web Programming",
            "Java",
            "Combinatorics & Graph Theory",
            "Personal Finance",
            "Marathi",
            "Hindi"
        ],
        4: [
            "Linear Algebra",
            "Advanced Java",
            "Principles of Marketing",
            "Physical Computing & IoT",
            "Fundamentals of Photography",
            "Fundamentals of Entrepreneurship"
        ]
    },

    TY: {
        5: [
            "Artificial Intelligence",
            "Linux Server Administration",
            "Information & Network Security",
            "Web Services",
            "Software Testing & Quality Assurance"
        ],
        6: [
            "Wireless Sensor Network & Mobile Communication",
            "Cloud Computing",
            "Advanced Database Systems",
            "Data Science",
            "Ethical Hacking"
        ]
    }

};

let selectedYear = "";
let selectedSemester = "";
let selectedSubject = "";

yearButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".year-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedYear = button.dataset.year;

        semesterSection.classList.remove("hidden");
        subjectSection.classList.add("hidden");
        searchSection.classList.add("hidden");

        semesterButtons.innerHTML = "";

        let semesters = [];

        if(selectedYear === "FY") semesters = [1,2];
        if(selectedYear === "SY") semesters = [3,4];
        if(selectedYear === "TY") semesters = [5,6];

        semesters.forEach(sem=>{

            semesterButtons.innerHTML +=
            `<button class="semester-btn">${sem}</button>`;

        });

        const semBtns = document.querySelectorAll(".semester-btn");

        semBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                document.querySelectorAll(".semester-btn")
                    .forEach(b => b.classList.remove("active"));

                btn.classList.add("active");

                selectedSemester = btn.textContent;

                subjectSection.classList.remove("hidden");
                searchSection.classList.add("hidden");

                subjectButtons.innerHTML = "";

                subjects[selectedYear][selectedSemester].forEach(subject => {

                    subjectButtons.innerHTML += `
                        <button class="subject-btn">${subject}</button>
                    `;

                });
                const subBtns = document.querySelectorAll(".subject-btn");

                subBtns.forEach(btn => {

                    btn.addEventListener("click", () => {

                        document.querySelectorAll(".subject-btn")
                            .forEach(b => b.classList.remove("active"));

                        btn.classList.add("active");

                        selectedSubject = btn.textContent;

                        searchSection.classList.remove("hidden");

                    });

                });

            });

        });

    });

});

/* ================= SEARCH BAR LOGIC ================= */

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("topic-search");
const searchReset = document.getElementById("search-reset");
const searchGo = document.getElementById("search-go");
const searchContainer = document.getElementById("poda");


/* =========================
   EXPAND SEARCH
========================= */

function expandSearch() {

    searchForm.classList.add("expanded");

    setTimeout(() => {
        searchInput.focus();
    }, 50);
}


/* =========================
   UPDATE SEARCH STATE
========================= */

function updateSearchState() {

    const hasText = searchInput.value.trim().length > 0;

    searchForm.classList.toggle("has-text", hasText);

    searchContainer.classList.toggle("has-search", hasText);
}


/* =========================
   CLICK SEARCH ICON
========================= */

searchForm.addEventListener("click", () => {

    if (!searchForm.classList.contains("expanded")) {
        expandSearch();
    }

});


/* =========================
   INPUT
========================= */

searchInput.addEventListener("input", () => {

    updateSearchState();

});


/* =========================
   CROSS BUTTON
========================= */

searchReset.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    /* Clear input */
    searchInput.value = "";

    /* Remove states */
    searchForm.classList.remove("has-text");
    searchContainer.classList.remove("has-search");

    /* Collapse */
    searchForm.classList.remove("expanded");

    /* Remove focus */
    searchInput.blur();

});


/* =========================
   GO ARROW
========================= */

searchGo.addEventListener("click", (event) => {

    event.preventDefault();

    performSearch();

});


/* =========================
   ENTER KEY
========================= */

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    performSearch();

});


/* =========================
   SEARCH FUNCTION
========================= */

function performSearch() {

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    console.log("Searching for:", query);

    /*
        Your actual PYQ search logic
        will go here later.
    */

}