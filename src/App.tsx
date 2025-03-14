import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Sidebar from "./layout/Sidebar/Sidebar";
import Header from "./layout/Header/Header";
import SidebarRight from "./layout/SidebarRight/SidebarRight";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAllBlogs, setMyBlogs } from "./redux/features/blogSlice";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs, getUserBlogs } from "./api/blogsApi/blogsApi";
function App() {
  console.log("inside of App")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data: allBlogs} = useQuery({queryKey: ['allBlogs'], queryFn:getAllBlogs})
  const {data: myBlogs} = useQuery({queryKey: ['myBlogs'], queryFn:getUserBlogs})

  useEffect(() => {
    
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      if (!token) {
        navigate("/login");
      }
            
      dispatch(setAllBlogs(allBlogs));
      dispatch(setMyBlogs(myBlogs));

      const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') as string)

      !isLoggedIn && toast.success("Successful login!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    };
    fetchData();
  }, [allBlogs, myBlogs]);
  
  
  return (
    <>
      <div className="flex">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-[0.7] ml-4">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
          <Header />
          <span className="p-4 mx-4">
            <Outlet />
          </span>
        </div>
        <div className="flex-[0.3]">
          <SidebarRight />
        </div>
      </div>
    </>
  );
}

export default App;
