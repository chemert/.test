import { Menu, MenuItem, withStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useContext } from 'react';
import { BiBell } from 'react-icons/bi';
/* React-icons */
import { FiMenu, FiSettings } from 'react-icons/fi';
import { MdCenterFocusWeak } from 'react-icons/md';
import { RiArrowDropDownLine, RiShieldKeyholeLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../utils/NavState';

function NavbarHeader({ sendNavStatus, NavStatus }) {
	const [navState, setNavState] = useContext(Context);
	let elem = document.documentElement;

	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	// Material UI profile popup
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const CustomMenu = withStyles({
		paper: {
			border: '1px solid rgba(255, 255, 255, 0.1)',
			backgroundColor: 'rgba(20, 20, 30, 0.9)',
			backdropFilter: 'blur(16px)',
			color: 'rgba(255, 255, 255, 0.8)',
			borderRadius: '16px',
			boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
		},
	})((props) => (
		<Menu
			elevation={0}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	));
	const CustomMenuItem = withStyles((theme) => ({
		root: {
			fontSize: '0.9125rem',
			color: 'rgba(255, 255, 255, 0.8)',
			padding: '12px 20px',
			transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
			'&:hover': {
				backgroundColor: 'rgba(255, 255, 255, 0.08)',
				color: '#ffffff',
			},
		},
	}))(MenuItem);

	// Handle logout
	const handleLogout = async () => {
		try {
			await axios.get('/api/users/logout');
			localStorage.removeItem('firstLogin');
			window.location.href = '/';
		} catch (err) {
			window.location.href = '/';
		}
	};

	/* Open fullscreen */
	function openFullscreen() {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE11 */
			elem.msRequestFullscreen();
		}
	}
	/* Close fullscreen */
	function closeFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			/* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE11 */
			document.msExitFullscreen();
		}
	}
	/* Toggle fullscreen */
	function toggleFullscreen() {
		if (
			(document.fullScreenElement !== undefined &&
				document.fullScreenElement === null) ||
			(document.msFullscreenElement !== undefined &&
				document.msFullscreenElement === null) ||
			(document.mozFullScreen !== undefined && !document.mozFullScreen) ||
			(document.webkitIsFullScreen !== undefined &&
				!document.webkitIsFullScreen)
		) {
			openFullscreen();
		} else {
			closeFullscreen();
		}
	}
	return (
		<NavbarTop className="glass-enhanced">
			<NavbarWrapper>
				<NavbarElement>
					{navState ? (
						<BrandingBox style={{ width: '70px' }} className="float">
							<BrandingIcon>
								<RiShieldKeyholeLine />
							</BrandingIcon>
						</BrandingBox>
					) : (
						<BrandingBox className="float">
							<BrandingIcon>
								<RiShieldKeyholeLine />
							</BrandingIcon>
							<BrandingTitle className="gradient-text">GateWay</BrandingTitle>
						</BrandingBox>
					)}
					<NavbarMenuBtn
						className="btn-modern focus-ring"
						onClick={() => {
							setNavState(!NavStatus);
						}}
					>
						<FiMenu />
					</NavbarMenuBtn>
				</NavbarElement>
				<NavbarElement>
					<NavbarMenuBtn className="btn-modern focus-ring" onClick={toggleFullscreen}>
						<MdCenterFocusWeak />
					</NavbarMenuBtn>
					<NavbarMenuBtn className="btn-modern focus-ring">
						<NotificationIcon>
							<BiBell />
							<NotificationBadge className="glow" />
						</NotificationIcon>
					</NavbarMenuBtn>
					<NavbarMenuBtn className="btn-modern focus-ring" onClick={handleClick}>
						<UserSection>
							<NavbarUserImg
								src={
									user.image
										? `/images/${user.image}`
										: `/images/default.png`
								}
								className="glow"
							/>
							<UserInfo>
								<NavbarUserLabel>{user.name}</NavbarUserLabel>
								<UserRole className="badge-modern">{user.role === 0 ? 'Admin' : 'Moderator'}</UserRole>
							</UserInfo>
							<RiArrowDropDownLine />
						</UserSection>
					</NavbarMenuBtn>
					<CustomMenu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<Link to="settings">
							<CustomMenuItem>Settings</CustomMenuItem>
						</Link>
						<CustomMenuItem onClick={handleLogout}>
							Logout
						</CustomMenuItem>
					</CustomMenu>
					<NavbarMenuBtn className="btn-modern focus-ring">
						<Link
							to="settings"
							style={{
								display: 'flex',
								alignItems: 'center',
								TextDecoration: 'none',
								color: 'var(--text-secondary)',
							}}
						>
							<FiSettings />
						</Link>
					</NavbarMenuBtn>
				</NavbarElement>
			</NavbarWrapper>
		</NavbarTop>
	);
}

/* Modern Navbar styling */
const NavbarTop = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1002;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-lg);
	border-bottom: 1px solid var(--border-color);
	box-shadow: var(--shadow-xl);
`;

const NavbarWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80px;
	padding: 0 2rem;
`;

const NavbarElement = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

/* Navbar left-side elements */
const BrandingBox = styled.div`
	background: var(--primary-gradient);
	width: 280px;
	display: flex;
	gap: 16px;
	justify-content: center;
	align-items: center;
	border-radius: var(--radius-xl);
	margin: 12px;
	position: relative;
	overflow: hidden;
	box-shadow: var(--shadow-colored);
	
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
	
	&:hover::before {
		left: 100%;
	}
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-glow);
	}
	
	@media screen and (max-width: 992px) {
		width: 64px;
		margin: 12px 8px;
	}
`;

const BrandingIcon = styled.div`
	font-size: 28px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const BrandingTitle = styled.h1`
	color: white;
	font-size: 24px;
	font-weight: 800;
	letter-spacing: -0.05em;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const NavbarMenuBtn = styled.button`
	font-size: 20px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	outline: none;
	border: 1px solid var(--border-color);
	color: var(--text-secondary);
	cursor: pointer;
	padding: 12px;
	border-radius: var(--radius-lg);
	display: flex;
	align-items: center;
	gap: 8px;
	transition: var(--transition-fast);
	position: relative;
	overflow: hidden;

	&:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: rgba(255, 255, 255, 0.2);
	}

	&:active {
		transform: translateY(0);
	}

	/* Hidden focus button for mobile */
	@media screen and (max-width: 992px) {
		:nth-child(1) {
			display: none;
		}
	}
`;

const NotificationIcon = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const NotificationBadge = styled.div`
	position: absolute;
	top: -4px;
	right: -4px;
	width: 12px;
	height: 12px;
	background: var(--error-gradient);
	border-radius: 50%;
	border: 2px solid var(--card-bg);
	box-shadow: var(--shadow-sm);
`;

const UserSection = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const NavbarUserLabel = styled.span`
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--text-primary);
	line-height: 1.2;
`;

const UserRole = styled.span`
	font-size: 0.75rem;
	color: var(--text-primary);
	line-height: 1.2;
	padding: 2px 8px;
	border-radius: var(--radius-xl);
	background: var(--accent-gradient);
`;

const NavbarUserImg = styled.img`
	border-radius: 50%;
	padding: 3px;
	background: var(--primary-gradient);
	height: 48px;
	width: 48px;
	object-fit: cover;
	transition: var(--transition-fast);
	box-shadow: var(--shadow-md);
	
	&:hover {
		transform: scale(1.1);
		box-shadow: var(--shadow-glow);
	}
`;

export default NavbarHeader;