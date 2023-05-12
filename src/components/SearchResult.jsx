import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";


const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  const fetchSearchResults = () => {
    setLoading(true);
    
    fetchDataFromApi(`search/?q=${searchQuery}`)
    .then(resp => {
      // console.log(resp);
      setResult(resp?.contents);
      setLoading(false);
    })
  }

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);



  return (
    <div className="flex flex-row h-[calc(100% - 56px)] overflow-y-auto">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map(item => {
            if(item?.type !== "video") return false;

            return (
              <SearchResultVideoCard key={item?.video?.videoId+Math.random()} video={item?.video} />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult;
