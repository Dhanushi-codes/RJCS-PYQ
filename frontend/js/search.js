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

    });

});

    });

});