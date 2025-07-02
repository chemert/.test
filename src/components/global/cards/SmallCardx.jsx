import styled from 'styled-components';

export const SmallCardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 32px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-md);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-lg);
	transition: var(--transition-normal);
	position: relative;
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--primary-gradient);
	}
	
	&:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: var(--shadow-xl);
		border-color: rgba(255, 255, 255, 0.2);
	}
`;

export const SmallCardElement = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const SmallCardTitle = styled.p`
	color: var(--text-secondary);
	margin-bottom: 8px;
	font-size: 0.875rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const SmallCardH4 = styled.h4`
	color: var(--text-primary);
	font-weight: 800;
	font-size: 2rem;
	letter-spacing: -0.05em;
	line-height: 1.2;
	background: var(--primary-gradient);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
`;

export const SmallCardSpan = styled.span`
	align-items: center;
	background: var(--primary-gradient);
	color: white;
	display: flex;
	font-weight: 600;
	height: 72px;
	width: 72px;
	justify-content: center;
	border-radius: var(--radius-xl);
	font-size: 32px;
	box-shadow: var(--shadow-colored);
	transition: var(--transition-bounce);
	
	&:hover {
		transform: scale(1.1) rotate(5deg);
		box-shadow: var(--shadow-glow);
	}
`;