console.log("NEWS JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const newsContainer =
        document.getElementById("newsContainer");

    const searchInput =
        document.getElementById("newsSearch");

    const searchButton =
        document.getElementById("searchNews");

    const clearButton =
        document.getElementById("clearSearch");

    let allNews = [];


    // =========================
    // LOAD NEWS
    // =========================

    async function loadNews() {

        newsContainer.innerHTML = `
            <p>Loading cybersecurity news...</p>
        `;

        try {

            const response =
                await fetch("/api/news");

            if (!response.ok) {
                throw new Error(
                    "Server error: " + response.status
                );
            }

            allNews = await response.json();

            console.log("News loaded:", allNews);

            displayNews(allNews);

        } catch (error) {

            console.error("News error:", error);

            newsContainer.innerHTML = `
                <div class="error-message">

                    <h3>
                        Unable to load news
                    </h3>

                    <p>
                        ${error.message}
                    </p>

                </div>
            `;
        }
    }


    // =========================
    // DISPLAY NEWS
    // =========================

    function displayNews(newsList) {

        newsContainer.innerHTML = "";

        if (newsList.length === 0) {

            newsContainer.innerHTML = `
                <div class="error-message">

                    <h3>
                        No news found
                    </h3>

                    <p>
                        Try another search.
                    </p>

                </div>
            `;

            return;
        }


        newsList.forEach(function (news) {

            const card =
                document.createElement("div");

            card.className = "news-card";

            card.innerHTML = `

                <div class="news-card-content">

                    <div class="news-category">
                        ${news.category}
                    </div>

                    <h3>
                        ${news.title}
                    </h3>

                    <p>
                        ${news.description}
                    </p>

                    <div class="news-meta">

                        <span>
                            📅 ${news.date}
                        </span>

                        <span>
                            ⚠️ ${news.severity}
                        </span>

                    </div>

                </div>

            `;

            newsContainer.appendChild(card);

        });

    }


    // =========================
    // SEARCH NEWS
    // =========================

    function searchNews() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();

        console.log(
            "Searching for:",
            searchText
        );


        // Empty search = show everything

        if (searchText === "") {

            displayNews(allNews);

            return;
        }


        const filteredNews =
            allNews.filter(function (news) {

                const title =
                    (news.title || "")
                    .toLowerCase();

                const description =
                    (news.description || "")
                    .toLowerCase();

                const category =
                    (news.category || "")
                    .toLowerCase();

                const severity =
                    (news.severity || "")
                    .toLowerCase();


                return (
                    title.includes(searchText) ||
                    description.includes(searchText) ||
                    category.includes(searchText) ||
                    severity.includes(searchText)
                );

            });


        displayNews(filteredNews);

    }


    // =========================
    // SEARCH BUTTON
    // =========================

    searchButton.addEventListener(
        "click",
        searchNews
    );


    // =========================
    // ENTER KEY
    // =========================

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchNews();

            }

        }
    );


    // =========================
    // CLEAR BUTTON
    // =========================

    clearButton.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            displayNews(allNews);

        }
    );


    // START
    loadNews();

});