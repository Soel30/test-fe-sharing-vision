import React, { useEffect } from 'react';
import Main from '../components/Main';
import Alert from '../components/Alert';
import ApiConfig from '../constant/api';
import { Link, useFetcher, useNavigate, useParams } from 'react-router-dom';

const EditPosts = () => {
    const [title, setTitle] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [content, setContent] = React.useState('')
    const [error, setError] = React.useState("")
    const navigate = useNavigate()
    const { id } = useParams()
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }

    const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        setContent(e.target.value)
    }

    const getDataById = async () => {
        try {
            const res = await fetch(ApiConfig.api_url + '/articles/' + id)
            const data = await res.json()
            if (data.message && data.message == "Internal Server Error") {
                navigate('/posts')
            }
            setTitle(data.title)
            setCategory(data.category)
            setContent(data.content)

        } catch (error) {
            console.log("error", error)
        }
    }

    const updatePost = async () => {
        try {
            const res = await fetch(ApiConfig.api_url + '/articles/' + id,{
                method: 'PUT', 
                body: JSON.stringify({
                    title,
                    category,
                    content,
                    status: 'Publish'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await res.json()
            if (data.message && data.message.length > 0) {
                let htmlError = ""
                for (let i = 0; i < data.message.length; i++) {
                    htmlError += `<li style="list-style:circle">${data.message[i]}</li>`
                }
                setError(htmlError)
            } else {
                navigate('/posts')
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const updateDraftPost = async () => {
        try {
            const res = await fetch(ApiConfig.api_url + '/articles/' + id,{
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    category,
                    content,
                    status: 'Draft'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await res.json()
            if (data.message && data.message.length > 0) {
                let htmlError = ""
                for (let i = 0; i < data.message.length; i++) {
                    htmlError += `<li style="list-style:circle">${data.message[i]}</li>`
                }
                setError(htmlError)
            } else {
                navigate('/posts')
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getDataById()
    }, [])

    return (
        <Main>
            <Alert show={error != ""}>
                <ul dangerouslySetInnerHTML={{ __html: error }}></ul>
            </Alert>
            <h1 className="text-2xl font-semibold text-gray-900 mt-4">Add New</h1>
            <div className="border-b border-solid border-gray-300 my-4"></div>
            <form action="">
                <div className='mb-3'>
                    <label htmlFor="title" className="text-sm leading-5 font-medium text-gray-700 mb-2">Title</label>
                    <input name="title" id='title' type="text" placeholder="Title" className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" onChange={handleTitle} value={title} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="category" className="text-sm leading-5 font-medium text-gray-700 mb-2">Category</label>
                    <input name="category" id='category' type="text" placeholder="Category" className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" onChange={handleCategory} value={category}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="content" className="text-sm leading-5 font-medium text-gray-700 mb-2">Content</label>
                    <textarea name="content" id='content' rows={10} placeholder="Content" className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" onChange={handleContent} value={content}></textarea>
                </div>
                <button type="button" className="mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-500 to-violet-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white" onClick={updatePost}>
                    Publish
                </button>
                <button type="button" className="mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-orange-500 to-yellow-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white" onClick={updateDraftPost}>Draft</button>
                <Link to="/posts" className="inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-red-500 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white">
                    Cancel
                </Link>
            </form>
        </Main>
    )
}

export default EditPosts