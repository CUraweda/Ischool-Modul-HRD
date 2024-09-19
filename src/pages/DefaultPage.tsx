import { Default } from '@/middlewares/api';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

interface FileUploadProps {
	label: string;
	instructions: string;
	uploadedFile: File | null;
	setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
	rejectedFiles: FileRejection[];
	setRejectedFiles: React.Dispatch<React.SetStateAction<FileRejection[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
	label,
	instructions,
	uploadedFile,
	setUploadedFile,
	rejectedFiles,
	setRejectedFiles,
}) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/jpeg': [], 'image/png': [] },
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024,
		onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			setUploadedFile(acceptedFiles[0] || null);
			setRejectedFiles(fileRejections);
		},
	});

	const employee_id = sessionStorage.getItem('employee_id');
	const FetchData = async () => {
		try {
			const response = await Default.GetFileEmployee(employee_id);
			console.log(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	// const UploadFIle = async () => {
	// 	const data = {
	// 		employee_id: employee_id,
	// 	};
	// 	try {
	// 		await Default.UploadFile(data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	useEffect(() => {
		FetchData();
	}, []);

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

			{/* Display the uploaded file */}
			{uploadedFile && (
				<div className="mt-2 text-sm text-green-500">
					Uploaded file: <strong>{uploadedFile.name}</strong>
				</div>
			)}

			{/* Display rejected file message */}
			{rejectedFiles.length > 0 && (
				<div className="mt-2 text-sm text-red-500">
					File rejected: {rejectedFiles.map((rejection) => rejection.file.name).join(', ')}
				</div>
			)}
		</div>
	);
};

const DefaultPage: React.FC = () => {
	// State for each input
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

	return (
		<div className="rounded-lg bg-blue-50 p-6">
			<div className="mb-4 rounded-md bg-gray-100 p-4 text-center">
				Silahkan lakukan pelengkapan berkas dibawah ini untuk kebutuhan karyawan baru
			</div>

			<FileUpload
				label="1. KK (Kartu Keluarga)"
				instructions="*Silahkan upload file asli kartu keluarga dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile1}
				setUploadedFile={setUploadedFile1}
				rejectedFiles={rejectedFiles1}
				setRejectedFiles={setRejectedFiles1}
			/>

			<FileUpload
				label="2. Ijazah"
				instructions="*Silahkan upload file asli Ijazah dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile2}
				setUploadedFile={setUploadedFile2}
				rejectedFiles={rejectedFiles2}
				setRejectedFiles={setRejectedFiles2}
			/>

			<FileUpload
				label="3. NPWP"
				instructions="*Silahkan upload file asli NPWP dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile3}
				setUploadedFile={setUploadedFile3}
				rejectedFiles={rejectedFiles3}
				setRejectedFiles={setRejectedFiles3}
			/>

			<FileUpload
				label="4. Akta Kelahiran"
				instructions="*Silahkan upload file asli Akta Kelahiran dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile4}
				setUploadedFile={setUploadedFile4}
				rejectedFiles={rejectedFiles4}
				setRejectedFiles={setRejectedFiles4}
			/>

			<FileUpload
				label="5. KTP"
				instructions="*Silahkan upload file asli KTP dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile5}
				setUploadedFile={setUploadedFile5}
				rejectedFiles={rejectedFiles5}
				setRejectedFiles={setRejectedFiles5}
			/>

			<FileUpload
				label="6. BPJS/KISS"
				instructions="*Silahkan upload file asli BPJS/KISS dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile6}
				setUploadedFile={setUploadedFile6}
				rejectedFiles={rejectedFiles6}
				setRejectedFiles={setRejectedFiles6}
			/>

			<FileUpload
				label="7. Sertifikat Pelatihan"
				instructions="*Silahkan upload file asli Sertifikat Pelatihan dalam bentuk jpg/png, ukuran file max 2 mb."
				uploadedFile={uploadedFile7}
				setUploadedFile={setUploadedFile7}
				rejectedFiles={rejectedFiles7}
				setRejectedFiles={setRejectedFiles7}
			/>
		</div>
	);
};

export default DefaultPage;
