import '../../assets/css/home.css'

import Footer from '../../components/Home/Footer'
import Navbar from '../../components/Home/NavbarHome'
import TutorRegister from '../../components/becometutor/TutorRegister/Main'
const Home = () => {
    return (
        <div className='home-overflow'>
                <Navbar />
                <TutorRegister />
        
        </div>
    )
}

export default Home
