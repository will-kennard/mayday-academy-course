"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mayday-academy-progress";
const CHANGE_EVENT = "mayday-progress-change";

export type Progress = {
  completedLessons: string[];
  quizScore: number | null;
  quizCompleted: boolean;
};

const emptyProgress: Progress = {
  completedLessons: [],
  quizScore: null,
  quizCompleted: false,
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readProgress(): Progress {
  if (!isBrowser()) return emptyProgress;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;

    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      quizScore:
        typeof parsed.quizScore === "number" ? parsed.quizScore : null,
      quizCompleted: Boolean(parsed.quizCompleted),
    };
  } catch {
    return emptyProgress;
  }
}

function writeProgress(progress: Progress): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Notify same-tab listeners (the storage event only fires across tabs).
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Progress tracking is a progressive enhancement; ignore storage failures.
  }
}

// --- React store integration (useSyncExternalStore) ---------------------------
// getSnapshot must return a stable reference while the underlying data is
// unchanged, so we cache the parsed value against the raw localStorage string.
let cachedRaw: string | null = null;
let cachedProgress: Progress = emptyProgress;

function getSnapshot(): Progress {
  if (!isBrowser()) return emptyProgress;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedProgress;
  cachedRaw = raw;
  cachedProgress = readProgress();
  return cachedProgress;
}

function getServerSnapshot(): Progress {
  return emptyProgress;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Subscribe a component to progress changes. Returns empty progress during SSR
 * and the first client render, then updates once local storage is read.
 */
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function markLessonComplete(lessonId: string): Progress {
  const progress = readProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons = [...progress.completedLessons, lessonId];
    writeProgress(progress);
  }
  return progress;
}

export function markLessonIncomplete(lessonId: string): Progress {
  const progress = readProgress();
  progress.completedLessons = progress.completedLessons.filter(
    (id) => id !== lessonId
  );
  writeProgress(progress);
  return progress;
}

export function isLessonComplete(lessonId: string): boolean {
  return readProgress().completedLessons.includes(lessonId);
}

export function recordQuizResult(percentage: number): Progress {
  const progress = readProgress();
  progress.quizScore = percentage;
  progress.quizCompleted = true;
  writeProgress(progress);
  return progress;
}
