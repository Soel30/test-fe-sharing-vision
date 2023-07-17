import './App.css'
import Main from './components/Main'
import Tab from './components/Tab'
import { Outlet, Link } from "react-router-dom";


function App() {
  return (
    <Main sidebar>
      <div className='mb-5'>
        <Link to={'/posts/add-new'} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 text-sm px-4 rounded mb-3">
          Add New
        </Link>
      </div>
      <Tab />
    </Main>
  )
}

export default App
