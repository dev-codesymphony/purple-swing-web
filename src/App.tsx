import './App.css';
import AppRouter from './router/router';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<AppRouter />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme="colored"
				pauseOnHover
			/>
		</>
	);
}

export default App;
