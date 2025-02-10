import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home';
import Auth from './pages/Auth';
import FindTutor from './pages/FindTutor';
import Detail from './pages/Detail';
import Cashing from './pages/Cashing';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Profile from './components/Profile';
import User from './routes/User';
createRoot(document.getElementById('root')).render(
  <StrictMode>
 
    <User />
   
  </StrictMode>,
)


/*hầu như sẽ giữ nguyên và không động đến file này */