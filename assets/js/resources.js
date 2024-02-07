
window.onload = ()=> {
        getResources()
}


const getResources = async () => {
	const URL = `https://strapi.rabagirana.org/api/resource`;

	const response = await fetch(URL);
	const result = await response.json();
    console.log(result);
	if(result.data)
    {
        const resources = result.data;
        buildDocs(resources)
    }
		
}

const buildDocs = (resources) =>{
    const URL = `https://strapi.rabagirana.org/`;
    const docs = resources.filter(resource => resource.category === "brochure");
    var brochures = document.getElementById("brochures");

    brochures.innerHTML = "";

    docs.forEach(a => {
        brochures.innerHTML += `
        <div class="col col-12 col-md-6 col-xl-3 p-0">
                              <div class="flex flex-auto p-15 transition-all">
                                <div
                                  class="iconbox flex-grow-1 relative flex-col iconbox-default iconbox-contents-show-onhover py-40 px-20 mb-30 items-center bg-white rounded-10 shadow-bottom lg:m-0"
                                  data-slideelement-onhover="true"
                                  data-slideelement-options='{ "visibleElement":  ".iconbox-icon-wrap, p, h3", "hiddenElement":  ".btn", "alignMid":  true, "triggerElement":  ".iconbox" }'
                                >
                                  <div class="iconbox-icon-wrap">
                                    <div
                                      class="mb-25 iconbox-icon-container inline-flex w-40 text-50"
                                    >
                                    <img src="assets/images/common/paper.png"/>
                                    </div>
                                  </div>
                                  <a target="_blank" href="${URL}${a.featuredFile}" download><h3
                                    class="lqd-iconbox-heading text-center text-16 leading-1em mb-0"
                                  >
                                    ${a.name}
                                  </h3></a>
                                 
                                </div>
                              </div>
                            </div>
        `
    })
	
}