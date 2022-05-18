import { signOut } from "firebase/auth";
import React from "react";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const ToDoList = () => {
  const [authUser] = useAuthState(auth);
  const handleTaskForm = async (event) => {
    event.preventDefault();

    const userEmail = authUser.email;
    const taskName = event.target.name.value;
    const taskDesc = event.target.desc.value;
    const task = { userEmail, taskName, taskDesc };

    await fetch(`http://localhost:5000/tasks`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast("Task Added");
        }
      });
    event.target.reset();
  };

  return (
    <div className=" lg:max-w-lg md:max-w-md mx-auto my-20 px-5">
      <button
        onClick={async () => {
          await signOut(auth);
          toast.success("Logged Out!!!");
        }}
        className=" absolute top-10 right-10 btn btn-sm btn-error text-white"
      >
        logout
      </button>
      <div className="flex justify-between items-center">
        <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
          To Do List
        </h2>
        <button className="btn btn-sm mt-[-25px]">See all task</button>
      </div>
      <form onSubmit={handleTaskForm}>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <br />
        <textarea
          name="desc"
          className="textarea textarea-bordered mb-5 w-full max-w-lg"
          placeholder="Task Description"
        ></textarea>
        <br />
        <button className="btn btn-success w-full text-white mt-2">
          add task
        </button>
      </form>
    </div>
  );
};

export default ToDoList;
