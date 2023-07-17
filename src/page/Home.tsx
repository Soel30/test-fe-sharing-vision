import React, { useState, useEffect } from "react";
import { useRoutes, useLocation, Link } from 'react-router-dom'
import ApiConfig from "../constant/api";
import Main from "../components/Main";

const Home = () => {
    const [data, setData] = React.useState([])
    const [nextPage, setNextPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPage, setTotalPage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getPublished = async (page = 1) => {
        try {
            const res = await fetch(ApiConfig.api_url + "/articles?status=Publish&limit=" + limit + "&page=" + page, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            if (json.data.length > 0) {
                setData(json.data);
            }

            setNextPage(json.next_page);
            setPrevPage(json.prev_page);
            setTotalPage(json.total_page);
            setTotalData(json.total_data);
            setCurrentPage(json.page);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPublished();
    }, []);

    return (
        <Main>
            <div className="grid grid-cols-3 gap-4">
                {data.map((item: any, index: number) => (
                    <Link to={`/post/${item.ID}`} key={index} className="border border-gray-200 rounded-md shadow-md p-4">
                        <div className="text-xs text-gray-400">{item.category}</div>
                        <div className="text-xl font-bold">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.created_at}</div>
                        <div className="text-sm text-gray-400">{item.updated_at}</div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-between mt-5">
                <div className="flex">
                    <button
                        className={` text-white font-semibold py-1 px-4 rounded ${prevPage === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}}`}
                        onClick={() => getPublished(prevPage)}
                    >
                        Prev
                    </button>
                    {Array.from(Array(totalPage).keys()).map((item, index) => (
                        <button
                            key={index}
                            className={`text-white font-semibold py-1 px-4 rounded ml-2 ${currentPage === item + 1 ? 'bg-gray-500 hover:bg-blue-700' : 'bg-blue-500 cursor-not-allowed'}}`}
                            onClick={() => getPublished(item + 1)}
                        >
                            {item + 1}
                        </button>
                    ))}
                    <button
                        className={` text-white font-semibold py-1 px-4 rounded ml-2 ${nextPage === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}}`}
                        onClick={() => getPublished(nextPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </Main>
    )
}

export default Home