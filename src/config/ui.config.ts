/**
 * UI Configuration Constants
 *
 * Centralizes numbers and UI-related constants for easier tuning and maintenance.
 * Prefer importing from here rather than hardcoding values throughout the application.
 */
export const UI_CONFIG = {
  /** Loading skeleton configuration */
  LOADING: {
    /** Number of skeleton cards to show on initial page load */
    INITIAL_SKELETON_COUNT: 3,
    /** Number of skeleton cards to show when loading next page */
    NEXT_PAGE_SKELETON_COUNT: 2,
  },

  /** Intersection Observer configuration for infinite scroll */
  INTERSECTION_OBSERVER: {
    /** Trigger when this % of sentinel element is visible (0-1) */
    THRESHOLD: 0.1, // 10% visible
  },

  /** React Query configuration */
  QUERY: {
    /** How long data stays fresh before refetch (milliseconds) */
    STALE_TIME_MS: 5 * 60 * 1000, // 5 minutes
  },

  /** Mock data generation settings */
  MOCK_DATA: {
    /** Hours between consecutive posts for realistic chronological ordering */
    HOURS_BETWEEN_POSTS: 6,
    /** Total number of mock posts to generate */
    TOTAL_POSTS: 100,
    /** Number of posts per page for pagination */
    PAGE_SIZE: 10,
    /** Comment distribution probabilities */
    COMMENT_PROBABILITY: {
      /** Probability of post having 0 comments (no engagement) */
      NO_COMMENTS: 0.45, // 45%
      /** Probability of post having 1 comment (low engagement) */
      ONE_COMMENT: 0.60, // 15% (0.60 - 0.45)
      /** Probability of post having 2 comments (medium engagement) */
      TWO_COMMENTS: 0.80, // 20% (0.80 - 0.60)
      // Remaining 20% (1.00 - 0.80) = 3 comments (high engagement)
    },
  },

  /** API delay simulation */
  DELAY: {
    /** Minimum simulated network latency (milliseconds) */
    MIN_MS: 300,
    /** Maximum simulated network latency (milliseconds) */
    MAX_MS: 800,
  },
} as const
