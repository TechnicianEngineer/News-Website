document.addEventListener("DOMContentLoaded", function () {
    // Replace 'YOUR_EVENT_REGISTRY_API_KEY' with your Event Registry API key
    const apiKey = '252fd3c5-d736-454e-af49-5aa414c752d5';
    const newsContainer = document.getElementById('news-container');

    // Get keywords from the URL query parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const keywords = urlSearchParams.get('keywords');

    if (keywords) {
        // Make API request with keywords
        const apiUrl = `https://eventregistry.org/api/v1/article/getArticles?apiKey=${apiKey}&keywords=${keywords}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayNews(data.articles.results))
            .catch(error => console.log('Error fetching news:', error));
    } else {
        newsContainer.innerHTML = '<p>No keywords provided in the URL.</p>';
    }
});

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('news-article');
        console.log(article.image)
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.image}" alt="${article.title}" width="100%">
            <p class="article-body">${article.body}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleElement);
    });
}
