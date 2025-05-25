

// CLIENT/src/pages/DashboardPage.tsx
import React from 'react';
import TaskList from '../components/TaskList';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';


const DashboardPage: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskContext: 'a college student' }), // optional context
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        toast.success('Suggestions fetched!');
      } else {
        toast.error('No suggestions found');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch suggestions');
    }
    setLoading(false);
  };
  return (
    <>
  <div className="flex justify-end m-8">
     <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition "
        >
          Log out
        </button>
  </div>
       
      <h1 className="text-3xl font-bold text-center my-4">To do</h1>
      <TaskList />
       <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition m-8"
      >
        {loading ? 'Loading...' : 'Suggest Tasks'}
      </button>

      <ul className="mt-4 list-disc pl-6 space-y-1 text-gray-800">
        {suggestions.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
     
    </>
  );
};

export default DashboardPage;
