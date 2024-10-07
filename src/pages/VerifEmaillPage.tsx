import { Verif } from '@/middlewares/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const VerifEmailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const VerifEmail = async () => {
		try {
			await Verif.PostVerify(null, id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNavigate = () => {
		navigate('/login');
	};

	useEffect(() => {
		VerifEmail();
	}, []);
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
				<h2 className="mb-4 text-center text-2xl font-bold">Verifikasi Email</h2>
				<p className="mb-6 text-center text-gray-600">
					Kami telah mengirimkan email verifikasi ke alamat email Anda. Silakan periksa inbox Anda dan klik tautan
					verifikasi untuk melanjutkan.
				</p>
				<div className="flex items-center justify-center">
					<button className="btn btn-primary mb-2" onClick={handleNavigate}>
						Kembali ke halaman utama
					</button>
				</div>
			</div>
		</div>
	);
};

export default VerifEmailPage;
