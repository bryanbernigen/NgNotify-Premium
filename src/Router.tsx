import { BrowserRouter, Route, Routes } from "react-router-dom";
// import FourOhFour from "./pages/FourOhFour/FourOhFour";
import App from "./App";
import AddData from "./pages/AddData/AddData";
import Albums from "./pages/Albums/Albums";
import DetailAlbum from "./pages/DetailAlbum/DetailAlbum";
import DetailSong from "./pages/DetailSong/DetailSong";
import Home from "./pages/Home/Home";
import ListUsers from "./pages/ListUsers/ListUsers";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SearchSortFilter from "./pages/SearchSortFilter/SearchSortFilter";

let pages = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/listusers",
    element: <ListUsers />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/searchsortfilter",
    element: <SearchSortFilter />,
  },
  {
    path: "/adddata",
    element: <AddData />,
  },
  {
    path: "/albums",
    element: <Albums />,
  },
  {
    path: "/detailalbum",
    element: <DetailAlbum />,
  },
  {
    path: "/detailsong",
    element: <DetailSong />,
  },
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {pages.map((page, index) => {
                    return <Route key={index} path={page.path} element={page.element} />;
                })}
                {/* <Route path="*" element={<FourOhFour />} /> */}
            </Routes>
        </BrowserRouter>
    );
};
  
export default Router;