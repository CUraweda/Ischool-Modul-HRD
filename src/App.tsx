import { Provider } from 'react-redux';
import { reduxStore } from './config';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import router from './router';

function App() {
	return (
		<Provider store={reduxStore}>
			<RouterProvider router={router} />

			{/* react toastify  */}
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="colored"
				toastClassName={'!rounded-2xl !pe-6 !w-fit !mx-auto !font-inter font-bold !py-0 !min-h-14'}
				closeButton={false}
			/>
		</Provider>
	);
}

export default App;
