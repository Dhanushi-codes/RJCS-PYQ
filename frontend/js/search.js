console.log("Search JS Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const resultsContainer =
        document.getElementById("pyq-results");

    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }

});

/* =========================
   YEAR / SEMESTER / SUBJECT
========================= */

const yearButtons = document.querySelectorAll(".year-btn");

const semesterSection =
    document.getElementById("semester-section");

const subjectSection =
    document.getElementById("subject-section");

const searchSection =
    document.getElementById("search-section");

const semesterButtons =
    document.querySelector(".semester-buttons");

const subjectButtons =
    document.querySelector(".subject-buttons");

const unavailableSubjects = [
    "Hindi",
    "Marathi"
];



let selectedYear = "";
let selectedSemester = "";
let selectedSubject = "";


/* =========================
   YEAR BUTTONS
========================= */

yearButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".year-btn")
            .forEach(btn =>
                btn.classList.remove("active")
            );


        button.classList.add("active");


        selectedYear =
            button.dataset.year;


        /* =========================
           SHOW SEMESTER
        ========================= */

        semesterSection.classList.remove("hidden");

        subjectSection.classList.add("hidden");

        searchSection.classList.add("hidden");


        /* Reset selections */

        selectedSemester = "";
        selectedSubject = "";


        /* Clear old semesters */

        semesterButtons.innerHTML = "";


        let semesters = [];


        if (selectedYear === "FY") {

            semesters = [1, 2];

        }


        if (selectedYear === "SY") {

            semesters = [3, 4];

        }


        if (selectedYear === "TY") {

            semesters = [5, 6];

        }


        /* =========================
           CREATE SEMESTER BUTTONS
        ========================= */

        semesters.forEach(sem => {

            semesterButtons.innerHTML += `

                <button
                    type="button"
                    class="semester-btn"
                    data-semester="${sem}">
                    ${sem}
                </button>

            `;

        });


        /* =========================
           SEMESTER CLICK
        ========================= */

        const semBtns =
            document.querySelectorAll(".semester-btn");


        semBtns.forEach(btn => {

            btn.addEventListener("click", () => {


                semBtns.forEach(b =>
                    b.classList.remove("active")
                );


                btn.classList.add("active");


                selectedSemester =
                    btn.dataset.semester;


                /* =========================
                   SHOW SUBJECTS
                ========================= */

                subjectSection.classList.remove("hidden");

                searchSection.classList.add("hidden");


                /* Clear old subjects */

                subjectButtons.innerHTML = "";


                /* =========================
                   ADD SUBJECTS
                ========================= */

                /* =========================
   LOAD SUBJECTS FROM BACKEND
========================= */

subjectButtons.innerHTML = `
    <p class="loading-subjects">
        Loading subjects...
    </p>
`;

fetch(
    `http://127.0.0.1:8000/api/subjects?year=${encodeURIComponent(selectedYear)}&semester=${encodeURIComponent(selectedSemester)}`
)
.then(response => {

    if (!response.ok) {
        throw new Error(
            `API error: ${response.status}`
        );
    }

    return response.json();

})
.then(subjectList => {

    subjectButtons.innerHTML = "";

    if (!subjectList.length) {

        subjectButtons.innerHTML = `
            <p class="no-subjects">
                No subjects found.
            </p>
        `;

        return;
    }

    subjectList.forEach(subject => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "subject-btn";

        button.textContent = subject;

        subjectButtons.appendChild(button);

    });

    /* =========================
       SUBJECT CLICK
    ========================= */

    const subBtns =
        document.querySelectorAll(".subject-btn");

    subBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            subBtns.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedSubject =
                btn.textContent.trim();

            console.log(
                "Selected Subject:",
                selectedSubject
            );

            /* Show search */

            searchSection.classList.remove("hidden");

        });

    });

})
.catch(error => {

    console.error(
        "Failed to load subjects:",
        error
    );

    subjectButtons.innerHTML = `
        <p class="no-subjects">
            Could not load subjects.
            Make sure FastAPI is running.
        </p>
    `;

});


                /* =========================
                   SUBJECT CLICK
                ========================= */

                const subBtns =
                    document.querySelectorAll(".subject-btn");


                subBtns.forEach(btn => {

                    btn.addEventListener("click", () => {


                        subBtns.forEach(b =>
                            b.classList.remove("active")
                        );


                        btn.classList.add("active");


                        selectedSubject =
                            btn.textContent.trim();


                        console.log(
                            "Selected Subject:",
                            selectedSubject
                        );


                        /* Show search */

                        searchSection.classList.remove("hidden");

                    });

                });

            });

        });

    });

});



