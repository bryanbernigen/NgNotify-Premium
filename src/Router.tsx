import { BrowserRouter, Route, Routes } from "react-router-dom";
// import FourOhFour from "./pages/FourOhFour/FourOhFour";
import App from "./App";
import DetailSong from "./pages/DetailSong/DetailSong";
import ManageSong from "./pages/ManageSong/ManageSong";
import ListUsers from "./pages/ListUsers/ListUsers";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ListSubscription from "./pages/ListSubscription/ListSubscription";
import AddSong from "./pages/AddSong/AddSong";
import EditSong from "./pages/EditSong/EditSong";
import UserSubscribe from "./pages/UserSubscribe/UserSubscribe";

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
    path: "/detailsong",
    element: <DetailSong />,
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
  },
  {
    path: "/usersubscribe",
    element: <UserSubscribe />,
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