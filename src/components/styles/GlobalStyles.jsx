import styled from 'styled-components';

/* Main wrapper for every page */
export const MainWrapper = styled.div`
	margin-left: 250px;
	padding: 94px 24px 60px;
	position: relative;
	min-height: 100vh;
	background: var(--primary-bg);

	// Material UI Modern Overrides
	.MuiTypography-body1 {
		color: var(--text-secondary);
		font-weight: 400;
		font-size: 0.875rem;
		font-family: 'Inter', 'Poppins', sans-serif;
	}
	
	.MuiSwitch-track {
		background-color: var(--border-color);
	}

	.MuiPaginationItem-root {
		color: var(--text-secondary);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: var(--transition-fast);
		
		&:hover {
			background: var(--hover-bg);
			color: var(--text-primary);
			transform: translateY(-1px);
			box-shadow: var(--shadow-md);
		}
		
		&.Mui-selected {
			background: var(--gradient-primary);
			color: white;
			border-color: var(--primary-accent);
			
			&:hover {
				background: var(--gradient-primary);
			}
		}
	}

	.MuiSkeleton-root {
		background: var(--hover-bg);
		border-radius: var(--radius-sm);
	}

	@media screen and (max-width: 992px) {
		margin-left: 0px !important;
	}

	// Modern disabled inputs
	input:disabled,
	select:disabled,
	textarea:disabled {
		background: var(--secondary-bg);
		color: var(--text-disabled);
		border-color: var(--border-color);
		cursor: not-allowed;
		opacity: 0.6;
	}
	
	button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		background: var(--secondary-bg);
		color: var(--text-disabled);
	}
`;

/* Modern page title */
export const PageTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;
	padding: 0 4px;
`;

export const PageTitleH4 = styled.h4`
	text-transform: uppercase;
	font-weight: 700;
	font-size: 18px;
	color: var(--text-primary);
	letter-spacing: 0.05em;
	position: relative;
	
	&::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 40px;
		height: 3px;
		background: var(--gradient-primary);
		border-radius: var(--radius-sm);
	}
`;

export const PageTitleNav = styled.p`
	color: var(--text-secondary);
	font-size: 0.875rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const PageTitleSpan = styled.span`
	color: var(--text-muted);
	font-size: 0.875rem;
	font-weight: 400;
`;

// Modern card styling
export const GlobalCardTitle = styled.h4`
	font-size: 16px;
	margin: 0 0 8px;
	font-weight: 700;
	color: var(--text-primary);
	letter-spacing: -0.025em;
`;

export const GlobalCardDesc = styled.p`
	color: var(--text-secondary);
	margin-bottom: 24px;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1.6;
`;

export const GlobalSelect = styled.select`
	display: block;
	width: 100%;
	padding: 12px 16px;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.5;
	color: var(--text-primary);
	background: var(--card-bg);
	background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23a6b0cf" d="m2 0-2 2h4zm0 5 2-2h-4z"/></svg>');
	background-repeat: no-repeat;
	background-position: right 12px center;
	background-size: 12px;
	border: 1px solid var(--border-color);
	border-radius: var(--radius-md);
	outline: none;
	transition: var(--transition-fast);
	appearance: none;
	
	&:hover {
		border-color: var(--primary-accent);
		box-shadow: var(--shadow-sm);
	}
	
	&:focus {
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const GlobalInput = styled.input`
	display: block;
	width: 100%;
	padding: 12px 16px;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.5;
	color: var(--text-primary);
	background: var(--card-bg);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-md);
	outline: none;
	transition: var(--transition-fast);
	
	&::placeholder {
		color: var(--text-muted);
	}
	
	&:hover {
		border-color: var(--primary-accent);
		box-shadow: var(--shadow-sm);
	}
	
	&:focus {
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}
`;

export const GlobalLabel = styled.label`
	color: var(--text-secondary);
	font-weight: 600;
	font-size: 0.875rem;
	margin-bottom: 8px;
	display: block;
	letter-spacing: -0.025em;
	
	@media screen and (max-width: 1200px) {
		margin-bottom: 6px;
	}
`;

export const GlobalLabelOptional = styled.span`
	color: var(--text-muted);
	font-weight: 400;
	font-size: 0.75rem;
	font-style: italic;
	margin-left: 4px;
`;

export const GlobalBtn = styled.button`
	background: var(--gradient-primary);
	outline: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	line-height: 1.5;
	color: white;
	text-align: center;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: 12px 24px;
	font-size: 0.875rem;
	border-radius: var(--radius-md);
	transition: var(--transition-fast);
	position: relative;
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: var(--transition-normal);
	}
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		
		&::before {
			left: 100%;
		}
	}
	
	&:active {
		transform: translateY(0);
	}
	
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		transform: none;
		box-shadow: none;
	}
`;

export const GlobalPaginationContainer = styled.div`
	position: absolute;
	right: 24px;
	bottom: 24px;
	
	@media screen and (max-width: 450px) {
		right: 0;
		bottom: 0;
		position: relative;
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}
`;

export const GlobalSearchInput = styled.input`
	border: none;
	height: 44px;
	width: 100%;
	padding: 0 16px 0 44px;
	background: var(--card-bg);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
	outline: none;
	font-size: 0.875rem;
	font-weight: 500;
	color: var(--text-primary);
	transition: var(--transition-fast);
	
	&::placeholder {
		color: var(--text-muted);
	}
	
	&:hover {
		border-color: var(--primary-accent);
		box-shadow: var(--shadow-sm);
	}
	
	&:focus {
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}
`;

export const GlobalTextarea = styled.textarea`
	display: block;
	width: 100%;
	padding: 12px 16px;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.6;
	color: var(--text-primary);
	background: var(--card-bg);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-md);
	outline: none;
	transition: var(--transition-fast);
	resize: vertical;
	min-height: 100px;
	max-height: 200px;
	
	&::placeholder {
		color: var(--text-muted);
	}
	
	&:hover {
		border-color: var(--primary-accent);
		box-shadow: var(--shadow-sm);
	}
	
	&:focus {
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}
`;