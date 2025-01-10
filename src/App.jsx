import { BrowserRouter } from "react-router-dom"
import './index.css';
import {HomePage,Navbar, About,Footer} from "./components"

const App=() =>{
  return (
<BrowserRouter>
<div className="relative z-0 bg-blue overflow-x-hidden">
  <div className="bg-hero-pattern bg-cover">
    <Navbar />
    <HomePage />
    <About />
  </div>

  <div className="relative z-0"></div>
  {/* <Contact/> */}
  {/* <StarsCanvas/> */}
  <Footer />
</div>
</BrowserRouter>
  )
}

export default App