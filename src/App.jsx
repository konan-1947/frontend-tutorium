import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Feature from './components/Feature'

const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Hero/>
            {/* <Feature/> */}
        </BrowserRouter>
    )
}

export default App
