import { useState } from 'react';
import { Form } from '@/middlewares/api';
import Swal from 'sweetalert2';

const FormDataPage = () => {
	const [files, setFiles] = useState<any[]>([]);
	const [profilePhoto, setProfilePhoto] = useState<any>(null);
	const [profilePhotoFile, setProfilePhotoFile] = useState<any>(null);
	const [educationCards, setEducationCards] = useState([
		{
			degree: '',
			major: '',
			city: '',
			instituion: '',
			startDate: '',
			endDate: '',
			description: '',
		},
	]);
	const [workExperienceCards, setWorkExperienceCards] = useState([
		{
			workPosition: '',
			city: '',
			workGift: '',
			startDate: '',
			endDate: '',
			description: '',
		},
	]);
	const [nonFormalEducationCards, setNonFormalEducationCards] = useState([{ description: '' }]);
	const [achievementsCards, setAchievementsCards] = useState([{ description: '', date: '' }]);
	const [skillsCards, setSkillsCards] = useState([{ skills: '', level: '' }]);

	// Data Pribadi state
	const [fullName, setFullName] = useState('');
	const [nik, setNik] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [gender, setGender] = useState('');
	const [birthPlace, setBirthPlace] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [religion, setReligion] = useState('');
	const [maritalStatus, setMaritalStatus] = useState('');
	const [profilDesc, setProfilDesc] = useState('');
	const [visionDesc, setVisionDesc] = useState('');
	const [reasonDesc, setReasonDesc] = useState('');
	const [questionDesc, setQuestionDesc] = useState('');

	const createFileDesc = (identifier: string, fileList: any[]) => {
		return fileList.map((_, index) => ({
			Identifier: identifier,
			index: index,
		}));
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const uploadedFiles = Array.from(event.target.files);
			setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

			createFileDesc('appreciation', uploadedFiles);
		}
	};

	const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setProfilePhotoFile(file);

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
		setEducationCards([
			...educationCards,
			{
				degree: '',
				major: '',
				city: '',
				instituion: '',
				startDate: '',
				endDate: '',
				description: '',
			},
		]);
	};

	const handleEducationChange = (index: number, field: string, value: string) => {
		const updatedCards = educationCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setEducationCards(updatedCards);
	};

	const removeEducationCard = (index: number) => {
		const updatedCards = educationCards.filter((_, i) => i !== index);
		setEducationCards(updatedCards);
	};

	const addWorkExperienceCard = () => {
		setWorkExperienceCards([
			...workExperienceCards,
			{
				workPosition: '',
				city: '',
				workGift: '',
				startDate: '',
				endDate: '',
				description: '',
			},
		]);
	};

	const removeExperienceCard = (index: number) => {
		const updatedCards = workExperienceCards.filter((_, i) => i !== index);
		setWorkExperienceCards(updatedCards);
	};

	const handleWorkExperienceChange = (index: number, field: string, value: string) => {
		const updatedCards = workExperienceCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setWorkExperienceCards(updatedCards);
	};

	const addNonFormalEducationCard = () => {
		setNonFormalEducationCards([...nonFormalEducationCards, { description: '' }]);
	};

	const removeNonFormalCard = (index: number) => {
		const updatedCards = nonFormalEducationCards.filter((_, i) => i !== index);
		setNonFormalEducationCards(updatedCards);
	};

	const handleNonFormalEducationChange = (index: number, field: string, value: string) => {
		const updatedCards = nonFormalEducationCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setNonFormalEducationCards(updatedCards);
	};

	const addAchievementsCard = () => {
		setAchievementsCards([...achievementsCards, { description: '', date: '' }]);
	};

	const removeAchievementCard = (index: number) => {
		const updatedCards = achievementsCards.filter((_, i) => i !== index);
		setAchievementsCards(updatedCards);
	};

	const handleAchievementsChange = (index: number, field: string, value: string) => {
		const updatedCards = achievementsCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setAchievementsCards(updatedCards);
	};

	const addSkillsCard = () => {
		setSkillsCards([...skillsCards, { skills: '', level: '' }]);
	};

	const removeSkillsCard = (index: number) => {
		const updatedCards = skillsCards.filter((_, i) => i !== index);
		setSkillsCards(updatedCards);
	};

	const handleSkillsChange = (index: number, field: string, value: string) => {
		const updatedCards = skillsCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setSkillsCards(updatedCards);
	};

	const PostFormData = async () => {
		const educationData = educationCards.map((card) => ({
			degree: card.degree,
			major: card.major,
			city: card.city,
			instituion: card.instituion,
			start_date: card.startDate,
			end_date: card.endDate,
			description: card.description,
		}));

		const workExperienceData = workExperienceCards.map((card) => ({
			position: card.workPosition,
			city: card.city,
			start_date: card.startDate,
			end_date: card.endDate,
			company: card.workGift,
			description: card.description,
		}));

		const nonFormalEducationData = nonFormalEducationCards.map((card) => ({
			description: card.description,
		}));

		const achievementsData = achievementsCards.map((card) => ({
			description: card.description,
			date: card.date,
		}));

		const skillsData = skillsCards.map((card) => ({
			description: card.skills,
			level: card.level,
		}));

		const profilePhotoDesc = profilePhotoFile ? createFileDesc('applicant_profile', [profilePhotoFile]) : [];
		const achievementsFileDescs = createFileDesc('appreciation', files);

		const user_id = sessionStorage.getItem('id');
		const vacancyId = sessionStorage.getItem('vacancy_id');

		const data = {
			user_id: user_id,
			vacancy_id: vacancyId,
			full_name: fullName,
			email: email,
			phone: phone,
			nik: nik,
			pob: birthPlace,
			dob: birthDate,
			religion: religion,
			martial_status: maritalStatus,
			address: address,
			city: city,
			applicant_description: profilDesc,
			details: {
				academic: educationData,
				job: workExperienceData,
				unformal: nonFormalEducationData,
				appreciation: achievementsData,
				skill: skillsData,
			},
			applicant_vision: visionDesc,
			applicant_reason: reasonDesc,
			applicant_question: questionDesc,
			files: [...(profilePhotoFile ? [profilePhotoFile] : []), ...files],
			file_desc: [...profilePhotoDesc, ...achievementsFileDescs],
		};
		try {
			await Form.PostDataPelamar(data);
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Sukses Menambahkan data Rekrutmen',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	return (
		<div className="flex flex-col items-center space-y-6">
			{/* Data Pribadi Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Data Pribadi</h2>
				<div className="mb-4 flex items-center gap-6">
					<div className="avatar flex h-60 w-60 items-center justify-center rounded-md bg-gray-300">
						<img
							src={profilePhoto ? profilePhoto : 'https://via.placeholder.com/64'}
							alt="Avatar"
							className="cursor-pointer rounded-md"
							onClick={handleImageClick}
						/>
					</div>
					<div className="flex w-full flex-col gap-5">
						<div className="w-full">
							<div className="text-gray-800">Nama lengkap</div>
							<input
								type="text"
								placeholder="Nama depan"
								className="input input-bordered w-full"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>
						<div className="w-full">
							<div className="text-gray-800">Alamat email</div>
							<input
								type="text"
								placeholder="Alamat email"
								className="input input-bordered w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="w-full">
							<div className="text-gray-800">No. Telepon</div>
							<input
								type="text"
								placeholder="No. Telepon"
								className="input input-bordered w-full"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* Additional Fields */}
				<div className="mb-4">
					<label className="label text-gray-700">NIK</label>
					<input
						type="text"
						placeholder="NIK"
						className="input input-bordered w-full"
						value={nik}
						onChange={(e) => setNik(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Alamat</label>
					<input
						type="text"
						placeholder="Alamat"
						className="input input-bordered w-full"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Kota</label>
					<input
						type="text"
						placeholder="Kota"
						className="input input-bordered w-full"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				{/* New Fields */}
				<div className="mb-4">
					<label className="label text-gray-700">Gender</label>
					<select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
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
					<input
						type="text"
						placeholder="Tempat Lahir"
						className="input input-bordered w-full"
						value={birthPlace}
						onChange={(e) => setBirthPlace(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Tanggal Lahir</label>
					<input
						type="date"
						className="input input-bordered w-full"
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Agama</label>
					<input
						type="text"
						placeholder="Agama"
						className="input input-bordered w-full"
						value={religion}
						onChange={(e) => setReligion(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="label text-gray-700">Status Perkawinan</label>
					<select
						className="select select-bordered w-full"
						value={maritalStatus}
						onChange={(e) => setMaritalStatus(e.target.value)}
					>
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
					<textarea
						placeholder="Deskripsi diri"
						className="textarea textarea-bordered h-32 w-full"
						onChange={(e) => setProfilDesc(e.target.value)}
					></textarea>
				</div>
			</div>

			{/* Education Cards */}
			{educationCards.map((card, index) => (
				<div key={index} className="card relative mb-4 w-full rounded-lg bg-white p-6 shadow">
					{educationCards.length > 1 && index !== 0 && (
						<button className="absolute right-2 top-2" onClick={() => removeEducationCard(index)}>
							✕
						</button>
					)}

					<h2 className="mb-4 text-lg font-bold text-gray-700">Pendidikan</h2>
					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="label text-gray-700">Gelar</label>
							<select
								className="select select-bordered w-full"
								onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
							>
								<option value="">Gelar</option>
								<option value="SMP">SMP</option>
								<option value="SMA">SMA</option>
								<option value="SMK">SMK</option>
								<option value="D4">D4</option>
								<option value="S1">S1</option>
								<option value="S2">S2</option>
								<option value="S3">S3</option>
							</select>
							{/* <input
								type="text"
								placeholder="Gelar"
								className="input input-bordered w-full"
								value={card.degree}
								onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
							/> */}
						</div>
						<div>
							<label className="label text-gray-700">Jurusan</label>
							<input
								type="text"
								placeholder="Jurusan"
								className="input input-bordered w-full"
								value={card.major}
								onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Kota</label>
						<input
							type="text"
							placeholder="Kota"
							className="input input-bordered w-full"
							value={card.city}
							onChange={(e) => handleEducationChange(index, 'city', e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Sekolah</label>
						<input
							type="text"
							placeholder="Sekolah"
							className="input input-bordered w-full"
							value={card.instituion}
							onChange={(e) => handleEducationChange(index, 'instituion', e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="label text-gray-700">Tanggal mulai</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="label text-gray-700">Tanggal selesai</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
									required
								/>
							</div>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea
							placeholder="Deskripsi"
							className="textarea textarea-bordered h-24 w-full"
							value={card.description}
							onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
						></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addEducationCard}>
				<span className="mr-2">➕</span> Tambah Pendidikan
			</button>

			{/* Work Experience Cards */}
			{workExperienceCards.map((card, index) => (
				<div key={index} className="card relative mb-4 w-full rounded-lg bg-white p-6 shadow">
					{workExperienceCards.length > 1 && index !== 0 && (
						<button className="absolute right-2 top-2" onClick={() => removeExperienceCard(index)}>
							✕
						</button>
					)}
					<h2 className="mb-4 text-lg font-bold text-gray-700">Pengalaman Kerja</h2>
					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="label text-gray-700">Posisi kerja</label>
							<input
								type="text"
								placeholder="Posisi kerja"
								className="input input-bordered w-full"
								value={card.workPosition}
								onChange={(e) => handleWorkExperienceChange(index, 'workPosition', e.target.value)}
							/>
						</div>
						<div>
							<label className="label text-gray-700">Kota</label>
							<input
								type="text"
								placeholder="Kota"
								className="input input-bordered w-full"
								value={card.city}
								onChange={(e) => handleWorkExperienceChange(index, 'city', e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Pemberi pekerjaan/perusahaan</label>
						<input
							type="text"
							placeholder="Pemberi pekerjaan/perusahaan"
							className="input input-bordered w-full"
							value={card.workGift}
							onChange={(e) => handleWorkExperienceChange(index, 'workGift', e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="label text-gray-700">Tanggal mulai</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="label text-gray-700">Tanggal selesai</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
									required
								/>
							</div>
						</div>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea
							placeholder="Deskripsi"
							className="textarea textarea-bordered h-24 w-full"
							value={card.description}
							onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
						></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addWorkExperienceCard}>
				<span className="mr-2">➕</span> Tambah Pengalaman Kerja
			</button>

			{/* Non-Formal Education Cards */}
			{nonFormalEducationCards.map((card, index) => (
				<div className="card relative w-full rounded-lg bg-white p-6 shadow" key={index}>
					{nonFormalEducationCards.length > 1 && index !== 0 && (
						<button className="absolute right-2 top-2" onClick={() => removeNonFormalCard(index)}>
							✕
						</button>
					)}
					<h2 className="mb-4 text-lg font-bold text-gray-700">Pendidikan Non-Formal</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea
							placeholder="Deskripsi"
							className="textarea textarea-bordered h-32 w-full"
							value={card.description}
							onChange={(e) => handleNonFormalEducationChange(index, 'description', e.target.value)}
						></textarea>
					</div>
				</div>
			))}
			<button className="btn btn-outline w-full text-blue-500" onClick={addNonFormalEducationCard}>
				<span className="mr-2">➕</span> Tambah Pendidikan Non-Formal
			</button>

			{/* Achievements Cards */}
			{achievementsCards.map((card, index) => (
				<div className="card relative w-full rounded-lg bg-white p-6 shadow" key={index}>
					{/* Conditionally render the remove button */}
					{achievementsCards.length > 1 && (
						<button className="absolute right-2 top-2 text-red-500" onClick={() => removeAchievementCard(index)}>
							✕
						</button>
					)}
					<h2 className="mb-4 text-lg font-bold text-gray-700">Prestasi/Penghargaan</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Deskripsi</label>
						<textarea
							placeholder="Deskripsi"
							className="textarea textarea-bordered h-32 w-full"
							value={card.description}
							onChange={(e) => handleAchievementsChange(index, 'description', e.target.value)}
						></textarea>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Periode</label>
						<input
							type="date"
							className="w-full rounded border border-gray-300 p-2"
							onChange={(e) => handleAchievementsChange(index, 'date', e.target.value)}
							required
						/>
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
			{skillsCards.map((card, index) => (
				<div className="card relative w-full rounded-lg bg-white p-6 shadow" key={index}>
					{skillsCards.length > 1 && index !== 0 && (
						<button className="absolute right-2 top-2" onClick={() => removeSkillsCard(index)}>
							✕
						</button>
					)}
					<h2 className="mb-4 text-lg font-bold text-gray-700">Keahlian</h2>
					<div className="mb-4">
						<label className="label text-gray-700">Keahlian</label>
						<input
							type="text"
							name="skill"
							placeholder="Keahlian"
							className="input input-bordered w-full"
							value={card.skills}
							onChange={(e) => handleSkillsChange(index, 'skills', e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="label text-gray-700">Level</label>
						<select
							name="level"
							className="select select-bordered w-full"
							value={card.level}
							onChange={(e) => handleSkillsChange(index, 'level', e.target.value)}
						>
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
					<textarea
						placeholder="Deskripsi"
						className="textarea textarea-bordered h-32 w-full"
						onChange={(e) => setVisionDesc(e.target.value)}
					></textarea>
				</div>
			</div>

			{/* Reason for Applying Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Alasan Melamar</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi</label>
					<textarea
						placeholder="Deskripsi"
						className="textarea textarea-bordered h-32 w-full"
						onChange={(e) => setReasonDesc(e.target.value)}
					></textarea>
				</div>
			</div>

			{/* What Will You Do if Accepted Card */}
			<div className="card w-full rounded-lg bg-white p-6 shadow">
				<h2 className="mb-4 text-lg font-bold text-gray-700">Apa yang akan anda lakukan bila diterima oleh kami?</h2>
				<div className="mb-4">
					<label className="label text-gray-700">Deskripsi</label>
					<textarea
						placeholder="Deskripsi"
						className="textarea textarea-bordered h-32 w-full"
						onChange={(e) => setQuestionDesc(e.target.value)}
					></textarea>
				</div>
			</div>

			<button className="btn btn-primary" onClick={PostFormData}>
				Submit
			</button>
		</div>
	);
};

export default FormDataPage;
