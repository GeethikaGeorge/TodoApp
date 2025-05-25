// // import { useAuth0 } from '@auth0/auth0-react';

// // function App() {
// //   const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

// //   if (isLoading) return <div>Loading...</div>;

// //   return (
// //     <div className="p-4">
// //       {!isAuthenticated ? (
// //         <button onClick={() => loginWithRedirect()}>Log in</button>
// //       ) : (
// //         <>
// //           <p>Welcome, {user?.name}</p>
// //           <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
// //             Log out
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// // export default App;
// import { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// function App() {
//   const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await getAccessTokenSilently();
//         const res = await fetch('/api/tasks', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         setTasks(data);
//       } catch (err) {
//         console.error('Failed to fetch tasks:', err);
//       }
//     };

//     if (isAuthenticated) {
//       fetchTasks();
//     }
//   }, [isAuthenticated, getAccessTokenSilently]);

//   if (!isAuthenticated) {
//     return <button onClick={() => loginWithRedirect()}>Log in</button>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {user?.name}</h1>
//       <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>

//       <h2>Your Tasks</h2>
//       <ul>
//         {tasks.map((task: any) => (
//           <li key={task._id}>{task.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

//second edit
// import { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import TaskDashboard from './components/TaskDashboard';

// function App() {
//   const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const fetchTasks = async () => {
//     try {
//       const token = await getAccessTokenSilently();
//       const res = await fetch('/api/tasks', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setTasks(data);
//     } catch (err) {
//       console.error('Failed to fetch tasks:', err);
//     }
//   };

//   const handleCreateTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = await getAccessTokenSilently();
//       const res = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: newTask }),
//       });

//       if (res.ok) {
//         setNewTask('');
//         fetchTasks(); // reload tasks
//       } else {
//         console.error('Failed to create task');
//       }
//     } catch (err) {
//       console.error('Error creating task:', err);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchTasks();
//     }
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {
//     return <button onClick={() => loginWithRedirect()}>Log in</button>;
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Welcome, {user?.name}</h1>
//       <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>

//       <h2>Your Tasks</h2>

//       <form onSubmit={handleCreateTask}>
//         <input
//           type="text"
//           placeholder="New task title"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           required
//         />
//         <button type="submit">Add Task</button>
//       </form>

//       <ul>
//         {tasks.map((task: any) => (
//           <li key={task._id}>{task.title}</li>
//         ))}
//       </ul>
//        <TaskDashboard />
//     </div>
//   );
// }

// export default App;

// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardPage from './pages/DashboardPage';

import { ErrorBoundary } from 'react-error-boundary';
function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Log in
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
