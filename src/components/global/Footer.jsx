import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
	return (
		<FooterWrapper className="glass-enhanced">
			<FooterContent>
				<FooterElement>
					<FooterLogo className="gradient-text">GateWay</FooterLogo>
					<FooterCopyright>&copy; 2025</FooterCopyright>
				</FooterElement>
				<FooterLink
					to={{
						pathname: 'https://discord.gg/license',
					}}
					target="_blank"
					className="btn-modern focus-ring"
				>
					Support Discord
				</FooterLink>
			</FooterContent>
		</FooterWrapper>
	);
}

/* Modern Footer styling */
const FooterWrapper = styled.div`
	bottom: 0;
	padding: 32px;
	position: absolute;
	right: 0;
	width: 100%;
	height: 100px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-lg);
	border-top: 1px solid var(--border-color);
	
	@media screen and (max-width: 992px) {
		left: 0;
	}
`;

const FooterContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

const FooterElement = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const FooterLogo = styled.span`
	color: var(--text-primary);
	font-size: 20px;
	font-weight: 800;
	letter-spacing: -0.05em;
`;

const FooterCopyright = styled.p`
	color: var(--text-muted);
	font-size: 14px;
	font-weight: 600;
`;

const FooterLink = styled(Link)`
	color: var(--text-primary);
	font-size: 14px;
	font-weight: 700;
	text-decoration: none;
	padding: 12px 24px;
	border-radius: var(--radius-lg);
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	transition: var(--transition-bounce);
	
	&:hover {
		color: white;
		background: var(--primary-gradient);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px) scale(1.05);
		box-shadow: var(--shadow-colored);
	}
`;

export default Footer;