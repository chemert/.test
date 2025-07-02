import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Blacklist from './components/pages/blacklist/Blacklist';
import Console from './components/pages/console/Console';
import CreateLicense from './components/pages/createlicense/CreateLicense';

/* Import pages */
import Landing from './components/pages/landing/Landing';
import Login from './components/pages/login/Login';
import Products from './components/pages/products/Products';
import Settings from './components/pages/settings/Settings';
import Users from './components/pages/users/Users';

/* Auth actions */
import {
	dispatchGetUser,
	dispatchLogin,
	fetchUser,
} from './redux/actions/authAction';

/* NavState */
import NavState from './utils/NavState';
import PrivateRoute from './router/PrivateRoute';
import OAuth2 from './components/pages/authentication/OAuth2';

// Toast notifications
import { ToastContainer } from 'react-toastify';
import './components/global/Notifications.css';
import Licenses from './components/pages/licenses/Licenses';
import RedirectHandler from './router/RedirectHandler';

/* Modern Global Styling */
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :root {
    /* Modern Dark Theme Colors */
    --primary-bg: #0a0a0f;
    --secondary-bg: #0f0f17;
    --tertiary-bg: #16161f;
    --card-bg: rgba(20, 20, 30, 0.8);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --border-color: rgba(255, 255, 255, 0.1);
    --hover-bg: rgba(255, 255, 255, 0.08);
    
    /* Modern Gradient Colors */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --warning-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --error-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    
    /* Text Colors */
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --text-muted: rgba(255, 255, 255, 0.6);
    --text-disabled: rgba(255, 255, 255, 0.4);
    
    /* Modern Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.25);
    --shadow-xl: 0 16px 64px rgba(0, 0, 0, 0.3);
    --shadow-glow: 0 0 40px rgba(102, 126, 234, 0.4);
    --shadow-colored: 0 8px 32px rgba(102, 126, 234, 0.3);
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-2xl: 32px;
    
    /* Transitions */
    --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* Backdrop Blur */
    --blur-sm: blur(8px);
    --blur-md: blur(16px);
    --blur-lg: blur(24px);
  }

  body {
    background: var(--primary-bg);
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50%);
    min-height: 100vh;
    color: var(--text-primary);
    overflow-x: hidden;
  }

  /* Modern Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-sm);
  }
   
  ::-webkit-scrollbar-thumb {
    background: var(--primary-gradient);
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-gradient);
    box-shadow: var(--shadow-glow);
  }

  /* Modern Input Focus States */
  input:focus, select:focus, textarea:focus {
    border-color: transparent !important;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5) !important;
    background: var(--glass-bg) !important;
    transition: var(--transition-fast);
  }

  /* Hide arrows from number inputs */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  /* Modern Autocomplete styles */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--text-primary);
    -webkit-box-shadow: 0 0 0px 1000px var(--card-bg) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Modern Glass Effect */
  .glass-effect {
    background: var(--glass-bg);
    backdrop-filter: var(--blur-md);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-lg);
  }

  /* Enhanced Glass Effect */
  .glass-enhanced {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: var(--blur-lg);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      var(--shadow-xl),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* Modern Button Hover Effects */
  .btn-modern {
    position: relative;
    overflow: hidden;
    transition: var(--transition-normal);
    background: var(--primary-gradient);
    border: none;
    color: white;
    font-weight: 600;
    
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
      box-shadow: var(--shadow-colored);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  /* Modern Card Animations */
  .card-modern {
    transition: var(--transition-normal);
    background: var(--glass-bg);
    backdrop-filter: var(--blur-md);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(--shadow-xl);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  /* Floating Animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }

  /* Pulse Animation for Loading States */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Enhanced Glow Animation */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
    }
  }

  .glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  /* Modern Focus Ring */
  .focus-ring:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.4);
  }

  /* Gradient Text */
  .gradient-text {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Modern Loading Spinner */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  /* Slide In Animations */
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-in-up {
    animation: slideInUp 0.6s ease-out;
  }

  .slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  /* Modern Tooltip */
  .tooltip {
    position: relative;
    
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--glass-bg);
      backdrop-filter: var(--blur-md);
      color: var(--text-primary);
      padding: 8px 12px;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: var(--transition-fast);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-lg);
    }
    
    &:hover::after {
      opacity: 1;
      transform: translateX(-50%) translateY(-8px);
    }
  }

  /* Modern Badge */
  .badge-modern {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: var(--radius-xl);
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--glass-bg);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  /* Modern Progress Bar */
  .progress-modern {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    overflow: hidden;
    
    &::after {
      content: '';
      display: block;
      height: 100%;
      background: var(--primary-gradient);
      border-radius: var(--radius-xl);
      transition: var(--transition-normal);
    }
  }
`;

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);

	// Axios interceptor
	// Add a response interceptor
	axios.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		async function (error) {
			const isUnAuthorizedError = (error) => {
				return (
					error.response &&
					error.config.retries &&
					error.response.status === 400 &&
					error.response.data.msg === 'Invalid Authentication.'
				);
			};

			const isNonexistingUser = (error) => {
				return (
					error.response &&
					error.config.retries &&
					error.response.status === 400 &&
					error.response.data.msg === 'Invalid user.'
				);
			};

			const updateAccessToken = async () => {
				try {
					const res = await axios.post(
						'/api/users/refresh_token',
						null
					);
					error.config.headers.Authorization = res.data.access_token;
					dispatch({
						type: 'GET_TOKEN',
						payload: res.data.access_token,
					});
				} catch (error) {
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				}
			};
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			error.config.retries = error.config.retries || {
				count: 0,
			};

			if (isUnAuthorizedError(error) && error.config.retries.count < 3) {
				await updateAccessToken(); // refresh the access token
				error.config.retries.count += 1;

				return axios(error.config); // if succeed re-fetch the original request with the updated accessToken
			}
			if (isNonexistingUser(error)) {
				try {
					await axios.get('/api/users/logout');
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				} catch (err) {
					window.location.href = '/';
				}
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin');
		if (firstLogin) {
			const getToken = async () => {
				try {
					const res = await axios.post(
						'/api/users/refresh_token',
						null
					);
					dispatch({
						type: 'GET_TOKEN',
						payload: res.data.access_token,
					});
				} catch (error) {
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				}
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	const { isLogged, loading } = auth;

	return (
		<>
			<Router>
				<NavState>
					<ToastContainer />
					<Switch>
						<Route
							exact
							path="/"
							component={
								isLogged && !loading ? RedirectHandler : Login
							}
						/>
						<PrivateRoute
							exact
							path="/dashboard"
							component={Landing}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/licenses"
							component={Licenses}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/add-new"
							component={CreateLicense}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/products"
							component={Products}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/blacklist"
							component={Blacklist}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/users"
							component={Users}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/settings"
							component={Settings}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/console"
							component={Console}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/discord/oauth"
							component={OAuth2}
							isLogged={isLogged}
							loading={loading}
						/>
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				</NavState>
			</Router>
			<GlobalStyle />
		</>
	);
}

export default App;