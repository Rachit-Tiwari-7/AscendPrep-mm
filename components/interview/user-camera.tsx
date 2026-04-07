'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Video, VideoOff, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useXencruitAnalytics } from '@/hooks/use-xencruit-analytics';
import { AnalyticsDisplay } from './analytics-display';

interface UserCameraProps {
  isActive?: boolean;
  enableAnalytics?: boolean;
}

export const UserCamera = forwardRef<HTMLVideoElement, UserCameraProps>(
  function UserCamera({ isActive = true, enableAnalytics = false }, forwardedRef) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [hasVideo, setHasVideo] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAnalytics, setShowAnalytics] = useState(true);

    // Combine refs
    useEffect(() => {
      if (forwardedRef && videoRef.current) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(videoRef.current);
        } else {
          (forwardedRef as React.MutableRefObject<HTMLVideoElement | null>).current = videoRef.current;
        }
      }
    }, [forwardedRef]);

    // Analytics hook
    const { metrics, isInitialized, error: analyticsError } = useXencruitAnalytics({
      enabled: enableAnalytics && isEnabled && hasVideo,
      videoRef: videoRef as React.RefObject<HTMLVideoElement>
    });

    useEffect(() => {
      if (!isActive || !isEnabled) {
        // Cleanup stream when not active
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setHasVideo(false);
        return;
      }

      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user'
            },
            audio: false
          });
          
          streamRef.current = stream;
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setHasVideo(true);
            setError(null);
          }
        } catch (err) {
          console.error('Failed to access camera:', err);
          setError('Camera access denied. Please enable camera permissions.');
          setHasVideo(false);
        }
      };

      startCamera();

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
    }, [isActive, isEnabled]);

    const toggleCamera = () => {
      setIsEnabled(!isEnabled);
    };

    return (
      <Card className="h-full w-full">
        <CardContent className="h-full p-0 relative bg-black rounded-lg overflow-hidden">
          {/* Video element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          
          {/* Overlay when no video */}
          {!hasVideo && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80">
              {error ? (
                <>
                  <VideoOff className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm text-center px-4">{error}</p>
                </>
              ) : (
                <>
                  <Video className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm">Camera off</p>
                </>
              )}
            </div>
          )}
          
          {/* Camera controls */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            {enableAnalytics && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`border-0 ${showAnalytics ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
              >
                <Activity className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleCamera}
              className="bg-black/50 text-white hover:bg-black/70 border-0"
            >
              {isEnabled ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Analytics overlay */}
          {enableAnalytics && showAnalytics && hasVideo && (
            <div className="absolute top-4 right-4 w-64 z-20">
              <AnalyticsDisplay metrics={metrics} isInitialized={isInitialized} error={analyticsError} />
            </div>
          )}
          
          {/* User label */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm z-10">
            You
          </div>
        </CardContent>
      </Card>
    );
  }
);
