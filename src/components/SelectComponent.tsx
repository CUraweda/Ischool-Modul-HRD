import { useState } from 'react';

interface Option {
	id: string;
	full_name: string;
}

interface CheckboxSelectProps {
	options: Option[];
	selectedOptions: string[];
	onChange: (selected: string[]) => void;
}

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({ options, selectedOptions, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleCheckboxChange = (id: string) => {
		onChange(
			selectedOptions.includes(id) ? selectedOptions.filter((option) => option !== id) : [...selectedOptions, id]
		);
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="select select-bordered flex w-full items-center justify-between"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>Select Options</span>
				<span>{selectedOptions.length} selected</span>
			</button>

			{isOpen && (
				<div className="absolute left-0 top-full z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
					<div className="p-2">
						{options.length > 0 ? (
							options.map((option) => (
								<div key={option.id} className="mb-2 flex items-center">
									<input
										type="checkbox"
										id={`option-${option.id}`}
										checked={selectedOptions.includes(option.id)}
										onChange={() => handleCheckboxChange(option.id)}
										className="mr-2"
									/>
									<label htmlFor={`option-${option.id}`}>{option.full_name}</label>
								</div>
							))
						) : (
							<p className="p-2">No options available</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckboxSelect;
