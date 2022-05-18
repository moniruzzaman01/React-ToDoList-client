import React from "react";

const ToDoList = () => {
  return (
    <div className=" lg:max-w-lg md:max-w-md mx-auto my-20 px-5">
      <h2 className=" text-2xl text-white font-bold">To Do List</h2>
      <form>
        <br />
        <input
          type="text"
          name="email"
          placeholder="Task Name"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <br />
        <textarea
          class="textarea textarea-bordered mb-5 w-full max-w-lg"
          placeholder="Task Description"
        ></textarea>
        <br />
        <button className="btn btn-accent w-full text-white mt-2">
          add task
        </button>
      </form>
    </div>
  );
};

export default ToDoList;
