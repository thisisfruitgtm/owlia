"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  guideAccessId: string;
  sections: string[];
}

export default function GuideTracker({ guideAccessId, sections }: Props) {
  const [activeSections, setActiveSections] = useState<Map<string, number>>(new Map());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize section timers
    const sectionTimers = new Map<string, number>();
    sections.forEach(section => {
      sectionTimers.set(section, 0);
    });

    // Intersection Observer for tracking which section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId && entry.isIntersecting) {
            // Section is visible, start tracking
            setActiveSections(prev => {
              const newMap = new Map(prev);
              newMap.set(sectionId, Date.now());
              return newMap;
            });
          } else if (sectionId && !entry.isIntersecting) {
            // Section left viewport, stop tracking for this section
            setActiveSections(prev => {
              const newMap = new Map(prev);
              newMap.delete(sectionId);
              return newMap;
            });
          }
        });
      },
      {
        threshold: 0.5, // 50% of section must be visible
      }
    );

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.querySelector(`[data-section-id="${sectionId}"]`);
      if (element) {
        observer.observe(element);
      }
    });

    // Track scroll depth and time every 10 seconds
    intervalRef.current = setInterval(() => {
      activeSections.forEach((startTime, sectionId) => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const section = document.querySelector(`[data-section-id="${sectionId}"]`);
        
        if (section && timeSpent > 0) {
          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollDepth = Math.min(100, Math.max(0, 
            Math.round((viewportHeight - rect.top) / rect.height * 100)
          ));

          // Send tracking data
          sendTrackingData(sectionId, timeSpent, scrollDepth);
        }
      });
    }, 10000); // Every 10 seconds

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [guideAccessId, sections, activeSections]);

  const sendTrackingData = async (section: string, timeSpent: number, scrollDepth: number) => {
    try {
      await fetch('/api/guide/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideAccessId,
          section,
          timeSpent,
          scrollDepth,
        }),
      });
    } catch (error) {
      console.error('Failed to send tracking data:', error);
    }
  };

  return null; // This component doesn't render anything
}

