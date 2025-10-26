/**
 * Centralized error logging utility
 *
 * Provides consistent error logging across the application.
 * In production, this would integrate with error tracking services
 * like Sentry, LogRocket, or Datadog.
 */

interface ErrorContext {
  [key: string]: unknown
}

/**
 * Logs mutation errors with context for debugging
 *
 * @param mutationType - Type of mutation that failed (e.g., 'createPost', 'createComment')
 * @param error - Error object thrown by the mutation
 * @param context - Additional context about the error (variables, state, etc.)
 *
 * @example
 * ```ts
 * onError: (error, variables, context) => {
 *   logMutationError('createPost', error as Error, {
 *     content: variables.content,
 *     userId: user?.id
 *   })
 * }
 * ```
 */
export function logMutationError(
  mutationType: string,
  error: Error,
  context?: ErrorContext
) {
  const errorLog = {
    type: 'MUTATION_ERROR',
    mutationType,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error(`[Mutation Error: ${mutationType}]`, errorLog)
  }

  // In production, send to error tracking service
  // Example: Sentry.captureException(error, { extra: errorLog })
  // Example: LogRocket.captureException(error, { tags: { mutationType } })
}

/**
 * Logs query errors with context for debugging
 *
 * @param queryKey - Query key that failed
 * @param error - Error object thrown by the query
 * @param context - Additional context about the error
 *
 * @example
 * ```ts
 * onError: (error) => {
 *   logQueryError(['posts'], error as Error, {
 *     pageParam: 0
 *   })
 * }
 * ```
 */
export function logQueryError(
  queryKey: unknown[],
  error: Error,
  context?: ErrorContext
) {
  const errorLog = {
    type: 'QUERY_ERROR',
    queryKey: JSON.stringify(queryKey),
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error(`[Query Error: ${JSON.stringify(queryKey)}]`, errorLog)
  }

  // In production, send to error tracking service
  // Example: Sentry.captureException(error, { extra: errorLog })
}

/**
 * Logs general application errors
 *
 * @param category - Error category (e.g., 'Auth', 'API', 'UI')
 * @param error - Error object or message
 * @param context - Additional context about the error
 *
 * @example
 * ```ts
 * try {
 *   // risky operation
 * } catch (error) {
 *   logError('Auth', error as Error, { action: 'login' })
 * }
 * ```
 */
export function logError(
  category: string,
  error: Error | string,
  context?: ErrorContext
) {
  const errorLog = {
    type: 'APPLICATION_ERROR',
    category,
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error(`[${category} Error]`, errorLog)
  }

  // In production, send to error tracking service
  // Example: Sentry.captureException(error, { extra: errorLog })
}
