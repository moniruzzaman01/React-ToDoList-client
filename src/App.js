import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import ToDoList from "./Components/Todolist/ToDoList";
import RequireAuth from "./Components/RequireAuth/RequireAuth";

function App() {
  return (
    <>
      <div className=" flex justify-center items-center h-screen text-center">
        <div className=" max-w-md w-full">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/todo"
              element={
                <RequireAuth>
                  <ToDoList />
                </RequireAuth>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
