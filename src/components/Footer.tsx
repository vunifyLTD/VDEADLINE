import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Heart, Twitter, Linkedin, 
  Code2, BookOpen, MessageSquare, 
  GitPullRequest, Globe2, Users,
  Zap, Webhook, BookOpenCheck,
  FileText, CalendarPlus, PlusCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      icon: Code2,
      label: "Source Code",
      href: "https://github.com/vunify/vdeadline",
      gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
      stats: {
        value: "3K+",
        label: "Lines of Code",
        icon: Zap
      }
    },
    {
      icon: MessageSquare,
      label: "Join Discussion",
      href: "https://github.com/vunify/vdeadline/discussions",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      stats: {
        value: "0",
        label: "Active Users",
        icon: Users
      }
    },
    {
      icon: GitPullRequest,
      label: "Contribute",
      href: "https://github.com/vunify/vdeadline/pulls",
      gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
      stats: {
        value: "0",
        label: "Pull Requests",
        icon: GitPullRequest
      }
    }
  ];

  const submissionTypes = [
    {
      icon: CalendarPlus,
      label: "Add Conference",
      href: "https://github.com/vunify/vdeadline/issues/new?template=conference-submission.md",
      gradient: "from-blue-500/10 to-blue-600/5",
      color: "text-blue-500",
      description: "Submit a new academic conference"
    },
    {
      icon: FileText,
      label: "Add Workshop",
      href: "https://github.com/vunify/vdeadline/issues/new?template=workshop-submission.md",
      gradient: "from-green-500/10 to-green-600/5",
      color: "text-green-500",
      description: "Submit a research workshop"
    },
    {
      icon: BookOpen,
      label: "Add Journal",
      href: "https://github.com/vunify/vdeadline/issues/new?template=journal-submission.md",
      gradient: "from-purple-500/10 to-purple-600/5",
      color: "text-purple-500",
      description: "Submit an academic journal"
    },
    {
      icon: PlusCircle,
      label: "Add Poster",
      href: "https://github.com/vunify/vdeadline/issues/new?template=poster-submission.md",
      gradient: "from-orange-500/10 to-orange-600/5",
      color: "text-orange-500",
      description: "Submit a poster session"
    }
  ];

  return (
    <footer className="mt-32">
      {/* Decorative Background */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden">
        <div className="absolute left-[calc(50%-18rem)] top-24 translate-x-1/2 blur-3xl">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-20" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="space-y-8">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
              <img 
                src="https://vunify.org/logos/VDEADLINE.png"
                alt="VDeadline Logo"
                className="relative w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-400
                         bg-clip-text text-transparent">
                VDeadline
              </h3>
              <p className="text-sm text-gray-500">Never miss a deadline</p>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${link.gradient}
                             opacity-50 group-hover:opacity-100 transition-all duration-500`} />
                <div className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20
                             group-hover:shadow-lg transition-all duration-300">
                  <div className="mb-3 p-2.5 w-12 h-12 rounded-xl bg-white shadow-sm
                               group-hover:scale-110 transition-transform duration-300">
                    <link.icon className="w-full h-full text-primary-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{link.label}</h3>
                  
                  {/* Stats with Animated Icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="p-1.5 rounded-lg bg-gray-50"
                    >
                      <link.stats.icon className="w-4 h-4 text-primary-500" />
                    </motion.div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-semibold text-gray-900">{link.stats.value}</span>
                      <span className="text-sm text-gray-500">{link.stats.label}</span>
                    </div>
                  </div>

                  {/* Interactive Border */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent
                               translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Submission Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {submissionTypes.map((type, index) => (
              <motion.a
                key={type.label}
                href={type.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${type.gradient}
                             opacity-50 group-hover:opacity-100 transition-all duration-500`} />
                <div className="relative p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20
                             group-hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm ${type.color}
                                 group-hover:scale-110 transition-transform duration-300`}>
                      <type.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{type.label}</h4>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* API and Documentation Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* API Access */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/10
                         border border-violet-100 group hover:shadow-lg transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 p-3 rounded-xl bg-violet-50 text-violet-500"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Webhook className="w-6 h-6" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">API Access</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Programmatically access conference data through our REST API
                    </p>
                    
                    {/* Code Preview */}
                    <div className="relative overflow-hidden rounded-lg bg-gray-900 p-3">
                      <div className="text-[10px] font-mono text-emerald-400">
                        GET /api/v1/conferences?type=upcoming&category=systems
                      </div>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="px-2 py-1 rounded-full text-xs font-medium
                               bg-violet-100 text-violet-600"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Coming Soon
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Documentation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/10
                         border border-amber-100 group hover:shadow-lg transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 p-3 rounded-xl bg-amber-50 text-amber-500"
                    animate={{ 
                      rotate: [0, -15, 15, 0],
                      scale: [1, 1.1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <BookOpenCheck className="w-6 h-6" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">Documentation</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Comprehensive guides and API reference documentation
                    </p>
                    
                    {/* Documentation Preview */}
                    <div className="relative overflow-hidden rounded-lg bg-gray-900 p-3">
                      <div className="text-[10px] font-mono text-amber-400">
                        📚 Getting Started • API Reference • Examples • SDKs
                      </div>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="px-2 py-1 rounded-full text-xs font-medium
                               bg-amber-100 text-amber-600"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Coming Soon
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "https://github.com/vunify/vdeadline" },
              { icon: Twitter, href: "https://twitter.com/vdeadline" },
              { icon: Linkedin, href: "https://linkedin.com/company/vdeadline" },
              { icon: Globe2, href: "https://vdeadline.org" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-900
                         hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>© {currentYear} VDeadline</span>
                <span className="text-gray-300">•</span>
                <span>Developed and maintained by Amir Noohi</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r 
                         from-primary-50 to-primary-100/50 border border-primary-200
                         text-primary-600">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Trusted by 1000+ Researchers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;