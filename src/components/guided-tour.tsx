"use client";

import { useEffect, useRef } from 'react';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';

const STORAGE_KEY = 'alcestis_tour_completed';

const steps = [
  {
    popover: {
      title: 'Welcome to Alcestis Reporting!',
      description:
        'This quick tour will show you the key features so you can start generating reports right away.',
    },
  },
  {
    element: () => document.querySelector('[data-sidebar="sidebar"]'),
    popover: {
      title: 'Navigation Sidebar',
      description:
        'Use the sidebar to navigate between sections: Dashboard, Reports, Connections, and more.',
      side: 'right' as const,
      align: 'center' as const,
    },
  },
  {
    element: () => {
      const grid = document.querySelector(
        '[class*="grid-cols-1"][class*="lg:grid-cols-4"]',
      );
      if (!grid) {
        const h1 = document.querySelector('h1');
        return h1?.closest('[class*="max-w-7xl"]') || null;
      }
      return grid;
    },
    popover: {
      title: 'Dashboard Metrics',
      description:
        'Monitor key performance indicators: total reports, completion rates, active connections, and users.',
      side: 'bottom' as const,
    },
  },
  {
    element: () => {
      const buttons = document.querySelectorAll('[data-sidebar="menu-button"]');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Report definition')) return btn;
      }
      return null;
    },
    popover: {
      title: 'Report Definitions',
      description:
        'Create and manage report definitions with custom SQL queries, parameters, and output formats.',
      side: 'right' as const,
    },
  },
  {
    element: () => {
      const buttons = document.querySelectorAll('[data-sidebar="menu-button"]');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Scheduled')) return btn;
      }
      return null;
    },
    popover: {
      title: 'Scheduled Reports',
      description:
        'Automate report generation on a recurring schedule. Set daily, weekly, or monthly deliveries.',
      side: 'right' as const,
    },
  },
  {
    element: () => {
      const buttons = document.querySelectorAll('[data-sidebar="menu-button"]');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Connection')) return btn;
      }
      return null;
    },
    popover: {
      title: 'Database Connections',
      description:
        'Manage connections to your data sources including MSSQL, PostgreSQL, MySQL, Oracle, and more.',
      side: 'right' as const,
    },
  },
  {
    element: () => {
      const sidebar = document.querySelector('[data-sidebar="sidebar"]');
      if (!sidebar) return null;
      const groups = sidebar.querySelectorAll('[data-sidebar="group"]');
      if (groups.length < 2) return null;
      return groups[groups.length - 1];
    },
    popover: {
      title: 'Profile & Settings',
      description:
        'Access your profile, configure application settings, and manage your preferences.',
      side: 'right' as const,
    },
  },
  {
    popover: {
      title: "You're All Set!",
      description:
        'You can restart this tour anytime from Settings. Happy reporting!',
      doneBtnText: 'Start Using Alcestis',
    },
  },
] as DriveStep[];

export default function GuidedTour() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    hasRun.current = true;

    const timer = setTimeout(() => {
      const tour = driver({
        animate: true,
        overlayOpacity: 0.5,
        smoothScroll: true,
        showProgress: true,
        progressText: 'Step {current} of {total}',
        nextBtnText: 'Next',
        prevBtnText: 'Back',
        doneBtnText: 'Get Started',
        steps,
        onDestroyed: () => {
          localStorage.setItem(STORAGE_KEY, 'true');
        },
      });

      tour.drive();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
