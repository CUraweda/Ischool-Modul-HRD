import { cn } from '@/utils';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	hint?: string;
	errorMessage?: string;
	placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, hint, errorMessage, placeholder = 'Ketik disini', ...props }, ref) => {
		return (
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text font-bold">{label}</span>
				</div>
				<input type={type} placeholder={placeholder} className={cn('input input-bordered w-full', className)} ref={ref} {...props} />
				<div className="label">
					{hint && <span className="label-text-alt">{hint}</span>}
					{errorMessage && <span className="label-text-alt text-error">{errorMessage}</span>}
				</div>
			</label>
		);
	}
);
Input.displayName = 'Input';

export { Input };