/* =========================
   SEARCH BAR
========================= */

const searchForm =
    document.getElementById("search-form");

const searchInput =
    document.getElementById("topic-search");

const searchReset =
    document.getElementById("search-reset");

const searchGo =
    document.getElementById("search-go");

const searchContainer =
    document.getElementById("poda");



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

    const hasText =
        searchInput.value.trim().length > 0;


    searchForm.classList.toggle(
        "has-text",
        hasText
    );


    searchContainer.classList.toggle(
        "has-search",
        hasText
    );

}



/* =========================
   SEARCH ICON CLICK
========================= */

searchForm.addEventListener("click", () => {

    if (
        !searchForm.classList.contains("expanded")
    ) {

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

searchReset.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();


    searchInput.value = "";


    searchForm.classList.remove("has-text");

    searchContainer.classList.remove("has-search");

    searchForm.classList.remove("expanded");


    searchInput.blur();

});



/* =========================
   GO ARROW
========================= */

searchGo.addEventListener("click", event => {

    event.preventDefault();

    performSearch();

});



/* =========================
   ENTER KEY
========================= */

searchForm.addEventListener("submit", event => {

    event.preventDefault();

    performSearch();

});



/* =========================
   SEARCH FUNCTION
========================= */

async function performSearch() {

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    console.log("Searching for:", query);
    console.log("Year:", selectedYear);
    console.log("Semester:", selectedSemester);
    console.log("Subject:", selectedSubject);

    /*
     * Hindi and Marathi are no longer part
     * of the active syllabus.
     */

    if (unavailableSubjects.includes(selectedSubject)) {

        displaySearchResults([]);

        return;
    }

    try {

        const params = new URLSearchParams();

        if (selectedYear) {
            params.append("year", selectedYear);
        }

        if (selectedSemester) {
            params.append("semester", selectedSemester);
        }

        if (selectedSubject) {
    params.append(
        "subject",
        selectedSubject
    );
}

        params.append("topic", query);
        params.append("limit", "3");

        const response = await fetch(
            `http://127.0.0.1:8000/api/pyqs?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "PYQ results:",
            data
        );

        displaySearchResults(
            data.results || []
        );

        if (window.updateRevisionData) {
    await window.updateRevisionData();
}

    } catch (error) {

        console.error(
            "PYQ search failed:",
            error
        );

        alert(
            "Could not connect to the RJCS-PYQ backend. " +
            "Make sure FastAPI is running."
        );
    }
}
function displaySearchResults(results) {

    const resultsContainer =
        document.getElementById("pyq-results");

    if (!resultsContainer) {

        console.error(
            "PYQ results container not found."
        );

        return;
    }

    resultsContainer.innerHTML = "";

    if (!results.length) {

        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>No PYQs found</h3>
                <p>
                    Try another topic or check your
                    year, semester and subject selection.
                </p>
            </div>
        `;

        resultsContainer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;
    }

    results.forEach((pyq, index) => {

        const card = document.createElement("div");

        card.className = "pyq-card";

        card.innerHTML = `
            <div class="pyq-card-header">
                <span class="pyq-number">
                    PYQ ${index + 1}
                </span>

                <span class="pyq-year">
                    ${pyq.academic_year || ""}
                </span>
            </div>

            <div class="pyq-meta">
                <span>${pyq.subject || "Unknown Subject"}</span>
                <span>
                    ${pyq.year || ""} |
                    Sem ${pyq.semester || ""}
                </span>
            </div>

            <p class="pyq-question">
                ${pyq.question || ""}
            </p>

            <div class="pyq-card-footer">

    <button
        type="button"
        class="generate-answer">
        Generate Answer
    </button>

</div>
        `;

        resultsContainer.appendChild(card);

    });

    resultsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    console.log(
        `Displayed ${results.length} PYQs.`
    );
}

if (window.updateRevisionData) {
    updateRevisionData();
}

/* =========================
   GENERATED ANSWER
========================= */

const generatedAnswerSection =
    document.getElementById(
        "generated-answer-section"
    );

const answerQuestionText =
    document.getElementById(
        "answer-question-text"
    );

const answerContent =
    document.getElementById(
        "answer-content"
    );

answerContent.innerHTML = `
    <div class="no-answer-message">
        <h3>No answer available</h3>
        <p>
            An answer has not been added for this PYQ yet.
        </p>
    </div>
`;

const backToPyq =
    document.getElementById(
        "back-to-pyq"
    );



/* =========================
   GENERATE ANSWER
========================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(".generate-answer");

        if (!button) {
            return;
        }

        const pyqCard =
            button.closest(".pyq-card");

        if (!pyqCard) {
            return;
        }

        const questionElement =
            pyqCard.querySelector(".pyq-question");

        if (!questionElement) {
            console.error("Question element not found.");
            return;
        }

        const question =
            questionElement.textContent.trim();

        console.log("QUESTION:", question);

        answerQuestionText.textContent =
            question;

        generatedAnswerSection.style.display =
            "block";

        backToPyq.style.display =
            "flex";

        const answer =
            window.manualAnswers
                ? window.manualAnswers[question]
                : null;

        console.log(
            "ANSWER FOUND:",
            !!answer
        );

        if (answer) {

            answerContent.innerHTML =
                answer;

        } else {

            answerContent.innerHTML = `
                <div class="answer-error">
                    <h3>Answer not available</h3>

                    <p>
                        This question has not been
                        added to the answer bank yet.
                    </p>
                </div>
            `;

        }

        setTimeout(() => {

            generatedAnswerSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }
);



/* =========================
   BACK TO SEARCH
========================= */

backToPyq.addEventListener(
    "click",
    function () {


        const searchTop =
            searchSection.getBoundingClientRect().top
            + window.scrollY;


        window.scrollTo({

            top: searchTop - 25,

            behavior: "smooth"

        });


        /* Hide arrow */

        setTimeout(() => {

            backToPyq.style.display =
                "none";

        }, 500);

    }
);

/* =========================================================
   RJCS-PYQ HELP SLIDER
========================================================= */

(() => {

    function initializeHelpSlider() {

        if (window.__rjcsHelpSliderInitialized) {
            return;
        }

        const slider =
            document.querySelector(".help-slider");

        const track =
            document.querySelector(".help-track");

        const viewport =
            document.querySelector(".help-viewport");

        const previousButton =
            document.querySelector(".help-prev");

        const nextButton =
            document.querySelector(".help-next");


        /* CHECK ELEMENTS */

        if (
            !slider ||
            !track ||
            !viewport ||
            !previousButton ||
            !nextButton
        ) {
            console.error(
                "RJCS Help Slider: Required elements not found."
            );

            return;
        }


        window.__rjcsHelpSliderInitialized = true;


        /* =================================================
           SAVE ORIGINAL CARDS
        ================================================= */

        const originalCards =
            Array.from(
                track.querySelectorAll(".help-card")
            );


        if (originalCards.length === 0) {

            console.error(
                "RJCS Help Slider: No cards found."
            );

            return;
        }


        const totalCards =
            originalCards.length;


        /* =================================================
           CREATE 3 IDENTICAL SETS
           LEFT | ORIGINAL | RIGHT
        ================================================= */

        track.innerHTML = "";


        for (let set = 0; set < 3; set++) {

            originalCards.forEach(card => {

                track.appendChild(
                    card.cloneNode(true)
                );

            });

        }


        /* =================================================
           VARIABLES
        ================================================= */

        let cardStep = 0;

        let setWidth = 0;

        let position = 0;

        let autoRunning = true;

        let hovering = false;

        let resumeTimer = null;

        let lastTime =
            performance.now();


        /* =================================================
           SETTINGS
        ================================================= */

        const AUTO_SPEED = 30;

        const RESUME_DELAY = 5000;


        /* =================================================
           MEASURE CARD
        ================================================= */

        function calculateDimensions() {

            const firstCard =
                track.querySelector(".help-card");


            if (!firstCard) {
                return;
            }


            const cardWidth =
                firstCard.getBoundingClientRect().width;


            const trackStyle =
                window.getComputedStyle(track);


            const gap =
                parseFloat(trackStyle.gap) || 0;


            cardStep =
                cardWidth + gap;


            setWidth =
                cardStep * totalCards;


            if (setWidth <= 0) {
                return;
            }


            /*
                Start in the middle copy.
                This gives us infinite movement
                in both directions.
            */

            if (position === 0) {

                position =
                    setWidth;

            }


            render(false);

        }


        /* =================================================
           RENDER TRACK
        ================================================= */

        function render(animated) {

            track.style.transition =
                animated
                    ? "transform 0.45s ease"
                    : "none";


            track.style.transform =
                `translate3d(${-position}px, 0, 0)`;

        }


        /* =================================================
           GET CURRENT POSITION
           Useful if user clicks repeatedly
           ================================================= */

        function getCurrentPosition() {

            const transform =
                window.getComputedStyle(track)
                    .transform;


            if (
                transform &&
                transform !== "none"
            ) {

                const matrix =
                    new DOMMatrixReadOnly(transform);


                return -matrix.m41;

            }


            return position;

        }


        /* =================================================
           KEEP TRACK IN MIDDLE COPY
        ================================================= */

        function normalizePosition() {

            if (setWidth <= 0) {
                return;
            }


            while (
                position >= setWidth * 2
            ) {

                position -= setWidth;

            }


            while (
                position < setWidth
            ) {

                position += setWidth;

            }


            render(false);

        }


        /* =================================================
           AUTO MOVEMENT
        ================================================= */

        function autoScroll(currentTime) {

            const delta =
                Math.min(
                    currentTime - lastTime,
                    50
                );


            lastTime =
                currentTime;


            if (
                autoRunning &&
                !hovering &&
                cardStep > 0
            ) {

                position +=
                    AUTO_SPEED *
                    (delta / 1000);


                if (
                    position >= setWidth * 2
                ) {

                    position -=
                        setWidth;

                }


                render(false);

            }


            requestAnimationFrame(
                autoScroll
            );

        }


        /* =================================================
           STOP AUTO + START 5 SECOND TIMER
        ================================================= */

        function stopAutoMovement() {

            autoRunning = false;


            clearTimeout(
                resumeTimer
            );


            resumeTimer =
                setTimeout(() => {

                    autoRunning = true;

                    lastTime =
                        performance.now();

                }, RESUME_DELAY);

        }


        /* =================================================
           MOVE EXACTLY ONE CARD
        ================================================= */

        function moveOneCard(direction) {

            if (cardStep <= 0) {
                return;
            }


            /*
                Stop automatic movement.
                Every click restarts the
                5-second countdown.
            */

            stopAutoMovement();


            /*
                Get the actual current position.
                This also works if the user
                clicks repeatedly.
            */

            position =
                getCurrentPosition();


            /*
                Move exactly one card.
            */

            position +=
                direction * cardStep;


            render(true);


            /*
                Wait for the animation to finish,
                then silently move back into the
                middle copy if necessary.
            */

            setTimeout(() => {

                normalizePosition();

            }, 470);

        }


        /* =================================================
           NEXT BUTTON
        ================================================= */

        nextButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                moveOneCard(1);

            }
        );


        /* =================================================
           PREVIOUS BUTTON
        ================================================= */

        previousButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                moveOneCard(-1);

            }
        );


        /* =================================================
           HOVER = PAUSE
        ================================================= */

        slider.addEventListener(
            "mouseenter",
            () => {

                hovering = true;

            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                hovering = false;

                lastTime =
                    performance.now();

            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    window.__rjcsHelpResizeTimer
                );


                window.__rjcsHelpResizeTimer =
                    setTimeout(() => {

                        calculateDimensions();

                    }, 150);

            }
        );


        /* =================================================
           START
        ================================================= */

        calculateDimensions();

        requestAnimationFrame(
            autoScroll
        );


        console.log(
            "RJCS-PYQ Help Slider initialized successfully."
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeHelpSlider
        );

    } else {

        initializeHelpSlider();

    }

})();

