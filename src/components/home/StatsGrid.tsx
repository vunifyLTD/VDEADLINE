import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, MapPin as MapPinHex, ScrollText, Award, BookText, GraduationCap } from 'lucide-react';

interface StatsGridProps {
  stats: {
    upcomingDeadlines: number;
    premierConferences: number;
    uniqueLocations: number;
    totalConferences: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const mainStats = [
    {
      icon: Hourglass,
      value: stats.upcomingDeadlines,
      label: "Active",
      color: "text-emerald-500",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      iconBg: "bg-emerald-100"
    },
    {
      icon: MapPinHex,
      value: stats.uniqueLocations,
      label: "Locations",
      color: "text-rose-500",
      gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
      iconBg: "bg-rose-100"
    },
    {
      icon: GraduationCap,
      value: stats.conferences,
      label: "Conferences",
      color: "text-blue-500",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      iconBg: "bg-blue-100"
    },
    {
      icon: ScrollText,
      value: stats.workshops,
      label: "Workshops",
      color: "text-violet-500",
      gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
      iconBg: "bg-violet-100"
    },
    {
      icon: BookText,
      value: stats.journals,
      label: "Journals",
      color: "text-purple-500",
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      iconBg: "bg-purple-100"
    },
    {
      icon: Award,
      value: stats.totalConferences,
      label: "Total",
      color: "text-amber-500",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconBg: "bg-amber-100"
    }
  ];

  return (
    <div className="relative mb-8">
      {/* Glassmorphic card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 
                       bg-gradient-to-br from-primary-500/10 to-transparent 
                       rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 
                       bg-gradient-to-tl from-primary-500/10 to-transparent 
                       rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] 
                       bg-[size:24px_24px]" />
        </div>

        {/* Stats content */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 text-center hover:bg-white/10 transition-colors duration-300"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${stat.gradient} 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className="relative">
                <motion.div 
                  className={`mx-auto mb-3 w-12 h-12 rounded-xl ${stat.iconBg} 
                           flex items-center justify-center ${stat.color}
                           group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                </motion.div>

                {/* Number */}
                <div className={`font-mono text-2xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm text-gray-600 font-medium 
                             group-hover:text-gray-900 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;