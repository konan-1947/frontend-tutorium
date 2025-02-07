import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)


/*hầu như sẽ giữ nguyên và không động đến file này */