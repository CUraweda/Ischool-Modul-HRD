import React, { useState } from 'react';

const DetailPenggajianPage: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen(!isModalOpen);
	};

	return (
		<div className="bg min-h-screen p-5">
			{/* Header */}
			<div className="mb-3 text-xl font-bold">Penggajian</div>
			<div className="breadcrumbs mb-5 text-sm">
				<ul>
					<li>Penggajian</li>
					<li>Detail Penggajian</li>
				</ul>
			</div>

			{/* Card for Date and Export Button */}
			<div className="rounded-lg bg-white p-5 shadow-lg">
				<div className="mb-5 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="border-1 rounded-full border-solid border-gray-950 p-3 text-neutral-content">
							<span className="material-icons">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="#416AC0"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
									/>
								</svg>
							</span>
						</div>
						<div className="text-lg font-bold">Juni 2024</div>
					</div>
					<button className="btn btn-outline btn-primary">Export ke excel</button>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>Nama</th>
								<th>Gaji Tetap</th>
								<th>Gaji Tidak Tetap</th>
								<th>Pinjaman</th>
								<th>Koperasi</th>
								<th>Status</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							{/* Repeat these rows dynamically */}
							<tr>
								<td>Alya Putri Azzahra</td>
								<td>Rp 1.750.000</td>
								<td>Rp 350.000</td>
								<td className="text-red-500">-Rp 20.000</td>
								<td>-</td>
								<td>
									<span className="badge badge-warning">Tunda</span>
								</td>
								<td>
									<div className="cursor-pointer font-semibold text-blue-400" onClick={handleModal}>
										Lihat Detail
									</div>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th colSpan={6}>Total Karyawan</th>
								<th>42</th>
							</tr>
							<tr>
								<th colSpan={6}>Total Jumlah</th>
								<th>Rp 431.034.365</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			{/* Detail Modal */}
			<input
				type="checkbox"
				id="detailPenggajianModal"
				className="modal-toggle"
				checked={isModalOpen}
				onChange={handleModal}
			/>
			<div className="modal">
				<div className="modal-box w-11/12 max-w-6xl">
					<div className="space-y-6">
						{/* Employee Info */}
						<div className="flex justify-between border-b pb-3">
							<div>
								<p>
									<strong>Nama:</strong> Alya Putri Azzahra
								</p>
								<p>
									<strong>Jabatan:</strong> Sekretaris
								</p>
							</div>
							<div className="text-right">
								<p>
									<strong>Juni 2024</strong>
								</p>
							</div>
						</div>

						{/* Salary Details */}
						<div className="grid grid-cols-2 gap-10">
							{/* Pendapatan */}
							<div>
								<h3 className="border-b pb-2 text-lg font-semibold">PENDAPATAN</h3>
								<div className="mt-3 space-y-2">
									<div>
										<p className="font-semibold">Gaji Tetap</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Gaji Pokok</span>
												<span>Rp 750.000</span>
											</p>
											<p className="flex justify-between">
												<span>Tunjangan Hari Raya</span>
												<span>-</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Gaji Tidak Tetap</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Tunjangan Transportasi</span>
												<span>Rp 750.000</span>
											</p>
											<p className="flex justify-between">
												<span>Tunjangan Jabatan</span>
												<span>-</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Fasilitas</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Makan Siang</span>
												<span>Rp 250.000</span>
											</p>
											<p className="flex justify-between">
												<span>BPJS</span>
												<span>Rp 750.000</span>
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Potongan */}
							<div>
								<h3 className="border-b pb-2 text-lg font-semibold">POTONGAN</h3>
								<div className="mt-3 space-y-2">
									<div>
										<p className="font-semibold">Pinjaman</p>
										<div className="space-y-1 border-l-4 border-red-500 pl-2">
											<p className="flex justify-between">
												<span>Pinjaman</span>
												<span className="text-red-500">-Rp 250.000</span>
											</p>
											<p className="flex justify-between">
												<span>Pinjaman</span>
												<span className="text-red-500">-Rp 250.000</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Koperasi</p>
										<div className="space-y-1 border-l-4 border-red-500 pl-2">
											<p className="flex justify-between">
												<span>Simpanan Sukarela</span>
												<span className="text-red-500">-Rp 250.000</span>
											</p>
											<p className="flex justify-between">
												<span>Simpanan Wajib</span>
												<span className="text-red-500">-Rp 250.000</span>
											</p>
											<p className="flex justify-between">
												<span>Cicilan Belanja</span>
												<span className="text-red-500">-Rp 250.000</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Total */}
						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">TOTAL</h3>
							<p className="text-right font-semibold">Rp 1.750.000</p>
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="detailPenggajianModal" className="btn" onClick={handleModal}>
							Tutup
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPenggajianPage;
