/**
 * FitCalc Hub — User Dashboard & Progress Tracking
 */

export type * from "./types";

export {
  getProfile,
  updateProfile,
  getDailySummary,
  getMetricSeries,
  getWorkoutStreak,
  getGoals,
  createGoal,
  getWeightLogs,
  addWeightLog,
  getWorkoutLogs,
  getWaterLogs,
  addWaterLog,
  getDietLogs,
  getCalculatorHistory,
  getSavedItems,
  unsaveItem,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getRecentActivity,
  getDashboardSnapshot,
  getLatestArticlesForDashboard,
  getRecommendedWorkouts,
  getRecommendedDiets,
  getDemoUserId,
  prismaGetProfile,
  prismaUpsertProfile,
  prismaAddWeightLog,
  prismaAddWaterLog,
  prismaAddWorkoutLog,
  prismaCreateGoal,
  prismaSaveItem,
  prismaListNotifications,
} from "./services";

export {
  TRACKING_METRICS,
  getMetric,
  listDashboardCardMetrics,
  listAllMetrics,
  registerMetric,
} from "./metrics";
export type { MetricDefinition } from "./metrics";

export {
  calcBmi,
  goalProgressPct,
  estimateCompletionDate,
  formatDashboardDate,
  formatRelative,
  pctOf,
} from "./utils";

export {
  actionUpdateProfile,
  actionAddWeight,
  actionAddWater,
  actionCreateGoal,
  actionUnsave,
  actionMarkNotificationRead,
  actionMarkAllNotificationsRead,
} from "./actions";
