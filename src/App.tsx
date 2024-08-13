import React from 'react';
import { Provider } from 'react-redux';
import { reduxStore } from './config'; // Ensure you import the correct store configuration
import AppRoutes from '@/router/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
	return (
		<Provider store={reduxStore}>
			<div className="App">
				<AppRoutes />
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
			</div>
		</Provider>
	);
};

export default App;
