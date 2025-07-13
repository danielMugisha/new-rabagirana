window.onload = ()=> {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    if (id) {
        getMannaContent(id);
    } else {
        // If no ID provided, get the latest article
        getLatestManna();
    }
}

const getLatestManna = async () => {
    const URL = `https://app.rabagirana.org/api/manna/latest`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        if(result.data) {
            buildManna(result.data._id, [result.data]);
            getOtherMannas(result.data._id);
        }
    } catch (error) {
        console.error('Error fetching latest manna:', error);
    }
}

const getMannaContent = async (id) => {
    const URL = `https://app.rabagirana.org/api/manna/${id}`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        if(result.data) {
            buildManna(id, [result.data]);
            getOtherMannas(id);
        }
    } catch (error) {
        console.error('Error fetching manna:', error);
    }
}

const getOtherMannas = async (currentId) => {
    const URL = `https://app.rabagirana.org/api/manna`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        if(result.data) {
            buildOtherMannas(currentId, result.data);
        }
    } catch (error) {
        console.error('Error fetching other mannas:', error);
    }
}

const buildManna = (id, mannas) => {
    const manna = mannas.find(manna => manna._id === id);
    if (!manna) return;

    const imageElement = document.getElementById('manna-img');
    const titleElement = document.getElementById('manna-title');
    const contentElement = document.getElementById('manna-content');

    if (imageElement) imageElement.src = `https://app.rabagirana.org/uploads/${manna.featuredImage}`;
    if (titleElement) titleElement.innerText = manna.title;
    if (contentElement) contentElement.innerHTML = manna.content;
}

const buildOtherMannas = (currentId, mannas) => {
    const otherMannas = mannas.filter(manna => manna._id !== currentId);
    const otherArticles = document.getElementById('other-articles');
    if (!otherArticles) return;

    otherArticles.innerHTML = "";
    otherMannas.forEach(manna => {
        otherArticles.innerHTML += `
            <div class="carousel-item col-lg-3 col-xl-3 m-10">
                <article class="lqd-pf-item lqd-pf-item-style-3 lqd-pf-overlay-bg-scale lqd-pf-content-v pf-details-h-str">
                    <div class="lqd-pf-item-inner">
                        <div class="lqd-pf-img overflow-hidden rounded-6 relative mb-2em">
                            <figure>
                                <figure class="lqd-overlay flex">
                                    <img
                                        width="640"
                                        height="600"
                                        src="https://app.rabagirana.org/uploads/${manna.featuredImage}"
                                        class="w-full h-full objfit-cover objfit-center"
                                        alt="manna article"
                                    />
                                </figure>
                            </figure>
                        </div>
                        <div class="lqd-pf-details">
                            <a href="/manna.html?id=${manna._id}">
                                <h2 class="lqd-pf-title mt-0 mb-1 h5">${manna.title}</h2>
                            </a>
                            <ul class="reset-ul inline-nav lqd-pf-cat inline-flex relative z-2">
                                <li>
                                    <a href="#" class="leading-1/4em">${manna.author}</a>
                                </li>
                            </ul>
                        </div>
                        <a
                            href="/manna.html?id=${manna._id}"
                            class="lqd-overlay flex lqd-pf-overlay-link leading-1/4em"
                        ></a>
                    </div>
                </article>
            </div>
        `;
    });
}