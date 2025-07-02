import styled from 'styled-components';

export const SmallCardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 24px;
	background: var(--gradient-card);
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
		height: 1px;
		background: var(--gradient-primary);
	}
	
	&:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
	}
`;

export const SmallCardElement = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const SmallCardTitle = styled.p`
	color: var(--text-secondary);
	margin-bottom: 8px;
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: -0.025em;
	text-transform: uppercase;
`;

export const SmallCardH4 = styled.h4`
	color: var(--text-primary);
	font-weight: 700;
	font-size: 1.5rem;
	letter-spacing: -0.025em;
	line-height: 1.2;
`;

export const SmallCardSpan = styled.span`
	align-items: center;
	background: var(--gradient-primary);
	color: white;
	display: flex;
	font-weight: 600;
	height: 56px;
	width: 56px;
	justify-content: center;
	border-radius: var(--radius-xl);
	font-size: 24px;
	box-shadow: var(--shadow-lg);
	transition: var(--transition-fast);
	
	&:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow-glow);
	}
`;