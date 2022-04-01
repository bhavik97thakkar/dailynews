import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {  //defining constructor and making articles state
        super(props);
        // console.log("i am a constructor")
        this.state = {
            articles: [],
            // articles:this.articles,
            loading: true,
            page: 1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyNews`;

    }

    async updateNews() {
        this.props.setProgress(5);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url); // using fetch api through async await async await returns promise
        let parsedData = await data.json();
        //console.log(parsedData); //itself a promise of data
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        }) //old articles to new articles ie static way from appending all the json data to array to fetching data from url through fetch api
        this.props.setProgress(100);
    }

    async componentDidMount() { //componentDidMount is a lifecycle method

        this.updateNews();
    }

    // handlePevBtn = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25b4367aa8014b4888e0a809157e8a8f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; //news api link top headlines of india
    //     // let data = await fetch(url); // using fetch api through async await async await returns promise
    //     // this.setState({ loading: true });
    //     // let parsedData = await data.json();
    //     // //console.log(parsedData); //itself a promise of data
    //     // // this.setState({ articles: parsedData.articles }) //old articles to new articles ie static way from appending all the json data to array to fetching data from url through fetch api
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     // // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) { //if not of statement

    //     // //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25b4367aa8014b4888e0a809157e8a8f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; //news api link top headlines of india
    //     // //     this.setState({ loading: true });
    //     // //     let data = await fetch(url); // using fetch api through async await async await returns promise
    //     // //     let parsedData = await data.json();
    //     // //     //console.log(parsedData); //itself a promise of data
    //     // //     // this.setState({ articles: parsedData.articles }) //old articles to new articles ie static way from appending all the json data to array to fetching data from url through fetch api
    //     // //     this.setState({
    //     // //         page: this.state.page + 1,
    //     // //         articles: parsedData.articles,
    //     // //         loading: false
    //     //     })


    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async()=>{
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        let data = await fetch(url); // using fetch api through async await async await returns promise
        let parsedData = await data.json();
        console.log(parsedData); //itself a promise of data
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
            
        })    
    }

    render() {

        return (
            <>
            
            <h3 className='my-4 text-center' >DailyNews - Top <strong>{this.capitalizeFirstLetter(this.props.category)}</strong> Headlines </h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
            <div className='container my-2'>
                    <div className="row">
                        {this.state.articles.map((element) => { //we can loop articles through this.state.article
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem title={element ? element.title : ""} description={element ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}
                </>
        )
    }
}

export default News
