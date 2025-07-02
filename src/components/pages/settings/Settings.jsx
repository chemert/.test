import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { 
	BiUser, 
	BiLock, 
	BiShield, 
	BiNotification,
	BiPalette,
	BiGlobe,
	BiSave,
	BiRefresh
} from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import Footer from '../../global/Footer';
import NavbarHeader from '../../global/NavbarHeader';
import VerticalMenu from '../../global/VerticalMenu';

const initialState = {
	name: '',
	email: '',
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
	notifications: true,
	twoFactor: false,
	theme: 'dark',
	language: 'en',
};

function Settings() {
	const [navState] = useContext(Context);
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [data, setData] = useState(initialState);
	const [activeTab, setActiveTab] = useState('profile');

	const { name, email, currentPassword, newPassword, confirmPassword, notifications, twoFactor, theme, language } = data;

	///////////////////////////////////////
	//*
	//*   Animations
	//*
	///////////////////////////////////////

	const fadeElement = useSpring({
		config: { ...config.stiff },
		from: { opacity: 0 },
		to: {
			opacity: loading ? 0 : 1,
		},
	});

	const fadeLoader = useSpring({
		config: { ...config.stiff },
		from: { opacity: 0 },
		to: {
			opacity: loading ? 1 : 0,
		},
	});

	///////////////////////////////////////
	//*
	//*   Load user data
	//*
	///////////////////////////////////////

	useEffect(() => {
		if (user) {
			setData({
				...data,
				name: user.name || '',
				email: user.email || '',
			});
			setTimeout(() => setLoading(false), 500);
		}
	}, [user]);

	///////////////////////////////////////
	//*
	//*   Handle input changes
	//*
	///////////////////////////////////////

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setData({
			...data,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	///////////////////////////////////////
	//*
	//*   Handle form submission
	//*
	///////////////////////////////////////

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			notify_success('Settings updated successfully!');
		} catch (error) {
			notify_error('Failed to update settings');
		} finally {
			setSaving(false);
		}
	};

	const tabs = [
		{ id: 'profile', label: 'Profile', icon: BiUser },
		{ id: 'security', label: 'Security', icon: BiLock },
		{ id: 'notifications', label: 'Notifications', icon: BiNotification },
		{ id: 'preferences', label: 'Preferences', icon: BiPalette },
	];

	return (
		<>
			<HelmetHandler title="Settings - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<div className={`transition-all duration-300 ${navState ? 'ml-20' : 'ml-72'} pt-24 pb-20 px-8 min-h-screen`}>
				{/* Page Header */}
				<div className="flex items-center justify-between mb-12 animate-slide-in-up">
					<div>
						<h1 className="text-4xl font-bold gradient-text mb-3">Settings</h1>
						<p className="text-white/80 text-lg font-medium">
							Manage your account settings and preferences
						</p>
					</div>
					<div className="flex items-center gap-2 glass-enhanced px-4 py-2 rounded-xl">
						<span className="text-white/60 text-sm font-medium">Profile</span>
						<span className="text-white/40">/</span>
						<span className="text-white text-sm font-semibold">Settings</span>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar Navigation */}
					<div className="lg:col-span-1 animate-slide-in-left">
						<div className="card-modern p-6">
							<h3 className="text-lg font-bold text-white mb-6">Settings Menu</h3>
							<nav className="space-y-2">
								{tabs.map((tab) => {
									const Icon = tab.icon;
									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
												activeTab === tab.id
													? 'bg-gradient-primary text-white shadow-colored'
													: 'text-white/60 hover:text-white hover:bg-glass-medium'
											}`}
										>
											<Icon className="text-xl" />
											{tab.label}
										</button>
									);
								})}
							</nav>
						</div>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3 animate-slide-in-right">
						<form onSubmit={handleSubmit} className="card-modern p-8">
							{loading ? (
								<animated.div style={fadeLoader} className="space-y-6">
									{[...Array(6)].map((_, index) => (
										<div key={index} className="space-y-2">
											<div className="loading-shimmer h-4 w-24 rounded"></div>
											<div className="loading-shimmer h-12 w-full rounded-xl"></div>
										</div>
									))}
								</animated.div>
							) : (
								<animated.div style={fadeElement}>
									{/* Profile Tab */}
									{activeTab === 'profile' && (
										<div className="space-y-6 animate-fade-in">
											<div className="flex items-center gap-4 mb-8">
												<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl text-white">
													<BiUser />
												</div>
												<div>
													<h2 className="text-2xl font-bold gradient-text">Profile Information</h2>
													<p className="text-white/60">Update your account details</p>
												</div>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label className="block text-white font-bold mb-3">Full Name</label>
													<input
														type="text"
														name="name"
														value={name}
														onChange={handleChange}
														className="input-modern w-full"
														placeholder="Enter your full name"
													/>
												</div>
												<div>
													<label className="block text-white font-bold mb-3">Email Address</label>
													<input
														type="email"
														name="email"
														value={email}
														onChange={handleChange}
														className="input-modern w-full"
														placeholder="Enter your email"
													/>
												</div>
											</div>

											<div>
												<label className="block text-white font-bold mb-3">Bio</label>
												<textarea
													name="bio"
													rows={4}
													className="input-modern w-full resize-none"
													placeholder="Tell us about yourself..."
												/>
											</div>
										</div>
									)}

									{/* Security Tab */}
									{activeTab === 'security' && (
										<div className="space-y-6 animate-fade-in">
											<div className="flex items-center gap-4 mb-8">
												<div className="w-16 h-16 bg-gradient-error rounded-2xl flex items-center justify-center text-2xl text-white">
													<BiLock />
												</div>
												<div>
													<h2 className="text-2xl font-bold gradient-text">Security Settings</h2>
													<p className="text-white/60">Manage your password and security preferences</p>
												</div>
											</div>

											<div className="space-y-6">
												<div>
													<label className="block text-white font-bold mb-3">Current Password</label>
													<input
														type="password"
														name="currentPassword"
														value={currentPassword}
														onChange={handleChange}
														className="input-modern w-full"
														placeholder="Enter current password"
													/>
												</div>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
													<div>
														<label className="block text-white font-bold mb-3">New Password</label>
														<input
															type="password"
															name="newPassword"
															value={newPassword}
															onChange={handleChange}
															className="input-modern w-full"
															placeholder="Enter new password"
														/>
													</div>
													<div>
														<label className="block text-white font-bold mb-3">Confirm Password</label>
														<input
															type="password"
															name="confirmPassword"
															value={confirmPassword}
															onChange={handleChange}
															className="input-modern w-full"
															placeholder="Confirm new password"
														/>
													</div>
												</div>
											</div>

											<div className="glass-enhanced p-6 rounded-xl border border-white/10">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4">
														<div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center text-xl text-white">
															<BiShield />
														</div>
														<div>
															<h3 className="text-lg font-bold text-white">Two-Factor Authentication</h3>
															<p className="text-white/60 text-sm">Add an extra layer of security to your account</p>
														</div>
													</div>
													<label className="switch-modern">
														<input
															type="checkbox"
															name="twoFactor"
															checked={twoFactor}
															onChange={handleChange}
														/>
														<span className="slider"></span>
													</label>
												</div>
											</div>
										</div>
									)}

									{/* Notifications Tab */}
									{activeTab === 'notifications' && (
										<div className="space-y-6 animate-fade-in">
											<div className="flex items-center gap-4 mb-8">
												<div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center text-2xl text-white">
													<BiNotification />
												</div>
												<div>
													<h2 className="text-2xl font-bold gradient-text">Notification Preferences</h2>
													<p className="text-white/60">Choose how you want to be notified</p>
												</div>
											</div>

											<div className="space-y-4">
												{[
													{ id: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
													{ id: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' },
													{ id: 'sms', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
													{ id: 'marketing', label: 'Marketing Emails', desc: 'Receive promotional emails' },
												].map((item) => (
													<div key={item.id} className="glass-enhanced p-6 rounded-xl border border-white/10">
														<div className="flex items-center justify-between">
															<div>
																<h3 className="text-lg font-bold text-white">{item.label}</h3>
																<p className="text-white/60 text-sm">{item.desc}</p>
															</div>
															<label className="switch-modern">
																<input
																	type="checkbox"
																	name={item.id}
																	defaultChecked={item.id === 'email'}
																/>
																<span className="slider"></span>
															</label>
														</div>
													</div>
												))}
											</div>
										</div>
									)}

									{/* Preferences Tab */}
									{activeTab === 'preferences' && (
										<div className="space-y-6 animate-fade-in">
											<div className="flex items-center gap-4 mb-8">
												<div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center text-2xl text-white">
													<BiPalette />
												</div>
												<div>
													<h2 className="text-2xl font-bold gradient-text">App Preferences</h2>
													<p className="text-white/60">Customize your app experience</p>
												</div>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label className="block text-white font-bold mb-3">Theme</label>
													<select
														name="theme"
														value={theme}
														onChange={handleChange}
														className="select-modern w-full"
													>
														<option value="dark">Dark Theme</option>
														<option value="light">Light Theme</option>
														<option value="auto">Auto (System)</option>
													</select>
												</div>
												<div>
													<label className="block text-white font-bold mb-3">Language</label>
													<select
														name="language"
														value={language}
														onChange={handleChange}
														className="select-modern w-full"
													>
														<option value="en">English</option>
														<option value="tr">Türkçe</option>
														<option value="es">Español</option>
														<option value="fr">Français</option>
													</select>
												</div>
											</div>

											<div className="space-y-4">
												{[
													{ id: 'animations', label: 'Enable Animations', desc: 'Show smooth animations throughout the app' },
													{ id: 'sounds', label: 'Sound Effects', desc: 'Play sound effects for actions' },
													{ id: 'compact', label: 'Compact Mode', desc: 'Use a more compact layout' },
												].map((item) => (
													<div key={item.id} className="glass-enhanced p-6 rounded-xl border border-white/10">
														<div className="flex items-center justify-between">
															<div>
																<h3 className="text-lg font-bold text-white">{item.label}</h3>
																<p className="text-white/60 text-sm">{item.desc}</p>
															</div>
															<label className="switch-modern">
																<input
																	type="checkbox"
																	name={item.id}
																	defaultChecked={item.id === 'animations'}
																/>
																<span className="slider"></span>
															</label>
														</div>
													</div>
												))}
											</div>
										</div>
									)}

									{/* Action Buttons */}
									<div className="flex items-center gap-4 pt-8 border-t border-white/10">
										<button
											type="submit"
											disabled={saving}
											className="btn-modern px-8 py-3 rounded-xl flex items-center gap-3"
										>
											{saving ? (
												<>
													<div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
													Saving...
												</>
											) : (
												<>
													<BiSave className="text-xl" />
													Save Changes
												</>
											)}
										</button>
										<button
											type="button"
											className="glass-enhanced px-8 py-3 rounded-xl text-white font-semibold hover:bg-glass-medium transition-all duration-200 flex items-center gap-3"
										>
											<BiRefresh className="text-xl" />
											Reset
										</button>
									</div>
								</animated.div>
							)}
						</form>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}

export default Settings;