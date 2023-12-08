
window.onload = ()=> {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    if (id) {
        getMannaContent(id)
    }
}


const getMannaContent = async (id) => {
	const URL = `http://localhost:4001/api/manna`;

	const response = await fetch(URL);
	const result = await response.json();
    console.log(result);
	if(result.data)
    {
        const mannas = result.data;
        
        buildManna(id,mannas)
    }
		
}

const buildManna = (id,mannas) =>{
    const manna = mannas.find(manna => manna._id === id);
	var imageElement = document.getElementById('manna-img')
	var titleElement = document.getElementById('manna-title')
	var contentElement = document.getElementById('manna-content')

	imageElement.src = `http://localhost:4001/${manna.featuredImage}`
	titleElement.innerText = manna.title
	contentElement.innerHTML = manna.content


    const otherMannas = mannas.filter(manna => manna._id != id);
    var otherArticles = document.getElementsByTagName('other-articles');
    otherArticles.innerHTML = "";
    otherMannas.forEach(a => {
        otherArticles.innerHTML += `
        <div class="carousel-item  col-lg-3 col-xl-3 m-10">
                    <article
                        class="lqd-pf-item lqd-pf-item-style-3 lqd-pf-overlay-bg-scale lqd-pf-content-v pf-details-h-str"
                    >
                        <div class="lqd-pf-item-inner">
                            <div
                                class="lqd-pf-img overflow-hidden rounded-6 relative mb-2em"
                            >
                                <figure>
                                    <figure class="lqd-overlay flex">
                                        <img
                                            width="640"
                                            height="600"
                                            src="http://localhost:4001/${a.featuredImage}"
                                            class="w-full h-full objfit-cover objfit-center"
                                            alt="case study"
                                        />
                                    </figure>
                                </figure>
                            
                            </div>
                            <div class="lqd-pf-details">
                                <h2 class="lqd-pf-title mt-0 mb-1 h5">
                                    ${a.title}
                                </h2>
                                <ul
                                    class="reset-ul inline-nav lqd-pf-cat inline-flex relative z-2"
                                >
                                    <li>
                                        <a href="#" class="leading-1/4em"
                                            >${a.author}</a
                                        >
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="/manna.html?id="
                                class="lqd-overlay flex lqd-pf-overlay-link leading-1/4em "
                                data-fresco-group="case-studies"
                            ></a>
                        </div>
                    </article>
                </div>
        `
    });
}