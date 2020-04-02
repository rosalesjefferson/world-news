class News{
    constructor(apikey, countryCategoryBase, latestNews, popular){
        this.apikey = apikey
        this.latestNewsBase = latestNews
        this.popularBase = popular
        this.countryCategoryBase = countryCategoryBase
        this.pageSize = 10
        this.page 
        this.country
        this.category
    }
    async getCountryCategoryNews(category, page, country){
        this.category = category
        this.page = page
        this.country = country
        const query = `${this.country}&category=${this.category}&apiKey=${this.apikey}&pageSize=${this.pageSize}&page=${this.page}`
        const response = await fetch(this.countryCategoryBase + query)
        const data = await response.json()
        return data
    }
    async getLatestNews(){
        const query = `${this.apikey}&pageSize=40`
        const response = await fetch(this.latestNewsBase + query)
        const data = await response.json()
        return data
    }
    async getPopularNews(){
        const response = await fetch(this.popularBase + this.apikey)
        const data = await response.json()
        return data
    }
}
