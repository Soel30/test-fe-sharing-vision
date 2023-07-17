import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";


interface Props {
    children?: React.ReactNode;
    sidebar?: boolean;
}

const Main = (props: Props) => {
    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        if (props.sidebar) {
            setSidebar(true);
        }
    }, [props.sidebar]);
    return (
        <div className="mb-10 h-screen">
            <div className="absolute w-full bg-blue-500 dark:hidden min-h-75 left-0 top-0"></div>
            {/* <Sidebar /> */}
            <div className={`${sidebar ? 'block' : 'hidden'}`}>
                <Sidebar />
            </div>
            <main className={`${sidebar ? 'xl:ml-68' : ''} relative h-full min-h-screen transition-all duration-200 ease-in-out rounded-xl`}>
                <div className="w-full px-6 py-6 mx-auto">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-full max-w-full px-3">
                            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-gray-50 border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                <div className="p-6 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}

export default Main;