import React, { useState, useEffect } from "react";
import Table from "./Table";
import ApiConfig from "../constant/api";
const Tab = () => {
    const [data, setData] = useState([]);

    const [activeTab, setActiveTab] = useState(1);
    const [limit, setLimit] = useState(10);
    const [nextPage, setNextPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);

    const toggle = (tab: number) => {
        // if (activeTab !== tab) setActiveTab(tab);
        if (activeTab !== tab) {
            setActiveTab(tab);
            if (tab === 1) {
                getPublished();
            } else if (tab === 2) {
                getDrafts();
            } else if (tab === 3) {
                getTrash();
            }
        }
    };

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
        } catch (error) {
            console.log(error);
        }
    };

    const getDrafts = async (page = 1) => {
        try {
            const res = await fetch(ApiConfig.api_url + "/articles?status=Draft&limit=" + limit + "&page=" + page, {
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
        } catch (error) {
            console.log(error);
        }
    };

    const getTrash = async (page = 1) => {
        try {
            const res = await fetch(ApiConfig.api_url + "/articles?status=Thrash&limit=" + limit + "&page=" + page, {
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
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextPage = (page: number) => {
        if (activeTab === 1) {
            getPublished(page);
        } else if (activeTab === 2) {
            getDrafts(page);
        } else if (activeTab === 3) {
            getTrash(page);
        }
    };

    const handlePrevPage = (page: number) => {
        if (activeTab === 1) {
            getPublished(page);
        } else if (activeTab === 2) {
            getDrafts(page);
        } else if (activeTab === 3) {
            getTrash(page);
        }
    };

    const handleChangPageByNumber = (page: number) => {
        if (activeTab === 1) {
            getPublished(page);
        } else if (activeTab === 2) {
            getDrafts(page);
        } else if (activeTab === 3) {
            getTrash(page);
        }
    };

    useEffect(() => {
        getPublished();

    }, []);

    return (
        <>
            <div className="relative">
                <ul className="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl">
                    <li className="z-30 flex-auto text-center">
                        <a className={` ${activeTab === 1 ? 'tab-tem-active' : 'tab-tem'}`} onClick={() => { toggle(1); }} >
                            <span className="ml-1">Published</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center">
                        <a className={` ${activeTab === 2 ? 'tab-tem-active' : 'tab-tem'}`} onClick={() => { toggle(2); }} >
                            <span className="ml-1">Drafts</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center">
                        <a className={` ${activeTab === 3 ? 'tab-tem-active' : 'tab-tem'}`} onClick={() => { toggle(3); }} >

                            <span className="ml-1">Trashed </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-4 p-3">
                <div className={`${activeTab === 1 ? '' : 'hidden'}`}>
                    <Table data={data} />
                </div>
                <div className={`${activeTab === 2 ? '' : 'hidden'}`}>
                    <Table data={data} />
                </div>
                <div className={`${activeTab === 3 ? '' : 'hidden'}`}>
                    <Table data={data} tabId={3} />
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between ">
                    <a
                        onClick={() => handlePrevPage(prevPage)}
                        className={`${prevPage === 0 ? "bg-gray-100" : "inline-flex bg-white cursor-pointer hover:bg-gray-50"} relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700`}>Previous</a>
                    <a
                        onClick={() => handleNextPage(nextPage)}
                        className={`${nextPage === 0 ? "bg-gray-100" : "inline-flex bg-white cursor-pointer hover:bg-gray-50"} ml-3 relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700`}>Next</a>
                </div>
            </div>        </>
    )
}

export default Tab;
