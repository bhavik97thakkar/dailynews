handlePevBtn = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=25b4367aa8014b4888e0a809157e8a8f&page=${this.state.page - 1}`; //news api link top headlines of india
    let data = await fetch(url); // using fetch api through async await async await returns promise
    let parsedData = await data.json();
    console.log(parsedData); //itself a promise of data
    // this.setState({}) //old articles to new articles ie static way from appending all the json data to array to fetching data from url through fetch api
    // console.log("next button ");
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
    })
}

handleNextBtn = async () => {
    console.log("next")
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=25b4367aa8014b4888e0a809157e8a8f&page=${this.state.page + 1}`; //news api link top headlines of india
    let data = await fetch(url); // using fetch api through async await async await returns promise
    let parsedData = await data.json();
    console.log(parsedData); //itself a promise of data
    // this.setState({}) //old articles to new articles ie static way from appending all the json data to array to fetching data from url through fetch api
    // console.log("next button ");
    this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
    })

}