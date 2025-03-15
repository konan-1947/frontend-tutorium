import '../../assets/css/home.css'

import Footer from '../../components/Home/Footer'
import Navbar from '../../components/becometutor/NavbarBecomeTutor'
import HowtoSignUp from '../../components/becometutor/HowtoSignup'
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
