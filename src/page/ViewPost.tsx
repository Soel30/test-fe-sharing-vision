import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiConfig from "../constant/api";
import Main from "../components/Main";

const ViewPost = () => {
    const { id } = useParams();
    const [title, setTitle] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();

    const getDataById = async () => {
        try {
            const res = await fetch(ApiConfig.api_url + "/articles/" + id);
            const data = await res.json();
            if (data.message && data.message == "Internal Server Error") {
                navigate("/posts");
            }
            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getDataById();
    }, []);

    return (
        <Main>
            <div className="px-4 py-5 flex-auto">
                <h6 className="text-xl font-semibold">{title}</h6>
                <p className="mt-2 mb-4 text-gray-600">{category}</p>
                <p className="mt-2 mb-4 text-gray-600">{content}</p>
            </div>
            <div className="px-4 py-3 flex-auto flex flex-row-reverse">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/")}
                >
                    Back
                </button>
            </div>
        </Main>
    );
}

export default ViewPost;
