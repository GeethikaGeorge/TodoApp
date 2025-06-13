import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardPage from './pages/DashboardPage';

import { ErrorBoundary } from 'react-error-boundary';
function App() {
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	if (!isAuthenticated) {
		return (
			<div
				className='h-screen w-screen bg-cover bg-center flex items-center justify-center p-10'
				style={{
					backgroundImage:
						'url(https://wallpapers.com/images/high/anime-cherry-blossom-background-xsla8872vvuaaz88.webp)',
				}}>
				<button
					onClick={() => loginWithRedirect()}
					className='bg-blue-600 text-white px-4 py-2 rounded'>
					Log in
				</button>
			</div>
		);
	}

	return (
		<ErrorBoundary fallback={<p>Something went wrong.</p>}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to='/dashboard' />} />
					<Route path='/dashboard' element={<DashboardPage />} />
				</Routes>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
