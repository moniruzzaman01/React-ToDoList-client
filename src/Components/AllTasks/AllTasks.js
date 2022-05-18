import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AllTasks = () => {
  const [authUser] = useAuthState(auth);
  const email = authUser?.email;
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery(["tasks", email], () =>
    fetch(`http://localhost:5000/tasks/${email}`).then((res) => res.json())
  );

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          toast.success("Task Deleted");
          refetch();
        }
      });
  };

  if (isLoading) {
    return;
  }

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Desciption</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, key) => (
            <tr key={key}>
              <th>{key + 1}</th>
              {/* <td>{task._id}</td> */}
              <td>{task.taskName}</td>
              <td>{task.taskDesc}</td>
              <td>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-xs btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/todo" className="btn btn-sm mt-10">
        Go to add task
      </Link>
    </div>
  );
};

export default AllTasks;