/* =========================================================
   REVISION CARD EXPANSION
========================================================= */
/* =========================================================
   REVISION CARDS - REAL DATA
========================================================= */

/* =========================================================
   REVISION CARDS - REAL DATA DASHBOARD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revisionCards =
        document.querySelectorAll(".revision-card");

    const overlay =
        document.getElementById("revision-overlay");

    const expandedCard =
        document.getElementById("revision-expanded-card");

    const closeButton =
        document.getElementById("revision-close");

    const expandedTitle =
        document.getElementById("revision-expanded-title");

    const expandedSubtitle =
        document.getElementById("revision-expanded-subtitle");

    const expandedContent =
        document.getElementById("revision-expanded-content");


    if (
        !revisionCards.length ||
        !overlay ||
        !expandedCard ||
        !closeButton ||
        !expandedTitle ||
        !expandedSubtitle ||
        !expandedContent
    ) {
        console.error(
            "Revision cards: required elements not found."
        );
        return;
    }


    /* =====================================================
       DATA
    ===================================================== */

    let revisionData = {

        frequency: {
            title: "Topic Frequency",
            subtitle:
                "See how often your searched topic appeared across exam years.",
            content:
                "<p>Search a topic to see its frequency across years.</p>"
        },

        question: {
            title: "Most Asked Question",
            subtitle:
                "Topics that appear most frequently in the selected PYQs.",
            content:
                "<p>Select a subject to see the most repeated topics.</p>"
        },

        marks: {
            title: "Marks Distribution",
            subtitle:
                "See how questions are distributed by marks.",
            content:
                "<p>Select a subject to see marks distribution.</p>"
        },

        next: {
            title: "What to Revise Next",
            subtitle:
                "Topics that appear frequently in the selected PYQs.",
            content:
                "<p>Select a subject to see revision priorities.</p>"
        }

    };


    /* =====================================================
       TOPIC WORD CLEANUP
    ===================================================== */

    const stopWords = new Set([

        "what",
        "why",
        "how",
        "when",
        "where",
        "which",

        "with",
        "from",
        "into",
        "that",
        "this",
        "these",
        "those",

        "the",
        "and",
        "for",
        "are",
        "was",
        "were",
        "has",
        "have",
        "had",

        "can",
        "will",
        "should",
        "would",
        "could",

        "does",
        "did",
        "not",
        "but",

        "you",
        "your",
        "their",
        "there",
        "than",
        "then",

        "such",
        "each",
        "also",
        "about",
        "between",

        "explain",
        "write",
        "give",
        "define",
        "describe",
        "discuss",
        "state",
        "list",

        "following",
        "example",
        "examples",

        "types",
        "type",

        "using",
        "used",
        "use",

        "different",
        "following",

        "note",
        "notes",

        "following",
        "below",

        "question",
        "questions",

        "short",
        "answer",
        "answers",

        "mention",
        "briefly",

        "explain",
        "elaborate",

        "advantages",
        "disadvantages",

        "compare",
        "comparison",

        "difference",
        "differences"

    ]);


    /* =====================================================
       EXTRACT MEANINGFUL TOPICS
    ===================================================== */

    function extractTopics(question) {

        if (!question) {
            return [];
        }


        let text =
            question
                .toLowerCase()
                .replace(/[?.,:;()[\]{}]/g, " ");


        const words =
            text
                .split(/\s+/)
                .filter(Boolean);


        const topics = [];


        /*
         * Create individual meaningful words.
         */

        words.forEach(word => {

            if (
                word.length < 4 ||
                stopWords.has(word) ||
                /^\d+$/.test(word)
            ) {
                return;
            }


            /*
             * Remove common grammatical endings
             * only when useful.
             */

            let cleaned = word
                .replace(/^(the|a|an)$/, "")
                .trim();


            if (
                cleaned.length >= 4 &&
                !stopWords.has(cleaned)
            ) {
                topics.push(cleaned);
            }

        });


        /*
         * Create 2-word phrases.
         *
         * Example:
         *
         * "database normalization"
         *
         * becomes:
         *
         * database normalization
         */

        for (
            let i = 0;
            i < words.length - 1;
            i++
        ) {

            const first =
                words[i];

            const second =
                words[i + 1];


            if (
                first.length >= 4 &&
                second.length >= 4 &&
                !stopWords.has(first) &&
                !stopWords.has(second) &&
                !/^\d+$/.test(first) &&
                !/^\d+$/.test(second)
            ) {

                topics.push(
                    `${first} ${second}`
                );

            }

        }


        return topics;

    }


    /* =====================================================
       FETCH ALL PYQs
    ===================================================== */

    async function updateRevisionData() {

        try {

            const params =
                new URLSearchParams();


            if (selectedYear) {

                params.append(
                    "year",
                    selectedYear
                );

            }


            if (selectedSemester) {

                params.append(
                    "semester",
                    selectedSemester
                );

            }


            if (selectedSubject) {

                params.append(
                    "subject",
                    selectedSubject
                );

            }


            /*
             * Get all PYQs for analysis.
             */

            params.append(
                "limit",
                "500"
            );


            const response =
                await fetch(
                    `http://127.0.0.1:8000/api/pyqs?${params.toString()}`
                );


            if (!response.ok) {

                throw new Error(
                    `API error: ${response.status}`
                );

            }


            const data =
                await response.json();


            const pyqs =
                data.results || [];


            console.log(
                "Revision analysis PYQs:",
                pyqs.length
            );


            /* =================================================
               SEARCHED TOPIC
            ================================================= */

            const searchTopic =
                searchInput
                    ? searchInput.value.trim()
                    : "";


            const searchTopicLower =
                searchTopic.toLowerCase();


            /*
             * Find questions containing searched topic.
             */

            const topicMatches =
                searchTopic
                    ? pyqs.filter(pyq => {

                        const question =
                            (
                                pyq.question || ""
                            ).toLowerCase();


                        return question.includes(
                            searchTopicLower
                        );

                    })
                    : [];


            /* =================================================
               1. TOPIC FREQUENCY
               LINE CHART BY ACADEMIC YEAR
            ================================================= */

            if (searchTopic) {

                const yearCounts = {};


                /*
                 * Count topic appearances
                 * year by year.
                 */

               topicMatches.forEach(pyq => {

                    const question =
                        (
                            pyq.question || ""
                        ).toLowerCase();


                    if (
                        !question.includes(
                            searchTopicLower
                        )
                    ) {
                        return;
                    }


                    const year =
                        pyq.academic_year ||
                        "Unknown";


                    yearCounts[year] =
                        (
                            yearCounts[year] || 0
                        ) + 1;

                });


                /*
                 * Sort academic years.
                 */

                const yearEntries =
                    Object.entries(yearCounts)
                        .sort(
                            (a, b) =>
                                a[0].localeCompare(
                                    b[0]
                                )
                        );


                if (yearEntries.length) {

                    const labels =
                        yearEntries.map(
                            ([year]) =>
                                year
                        );


                    const values =
                        yearEntries.map(
                            ([, count]) =>
                                count
                        );


                    revisionData.frequency.content = `

                        <h3>
                            "${searchTopic}"
                        </h3>

                        <p class="revision-chart-description">
                            Number of times this topic appeared
                            in each academic year.
                        </p>

                        <div class="revision-line-chart">

                            <div class="line-chart-y-axis">

                                <span>
                                    ${Math.max(...values)}
                                </span>

                                <span>
                                    ${Math.ceil(
                                        Math.max(...values) / 2
                                    )}
                                </span>

                                <span>
                                    0
                                </span>

                            </div>

                            <div class="line-chart-area">

                                <svg
                                    viewBox="0 0 700 300"
                                    preserveAspectRatio="none"
                                    class="topic-line-svg"
                                >

                                    <line
                                        x1="50"
                                        y1="30"
                                        x2="680"
                                        y2="30"
                                        class="chart-grid-line"
                                    />

                                    <line
                                        x1="50"
                                        y1="150"
                                        x2="680"
                                        y2="150"
                                        class="chart-grid-line"
                                    />

                                    <line
                                        x1="50"
                                        y1="270"
                                        x2="680"
                                        y2="270"
                                        class="chart-grid-line"
                                    />

                                    <polyline
                                        class="topic-line"
                                        points="
                                            ${values
                                                .map(
                                                    (
                                                        value,
                                                        index
                                                    ) => {

                                                        const x =
                                                            values.length === 1
                                                                ? 365
                                                                : 50 +
                                                                  (
                                                                    index /
                                                                    (
                                                                        values.length -
                                                                        1
                                                                    )
                                                                  ) *
                                                                  630;


                                                        const maxValue =
                                                            Math.max(
                                                                ...values,
                                                                1
                                                            );


                                                        const y =
                                                            270 -
                                                            (
                                                                value /
                                                                maxValue
                                                            ) *
                                                            240;


                                                        return `${x},${y}`;

                                                    }
                                                )
                                                .join(" ")}
                                        "
                                    />

                                    ${values
                                        .map(
                                            (
                                                value,
                                                index
                                            ) => {

                                                const x =
                                                    values.length === 1
                                                        ? 365
                                                        : 50 +
                                                          (
                                                              index /
                                                              (
                                                                  values.length -
                                                                  1
                                                              )
                                                          ) *
                                                          630;


                                                const maxValue =
                                                    Math.max(
                                                        ...values,
                                                        1
                                                    );


                                                const y =
                                                    270 -
                                                    (
                                                        value /
                                                        maxValue
                                                    ) *
                                                    240;


                                                return `

                                                    <circle
                                                        cx="${x}"
                                                        cy="${y}"
                                                        r="6"
                                                        class="topic-line-point"
                                                    />

                                                    <text
                                                        x="${x}"
                                                        y="${y - 14}"
                                                        text-anchor="middle"
                                                        class="chart-value-label"
                                                    >
                                                        ${value}
                                                    </text>

                                                `;

                                            }
                                        )
                                        .join("")}

                                </svg>


                                <div
                                    class="line-chart-labels"
                                >

                                    ${labels
                                        .map(
                                            year => `
                                                <span>
                                                    ${year}
                                                </span>
                                            `
                                        )
                                        .join("")}

                                </div>

                            </div>

                        </div>

                        <div class="revision-chart-summary">

                            <strong>
                                ${topicMatches.length}
                            </strong>

                            total appearances across
                            ${yearEntries.length}
                            academic year(s).

                        </div>

                    `;

                } else {

                    revisionData.frequency.content = `

                        <h3>
                            No appearances found
                        </h3>

                        <p>
                            "${searchTopic}" was not found
                            in the selected PYQs.
                        </p>

                    `;

                }

            } else {

                revisionData.frequency.content = `

                    <h3>
                        Search a topic first
                    </h3>

                    <p>
                        Enter a topic in the search bar
                        to see how frequently it appeared
                        across academic years.
                    </p>

                `;

            }


            /* =================================================
               2. MOST ASKED QUESTION
               HORIZONTAL BAR CHART
            ================================================= */

            const topicCounts = {};


           topicMatches.forEach(pyq => {

                const topics =
                    extractTopics(
                        pyq.question || ""
                    );


                /*
                 * Prevent the same topic from being
                 * counted twice inside one question.
                 */

                const uniqueTopics =
                    new Set(topics);


                uniqueTopics.forEach(topic => {

                    topicCounts[topic] =
                        (
                            topicCounts[topic] || 0
                        ) + 1;

                });

            });


            /*
             * Remove weak / meaningless topics.
             *
             * Only show topics appearing at least twice.
             */

            const topTopics =
                Object.entries(topicCounts)
                    .filter(
                        ([, count]) =>
                            count >= 2
                    )
                    .sort(
                        (a, b) =>
                            b[1] - a[1]
                    )
                    .slice(0, 8);


            if (topTopics.length) {

                const maxCount =
                    Math.max(
                        ...topTopics.map(
                            ([, count]) =>
                                count
                        )
                    );


                revisionData.question.content = `
                    <div class="topic-bar-chart">

                        ${topTopics
                            .map(
                                (
                                    [topic, count]
                                ) => {

                                    const width =
                                        (
                                            count /
                                            maxCount
                                        ) * 100;


                                    return `

                                        <div
                                            class="topic-bar-row"
                                        >

                                            <div
                                                class="topic-bar-label"
                                            >
                                                ${topic}
                                            </div>

                                            <div
                                                class="topic-bar-track"
                                            >

                                                <div
                                                    class="topic-bar-fill"
                                                    style="
                                                        width:
                                                        ${width}%;
                                                    "
                                                ></div>

                                            </div>

                                            <div
                                                class="topic-bar-count"
                                            >
                                                ${count}
                                            </div>

                                        </div>

                                    `;

                                }
                            )
                            .join("")}

                    </div>

                    <p class="revision-chart-footer">

                        Based on the actual questions
                        available for the selected
                        year, semester and subject.

                    </p>

                `;

            } else {

                revisionData.question.content = `

                    <h3>
                        Not enough repeated topics
                    </h3>

                    <p>
                        There are not enough repeated
                        topics in the selected PYQs to
                        create a meaningful comparison.
                    </p>

                `;

            }


            /* =================================================
               3. MARKS DISTRIBUTION
               PIE CHART
            ================================================= */

            const marksCount = {};


            topicMatches.forEach(pyq => {

                const marks =
                    Number(pyq.marks);


                if (
                    Number.isNaN(marks)
                ) {
                    return;
                }


                const key =
                    Number.isInteger(marks)
                        ? String(marks)
                        : marks.toString();


                marksCount[key] =
                    (
                        marksCount[key] || 0
                    ) + 1;

            });


            const marksEntries =
                Object.entries(marksCount)
                    .sort(
                        (a, b) =>
                            Number(a[0]) -
                            Number(b[0])
                    );


            if (marksEntries.length) {

                const totalQuestions =
                    marksEntries.reduce(
                        (
                            sum,
                            [, count]
                        ) =>
                            sum + count,
                        0
                    );


                let currentAngle = 0;


                const gradientParts =
                    marksEntries.map(
                        (
                            [marks, count],
                            index
                        ) => {

                            const percentage =
                                (
                                    count /
                                    totalQuestions
                                ) * 100;


                            const start =
                                currentAngle;


                            const end =
                                currentAngle +
                                percentage;


                            currentAngle =
                                end;


                            return `
                                var(--chart-${(
                                    index % 6
                                ) + 1})
                                ${start}%
                                ${end}%
                            `;

                        }
                    );


                const legend =
                    marksEntries.map(
                        (
                            [marks, count],
                            index
                        ) => {

                            const percentage =
                                (
                                    count /
                                    totalQuestions
                                ) * 100;


                            return `

                                <div
                                    class="marks-legend-item"
                                >

                                    <span
                                        class="marks-dot"
                                        style="
                                            background:
                                            var(
                                                --chart-${(
                                                    index % 6
                                                ) + 1}
                                            );
                                        "
                                    ></span>

                                    <span>
                                        ${marks} marks
                                    </span>

                                    <strong>
                                        ${count}
                                    </strong>

                                    <small>
                                        (${percentage.toFixed(1)}%)
                                    </small>

                                </div>

                            `;

                        }
                    );


                revisionData.marks.content = `

                    <h3>
                        Marks Distribution
                    </h3>

                    <div
                        class="marks-pie"
                        style="
                            background:
                            conic-gradient(
                                ${gradientParts.join(",")}
                            );
                        "
                    ></div>


                    <div class="marks-total">

                        <strong>
                            ${totalQuestions}
                        </strong>

                        questions analysed

                    </div>


                    <div class="marks-legend">

                        ${legend.join("")}

                    </div>

                `;

            } else {

                revisionData.marks.content = `

                    <h3>
                        No marks data
                    </h3>

                    <p>
                        Marks information is not available
                        for these PYQs.
                    </p>

                `;

            }


            /* =================================================
               4. WHAT TO REVISE NEXT
               TOP REPEATED TOPICS
            ================================================= */

            if (topTopics.length) {

                revisionData.next.content = `

                    <h3>
                        Revise These Topics
                    </h3>

                    <p class="revision-chart-description">
                        These topics occur most frequently
                        in the selected PYQs.
                    </p>

                    <div class="revision-priority-list">

                        ${topTopics
                            .map(
                                (
                                    [topic, count],
                                    index
                                ) => `

                                    <div
                                        class="revision-priority-item"
                                    >

                                        <span
                                            class="revision-rank"
                                        >
                                            ${index + 1}
                                        </span>

                                        <div
                                            class="revision-priority-topic"
                                        >

                                            <strong>
                                                ${topic}
                                            </strong>

                                            <span>
                                                ${count}
                                                ${
                                                    count === 1
                                                        ? "appearance"
                                                        : "appearances"
                                                }
                                            </span>

                                        </div>

                                    </div>

                                `
                            )
                            .join("")}

                    </div>

                `;

            } else {

                revisionData.next.content = `

                    <h3>
                        Not enough data
                    </h3>

                    <p>
                        More repeated topics are needed
                        to generate revision priorities.
                    </p>

                `;

            }


            console.log(
                "Revision dashboard updated:",
                {
                    totalPYQs:
                        pyqs.length,

                    topicMatches:
                        topicMatches.length,

                    repeatedTopics:
                        topTopics.length,

                    marks:
                        marksEntries.length
                }
            );


        } catch (error) {

            console.error(
                "Revision dashboard failed:",
                error
            );

        }

    }


    /* =====================================================
       OPEN CARD
    ===================================================== */

    function openCard(card) {

        const type =
            card.dataset.card;


        const data =
            revisionData[type];


        if (!data) {
            return;
        }


        expandedTitle.textContent =
            data.title;


        expandedSubtitle.textContent =
            data.subtitle;


        expandedContent.innerHTML =
            data.content;


        overlay.classList.add(
            "active"
        );


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "revision-modal-open"
        );

    }


    /* =====================================================
       CLOSE CARD
    ===================================================== */

    function closeCard() {

        overlay.classList.remove(
            "active"
        );


        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "revision-modal-open"
        );

    }


    /* =====================================================
       CARD CLICK
    ===================================================== */

    revisionCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openCard(card);

            }
        );

    });


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            closeCard();

        }
    );


    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                closeCard();

            }

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                overlay.classList.contains(
                    "active"
                )
            ) {

                closeCard();

            }

        }
    );


    /* =====================================================
       MAKE FUNCTION GLOBAL
    ===================================================== */

    window.updateRevisionData =
        updateRevisionData;


    updateRevisionData();


    console.log(
        "RJCS-PYQ revision dashboard ready."
    );

});