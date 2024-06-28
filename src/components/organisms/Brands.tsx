import { sadeLogo } from '@/assets/images';
import { cn } from '@/utils';
import React from 'react';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	textClassName?: string;
}

const LogoText = React.forwardRef<HTMLDivElement, Props>(({ className, textClassName, ...props }, ref) => {
	return (
		<div className={cn('flex items-center gap-3 overflow-hidden', className)} {...props} ref={ref}>
			<img src={sadeLogo} className="m-0 w-12" alt="" />
			<h4 className={cn('m-0', textClassName)}>Sekolah Alam Depok</h4>
		</div>
	);
});

export { LogoText };
