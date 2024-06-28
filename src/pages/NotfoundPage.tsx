import { notfoundIlust } from '@/assets/images';
import { cn } from '@/utils';
import { Link } from 'react-router-dom';

type Props = {
	className?: string;
};

function NotfoundPage({ className }: Props) {
	return (
		<div className={cn('m-auto mb-6 w-full max-w-96 text-center', className)}>
			<img src={notfoundIlust} className="mx-auto w-full max-w-72" />
			<div className="mb-6">
				<h2>Hilang Arah</h2>
				<p>Halaman yang anda akses tidak ada.</p>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Link to={'/'} className="btn">
					Beranda
				</Link>
				<Link to={'/login'} className="btn btn-primary">
					Login
				</Link>
			</div>
		</div>
	);
}

export default NotfoundPage;
