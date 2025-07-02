import styled from 'styled-components';

/* Main wrapper for every page */
export const MainWrapper = styled.div`
	margin-left: 280px;
	padding: 120px 32px 80px;
	position: relative;
	min-height: 100vh;
	background: var(--primary-bg);

	// Material UI Modern Overrides
	.MuiTypography-body1 {
		color: var(--text-secondary);
		font-weight: 500;
		font-size: 0.875rem;
		font-family: 'Inter', 'SF Pro Display', sans-serif;
	}
	
	.MuiSwitch-track {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.MuiPaginationItem-root {
		color: var(--text-secondary);
		background: var(--glass-bg);
		backdrop-filter: var(--blur-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		transition: var(--transition-fast);
		font-weight: 600;
		
		&:hover {
			background: var(--hover-bg);
			color: var(--text-primary);
			transform: translateY(-2px);
			box-shadow: var(--shadow-md);
			border-color: rgba(255, 255, 255, 0.2);
		}
		
		&.Mui-selected {
			background: var(--primary-gradient);
			color: white;
			border-color: rgba(255, 255, 255, 0.3);
			box-shadow: var(--shadow-colored);
			
			&:hover {
				background: var(--primary-gradient);
				transform: translateY(-2px) scale(1.05);
			}
		}
	}

	.MuiSkeleton-root {
		background: var(--glass-bg);
		border-radius: var(--radius-md);
	}

	@media screen and (max-width: 992px) {
		margin-left: 0px !important;
	}

	// Modern disabled inputs
	input:disabled,
	select:disabled,
	textarea:disabled {
		background: var(--glass-bg);
		color: var(--text-disabled);
		border-color: var(--border-color);
		cursor: not-allowed;
		opacity: 0.6;
	}
	
	button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		background: var(--glass-bg);
		color: var(--text-disabled);
	}
`;

/* Modern page title */
export const PageTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 3rem;
	padding: 0 8px;
`;

export const PageTitleH4 = styled.h4`
	text-transform: uppercase;
	font-weight: 800;
	font-size: 24px;
	color: var(--text-primary);
	letter-spacing: 0.1em;
	position: relative;
	background: var(--primary-gradient);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	
	&::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		width: 60px;
		height: 4px;
		background: var(--primary-gradient);
		border-radius: var(--radius-sm);
	}
`;

export const PageTitleNav = styled.p`
	color: var(--text-secondary);
	font-size: 0.875rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
`;

export const PageTitleSpan = styled.span`
	color: var(--text-muted);
	font-size: 0.875rem;
	font-weight: 400;
`;

// Modern card styling
export const GlobalCardTitle = styled.h4`
	font-size: 18px;
	margin: 0 0 12px;
	font-weight: 800;
	color: var(--text-primary);
	letter-spacing: -0.025em;
`;

export const GlobalCardDesc = styled.p`
	color: var(--text-secondary);
	margin-bottom: 32px;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.6;
`;

export const GlobalSelect = styled.select`
	display: block;
	width: 100%;
	padding: 16px 20px;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.5;
	color: var(--text-primary);
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="m2 0-2 2h4zm0 5 2-2h-4z"/></svg>');
	background-repeat: no-repeat;
	background-position: right 16px center;
	background-size: 16px;
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
	outline: none;
	transition: var(--transition-fast);
	appearance: none;
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: var(--shadow-md);
		background: var(--hover-bg);
	}
	
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
		background: var(--hover-bg);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const GlobalInput = styled.input`
	display: block;
	width: 100%;
	padding: 16px 20px;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.5;
	color: var(--text-primary);
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
	outline: none;
	transition: var(--transition-fast);
	
	&::placeholder {
		color: var(--text-muted);
		font-weight: 500;
	}
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: var(--shadow-md);
		background: var(--hover-bg);
	}
	
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
		background: var(--hover-bg);
	}
`;

export const GlobalLabel = styled.label`
	color: var(--text-primary);
	font-weight: 700;
	font-size: 0.875rem;
	margin-bottom: 12px;
	display: block;
	letter-spacing: -0.025em;
	
	@media screen and (max-width: 1200px) {
		margin-bottom: 8px;
	}
`;

export const GlobalLabelOptional = styled.span`
	color: var(--text-muted);
	font-weight: 500;
	font-size: 0.75rem;
	font-style: italic;
	margin-left: 8px;
`;

export const GlobalBtn = styled.button`
	background: var(--primary-gradient);
	outline: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	line-height: 1.5;
	color: white;
	text-align: center;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: 16px 32px;
	font-size: 0.875rem;
	border-radius: var(--radius-lg);
	transition: var(--transition-bounce);
	position: relative;
	overflow: hidden;
	box-shadow: var(--shadow-md);
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: var(--transition-normal);
	}
	
	&:hover {
		transform: translateY(-3px) scale(1.05);
		box-shadow: var(--shadow-colored);
		
		&::before {
			left: 100%;
		}
	}
	
	&:active {
		transform: translateY(-1px) scale(1.02);
	}
	
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		transform: none;
		box-shadow: var(--shadow-sm);
	}
`;

export const GlobalPaginationContainer = styled.div`
	position: absolute;
	right: 32px;
	bottom: 32px;
	
	@media screen and (max-width: 450px) {
		right: 0;
		bottom: 0;
		position: relative;
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
`;

export const GlobalSearchInput = styled.input`
	border: none;
	height: 52px;
	width: 100%;
	padding: 0 20px 0 52px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-xl);
	outline: none;
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--text-primary);
	transition: var(--transition-fast);
	
	&::placeholder {
		color: var(--text-muted);
		font-weight: 500;
	}
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: var(--shadow-md);
		background: var(--hover-bg);
	}
	
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
		background: var(--hover-bg);
	}
`;

export const GlobalTextarea = styled.textarea`
	display: block;
	width: 100%;
	padding: 16px 20px;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.6;
	color: var(--text-primary);
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
	outline: none;
	transition: var(--transition-fast);
	resize: vertical;
	min-height: 120px;
	max-height: 240px;
	
	&::placeholder {
		color: var(--text-muted);
		font-weight: 500;
	}
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: var(--shadow-md);
		background: var(--hover-bg);
	}
	
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
		background: var(--hover-bg);
	}
`;