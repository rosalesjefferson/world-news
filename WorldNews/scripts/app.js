const checkbox = document.querySelector('.checkbox')
const title = document.querySelector('.header__title')
const titleTwo = document.querySelector('.header__title-two')
const navItemButton = document.querySelector('.nav__item')
const navItemButtonAll = document.querySelectorAll('.nav__item')
const ul = document.querySelector('.nav__navigation-lists')
const latestNewsContainer = document.querySelector('.latest__news-container')
const listButtons = document.querySelectorAll('.categoryCountryPopular__category-item')
const countryButtons = document.querySelectorAll('[data-button-country]')
const countryCategoryNews = document.querySelectorAll('.categoryCountryPopular__news-outsideCard')
const trendingNewsContainer = document.querySelector('.categoryCountryPopular__popular-newsLists')
const loading = document.querySelector('.loader')
const latestNewsLoading = document.querySelector('.latestNews__loader')
const popularNewsLoading = document.querySelector('.popular__loader')
const noNews = document.querySelector('.no__news')
const seeMoreButton = document.querySelector('[data-seeMore]')
const backTopButton = document.querySelector('[data-backtop-button]')
const news = new News('0f00624a55184a5f8d2e6d9800bab63f', `https://newsapi.org/v2/top-headlines?country=`, 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=', 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=')
const ui = new UI(listButtons, countryCategoryNews, countryButtons, latestNewsContainer, trendingNewsContainer)
// Default Value
let page = 1
let length = 10
let defaultCountry = 'us'
let defaultCategory = 'business'
let targetButton = '#business'

/*************************UPDATE NEWS*****************************/
const addNews = (data, callback, loading, className) =>{
        if(data){
            loading.className = className
            setTimeout(() =>{
                loading.style.display = 'none'
                setTimeout(() =>{
                    callback(data)
                }, 1)
            }, 300)
        }
}
// Latest News
// news.getLatestNews().then(data => {

//     addNews(data.articles, function(returnValue){
//         ui.latestNews(returnValue)
//     }, latestNewsLoading, 'latestNews__loader')

// }).catch(err => {
//     console.log(err.message);
// })

// Country Category News
const callNews = () =>{
    loading.className = noNews.classList.contains('active') ? 'loader' : 'loader active'
    loading.style.display = 'flex'
    news.getCountryCategoryNews(defaultCategory, page, defaultCountry).then(data => {
        if(data){
            setTimeout(() => {
                seeMoreButton.style.display = loading.classList.contains('active') ? 'none' : 'unset'
            }, 500);
        }
        addNews(data.articles, function(returnValue){
            ui.updateData(returnValue, targetButton, length)
        }, loading, 'loader')
    }).catch(err => {
        console.log(err.message);
    })
}
callNews()

// Popular News
// news.getPopularNews().then(data => {
//     // Call addNews
//     addNews(data.articles, function(returnValue){
//         ui.popularNews(returnValue)
//     }, popularNewsLoading, 'popular__loader')
// }).catch(err => {
//     console.log(err.message);
// })

// See more
seeMoreButton.addEventListener('click', (e) =>{
    e.preventDefault()
    seeMoreButton.style.display = 'none'
    loading.style.display = 'flex'
    loading.className = 'loader active'
    page++
    length += 10
    console.log(page, length);
    news.getCountryCategoryNews(defaultCategory, page, defaultCountry).then(data => {
        if(data){
            loading.className = 'loader'
            setTimeout(() =>{
                if(data.articles.length < 1){
                    noNews.className = 'no__news active'
                    seeMoreButton.style.display = 'none'
                    loading.style.display = 'none'
                }else{
                    loading.style.display = 'none'
                    noNews.className = 'no__news'
                    seeMoreButton.style.display = 'unset'
                    ui.updateData(data.articles, targetButton, length)
                    console.log(data.articles.length, 'Not Empty, Scrolled', page);
                }  
            }, 500)
        }
    }).catch(err => {
        console.log(err);
    }) 
})

/*************************UI*****************************/
// Category Buttons
listButtons.forEach(listButton => {
    listButton.addEventListener('click', () =>{
        seeMoreButton.style.display = 'none'
        loading.style.display = 'flex'
        console.log(listButton.innerText);
        ui.buttonActive(listButton) 
        noNews.className = 'no__news'
        targetButton = listButton.getAttribute('data-target')
        defaultCategory = targetButton.slice(1)
        page = 1
        length = 10
        callNews()
        ui.newsActive(listButton)
    })
})
//  Country Buttons
countryButtons.forEach(button => {
    button.addEventListener('click', (e) =>{
        e.preventDefault()
        seeMoreButton.style.display = 'none'
        noNews.className = 'no__news'
        page = 1
        length = 10
        defaultCountry = button.innerText
        countryCategoryNews.forEach(headline => {
            headline.innerHTML = ''
        })
        callNews()
    })
})
countryButtons.forEach(button => {
    button.addEventListener('click', (e) =>{
        e.preventDefault()
        ui.activeButtonCountry(button)
    })
})

//////Links
const hideShowNavLinks = () =>{
    if(checkbox.checked){
        title.style.color = 'rgba(223, 127, 3, .4)'
        titleTwo.style.color = 'rgba(218, 218, 218, .4)'
        console.log('check', checkbox.checked);
        ul.style.display = 'flex'
        navItemButton.style.display = 'unset' 
        setTimeout(() =>{
            navItemButton.nextElementSibling.style.display = 'unset' 
            setTimeout(() =>{
              navItemButton.nextElementSibling.nextElementSibling.style.display = 'unset' 
              setTimeout(() =>{
                navItemButton.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'unset' 
              }, 50)  
            }, 50)  
        }, 50)       
    }else{
        title.style.color = 'rgb(223, 127, 3)'
        titleTwo.style.color = 'rgb(218, 218, 218)'
        console.log(title, titleTwo);
        console.log('Uncheck', checkbox.checked);
        navItemButton.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none' 
        setTimeout(() =>{
          navItemButton.nextElementSibling.nextElementSibling.style.display = 'none' 
          setTimeout(() =>{
            navItemButton.nextElementSibling.style.display = 'none' 
             setTimeout(() =>{
               navItemButton.style.display = 'none' 
               navItemButton.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none' 
               ul.style.display = 'none'
             }, 50)  
          }, 50)  
        }, 50)  
    }
}
// remove nav links when changing the size of the screen
window.addEventListener('resize', () =>{
    if(window.outerWidth > 600){
        title.style.color = 'rgb(223, 127, 3)'
        titleTwo.style.color = 'rgb(218, 218, 218)'
        checkbox.checked = false
        ul.style.display = 'flex'
        navItemButtonAll.forEach(itemButton => {
            itemButton.style.display = 'unset'
        })
    }else{
        checkbox.checked = false
        ul.style.display = 'none'
        navItemButtonAll.forEach(itemButton => {
            itemButton.style.display = 'none'
        })
        title.style.color = 'rgb(223, 127, 3)'
        titleTwo.style.color = 'rgb(218, 218, 218)'
    }
})
// checkbox
checkbox.addEventListener('click', () => {
    hideShowNavLinks()
})

// Nav links
navItemButtonAll.forEach(itemButton => {
    itemButton.addEventListener('click', () => {
        if(window.outerWidth <= 600){
            checkbox.checked = false
            hideShowNavLinks()
        }
    })

})

// Back to top button
backTopButton.addEventListener('click', () =>{
    scrollTo(0,0);
})