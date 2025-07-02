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

/* Global styling */
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Inter", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :root {
    /* Modern Dark Theme Colors */
    --primary-bg: #0a0b0f;
    --secondary-bg: #111218;
    --tertiary-bg: #1a1b23;
    --card-bg: #1e1f26;
    --border-color: #2a2b35;
    --hover-bg: #252631;
    
    /* Modern Accent Colors */
    --primary-accent: #6366f1;
    --primary-accent-hover: #5855eb;
    --secondary-accent: #8b5cf6;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    
    /* Text Colors */
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    --text-disabled: #475569;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    --gradient-secondary: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    --gradient-card: linear-gradient(145deg, #1e1f26 0%, #252631 100%);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
    --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    /* Transitions */
    --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    background: var(--primary-bg);
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    min-height: 100vh;
    color: var(--text-primary);
  }

  /* Modern Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-bg);
    border-radius: var(--radius-sm);
  }
   
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--primary-accent), var(--secondary-accent));
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, var(--primary-accent-hover), var(--secondary-accent));
    box-shadow: var(--shadow-glow);
  }

  /* Modern Input Focus States */
  input:focus, select:focus, textarea:focus {
    border-color: var(--primary-accent) !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
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
    -webkit-text-fill-color: var(--text-secondary);
    -webkit-box-shadow: 0 0 0px 1000px var(--card-bg) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Modern Glass Effect */
  .glass-effect {
    background: rgba(30, 31, 38, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Modern Button Hover Effects */
  .btn-modern {
    position: relative;
    overflow: hidden;
    transition: var(--transition-normal);
  }

  .btn-modern::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: var(--transition-normal);
  }

  .btn-modern:hover::before {
    left: 100%;
  }

  /* Modern Card Animations */
  .card-modern {
    transition: var(--transition-normal);
  }

  .card-modern:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
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

  /* Glow Animation */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
    }
  }

  .glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  /* Modern Focus Ring */
  .focus-ring:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
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