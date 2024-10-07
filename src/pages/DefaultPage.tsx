import { Default } from '@/middlewares/api';
import React, { useState, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

interface FileUploadProps {
	label: string;
	instructions: string;
	description: string;
	uploadedFile: File | null;
	setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
	rejectedFiles: FileRejection[];
	setRejectedFiles: React.Dispatch<React.SetStateAction<FileRejection[]>>;
	UploadFile: (file: File | null, description: string) => Promise<void>;
	isHidden: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
	label,
	instructions,
	description,
	uploadedFile,
	setUploadedFile,
	rejectedFiles,
	setRejectedFiles,
	UploadFile,
	isHidden, // Baru
}) => {
	if (isHidden) return null;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/jpeg': [], 'image/png': [] },
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024,
		onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			setUploadedFile(acceptedFiles[0] || null);
			setRejectedFiles(fileRejections);
			if (acceptedFiles.length > 0) {
				UploadFile(acceptedFiles[0], description);
			}
		},
	});

	return (
		<div className="mb-6">
			<h1 className="mb-2 text-lg font-semibold">{label}</h1>
			<div
				{...getRootProps()}
				className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-gray-600 ${
					isDragActive ? 'border-blue-500' : 'border-gray-300'
				}`}
			>
				<input {...getInputProps()} />
				<span className="mb-2 text-sm">Drag and drop file here, or click to select file</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="mb-2 h-10 w-10"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
					/>
				</svg>
				<button className="btn btn-ghost">Upload File</button>
			</div>
			<p className="mt-2 text-xs text-gray-500">{instructions}</p>

			{uploadedFile && (
				<div className="mt-2 text-sm text-green-500">
					Uploaded file: <strong>{uploadedFile.name}</strong>
				</div>
			)}

			{rejectedFiles.length > 0 && (
				<div className="mt-2 text-sm text-red-500">
					File rejected: {rejectedFiles.map((rejection) => rejection.file.name).join(', ')}
				</div>
			)}
		</div>
	);
};

const DefaultPage: React.FC = () => {
	const employee_id = sessionStorage.getItem('employee_id');
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

	// State untuk masing-masing file
	const [uploadedFile1, setUploadedFile1] = useState<File | null>(null);
	const [rejectedFiles1, setRejectedFiles1] = useState<FileRejection[]>([]);
	const [uploadedFile2, setUploadedFile2] = useState<File | null>(null);
	const [rejectedFiles2, setRejectedFiles2] = useState<FileRejection[]>([]);
	const [uploadedFile3, setUploadedFile3] = useState<File | null>(null);
	const [rejectedFiles3, setRejectedFiles3] = useState<FileRejection[]>([]);
	const [uploadedFile4, setUploadedFile4] = useState<File | null>(null);
	const [rejectedFiles4, setRejectedFiles4] = useState<FileRejection[]>([]);
	const [uploadedFile5, setUploadedFile5] = useState<File | null>(null);
	const [rejectedFiles5, setRejectedFiles5] = useState<FileRejection[]>([]);
	const [uploadedFile6, setUploadedFile6] = useState<File | null>(null);
	const [rejectedFiles6, setRejectedFiles6] = useState<FileRejection[]>([]);
	const [uploadedFile7, setUploadedFile7] = useState<File | null>(null);
	const [rejectedFiles7, setRejectedFiles7] = useState<FileRejection[]>([]);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const FetchData = async () => {
		try {
			const response = await Default.GetFileEmployee(employee_id);
			const uploadedDescriptions = response.data.data.map((item: any) => item.description);
			setUploadedFiles(uploadedDescriptions); // Baru: Menyimpan deskripsi yang sudah di-upload
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);

	// Fungsi untuk mengupload file
	const UploadFile = async (file: File | null, description: string) => {
		if (!file) return;
		const formData = new FormData();
		formData.append('employee_id', employee_id || '');
		formData.append('file', file);
		formData.append('description', description);

		try {
			await Default.UploadFile(formData, access_token);
			console.log('File uploaded successfully');
			setUploadedFiles((prev) => [...prev, description]);
		} catch (error) {
			console.error('Error uploading file', error);
		}
	};

	return (
		<div className="rounded-lg bg-blue-50 p-6">
			<div className="mb-4 rounded-md bg-gray-100 p-4 text-center">
				Silahkan lakukan pelengkapan berkas dibawah ini untuk kebutuhan karyawan baru
			</div>

			<FileUpload
				label="1. KK (Kartu Keluarga)"
				instructions="*Silahkan upload file asli kartu keluarga dalam bentuk jpg/png, ukuran file max 2 mb."
				description="KK"
				uploadedFile={uploadedFile1}
				setUploadedFile={setUploadedFile1}
				rejectedFiles={rejectedFiles1}
				setRejectedFiles={setRejectedFiles1}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('KK')}
			/>

			<FileUpload
				label="2. Ijazah"
				instructions="*Silahkan upload file asli Ijazah dalam bentuk jpg/png, ukuran file max 2 mb."
				description="Ijazah"
				uploadedFile={uploadedFile2}
				setUploadedFile={setUploadedFile2}
				rejectedFiles={rejectedFiles2}
				setRejectedFiles={setRejectedFiles2}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('Ijazah')}
			/>

			<FileUpload
				label="3. NPWP"
				instructions="*Silahkan upload file asli NPWP dalam bentuk jpg/png, ukuran file max 2 mb."
				description="NPWP"
				uploadedFile={uploadedFile3}
				setUploadedFile={setUploadedFile3}
				rejectedFiles={rejectedFiles3}
				setRejectedFiles={setRejectedFiles3}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('NPWP')}
			/>

			<FileUpload
				label="4. Akta Kelahiran"
				instructions="*Silahkan upload file asli Akta Kelahiran dalam bentuk jpg/png, ukuran file max 2 mb."
				description="Akta Kelahiran"
				uploadedFile={uploadedFile4}
				setUploadedFile={setUploadedFile4}
				rejectedFiles={rejectedFiles4}
				setRejectedFiles={setRejectedFiles4}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('Akta Kelahiran')}
			/>

			<FileUpload
				label="5. Sertifikat Nikah"
				instructions="*Silahkan upload file asli Sertifikat Nikah dalam bentuk jpg/png, ukuran file max 2 mb."
				description="Sertifikat Nikah"
				uploadedFile={uploadedFile5}
				setUploadedFile={setUploadedFile5}
				rejectedFiles={rejectedFiles5}
				setRejectedFiles={setRejectedFiles5}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('Sertifikat Nikah')}
			/>

			<FileUpload
				label="6. BPJS Kesehatan"
				instructions="*Silahkan upload file asli BPJS Kesehatan dalam bentuk jpg/png, ukuran file max 2 mb."
				description="BPJS Kesehatan"
				uploadedFile={uploadedFile6}
				setUploadedFile={setUploadedFile6}
				rejectedFiles={rejectedFiles6}
				setRejectedFiles={setRejectedFiles6}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('BPJS Kesehatan')}
			/>

			<FileUpload
				label="7. BPJS Ketenagakerjaan"
				instructions="*Silahkan upload file asli BPJS Ketenagakerjaan dalam bentuk jpg/png, ukuran file max 2 mb."
				description="BPJS Ketenagakerjaan"
				uploadedFile={uploadedFile7}
				setUploadedFile={setUploadedFile7}
				rejectedFiles={rejectedFiles7}
				setRejectedFiles={setRejectedFiles7}
				UploadFile={UploadFile}
				isHidden={uploadedFiles.includes('BPJS Ketenagakerjaan')}
			/>
		</div>
	);
};

export default DefaultPage;
