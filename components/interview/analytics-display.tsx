'use client';

import { IBehavioralMetrics } from '@/lib/xencruit-ai';
import { Activity, Target, Brain, Zap, Frown, Smile } from 'lucide-react';

interface AnalyticsDisplayProps {
  metrics: IBehavioralMetrics;
  isInitialized: boolean;
  error: string | null;
}

export function AnalyticsDisplay({ metrics, isInitialized, error }: AnalyticsDisplayProps) {
  if (error) {
    return (
      <div className="p-4 border-2 border-rose-200 bg-rose-50 text-rose-600 text-sm rounded">
        <p className="font-bold">Analytics Error</p>
        <p className="text-xs">{error}</p>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="p-4 border-2 border-amber-200 bg-amber-50 text-amber-700 text-sm rounded flex items-center gap-2">
        <Activity className="w-4 h-4 animate-pulse" />
        <p>Initializing AI analytics...</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const MetricBar = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${color}`} />
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <span className={`font-bold ${getScoreTextColor(value)}`}>{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getScoreColor(value)} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#000] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Live Analytics
        </h3>
        <div className="flex items-center gap-1">
          {metrics.sentiment === 'Positive' ? (
            <Smile className="w-4 h-4 text-emerald-500" />
          ) : (
            <Frown className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-xs font-medium text-gray-500">{metrics.sentiment}</span>
        </div>
      </div>

      <div className="space-y-3">
        <MetricBar
          label="Focus"
          value={metrics.focus}
          icon={Target}
          color="text-blue-500"
        />
        <MetricBar
          label="Engagement"
          value={metrics.engagement}
          icon={Zap}
          color="text-purple-500"
        />
        <MetricBar
          label="Posture"
          value={metrics.posture}
          icon={Brain}
          color="text-orange-500"
        />
        <MetricBar
          label="Symmetry"
          value={metrics.symmetry}
          icon={Activity}
          color="text-pink-500"
        />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last updated:</span>
          <span>{new Date(metrics.lastUpdateTime).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
