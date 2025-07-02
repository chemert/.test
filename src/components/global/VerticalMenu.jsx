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
				<VerticalMenuWrapper style={{ width: '80px' }} className="glass-enhanced slide-in-left">
					<VerticalMenuList>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/dashboard"
								activeStyle={{}}
								onClick={mobileClick}
								className="btn-modern focus-ring tooltip"
								data-tooltip="Dashboard"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Licenses"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Add New"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Blacklist"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Users"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Products"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Console"
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
								className="btn-modern focus-ring tooltip"
								data-tooltip="Settings"
							>
								<IoSettingsOutline />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement onClick={handleLogout}>
							<VerticalMenuLink 
								exact 
								to="/" 
								className="btn-modern focus-ring logout-btn tooltip"
								data-tooltip="Logout"
							>
								<RiShutDownLine />
							</VerticalMenuLink>
						</VerticalMenuListElement>
					</VerticalMenuList>
				</VerticalMenuWrapper>
			) : (
				<VerticalMenuDisplay>
					<VerticalMenuWrapper className="vertical-big glass-enhanced slide-in-left">
						<VerticalMenuList>
							<VerticalMenuListElement>
								<VerticalMenuTitle className="gradient-text">Home</VerticalMenuTitle>
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
								<VerticalMenuTitle className="gradient-text">
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
								<VerticalMenuTitle className="gradient-text">Team</VerticalMenuTitle>
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
								<VerticalMenuTitle className="gradient-text">Profile</VerticalMenuTitle>
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
	width: 280px;
	z-index: 1420;
	bottom: 0;
	margin-top: 0;
	position: fixed;
	top: 80px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-lg);
	border-right: 1px solid var(--border-color);
	box-shadow: var(--shadow-xl);
	padding: 2rem 0;
	
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
	padding: 20px 24px 12px;
	letter-spacing: 0.1em;
	pointer-events: none;
	cursor: default;
	font-size: 12px;
	text-transform: uppercase;
	color: var(--text-primary);
	font-weight: 800;
	position: relative;
	
	&::after {
		content: '';
		position: absolute;
		bottom: 8px;
		left: 24px;
		right: 24px;
		height: 2px;
		background: var(--primary-gradient);
		border-radius: var(--radius-sm);
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
	margin: 4px 12px;
	border-radius: var(--radius-lg);
	transition: var(--transition-bounce);
	
	&:hover {
		transform: translateX(8px);
	}
`;

const MenuIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 24px;
	font-size: 22px;
	transition: var(--transition-fast);
`;

const VerticalMenuLink = styled(NavLink)`
	display: flex;
	align-items: center;
	padding: 16px 20px;
	color: var(--text-secondary);
	position: relative;
	font-size: 15px;
	font-weight: 600;
	transition: var(--transition-fast);
	border-radius: var(--radius-lg);
	text-decoration: none;
	gap: 16px;
	overflow: hidden;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid transparent;
	
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--primary-gradient);
		transform: scaleY(0);
		transition: var(--transition-fast);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}
	
	&:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
		border-color: var(--border-color);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		
		${MenuIcon} {
			color: var(--text-primary);
			transform: scale(1.1);
		}
	}
	
	&.active {
		background: var(--primary-gradient);
		color: white;
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: var(--shadow-colored);
		
		&::before {
			transform: scaleY(1);
		}
		
		${MenuIcon} {
			color: white;
		}
	}
	
	&.logout-btn:hover {
		background: var(--error-gradient);
		color: white;
		
		${MenuIcon} {
			color: white;
		}
	}
	
	@media screen and (max-width: 992px) {
		padding: 20px;
		justify-content: center;
	}
`;

const VerticalMenuLinkText = styled.span`
	color: inherit;
	font-size: 15px;
	font-weight: 600;
	transition: var(--transition-fast);
	
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

export default VerticalMenu;