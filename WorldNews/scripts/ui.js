class UI{
    constructor(listButtons, countryCategoryNews, buttonCountry, latestNewsContainer, trendingNewsContainer){
        this.latestNewsContainer = latestNewsContainer
        this.listButtons = listButtons
        this.buttonCountry = buttonCountry
        this.countryCategoryNewsContainer = countryCategoryNews
        this.trendingNewsContainer = trendingNewsContainer
        this.countryCategoryNewsParentElement
        this.length
    }
    latestNews(datas){
        datas.forEach(data => {
            let image = data.urlToImage ? data.urlToImage : '../img/placeholder.png'
            let description
            if(data.title == null){
                description = data.description.slice(0, 80)
            }else if(data.description == null){
                description = data.content.slice(0, 80)
            }else{
                description = data.title.slice(0, 120)
            }
            const html = `
            <a href="${data.url}" target="_blank" class="latest__news-card">
            <div class="latest__news-info">
                <figure class="latest__news-image-container">
                    <img src="${image}" alt="Latest News Image" class="latest__news-image">
                </figure>
                <h5 class="header-5">${description}<span class="read__more">...Click to read more</span></h5>
            </div>
            </a>
        `
        this.latestNewsContainer.innerHTML += html
        })
        
    }
    buttonActive(targetButton){
        this.listButtons.forEach(listButton => {
            listButton.className = 'categoryCountryPopular__category-item'
        })
        targetButton.className = 'categoryCountryPopular__category-item active'
    }
    newsActive(targetButton){
        const buttonDataTarget = targetButton.getAttribute('data-target')
        this.countryCategoryNewsContainer.forEach(container => {
            container.className = 'categoryCountryPopular__news-outsideCard'
        })
        document.querySelector(buttonDataTarget).className = 'categoryCountryPopular__news-outsideCard active'
    }
    activeButtonCountry(button){
        this.buttonCountry.forEach(button =>{
            button.className = 'categoryCountryPopular__button-country'
        })
        button.className = 'categoryCountryPopular__button-country active'
    }

    updateUI(datas){
        if(datas !== null){
            datas.forEach(data =>{
                let description 
                if(data.content){
                    description = data.content.slice(0, 200) + '...'
                }else if(data.description){
                    description = data.description + '...'
                }else{
                    description = ''
                }
                let image = (data.urlToImage == null) ? '../img/placeholder.png': data.urlToImage
                const html = `
                    <a href="${data.url}" target="_blank"class="categoryCountryPopular__news-insideCard mb-2">
                        <figure>
                           <img src="${image}" alt="Country & Category Image" class="categoryCountryPopular__news-img">
                        </figure>
                        <div class="categoryCountryPopular__info">
                            <h4 class="header-4">${data.title}</h4>
                            <p class="categoryCountryPopular__description mt-1-5">${description}<span class="read__more">Click to read more</span></p>
                        </div>
                    </a>
                `
                if(this.countryCategoryNewsParentElement.children.length < this.length){
                    this.countryCategoryNewsParentElement.innerHTML += html
                }
            })
        }
       
    }
     updateData(datas, targetButton, length){
        this.length = length
        this.countryCategoryNewsParentElement = document.querySelector(targetButton)
        this.updateUI(datas)
    }
    popularNews(datas){
        datas.forEach((data, index) => {
            const html = `
                <li class="categoryCountryPopular__popular-newsItem">
                    <a href="${data.url}" target="_blank" class="categoryCountryPopular__popular-newsLink">${index + 1}. ${data.title}</a>
                </li>
            `
                this.trendingNewsContainer.innerHTML += html
        })
    }
}


