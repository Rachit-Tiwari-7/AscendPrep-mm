"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Simple cn utility
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  gradientBorder?: boolean;
  glass?: boolean;
}

export function PremiumCard({ 
  children, 
  className = "", 
  glowOnHover = true,
  gradientBorder = false,
  glass = true 
}: PremiumCardProps) {
  return (
    <motion.div
      whileHover={glowOnHover ? { 
        y: -4,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-white border border-gray-200",
        gradientBorder && "border-primary",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  className = "",
  delay = 0
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.12)" }}
      className={cn(
        "bg-white rounded-2xl p-6 cursor-pointer group border border-gray-200",
        className
      )}
    >
      <div className="relative">
        <motion.div 
          className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </motion.div>
  );
}

export function MetricCard({ 
  value, 
  label, 
  trend,
  icon: Icon,
  className = ""
}: { 
  value: string | number;
  label: string;
  trend?: { value: number; positive: boolean };
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-2xl p-6 relative overflow-hidden group border border-gray-200",
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </motion.div>
  );
}

export function StatBadge({ 
  value, 
  label, 
  color = "primary",
  className = ""
}: { 
  value: string | number;
  label: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning";
  className?: string;
}) {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 text-primary border-primary/20",
    secondary: "from-secondary/20 to-secondary/5 text-secondary border-secondary/20",
    accent: "from-accent/20 to-accent/5 text-accent border-accent/20",
    success: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
    warning: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20",
  };

  return (
    <div className={cn(
      "inline-flex flex-col items-center px-4 py-3 rounded-xl bg-gradient-to-br border",
      colorClasses[color],
      className
    )}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  );
}

export function GlowButton({ 
  children, 
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}: { 
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-300 text-gray-900 hover:border-primary hover:text-primary",
    ghost: "text-gray-600 hover:text-primary hover:bg-gray-100",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all duration-300 inline-block",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-200%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.div>
  );
}

export function GradientBadge({ 
  children, 
  className = "" 
}: { 
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      "bg-primary/10 border border-primary/20 text-primary",
      className
    )}>
      {children}
    </span>
  );
}

export function SkillTag({ 
  name, 
  level = "intermediate",
  className = ""
}: { 
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  className?: string;
}) {
  const levelColors = {
    beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    intermediate: "bg-primary/10 text-primary border-primary/20",
    advanced: "bg-accent/10 text-accent border-accent/20",
    expert: "bg-secondary/10 text-secondary border-secondary/20",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border",
        levelColors[level],
        className
      )}
    >
      {name}
    </motion.span>
  );
}

export function ProgressBar({ 
  value, 
  max = 100,
  color = "primary",
  className = "",
  animated = true
}: { 
  value: number;
  max?: number;
  color?: "primary" | "secondary" | "accent" | "success";
  className?: string;
  animated?: boolean;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: "from-primary to-accent",
    secondary: "from-secondary to-cyan-400",
    accent: "from-accent to-purple-400",
    success: "from-emerald-500 to-emerald-400",
  };

  return (
    <div className={cn("w-full h-2 bg-white/5 rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: animated ? 1 : 0, ease: [0.4, 0, 0.2, 1] }}
        className={cn("h-full rounded-full bg-gradient-to-r", colorClasses[color])}
      />
    </div>
  );
}

export function SectionTitle({ 
  title, 
  subtitle,
  centered = false,
  className = ""
}: { 
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={cn("h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent", className)} />
  );
}
