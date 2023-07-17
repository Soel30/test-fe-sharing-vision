import React from "react";

const Header = () => {
    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main="" navbar-scroll="false">
            <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                    <div className="flex items-center md:ml-auto md:pr-4">
                        <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                            <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header