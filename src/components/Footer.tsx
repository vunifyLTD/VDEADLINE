import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Heart, Twitter, Linkedin,
  Code2, BookOpen, MessageSquare,
  GitPullRequest, Globe2,
  GitFork, GitPullRequestDraft, Upload,
  ArrowRight, Webhook, BookOpenCheck,
  Code, MessagesSquare, GitPullRequestIcon
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Submission flow steps
  const submissionSteps = [
    {
      icon: GitFork,
      title: "Fork Repository",
      description: "Fork the VDeadline repository to your GitHub account",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: GitPullRequestDraft,
      title: "Add Venue",
      description: "Add your venue to the appropriate JSON file in src/data/2025/",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Upload,
      title: "Push Changes",
      description: "Push your changes to your forked repository",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: GitPullRequest,
      title: "Create PR",
      description: "Submit a pull request with your changes",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
      <footer className="mt-32">
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

            {/* Community Impact Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-rose-50 rounded-3xl" />
              <div className="relative p-8 rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-rose-500/10 to-rose-600/5 rounded-full blur-2xl" />

                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Help Us Grow the Community
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Your contribution matters! By submitting conference venues, you're helping researchers worldwide stay informed and connected. Join our mission to create the most comprehensive academic deadline tracker.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Code className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">3.2K+</div>
                      <div className="text-sm text-gray-500">Lines of Code</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100">
                    <div className="p-3 rounded-lg bg-amber-50">
                      <MessagesSquare className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">25+</div>
                      <div className="text-sm text-gray-500">Discussions</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100">
                    <div className="p-3 rounded-lg bg-emerald-50">
                      <GitPullRequestIcon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">15+</div>
                      <div className="text-sm text-gray-500">Pull Requests</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {submissionSteps.map((step, index) => (
                      <motion.div
                          key={step.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                             style={{
                               background: `linear-gradient(135deg, ${step.color.split(' ')[0].replace('from-', '')}15, ${step.color.split(' ')[1].replace('to-', '')}15)`
                             }} />

                        <div className="relative p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-300">
                              <step.icon className="w-6 h-6" style={{
                                color: step.color.split(' ')[1].replace('to-', '#')
                              }} />
                            </div>
                            <span className="text-lg font-semibold text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                          </div>

                          <h5 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h5>
                          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* API and Documentation Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* API Access */}
              <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative"
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
                      <div className="relative rounded-lg bg-gray-900 p-3">
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
                  className="relative"
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
                      <div className="relative rounded-lg bg-gray-900 p-3">
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
                { icon: Github, href: "https://github.com/vunifyLTD/VDEADLINE" },
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
                <span className="text-sm font-medium flex items-center gap-1">
                  Made with <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="inline-flex text-red-500"
                >
                    <Heart className="w-5 h-5 fill-current stroke-[1.5]" />
                  </motion.div> for the research community
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