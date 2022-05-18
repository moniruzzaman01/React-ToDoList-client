import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const { data: tasks, isLoading } = useQuery("tasks", () =>
    fetch(`http://localhost:5000/tasks`).then((res) => res.json())
  );
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
              <td>{task.taskName}</td>
              <td>{task.taskDesc}</td>
              <td>
                <button className="btn btn-xs btn-error text-white">
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
