import axios from 'axios';
import React, { useContext } from 'react';
/* React-icons */
import {
	BiAddToQueue,
	BiBlock,
	BiHomeCircle,
	BiUserPlus,
} from 'react-icons/bi';
import { GoSettings } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiShutDownLine, RiStackLine } from 'react-icons/ri';
import { VscDebugConsole } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../utils/NavState';

function VerticalMenu() {
	const [navState, setNavState] = useContext(Context);

	const handleLogout = async () => {
		try {
			await axios.get('/api/users/logout');
			localStorage.removeItem('firstLogin');
			window.location.href = '/';
		} catch (err) {
			window.location.href = '/';
		}
	};

	const mobileClick = async () => {
		try {
			if (window.innerWidth < 1200) {
				setNavState(!navState);
			}
		} catch (error) {

		}
	};

	return (
		<>
			{navState ? (
				<VerticalMenuWrapper style={{ width: '70px' }} className="glass-effect">
					<VerticalMenuList>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/dashboard"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<BiHomeCircle />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/licenses"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<GoSettings />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/add-new"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<BiAddToQueue />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/blacklist"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<BiBlock />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/users"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<BiUserPlus />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/products"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<RiStackLine />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/console"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<VscDebugConsole />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/settings"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring"
							>
								<IoSettingsOutline />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement onClick={handleLogout}>
							<VerticalMenuLink exact to="/" className="btn-modern focus-ring logout-btn">
								<RiShutDownLine />
							</VerticalMenuLink>
						</VerticalMenuListElement>
					</VerticalMenuList>
				</VerticalMenuWrapper>
			) : (
				<VerticalMenuDisplay>
					<VerticalMenuWrapper className="vertical-big glass-effect">
						<VerticalMenuList>
							<VerticalMenuListElement>
								<VerticalMenuTitle>Home</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/dashboard"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<BiHomeCircle />
									</MenuIcon>
									<VerticalMenuLinkText>
										Dashboard
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuTitle>
									Management
								</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/licenses"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<GoSettings />
									</MenuIcon>
									<VerticalMenuLinkText>
										Licenses
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/add-new"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<BiAddToQueue />
									</MenuIcon>
									<VerticalMenuLinkText>
										Add new
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/blacklist"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<BiBlock />
									</MenuIcon>
									<VerticalMenuLinkText>
										Blacklist
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/users"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<BiUserPlus />
									</MenuIcon>
									<VerticalMenuLinkText>
										Users
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuTitle>Team</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/products"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<RiStackLine />
									</MenuIcon>
									<VerticalMenuLinkText>
										Products
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/console"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<VscDebugConsole />
									</MenuIcon>
									<VerticalMenuLinkText>
										Console
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>

							<VerticalMenuListElement>
								<VerticalMenuTitle>Profile</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/settings"
									activeStyle={{}}
									className="btn-modern focus-ring"
								>
									<MenuIcon>
										<IoSettingsOutline />
									</MenuIcon>
									<VerticalMenuLinkText>
										Settings
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									onClick={handleLogout}
									exact
									to="/"
									className="btn-modern focus-ring logout-btn"
								>
									<MenuIcon>
										<RiShutDownLine />
									</MenuIcon>
									<VerticalMenuLinkText>
										Logout
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
						</VerticalMenuList>
					</VerticalMenuWrapper>
				</VerticalMenuDisplay>
			)}
		</>
	);
}

/* Modern VerticalMenu styling */
const VerticalMenuWrapper = styled.div`
	width: 250px;
	z-index: 1420;
	bottom: 0;
	margin-top: 0;
	position: fixed;
	top: 70px;
	background: var(--card-bg);
	backdrop-filter: blur(20px);
	border-right: 1px solid var(--border-color);
	box-shadow: var(--shadow-lg);
	padding: 1rem 0;
	
	@media screen and (max-width: 992px) {
		height: 100%;
	}
`;

const VerticalMenuDisplay = styled.div`
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const VerticalMenuTitle = styled.p`
	padding: 16px 20px 8px;
	letter-spacing: 0.05em;
	pointer-events: none;
	cursor: default;
	font-size: 11px;
	text-transform: uppercase;
	color: var(--text-muted);
	font-weight: 700;
	position: relative;
	
	&::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 20px;
		right: 20px;
		height: 1px;
		background: linear-gradient(90deg, var(--primary-accent), transparent);
	}
`;

const VerticalMenuList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const VerticalMenuListElement = styled.li`
	display: block;
	width: 100%;
	margin: 2px 8px;
	border-radius: var(--radius-md);
	transition: var(--transition-fast);
	
	&:hover {
		transform: translateX(4px);
	}
`;

const MenuIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 24px;
	font-size: 20px;
	transition: var(--transition-fast);
`;

const VerticalMenuLink = styled(NavLink)`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	color: var(--text-secondary);
	position: relative;
	font-size: 14px;
	font-weight: 500;
	transition: var(--transition-fast);
	border-radius: var(--radius-md);
	text-decoration: none;
	gap: 12px;
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--gradient-primary);
		transform: scaleY(0);
		transition: var(--transition-fast);
	}
	
	&:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
		
		${MenuIcon} {
			color: var(--primary-accent);
			transform: scale(1.1);
		}
	}
	
	&.active {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
		color: var(--text-primary);
		border: 1px solid rgba(99, 102, 241, 0.2);
		
		&::before {
			transform: scaleY(1);
		}
		
		${MenuIcon} {
			color: var(--primary-accent);
		}
	}
	
	&.logout-btn:hover {
		background: rgba(239, 68, 68, 0.1);
		color: var(--error-color);
		
		${MenuIcon} {
			color: var(--error-color);
		}
	}
	
	@media screen and (max-width: 992px) {
		padding: 16px;
		justify-content: center;
	}
`;

const VerticalMenuLinkText = styled.span`
	color: inherit;
	font-size: 14px;
	font-weight: 500;
	transition: var(--transition-fast);
	
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

export default VerticalMenu;