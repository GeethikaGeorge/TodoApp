

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { socket } from '../socket';
type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

const TaskList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] =useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched tasks:', res.data);
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setTasks([]);
      }
    } catch (err) {
      console.error('Error fetching tasks', err);
      setTasks([]); 
    }
  };

  useEffect(() => {
    fetchTasks();

    socket.on('taskCreated', fetchTasks);
    socket.on('taskUpdated', fetchTasks);
    socket.on('taskDeleted', fetchTasks);

    return () => {
      socket.off('taskCreated', fetchTasks);
      socket.off('taskUpdated', fetchTasks);
      socket.off('taskDeleted', fetchTasks);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <form
  className="mb-4 flex gap-2"
  onSubmit={async (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
    const title = input.value.trim();
    if (!title) return;

    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      input.value = '';
    } catch (err) {
      console.error('Error adding task', err);
    }
  }}
>
  <input
    name="title"
    placeholder="New task..."
    className="border p-2 rounded w-full"
  />
  <button type="submit" className="bg-blue-500 text-white px-4 rounded">
    Add
  </button>
</form>

      <ul className="space-y-3">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center border-b pb-2">
              <span>{task.title}</span>
              <span> task completed ? {task.completed ? 'yes' : 'no'}</span>
              <button
              onClick={async () => {
                try {
                  const token = await getAccessTokenSilently();
                  await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                } catch (err) {
                  console.error('Error deleting task', err);
                }
              }}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              Delete task  ❌
            </button>

            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No tasks yet or failed to load.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
