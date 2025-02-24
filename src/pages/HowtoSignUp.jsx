import '../assets/css/home.css'

import Footer from '../components/Home/Footer'
import Navbar from '../components/HowtoSignup/Navbar'
import HowtoSignUp from '../components/HowtoSignup/HowtoSignup'
const Home = () => {
    return (
        <div className='home-overflow'>
                <Navbar />
                <HowtoSignUp />
                <Footer /> 
        </div>
    )
}

export default Home
