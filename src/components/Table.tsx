import React from "react";
import { Link, Route } from "react-router-dom";
import ApiConfig from "../constant/api";

interface TableProps {
    data?: any;
    tabId?: number;
}

const Table = (props: TableProps) => {
    const [newData, setNewData] = React.useState<any>([])
    const deletePost = async (id: number) => {
        try {
            const res = await fetch(ApiConfig.api_url + '/articles/' + id, {
                method: 'DELETE',
            })
            const data = await res.json()
            if (data.message && data.message.length > 0 && data.message == 'Internal Server Error') {
                alert(data.message)
            } else {
                alert(data.message)
                const newDatax = props.data.filter((item: any) => item.ID !== id)
                setNewData(newDatax)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    React.useEffect(() => {
        setNewData(props.data)
    }, [props.data])
    return (
        <>
            <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500 table-fixed">
                <thead className="align-bottom w-full">
                    <tr>
                        <th className="px-6 py-3 w-full font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Title</th>
                        <th className="px-6 py-3 w-full pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Category</th>
                        {props.tabId != 3 ? (

                            <th className="px-6 py-3 w-full pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Action</th>
                        ) : (
                            <></>
                        )}
                    </tr>
                </thead>
                <tbody className="align-bottom">
                    {newData?.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="p-2 align-middle  truncate bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent text-sm">
                                {item.title}
                            </td>
                            <td className="p-2 align-middle truncate bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent text-sm">
                                {item.category}
                            </td>
                            <td className="p-2 text-sm  leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                {/* <button className="px-2 py-1 mr-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-500 hover:bg-slate-600 hover:shadow-md focus:outline-none">
                                Edit
                            </button>
                            <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-red-500 hover:bg-red-600 hover:shadow-md focus:outline-none">
                                Delete
                            </button> */}
                                {item.status != "Thrash" ? (
                                    <>
                                        <Link to={`/post/edit/${item.ID}`} className="px-2 py-1 mr-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-500 hover:bg-slate-600 hover:shadow-md focus:outline-none">
                                            Edit
                                        </Link>
                                        <button onClick={() => deletePost(item.ID)} className="px-2 py-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-red-500 hover:bg-red-600 hover:shadow-md focus:outline-none">
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table;