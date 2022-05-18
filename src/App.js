import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import ToDoList from "./Components/Todolist/ToDoList";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import AllTasks from "./Components/AllTasks/AllTasks";
import { signOut } from "firebase/auth";
import auth from "./firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <>
      {authUser && (
        <button
          onClick={async () => {
            await signOut(auth);
          }}
          className=" absolute top-10 right-10 btn btn-sm btn-error text-white"
        >
          logout
        </button>
      )}
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
            <Route
              path="/all-tasks"
              element={
                <RequireAuth>
                  <AllTasks />
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

// https://todolist-45574.web.app/
