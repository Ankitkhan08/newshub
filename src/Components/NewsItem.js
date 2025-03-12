import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  console.log('desc', description)
  const options = { day: "numeric", month: "short", year: "numeric" };
  return (
    <div className="my-3 ">
      <div className="card" style={{ height: "500px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            left: "0",
          }}
        >
          <span className="badge bg-danger ">{source}</span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://cdn.ndtv.com/common/images/ogndtv.png"
              : imageUrl
          } width={250} height={200} 
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {/* <p className="card-text">{description} ...</p> */}
          <p className="card-text">
            <small className="text-body-secondary">
              -by <strong>{author ? author : "Unknown"}</strong> on{" "}
              <strong>
                {new Date(date).toLocaleDateString("en-US", options)}
              </strong>
            </small>
          </p>
          <a
            rel="noopener noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
            style={{position:'absolute', bottom:'30px'}}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
