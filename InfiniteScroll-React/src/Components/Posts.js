/**
 *
 * Posts.js
 * @author Shaik Noory
 * @description Infinite Scroll of Posts.
 *
 */

//Core
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


// Begin Component
const Post = () => {
  const [postData, setPostData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  
  //options object created for date format
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
    timeZone: "Asia/Kolkata",
  };

  //Fetching Posts from Backend Server
  const getData = async (page) => {
    try {
      if (page !== currentPage-1) {
        const response = await axios.get(`/users?page=${page}`);
        const newData = response.data.nodes;
        setPostData((prevData) => [...prevData, ...newData]);
        setCurrentPage(page);
      }
    } catch (err) {
      setHasMore(false);
      setError(err);
    }
  };

  useEffect(() => {
    getData(currentPage);//API call 
  }, []);

  return (
    <div className="container">
        
      <InfiniteScroll  //Using Infinite scroll component
        dataLength={postData.length}
        next={() => getData(currentPage + 1)}
        hasMore={true}
        loader={hasMore ? <h4>Loading...</h4> : null}
      >
        {postData.length > 0 &&
          postData.map((item, index) => (
            <div key={index} className="post-container">
              <div className="Image-container">
                <img
                  src={item.node.field_photo_image_section}
                  alt="image of a post"
                  className="image"
                />
              </div>
              <div className="title-container">
                <h3>{item.node.title}</h3>
                <p>
                  {new Date(item.node.last_update * 1000).toLocaleString(
                    "en-US",
                    options
                  )}
                </p>
                <span><b>Author: </b>{item.node.author_name}</span>
               
              </div>
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Post;
// End of the Component