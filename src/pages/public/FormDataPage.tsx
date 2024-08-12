import React, { useState } from 'react';

const FormDataPage = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [profilePhoto, setProfilePhoto] = useState<any>(null);
	const [educationCards, setEducationCards] = useState([{}]);
	const [workExperienceCards, setWorkExperienceCards] = useState([{}]);
	const [nonFormalEducationCards, setNonFormalEducationCards] = useState([{}]);
	const [achievementsCards, setAchievementsCards] = useState([{}]);
	const [skillsCards, setSkillsCards] = useState([{}]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFiles([...files, ...Array.from(event.target.files)]);
		}
	};

	const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePhoto(reader.result);
			};
			if (file) {
				reader.readAsDataURL(file);
			}
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setFiles([...files, ...Array.from(event.dataTransfer.files)]);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleImageClick = () => {
		document.getElementById('profilePhotoInput')?.click();
	};

	const addEducationCard = () => {
		setEducationCards([...educationCards, {}]);
	};

	const addWorkExperienceCard = () => {
		setWorkExperienceCards([...workExperienceCards, {}]);
	};

	const addNonFormalEducationCard = () => {
		setNonFormalEducationCards([...nonFormalEducationCards, {}]);
	};

	const addAchievementsCard = () => {
		setAchievementsCards([...achievementsCards, {}]);
	};

	const addSkillsCard = () => {
		setSkillsCards([...skillsCards, {}]);
	};

	return (
		<div className="flex flex-col items-center space-y-6">
			{/* Data Pribadi Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Data Pribadi</h2>
				<div className="mb-4 flex items-center gap-6">
					<div className="avatar flex h-64 w-64 items-center justify-center rounded-md bg-gray-300">
						<img
							src={profilePhoto ? profilePhoto : 'https://via.placeholder.com/64'}
							alt="Avatar"
							className="cursor-pointer rounded-md"
							onClick={handleImageClick}
						/>
					</div>
					<div className="flex w-full flex-col gap-5">
						<div className="w-full">
							<div className="font-bold text-gray-800">Nama depan</div>
							<input type="text" placeholder="Nama depan" className="input input-bordered w-full" />
						</div>
						<div className="mt-md">
							<div className="font-bold text-gray-800">Nama belakang</div>
							<input type="text" placeholder="Nama belakang" className="input input-bordered w-full" />
						</div>
						<div className="w-full">
							<div className="font-bold text-gray-800">Alamat email</div>
							<input type="text" placeholder="Alamat email" className="input input-bordered w-full" />
						</div>
					</div>
				</div>

				{/* Additional Fields */}
				<div className="mb-4">
					<label className="label text-gray-700">Judul</label>
					<input type="text" placeholder="Judul" className="input input-bordered w-full" />
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">No. Telepon</label>
					<input type="text" placeholder="No. Telepon" className="input input-bordered w-full" />
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Alamat</label>
					<input type="text" placeholder="Alamat" className="input input-bordered w-full" />
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="label text-gray-700">Kode Pos</label>
						<input type="text" placeholder="Kode Pos" className="input input-bordered w-full" />
					</div>
					<div>
						<label className="label text-gray-700">Kota</label>
						<input type="text" placeholder="Kota" className="input input-bordered w-full" />
					</div>
				</div>
				{/* New Fields */}
				<div className="mb-4">
					<label className="label text-gray-700">Gender</label>
					<select className="select select-bordered w-full">
						<option value="" disabled>
							Pilih Gender
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Tempat Lahir</label>
					<input type="text" placeholder="Tempat Lahir" className="input input-bordered w-full" />
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Tanggal Lahir</label>
					<input type="date" className="input input-bordered w-full" />
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Agama</label>
					<input type="text" placeholder="Agama" className="input input-bordered w-full" />
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Status Perkawinan</label>
					<select className="select select-bordered w-full">
						<option value="" disabled>
							Pilih Status
						</option>
						<option value="Single">Single</option>
						<option value="Married">Married</option>
						<option value="Divorced">Divorced</option>
					</select>
				</div>
				{/* Hidden File Input */}
				<input
					type="file"
					id="profilePhotoInput"
					className="hidden"
					onChange={handleProfilePhotoChange}
					accept="image/*"
				/>
			</div>

			{/* Profile Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Profil</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi diri</label>
					<textarea placeholder="Deskripsi diri" className="textarea textarea-bordered h-32 w-full"></textarea>
				</div>
			</div>

			{/* Education Cards */}
			{educationCards.map((_, index) => (
				<div key={index} className="card mb-4 w-full rounded-lg bg-white p-6 shadow">
					<h2 className="mb-4 text-lg font-bold text-gray-700">Pendidikan</h2>
					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="label text-gray-700">Gelar</label>
							<input type="text" placeholder="Gelar" className="input input-bordered w-full" />
						</div>
						<div>
							<label className="label text-gray-700">Kota</label>
							<input type="text" placeholder="Kota" className="input input-bordered w-full" />
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Sekolah</label>
						<input type="text" placeholder="Sekolah" className="input input-bordered w-full" />
					</div>
					<div className="mb-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="label text-gray-700">Tanggal mulai</label>
								<div className="grid grid-cols-2 gap-2">
									<input type="text" placeholder="Bulan" className="input input-bordered w-full" />
									<input type="text" placeholder="Tahun" className="input input-bordered w-full" />
								</div>
							</div>
							<div>
								<label className="label text-gray-700">Tanggal selesai</label>
								<div className="grid grid-cols-2 gap-2">
									<input type="text" placeholder="Bulan" className="input input-bordered w-full" />
									<input type="text" placeholder="Tahun" className="input input-bordered w-full" />
								</div>
							</div>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-24 w-full"></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addEducationCard}>
				<span className="mr-2">➕</span> Tambah Pendidikan
			</button>

			{/* Work Experience Cards */}
			{workExperienceCards.map((_, index) => (
				<div key={index} className="card mb-4 w-full rounded-lg bg-white p-6 shadow">
					<h2 className="mb-4 text-lg font-bold text-gray-700">Pengalaman Kerja</h2>
					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="label text-gray-700">Posisi kerja</label>
							<input type="text" placeholder="Posisi kerja" className="input input-bordered w-full" />
						</div>
						<div>
							<label className="label text-gray-700">Kota</label>
							<input type="text" placeholder="Kota" className="input input-bordered w-full" />
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Pemberi pekerjaan/perusahaan</label>
						<input type="text" placeholder="Pemberi pekerjaan/perusahaan" className="input input-bordered w-full" />
					</div>
					<div className="mb-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="label text-gray-700">Tanggal mulai</label>
								<div className="grid grid-cols-2 gap-2">
									<input type="text" placeholder="Bulan" className="input input-bordered w-full" />
									<input type="text" placeholder="Tahun" className="input input-bordered w-full" />
								</div>
							</div>
							<div>
								<label className="label text-gray-700">Tanggal selesai</label>
								<div className="grid grid-cols-2 gap-2">
									<input type="text" placeholder="Bulan" className="input input-bordered w-full" />
									<input type="text" placeholder="Tahun" className="input input-bordered w-full" />
								</div>
							</div>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-24 w-full"></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addWorkExperienceCard}>
				<span className="mr-2">➕</span> Tambah Pengalaman Kerja
			</button>

			{/* Non-Formal Education Cards */}
			{nonFormalEducationCards.map((_, index) => (
				<div className="card w-full rounded-lg bg-white p-6 shadow" key={index}>
					<h2 className="mb-4 text-lg font-bold text-gray-700">Pendidikan Non-Formal</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-32 w-full"></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addNonFormalEducationCard}>
				<span className="mr-2">➕</span> Tambah Pendidikan Non-Formal
			</button>

			{/* Achievements Cards */}
			{achievementsCards.map((_, index) => (
				<div className="card w-full rounded-lg bg-white p-6 shadow" key={index}>
					<h2 className="mb-4 text-lg font-bold text-gray-700">Prestasi/Penghargaan</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-32 w-full"></textarea>
					</div>
					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="label text-gray-700">Periode</label>
							<input type="text" placeholder="Bulan" className="input input-bordered w-full" />
						</div>
						<div>
							<label className="label text-gray-700">&nbsp;</label>
							<input type="text" placeholder="Tahun" className="input input-bordered w-full" />
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">
							Upload bukti prestasi/penghargaan. Sertifikat, piala, atau lainnya
						</label>
						<div
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							className="flex h-32 items-center justify-center rounded border-2 border-dashed border-gray-300 p-4"
						>
							<input
								type="file"
								multiple
								id="achievementsUpload"
								className="input-file absolute opacity-0"
								onChange={handleFileUpload}
							/>
							<p className="text-gray-600">Drag and drop files here, or click to select files</p>
						</div>
						<ul className="mt-4">
							{files.length > 0 &&
								files.map((file, index) => (
									<li key={index} className="text-sm text-gray-700">
										{file.name}
									</li>
								))}
						</ul>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addAchievementsCard}>
				<span className="mr-2">➕</span> Tambah Penghargaan
			</button>

			{/* Skills Cards */}
			{skillsCards.map((_, index) => (
				<div className="card w-full rounded-lg bg-white p-6 shadow" key={index}>
					<h2 className="mb-4 text-lg font-bold text-gray-700">Keahlian</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Keahlian</label>
						<input type="text" name="skill" placeholder="Keahlian" className="input input-bordered w-full" />
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Level</label>
						<select name="level" className="select select-bordered w-full">
							<option value="" disabled>
								Pilih Level
							</option>
							<option value="Beginner">Beginner</option>
							<option value="Intermidate">Intermidate</option>
							<option value="Senior">Senior</option>
						</select>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addSkillsCard}>
				<span className="mr-2">➕</span> Tambah Kemampuan
			</button>

			{/* Life Vision Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Visi Hidup</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi</label>
					<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-32 w-full"></textarea>
				</div>
			</div>

			{/* Reason for Applying Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Alasan Melamar</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi</label>
					<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-32 w-full"></textarea>
				</div>
			</div>

			{/* What Will You Do if Accepted Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Apa yang akan anda lakukan bila diterima oleh kami?</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi</label>
					<textarea placeholder="Deskripsi" className="textarea textarea-bordered h-32 w-full"></textarea>
				</div>
			</div>
		</div>
	);
};

export default FormDataPage;
