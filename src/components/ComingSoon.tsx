import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ArrowRight, Calendar, Clock, Globe2, Filter, Star, CalendarCheck, Users2, BookOpen, Search } from 'lucide-react';

interface ComingSoonProps {
    onUnlock: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ onUnlock }) => {
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);
    const secretKey = 'vdeadline2025';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key === secretKey) {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const features = [
        {
            icon: Calendar,
            title: "Smart Deadline Tracking",
            description: "Intelligent tracking system for conference deadlines with timezone support",
            color: "from-blue-500/10 to-blue-600/5"
        },
        {
            icon: Clock,
            title: "Real-time Updates",
            description: "Live countdown timers and instant notifications for approaching deadlines",
            color: "from-emerald-500/10 to-emerald-600/5"
        },
        {
            icon: Globe2,
            title: "Global Coverage",
            description: "Comprehensive database of conferences from around the world",
            color: "from-violet-500/10 to-violet-600/5"
        },
        {
            icon: Filter,
            title: "Advanced Filtering",
            description: "Filter by research area, ranking, location, and deadline status",
            color: "from-amber-500/10 to-amber-600/5"
        },
        {
            icon: Star,
            title: "Conference Rankings",
            description: "Access venue rankings and impact factors at a glance",
            color: "from-rose-500/10 to-rose-600/5"
        },
        {
            icon: Search,
            title: "Smart Search",
            description: "Powerful search functionality across all conference details",
            color: "from-purple-500/10 to-purple-600/5"
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]" />

                {/* Gradient Orbs */}
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-violet-500/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />

                {/* Animated Particles */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary-500/20"
                        style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 40}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="max-w-6xl w-full py-12">
                    {/* Logo and Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600
                         rounded-2xl blur-lg opacity-20"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.2, 0.3, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <img
                                    src="https://vunify.org/logos/VDEADLINE.png"
                                    alt="VDeadline Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">
                            <motion.span
                                className="bg-gradient-to-r from-primary-600 to-primary-400
                         bg-clip-text text-transparent inline-block"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                VDeadline
                            </motion.span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            The world's most comprehensive and elegant conference deadline tracker,
                            designed for researchers who value organization and efficiency
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative p-6 rounded-xl bg-white/80 backdrop-blur-sm
                         shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                {/* Content */}
                                <div className="relative">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-white shadow-sm
                             flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-primary-500" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Access Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md mx-auto"
                    >
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Enter access key"
                                    className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/80 backdrop-blur-sm border
                           transition-all duration-300 outline-none
                           ${error
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100'
                                    }`}
                                />
                                <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
                                  transition-colors duration-300
                                  ${error ? 'text-red-400' : 'text-gray-400'}`} />

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg
                           bg-primary-500 text-white hover:bg-primary-600
                           transition-colors duration-300"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: error ? 1 : 0, y: error ? 0 : -10 }}
                                className="absolute top-full left-0 right-0 text-center mt-2
                         text-red-500 text-sm"
                            >
                                Invalid access key. Please try again.
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;