import { cn } from '@/utils';
import React, { ForwardedRef } from 'react';

interface SelectProps<T> extends React.InputHTMLAttributes<HTMLSelectElement> {
	label: string;
	className?: string;
	options: T[];
	type?: string;
	hint?: string;
	errorMsg?: string;
	placeholder?: string;
	keyValue?: string;
	keyDisplay?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>(
	(
		{ className, type = 'text', label, hint, errorMsg, placeholder = '- Pilih -', options, keyValue, keyDisplay, ...props },
		ref: ForwardedRef<HTMLSelectElement>
	) => {
		return (
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text font-bold">{label}</span>
				</div>
				<select className={cn('text-small select select-bordered w-full', className)} ref={ref} {...props}>
					<option value="">{placeholder}</option>
					{options.map((option, i) => (
						<option key={i} className="text-small" value={typeof option != 'string' && keyValue ? option[keyValue] : option}>
							{typeof option != 'string' && keyDisplay ? option[keyDisplay] : option}
						</option>
					))}
				</select>
				<div className="label">
					{hint && <span className="label-text-alt">{hint}</span>}
					{errorMsg && <span className="label-text-alt text-error">{errorMsg}</span>}
				</div>
			</label>
		);
	}
);

export { Select };
