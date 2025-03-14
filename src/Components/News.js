import React, { useEffect } from "react";
import { useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    document.title = `NewsHub - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line 
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page +
      1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
console.log('arti le', articles)
  return (
    <>
      <h1 className="text-center" style={{ margin: "70px 0px 15px 0px" }}>
        NewsHub - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 4500) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 200)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  // country: "in",
  pageSize: 15,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// code by chatGPT ////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import NewsItem from "./NewsItem";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// function News(props) {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const { country = "in", pageSize = 9, category = "general" } = props;

//   useEffect(() => {
//     document.title = `NewsHub - ${capitalizeFirstLetter(category)}`;
//   }, [category]);

//   useEffect(() => {
//     updateNews();
//   }, [country, pageSize, category]);

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const updateNews = async () => {
//     props.setProgress(10);
//     setLoading(true);
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     setArticles((prevArticles) =>
//       page === 1 ? parsedData.articles : [...prevArticles, ...parsedData.articles]
//     );
//     setTotalResults(parsedData.totalResults);
//     setLoading(false);
//     props.setProgress(100);
//   };

//   const fetchMoreData = async () => {
//     setPage(page + 1);
//   };

//   return (
//     <>
//       <h1
//         className="text-center"
//         style={{ margin: "70px 0px 15px 0px" }}
//       >
//         NewsHub - Top {capitalizeFirstLetter(category)} Headlines
//       </h1>
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length < totalResults}
//       >
//         <div className="container">
//           <div className="row">
//             {articles.map((element) => {
//               return (
//                 <div className="col-md-4" key={element.url}>
//                   <NewsItem
//                     title={element.title ? element.title.slice(0, 4500) : ""}
//                     description={
//                       element.description
//                         ? element.description.slice(0, 100)
//                         : ""
//                     }
//                     imageUrl={element.urlToImage}
//                     newsUrl={element.url}
//                     author={element.author}
//                     date={element.publishedAt}
//                     source={element.source.name}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           {loading && <h2>Loading...</h2>}
//         </div>
//       </InfiniteScroll>
//     </>
//   );
// }

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

// export default News;
