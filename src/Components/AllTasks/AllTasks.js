import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Spinner from "../Spinner/Spinner";

const AllTasks = () => {
  const [authUser] = useAuthState(auth);
  const [css, setCss] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = authUser?.email;
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery(["tasks", email], () =>
    fetch(`https://to-do-app-nine-tau.vercel.app/api/v1/tasks/${email}`).then(
      (res) => res.json()
    )
  );

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(`https://to-do-app-nine-tau.vercel.app/api/v1/tasks/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.deletedCount === 1) {
          toast.warning("Task Deleted");
          await refetch();
        }
      });
    setLoading(false);
  };

  if (isLoading || loading) {
    return <Spinner />;
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
              {/* strike through ei feature ta last moment e mne hoise so backend er sathe connect kra hoy ni. */}
              <td className={`${css && "line-through"} `}>{task.taskName}</td>
              <td className={`${css && "line-through"} `}>{task.taskDesc}</td>
              <td>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-xs btn-error text-white mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setCss(true)}
                  className="btn btn-xs btn-success text-white"
                >
                  Complete
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
