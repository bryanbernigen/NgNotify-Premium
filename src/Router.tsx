import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ManageSong from "./pages/ManageSong/ManageSong";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ListSubscription from "./pages/ListSubscription/ListSubscription";
import AddSong from "./pages/AddSong/AddSong";
import EditSong from "./pages/EditSong/EditSong";

let pages = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/managesong",
    element: <ManageSong />,
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
    path: "/listsubscription",
    element: <ListSubscription />,
  },
  {
    path: "/addsong",
    element: <AddSong />,
  },
  {
    path: "/editsong",
    element: <EditSong />,
  }
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