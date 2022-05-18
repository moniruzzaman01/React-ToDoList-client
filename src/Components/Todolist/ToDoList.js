import React from "react";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const ToDoList = () => {
  const [authUser] = useAuthState(auth);
  const handleTaskForm = async (event) => {
    event.preventDefault();

    const userEmail = authUser.email;
    const taskName = event.target.name.value;
    const taskDesc = event.target.desc.value;
    const task = { userEmail, taskName, taskDesc };

    await fetch(`https://peaceful-waters-86091.herokuapp.com/tasks`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Task Added");
        }
      });
    event.target.reset();
  };

  return (
    <div className=" lg:max-w-lg md:max-w-md mx-auto my-20 px-5">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
          To Do List
        </h2>
        <Link to="/all-tasks" className="btn btn-sm mt-[-25px]">
          See all task
        </Link>
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
