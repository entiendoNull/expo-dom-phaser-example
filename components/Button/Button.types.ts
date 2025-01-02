export interface ButtonProps extends React.PropsWithChildren {
	onPressIn?: () => void;
	onPressOut?: () => void;
	hasHaptic?: boolean;
}
