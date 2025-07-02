import axios from 'axios';
import React, { useState } from 'react';
import { RiShieldKeyholeLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { showErrMsg } from '../../../utils/ErrorHandler';
import HelmetHandler from '../../../utils/HelmetHandler';
import Popup from '../../../utils/Popup';
import { isLength } from '../../../utils/validation';

/* Initial state */
const initialState = {
	email: '',
	password: '',
	twofactor: '',
	err: '',
	success: '',
};

function Login() {
	const [user, setUser] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const [popup, setPopup] = useState(false);

	const { email, password, twofactor, err, success } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: '', success: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLength(password)) {
			return setUser({
				...user,
				err: 'Invalid credentials',
				success: '',
			});
		}
		try {
			const res = await axios.post('/api/users/login', {
				email,
				password,
				twofactor,
			});
			setUser({ ...user, err: '', success: res.data.msg });
			localStorage.setItem('firstLogin', true);
			dispatch(dispatchLogin());
			return <Redirect to="/dashboard" />;
		} catch (err) {
			if (err?.response?.status === 401) {
				setPopup(true);
			}

			err.response.data.msg &&
				setUser({ ...user, err: 'Login failed', success: '' });
		}
	};
	return (
		<>
			<HelmetHandler title="Login - GateWay" />
			<Popup trigger={popup} type={'full'} setTrigger={setPopup}>
				<TwoFactorWrapper className="glass-enhanced">
					<LoginForm onSubmit={handleSubmit}>
						<LoginLogoSpan className="glow">
							<RiShieldKeyholeLine />
						</LoginLogoSpan>
						<TwoFactorH4 className="gradient-text">2FA Required</TwoFactorH4>
						<LoginFormLabel>
							Enter the 6 digit code from your authentication
							application!
						</LoginFormLabel>
						<TwoFactorErrContainer>
							{err && showErrMsg(err)}
						</TwoFactorErrContainer>
						<LoginFormInput
							style={{ maxWidth: '400px', marginBottom: '.5rem' }}
							placeholder="6 digits code"
							type="number"
							id="twofactor"
							required
							name="twofactor"
							value={twofactor}
							onChange={handleChangeInput}
							className="glass-effect"
						/>
						<LoginFormSubmitBtn
							style={{ maxWidth: '400px' }}
							type="submit"
							className="btn-modern"
						>
							Submit
						</LoginFormSubmitBtn>
					</LoginForm>
				</TwoFactorWrapper>
			</Popup>
			<LoginWrapper>
				<LoginContainer className="glass-enhanced slide-in-up">
					<LoginTop>
						<LoginTopTextContainer>
							<LoginTopH5 className="gradient-text">Welcome to GateWay!</LoginTopH5>
							<LoginTopText>Login to continue to your dashboard</LoginTopText>
						</LoginTopTextContainer>
						<LoginTopDecoration />
					</LoginTop>
					<LoginBottom>
						<LoginLogoContainer>
							<LoginLogoSpan className="float glow">
								<RiShieldKeyholeLine />
							</LoginLogoSpan>
						</LoginLogoContainer>
						{popup ? null : err && showErrMsg(err)}
						<LoginForm onSubmit={handleSubmit}>
							<LoginFormElement>
								<LoginFormLabel>Email Address</LoginFormLabel>
								<LoginFormInput
									placeholder="Enter your email"
									type="email"
									id="email"
									required
									name="email"
									value={email}
									onChange={handleChangeInput}
									className="glass-effect"
								/>
							</LoginFormElement>
							<LoginFormElement>
								<LoginFormLabel>Password</LoginFormLabel>
								<PasswordContainer>
									<LoginFormInput
										placeholder="Enter your password"
										type={showPassword ? "text" : "password"}
										id="password"
										required
										name="password"
										value={password}
										onChange={handleChangeInput}
										className="glass-effect"
									/>
									<PasswordToggle 
										onClick={() => setShowPassword(!showPassword)}
										className="btn-modern"
									>
										{showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
									</PasswordToggle>
								</PasswordContainer>
							</LoginFormElement>
							<LoginFormElement
								style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
							>
								<LoginFormCheckbox
									type="checkbox"
									id="checkbox"
									className="modern-checkbox"
								/>
								<LoginFormLabel htmlFor="checkbox" style={{ margin: 0 }}>
									Remember me for 30 days
								</LoginFormLabel>
							</LoginFormElement>
							<LoginFormSubmitBtn type="submit" className="btn-modern">
								Sign In to Dashboard
							</LoginFormSubmitBtn>
						</LoginForm>
					</LoginBottom>
					<LoginBottomText>&copy; 2025 GateWay - Secure License Management</LoginBottomText>
				</LoginContainer>
				<LoginBackground />
			</LoginWrapper>
		</>
	);
}

const LoginWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	position: relative;
	background: var(--primary-bg);
	background-image: 
		radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
		radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.15) 0%, transparent 50%),
		radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50%);
`;

const LoginBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
	pointer-events: none;
`;

const LoginContainer = styled.div`
	width: 100%;
	max-width: 520px;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-lg);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-2xl);
	box-shadow: var(--shadow-xl);
	overflow: hidden;
	position: relative;
`;

const LoginTop = styled.div`
	display: flex;
	background: var(--primary-gradient);
	padding: 3rem 2rem 2rem;
	position: relative;
	overflow: hidden;
`;

const LoginTopDecoration = styled.div`
	position: absolute;
	top: -50%;
	right: -20%;
	width: 200px;
	height: 200px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	filter: blur(40px);
`;

const LoginTopTextContainer = styled.div`
	flex: 1;
	z-index: 2;
`;

const LoginTopH5 = styled.h5`
	color: white;
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
	font-weight: 800;
	letter-spacing: -0.025em;
`;

const LoginTopText = styled.p`
	color: rgba(255, 255, 255, 0.9);
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.6;
`;

const LoginBottom = styled.div`
	background: var(--glass-bg);
	backdrop-filter: var(--blur-md);
	padding: 0 2rem 2rem;
`;

const LoginLogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
`;

const LoginLogoSpan = styled.span`
	border-radius: 50%;
	margin-top: -40px;
	background: var(--primary-gradient);
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
	color: white;
	box-shadow: var(--shadow-colored);
	border: 4px solid rgba(255, 255, 255, 0.2);
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const LoginFormElement = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const LoginFormLabel = styled.label`
	font-weight: 700;
	color: var(--text-primary);
	font-size: 0.875rem;
	letter-spacing: -0.025em;
`;

const PasswordContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const PasswordToggle = styled.button`
	position: absolute;
	right: 12px;
	background: transparent;
	border: none;
	color: var(--text-muted);
	cursor: pointer;
	padding: 8px;
	border-radius: var(--radius-md);
	transition: var(--transition-fast);
	
	&:hover {
		color: var(--text-primary);
		background: var(--hover-bg);
	}
`;

const LoginFormInput = styled.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 1rem 1.25rem;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.5;
	color: var(--text-primary);
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 1px solid var(--border-color);
	border-radius: var(--radius-lg);
	transition: var(--transition-fast);
	
	&::placeholder {
		color: var(--text-muted);
		font-weight: 500;
	}
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.3);
		background: var(--hover-bg);
	}
	
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
		background: var(--hover-bg);
	}
`;

const LoginFormSubmitBtn = styled.button`
	color: white;
	width: 100%;
	background: var(--primary-gradient);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	line-height: 1.5;
	outline: none;
	text-align: center;
	border: none;
	cursor: pointer;
	user-select: none;
	padding: 1rem 1.5rem;
	font-size: 0.875rem;
	border-radius: var(--radius-lg);
	transition: var(--transition-bounce);
	margin-top: 1rem;
	box-shadow: var(--shadow-colored);
	position: relative;
	overflow: hidden;
	
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
		transform: translateY(-2px);
		box-shadow: var(--shadow-glow);
		
		&::before {
			left: 100%;
		}
	}
`;

const LoginFormCheckbox = styled.input`
	width: 1.25rem;
	height: 1.25rem;
	background: var(--glass-bg);
	backdrop-filter: var(--blur-sm);
	border: 2px solid var(--border-color);
	border-radius: var(--radius-sm);
	outline: none;
	cursor: pointer;
	transition: var(--transition-fast);
	appearance: none;
	position: relative;
	
	&:checked {
		background: var(--primary-gradient);
		border-color: rgba(255, 255, 255, 0.3);
		
		&::after {
			content: '✓';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;
			font-size: 0.75rem;
			font-weight: 700;
		}
	}
	
	&:hover {
		border-color: rgba(255, 255, 255, 0.4);
		transform: scale(1.05);
	}
`;

const LoginBottomText = styled.p`
	font-size: 0.75rem;
	font-weight: 500;
	color: var(--text-muted);
	text-align: center;
	margin-top: 2rem;
	padding-top: 1.5rem;
	border-top: 1px solid var(--border-color);
`;

// 2FA
const TwoFactorWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding: 3rem;
	border-radius: var(--radius-2xl);
`;

const TwoFactorH4 = styled.div`
	color: var(--text-primary);
	font-size: 1.5rem;
	font-weight: 800;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	letter-spacing: -0.025em;
`;

const TwoFactorErrContainer = styled.div`
	max-width: 400px;
	width: 100%;
	margin-bottom: 1rem;
`;

export default Login;