import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AturGajiPage = () => {
	return (
		<div className="h-screen">
			<div className="mb-5 flex items-center justify-between">
				<h1 className="text-lg font-bold">Penggajian</h1>
			</div>

			<div className="flex flex-col gap-2">
				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Gaji Tetap</h3>
							<div className="flex items-center gap-3">
								<select className="select select-xs w-full max-w-[10rem] text-black">
									<option disabled>Pilih Divisi</option>
									<option>Svelte</option>
									<option>Vue</option>
									<option>React</option>
								</select>
								<button className="btn btn-primary btn-xs">Tambah</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>No</th>
										<th>Divisi</th>
										<th>Total Seluruh Gaji Perbulan</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
										<td>1</td>
										<td>Cy Ganderton</td>
										<td>Quality Control Specialist</td>
										<td className="flex items-center gap-2">
											<button className="btn btn-warning">
												<FaRegEdit color="white" />
											</button>
											<button className="btn btn-error">
												<RiDeleteBin6Line color="white" />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Gaji Tetap</h3>
							<div className="flex items-center gap-3">
								<select className="select select-xs w-full max-w-[10rem] text-black">
									<option disabled>Pilih Divisi</option>
									<option>Svelte</option>
									<option>Vue</option>
									<option>React</option>
								</select>
								<button className="btn btn-primary btn-xs">Tambah</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>Divisi</th>
										<th>Total Seluruh Gaji Perbulan</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
										<td>Cy Ganderton</td>
										<td>Quality Control Specialist</td>
										<td className="flex items-center gap-2">
											<button className="btn btn-warning">
												<FaRegEdit color="white" />
											</button>
											<button className="btn btn-error">
												<RiDeleteBin6Line color="white" />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Gaji Tetap</h3>
							<div className="flex items-center gap-3">
								<select className="select select-xs w-full max-w-[10rem] text-black">
									<option disabled>Pilih Divisi</option>
									<option>Svelte</option>
									<option>Vue</option>
									<option>React</option>
								</select>
								<button className="btn btn-primary btn-xs">Tambah</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>Divisi</th>
										<th>Total Seluruh Gaji Perbulan</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
										<td>Cy Ganderton</td>
										<td>Quality Control Specialist</td>
										<td className="flex items-center gap-2">
											<button className="btn btn-warning">
												<FaRegEdit color="white" />
											</button>
											<button className="btn btn-error">
												<RiDeleteBin6Line color="white" />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Gaji Tetap</h3>
							<div className="flex items-center gap-3">
								<select className="select select-xs w-full max-w-[10rem] text-black">
									<option disabled>Pilih Divisi</option>
									<option>Svelte</option>
									<option>Vue</option>
									<option>React</option>
								</select>
								<button className="btn btn-primary btn-xs">Tambah</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>Divisi</th>
										<th>Total Seluruh Gaji Perbulan</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
										<td>Cy Ganderton</td>
										<td>Quality Control Specialist</td>
										<td className="flex items-center gap-2">
											<button className="btn btn-warning">
												<FaRegEdit color="white" />
											</button>
											<button className="btn btn-error">
												<RiDeleteBin6Line color="white" />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AturGajiPage;
