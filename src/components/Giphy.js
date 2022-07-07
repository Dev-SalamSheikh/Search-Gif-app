/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFristItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFristItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "NHjbFkjzg5zcGz9GP0x4KTg3CXdAr3pA",
          },
        });

        setData(results.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }
    };
    fetchData();
  }, []);

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show d-flex justify-content-center"
          role="alert"
        >
          There is an error...! Please try again in few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "NHjbFkjzg5zcGz9GP0x4KTg3CXdAr3pA",
          q: search,
        },
      });
      setData(results.data.data);
      setIsLoading(false);
      setSearch("");
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form className="form-inline justify-content-center m-3">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search Gifs"
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Search
        </button>
      </form>
      <Paginate
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        totalItems={data.length}
        pageSelected={pageSelected}
      />
      <div className="container gifs">
        {isLoading ? (
          <Loader />
        ) : (
          currentItems.map((element) => {
            return (
              <div id={element.id} className="gif">
                <img src={element.images.fixed_height.url} alt="" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Giphy;
