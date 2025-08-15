import { BrowserRouter, Route, Routes } from "react-router"
import MainLayout from "./layouts/MainLayout"
import Home from "./interfaces/Home"
import Album from "./interfaces/Album"



function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="album/:albumId" element={<Album/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
