import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { Header, Footer, Loading } from "./components/index";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import DBservices from "./appwrite/DBConfig";
import { updateStorePosts } from "./store/postSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });

    DBservices.getPosts()
      .then((posts) => {
        if (posts) {
          dispatch(updateStorePosts({ posts: posts.documents }));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}

export default App;
