'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/app/store/auth-store';
import { 
  MessageSquare, FileText, Code, TrendingUp, Mic, 
  Sparkles, ArrowRight, CheckCircle2, Zap, Brain,
  Target, BarChart3, Users, Play, ChevronRight,
  Star, Quote, Lightbulb, Cpu, LineChart, Award,
  Github, Linkedin, Twitter, Youtube, ChevronDown,
  Monitor
} from 'lucide-react';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary animate-spin" />
          <p className="mt-4 text-gray-500 font-bold">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (isAuthenticated) return null;

  const heroFeatures = [
    { icon: Brain, title: "AI Mock", desc: "Realistic", rotate: "tilt-hover-1", color: "bg-primary/20" },
    { icon: Code, title: "Code", desc: "Practice", rotate: "tilt-hover-2", color: "bg-primary/30" },
    { icon: LineChart, title: "Track", desc: "Progress", rotate: "tilt-hover-3", color: "bg-primary/10" },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI Interview Engine',
      description: 'Hyper-realistic AI-powered interviews that adapt to your experience level and provide instant feedback.',
      rotate: 'tilt-hover-1',
    },
    {
      icon: FileText,
      title: 'Resume Intelligence',
      description: 'AI analyzes your resume to identify skill gaps and generates personalized questions.',
      rotate: 'tilt-hover-2',
    },
    {
      icon: Code,
      title: 'Live Coding Arena',
      description: 'Practice coding challenges in a live sandbox with real-time execution.',
      rotate: 'tilt-hover-3',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track your progress with detailed analytics and improvement recommendations.',
      rotate: 'tilt-hover-4',
    },
  ];

  const workflowSteps = [
    { icon: FileText, title: 'Upload', desc: 'Resume' },
    { icon: Target, title: 'Get', desc: 'Questions' },
    { icon: Play, title: 'Practice', desc: 'Interviews' },
    { icon: Zap, title: 'Get', desc: 'Feedback' },
    { icon: TrendingUp, title: 'Track', desc: 'Progress' },
  ];

  const pricing = [
    {
      name: "FREE",
      price: "$0",
      period: "forever",
      features: ["5 AI interviews/mo", "Basic resume", "10 DSA problems", "Community"],
      cta: "Start Free",
      popular: false,
      rotate: "tilt-hover-1"
    },
    {
      name: "PRO",
      price: "$19",
      period: "/mo",
      features: ["Unlimited interviews", "Advanced insights", "500+ DSA", "Priority support", "Analytics"],
      cta: "Go Pro",
      popular: true,
      rotate: "tilt-hover-2"
    },
    {
      name: "TEAM",
      price: "$49",
      period: "/user/mo",
      features: ["Everything in Pro", "Team dashboard", "Custom templates", "API access", "SSO"],
      cta: "Contact Sales",
      popular: false,
      rotate: "tilt-hover-3"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden noise-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-2 border-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center transform group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">AscendPrep AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" className="px-4 py-2 font-bold hover:text-primary transition-colors">Sign In</Link>
            <Link href="/register" className="btn-brutalist px-6 py-2 text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - MSTC Style */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          {/* Giant Headline */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8"
          >
            <h1 className="text-giant text-gray-900 mb-2">
              ACE YOUR
            </h1>
            <h1 className="text-giant text-primary">
              INTERVIEW
            </h1>
          </motion.div>

          {/* Tagline Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block brutalist-card-primary p-4 rounded-xl mb-12 max-w-2xl transform -rotate-1"
          >
            <p className="text-lg md:text-2xl font-black text-gray-900">
              <span className="text-primary">AI-Powered</span> Practice • <span className="text-primary">Resume</span> Intelligence • <span className="text-primary">Real</span> Feedback
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            {heroFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
                className={`brutalist-card p-6 rounded-xl ${feature.rotate} tilt-hover-straighten cursor-pointer overflow-hidden relative group`}
              >
                <div className={`absolute top-0 right-0 w-16 h-16 ${feature.color} rounded-bl-[2rem] transition-all duration-300 group-hover:scale-[8] group-hover:opacity-20`} />
                <feature.icon className="w-8 h-8 mb-3 relative z-10" />
                <h3 className="text-xl font-black relative z-10">{feature.title}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/register" className="btn-brutalist px-10 py-4 text-xl rounded-full inline-flex items-center gap-3 transform -rotate-1 hover:rotate-0">
              Start Practicing <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="/login" className="btn-brutalist-outline px-10 py-4 text-xl rounded-full inline-flex items-center transform rotate-1 hover:rotate-0">
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-900 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-1.5 h-3 bg-primary rounded-full" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* Social Proof Metrics Section */}
      <section className="py-16 bg-gray-50 border-y-2 border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,400+", label: "Interviews Practiced" },
              { value: "500+", label: "DSA Problems" },
              { value: "85%", label: "Users Feel More Confident" },
              { value: "150+", label: "Resume Analyses" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="badge-primary mb-4">Features</span>
            <h2 className="text-huge text-gray-900 mt-6">
              Everything You <span className="text-primary">Need</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ rotate: 0, y: -8 }}
                className={`brutalist-card p-8 rounded-xl ${feature.rotate} tilt-hover-straighten cursor-pointer`}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary/10 border-2 border-gray-900 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Staggered */}
      <section className="py-32 bg-gray-50 border-y-2 border-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-20">
            <span className="badge mb-4">Process</span>
            <h2 className="text-huge text-gray-900 mt-6">
              How It <span className="text-primary">Works</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, rotate: 0 }}
                className={`brutalist-card p-6 text-center min-w-[140px] ${index % 2 === 0 ? 'tilt-hover-1' : 'tilt-hover-2'} tilt-hover-straighten`}
              >
                <div className="w-12 h-12 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-lg">{step.title}</h3>
                <p className="text-sm text-gray-500 font-bold uppercase">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-gray-50 border-y-2 border-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-20">
            <span className="badge-primary mb-4">Pricing</span>
            <h2 className="text-huge text-gray-900 mt-6">
              Simple <span className="text-primary">Plans</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ rotate: 0, y: -8 }}
                className={`${plan.popular ? 'brutalist-card-primary' : 'brutalist-card'} p-8 rounded-xl ${plan.rotate} tilt-hover-straighten relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-4 py-1 text-xs font-black uppercase tracking-wider border-2 border-gray-900">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-gray-500 font-bold">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-3 font-black border-2 border-gray-900 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${plan.popular ? 'bg-primary text-white' : 'bg-white'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Blog Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="badge-primary mb-4">Resources</span>
              <h2 className="text-huge text-gray-900 mt-6 mb-4">
                Interview <span className="text-primary">Resources</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expert tips, guides, and insights to help you succeed
              </p>
            </FadeInUp>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              {[{
                title: "The Complete Guide to System Design Interviews",
                category: "Technical",
                readTime: "15 min read",
                icon: Monitor,
                color: "bg-blue-100 text-blue-700",
                rotate: "tilt-hover-1"
              },
              {
                title: "Behavioral Interview: Top 50 Questions Answered",
                category: "Behavioral",
                readTime: "12 min read",
                icon: MessageSquare,
                color: "bg-emerald-100 text-emerald-700",
                rotate: "tilt-hover-2"
              },
              {
                title: "Cracking the Coding Interview: 2024 Edition",
                category: "DSA",
                readTime: "20 min read",
                icon: Code,
                color: "bg-purple-100 text-purple-700",
                rotate: "tilt-hover-3"
              }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ rotate: 0, y: -8 }}
                  className={`brutalist-card overflow-hidden rounded-xl ${resource.rotate} tilt-hover-straighten cursor-pointer group`}
                >
                  <div className={`h-48 ${resource.color} border-b-2 border-gray-900 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <resource.icon className="w-16 h-16 text-gray-900/30 relative z-10" />
                    <span className="px-2 py-1 bg-gray-100 border border-gray-900 text-xs font-bold uppercase tracking-wider">
                      {resource.category}
                    </span>
                    <span className="text-xs text-gray-500 font-bold uppercase">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                    {resource.title}
                  </h3>
                  <div className="flex items-center text-primary text-sm font-black uppercase tracking-wider">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 bg-white font-black uppercase tracking-wider text-sm cursor-pointer hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Resources
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50 border-y-2 border-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="badge mb-4">FAQ</span>
              <h2 className="text-huge text-gray-900 mt-6 mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about AscendPrep AI
              </p>
            </FadeInUp>
          </div>

          <div className="space-y-4">
            {[
              { q: "How does the AI interview simulation work?", a: "Our AI uses advanced NLP to conduct realistic interviews, adapting questions based on your responses and providing instant feedback on your answers and communication style." },
              { q: "Can I practice for specific companies?", a: "Yes! Select specific companies and roles. Our AI tailors questions based on known interview patterns from top tech companies." },
              { q: "Is there a free trial for the Pro plan?", a: "Absolutely! We offer a 7-day free trial of our Pro plan with full access. No credit card required to start." },
              { q: "How does resume analysis work?", a: "Upload your resume and our AI extracts skills, identifies gaps, and generates personalized interview questions based on your experience." },
              { q: "Can I track my progress over time?", a: "Yes, our analytics dashboard shows performance trends across all skills and interview types with personalized recommendations." },
              { q: "Is my data secure?", a: "All data is encrypted at rest and in transit. We never share your information with third parties. You can delete your data anytime." }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="brutalist-card p-6 rounded-xl tilt-hover-1 tilt-hover-straighten"
              >
                <h3 className="font-black text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-huge text-white mb-6">
            Ready To <span className="text-white/80">Ace It?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 font-medium">
            Join 2,400+ students practicing for interviews
          </p>
          <Link href="/register" className="inline-block bg-white text-gray-900 px-12 py-5 text-xl font-black border-2 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all transform -rotate-1 hover:rotate-0">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t-2 border-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black">AscendPrep AI</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-600 font-medium">
                Built for students, by students
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">
              © {new Date().getFullYear()} AscendPrep AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
