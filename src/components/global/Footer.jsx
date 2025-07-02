import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
	return (
		<FooterWrapper>
			<FooterContent>
				<FooterElement>
					<FooterLogo>GateWay</FooterLogo>
					<FooterCopyright>&copy; 2023</FooterCopyright>
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
	padding: 24px;
	position: absolute;
	right: 0;
	width: 100%;
	height: 80px;
	background: var(--card-bg);
	border-top: 1px solid var(--border-color);
	backdrop-filter: blur(20px);
	
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
	gap: 12px;
`;

const FooterLogo = styled.span`
	color: var(--text-primary);
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.025em;
`;

const FooterCopyright = styled.p`
	color: var(--text-muted);
	font-size: 14px;
	font-weight: 500;
`;

const FooterLink = styled(Link)`
	color: var(--text-secondary);
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	padding: 8px 16px;
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color);
	transition: var(--transition-fast);
	
	&:hover {
		color: var(--text-primary);
		background: var(--hover-bg);
		border-color: var(--primary-accent);
		transform: translateY(-1px);
	}
`;

export default Footer;