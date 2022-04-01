import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-1' >
                <div className="card" >
                    <div style={{display:'flex',position:'absolute',justifyContent:'flex-end',right:'0'}}>
                        <span class="badge  bg-danger" >{source}</span>
                    </div>
                    <img src={imgUrl ? imgUrl : "https://www.tibs.org.tw/images/default.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} ... </h5>
                        

                        <p className="card-text">{description} ...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewsItem
