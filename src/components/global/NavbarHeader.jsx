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
			border: '1px solid var(--border-color)',
			backgroundColor: 'var(--card-bg)',
			color: 'var(--text-secondary)',
			borderRadius: 'var(--radius-lg)',
			boxShadow: 'var(--shadow-xl)',
			backdropFilter: 'blur(20px)',
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
			color: 'var(--text-secondary)',
			padding: '12px 20px',
			transition: 'var(--transition-fast)',
			'&:hover': {
				backgroundColor: 'var(--hover-bg)',
				color: 'var(--text-primary)',
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
		<NavbarTop>
			<NavbarWrapper>
				<NavbarElement>
					{navState ? (
						<BrandingBox style={{ width: '70px' }}>
							<BrandingIcon>
								<RiShieldKeyholeLine />
							</BrandingIcon>
						</BrandingBox>
					) : (
						<BrandingBox>
							<BrandingIcon>
								<RiShieldKeyholeLine />
							</BrandingIcon>
							<BrandingTitle>GateWay</BrandingTitle>
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
							<NotificationBadge />
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
							/>
							<UserInfo>
								<NavbarUserLabel>{user.name}</NavbarUserLabel>
								<UserRole>{user.role === 0 ? 'Admin' : 'Moderator'}</UserRole>
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
	background: var(--card-bg);
	backdrop-filter: blur(20px);
	border-bottom: 1px solid var(--border-color);
	box-shadow: var(--shadow-lg);
`;

const NavbarWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	height: 70px;
	padding: 0 1rem;
`;

const NavbarElement = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

/* Navbar left-side elements */
const BrandingBox = styled.div`
	background: var(--gradient-primary);
	width: 250px;
	display: flex;
	gap: 12px;
	justify-content: center;
	align-items: center;
	border-radius: var(--radius-lg);
	margin: 8px;
	position: relative;
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: var(--transition-normal);
	}
	
	&:hover::before {
		left: 100%;
	}
	
	@media screen and (max-width: 992px) {
		width: 54px;
		margin: 8px 4px;
	}
`;

const BrandingIcon = styled.div`
	font-size: 24px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BrandingTitle = styled.h1`
	color: white;
	font-size: 20px;
	font-weight: 700;
	letter-spacing: -0.025em;
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const NavbarMenuBtn = styled.button`
	font-size: 20px;
	background: transparent;
	outline: none;
	border: none;
	color: var(--text-secondary);
	cursor: pointer;
	padding: 12px;
	border-radius: var(--radius-md);
	display: flex;
	align-items: center;
	gap: 8px;
	transition: var(--transition-fast);
	position: relative;
	overflow: hidden;

	&:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
		transform: translateY(-1px);
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
	top: -2px;
	right: -2px;
	width: 8px;
	height: 8px;
	background: var(--error-color);
	border-radius: 50%;
	border: 2px solid var(--card-bg);
`;

const UserSection = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
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
	color: var(--text-muted);
	line-height: 1.2;
`;

const NavbarUserImg = styled.img`
	border-radius: 50%;
	padding: 2px;
	background: var(--gradient-primary);
	height: 40px;
	width: 40px;
	object-fit: cover;
	transition: var(--transition-fast);
	
	&:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow-glow);
	}
`;

export default NavbarHeader;