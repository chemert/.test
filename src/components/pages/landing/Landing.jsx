import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { 
	BiTrendingUp, 
	BiShield, 
	BiUser, 
	BiServer,
	BiCheckCircle,
	BiTime,
	BiGlobe,
	BiActivity,
	BiLock,
	BiStats
} from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import Footer from '../../global/Footer';
import NavbarHeader from '../../global/NavbarHeader';
import VerticalMenu from '../../global/VerticalMenu';
import { options, options2, options3, series, series2 } from './ChartData';

function Landing() {
	const [navState] = useContext(Context);
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const [callback, setCallback] = useState(false);
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState({});

	const skeletonamount = 4;

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
	//*   Get dashboard data
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const getDashboard = async () => {
				try {
					let res = await axios.get(`/api/users/getdashboard`, {
						headers: { Authorization: token },
					});
					if (!unmounted) {
						setStats(res.data);
						setTimeout(
							() => (!unmounted ? setLoading(false) : null),
							500
						);
					}
				} catch (error) {
					if (!unmounted) {
						setLoading(false);
					}
				}
			};
			getDashboard();
		}
		return () => {
			unmounted = true;
		};
	}, [callback, token]);

	return (
		<>
			<HelmetHandler title="Dashboard - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<div className={`transition-all duration-300 ${navState ? 'ml-20' : 'ml-72'} pt-24 pb-20 px-8 min-h-screen`}>
				{/* Page Header */}
				<div className="flex items-center justify-between mb-12 animate-slide-in-up">
					<div>
						<h1 className="text-4xl font-bold gradient-text mb-3">Dashboard</h1>
						<p className="text-white/80 text-lg font-medium">
							Welcome back, <span className="gradient-text font-bold">{user.name}</span>! 
							Here's what's happening with your licenses today.
						</p>
					</div>
					<div className="flex items-center gap-2 glass-enhanced px-4 py-2 rounded-xl">
						<span className="text-white/60 text-sm font-medium">Home</span>
						<span className="text-white/40">/</span>
						<span className="text-white text-sm font-semibold">Dashboard</span>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-in-up">
					{/* Total Licenses */}
					<div className="card-modern p-8 hover-lift">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Total Licenses</p>
								{loading ? (
									<animated.div style={fadeLoader}>
										<div className="loading-shimmer h-8 w-20 rounded"></div>
									</animated.div>
								) : (
									<animated.div style={fadeElement}>
										<h3 className="text-3xl font-bold gradient-text">
											{stats.total_licenses || 0}
										</h3>
									</animated.div>
								)}
								<p className="text-green-400 text-sm font-semibold mt-1">+12% from last month</p>
							</div>
							<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl text-white shadow-colored animate-float">
								<BiShield />
							</div>
						</div>
					</div>

					{/* Active Licenses */}
					<div className="card-modern p-8 hover-lift">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Active Licenses</p>
								{loading ? (
									<animated.div style={fadeLoader}>
										<div className="loading-shimmer h-8 w-20 rounded"></div>
									</animated.div>
								) : (
									<animated.div style={fadeElement}>
										<h3 className="text-3xl font-bold gradient-text">
											{stats.active_licenses || 0}
										</h3>
									</animated.div>
								)}
								<p className="text-green-400 text-sm font-semibold mt-1">+8% from last month</p>
							</div>
							<div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg shadow-green-500/30 animate-float">
								<BiCheckCircle />
							</div>
						</div>
					</div>

					{/* Total Users */}
					<div className="card-modern p-8 hover-lift">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Total Users</p>
								{loading ? (
									<animated.div style={fadeLoader}>
										<div className="loading-shimmer h-8 w-20 rounded"></div>
									</animated.div>
								) : (
									<animated.div style={fadeElement}>
										<h3 className="text-3xl font-bold gradient-text">
											{stats.total_users || 0}
										</h3>
									</animated.div>
								)}
								<p className="text-blue-400 text-sm font-semibold mt-1">+3% from last month</p>
							</div>
							<div className="w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg shadow-yellow-500/30 animate-float">
								<BiUser />
							</div>
						</div>
					</div>

					{/* API Requests */}
					<div className="card-modern p-8 hover-lift">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">API Requests</p>
								{loading ? (
									<animated.div style={fadeLoader}>
										<div className="loading-shimmer h-8 w-20 rounded"></div>
									</animated.div>
								) : (
									<animated.div style={fadeElement}>
										<h3 className="text-3xl font-bold gradient-text">
											{stats.total_requests || 0}
										</h3>
									</animated.div>
								)}
								<p className="text-green-400 text-sm font-semibold mt-1">+25% from last month</p>
							</div>
							<div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-500/30 animate-float">
								<BiServer />
							</div>
						</div>
					</div>
				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
					{/* License Activity Chart */}
					<div className="lg:col-span-2 card-modern p-8 animate-slide-in-left">
						<div className="mb-6">
							<h3 className="text-2xl font-bold gradient-text mb-2">License Activity</h3>
							<p className="text-white/60 font-medium">Weekly overview of license usage</p>
						</div>
						<div className="h-80">
							{loading ? (
								<animated.div style={fadeLoader}>
									<div className="loading-shimmer h-full w-full rounded-xl"></div>
								</animated.div>
							) : (
								<animated.div style={fadeElement}>
									<Chart
										options={options}
										series={series}
										type="area"
										height={320}
									/>
								</animated.div>
							)}
						</div>
					</div>

					{/* System Health */}
					<div className="card-modern p-8 animate-slide-in-right">
						<div className="mb-6">
							<h3 className="text-2xl font-bold gradient-text mb-2">System Health</h3>
							<p className="text-white/60 font-medium">Overall performance</p>
						</div>
						<div className="h-80">
							{loading ? (
								<animated.div style={fadeLoader}>
									<div className="loading-shimmer h-full w-full rounded-xl"></div>
								</animated.div>
							) : (
								<animated.div style={fadeElement}>
									<Chart
										options={options2}
										series={series2}
										type="radialBar"
										height={320}
									/>
								</animated.div>
							)}
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="mb-12 animate-slide-in-up">
					<h2 className="text-2xl font-bold gradient-text mb-8">Quick Actions</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="card-modern p-6 hover-lift cursor-pointer group">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-xl text-white group-hover:animate-bounce">
									<BiShield />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white mb-1">Create License</h3>
									<p className="text-white/60 text-sm">Generate a new license key</p>
								</div>
							</div>
						</div>

						<div className="card-modern p-6 hover-lift cursor-pointer group">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center text-xl text-white group-hover:animate-bounce">
									<BiUser />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white mb-1">Manage Users</h3>
									<p className="text-white/60 text-sm">Add or edit user accounts</p>
								</div>
							</div>
						</div>

						<div className="card-modern p-6 hover-lift cursor-pointer group">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-xl text-white group-hover:animate-bounce">
									<BiStats />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white mb-1">View Analytics</h3>
									<p className="text-white/60 text-sm">Check detailed reports</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="animate-slide-in-up">
					<h2 className="text-2xl font-bold gradient-text mb-8">Recent Activity</h2>
					<div className="space-y-4">
						<div className="glass-enhanced p-6 rounded-xl border border-white/10 hover-lift">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center text-white">
									<BiCheckCircle />
								</div>
								<div className="flex-1">
									<h4 className="text-white font-semibold">New license activated</h4>
									<p className="text-white/60 text-sm">2 minutes ago</p>
								</div>
							</div>
						</div>

						<div className="glass-enhanced p-6 rounded-xl border border-white/10 hover-lift">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white">
									<BiUser />
								</div>
								<div className="flex-1">
									<h4 className="text-white font-semibold">User account created</h4>
									<p className="text-white/60 text-sm">15 minutes ago</p>
								</div>
							</div>
						</div>

						<div className="glass-enhanced p-6 rounded-xl border border-white/10 hover-lift">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-white">
									<BiServer />
								</div>
								<div className="flex-1">
									<h4 className="text-white font-semibold">API endpoint accessed</h4>
									<p className="text-white/60 text-sm">1 hour ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}

export default Landing;