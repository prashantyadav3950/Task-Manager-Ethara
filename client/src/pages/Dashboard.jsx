import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

import {
  FolderOpen,
  CheckCircle2,
  User,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Shield,
  Activity,
  Clock3,
  Layers3,
  Sparkles,
} from "lucide-react";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressRing from "../components/ui/ProgressRing";
import Skeleton from "../components/ui/Skeleton";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";

  return "Good evening";
}

const statusConfig = {
  "To Do": {
    color: "bg-amber-400",
    light: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  "In Progress": {
    color: "bg-blue-500",
    light: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  Done: {
    color: "bg-emerald-500",
    light: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
};

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isGlobalAdmin = user?.role === "Admin";

  useEffect(() => {
    Promise.all([API.get("/dashboard"), API.get("/projects")])
      .then(([statsRes, projRes]) => {
        setStats(statsRes.data);
        setProjects(projRes.data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <Skeleton variant="text" className="w-60 h-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" className="h-36 rounded-3xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Skeleton variant="card" className="xl:col-span-2 h-96 rounded-3xl" />
          <Skeleton variant="card" className="h-96 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">
            Failed to load dashboard
          </p>
        </div>
      </div>
    );
  }

  const completionRate =
    stats.totalTasks > 0
      ? ((stats.tasksByStatus["Done"] || 0) / stats.totalTasks) * 100
      : 0;

  const adminStatConfig = [
    {
      key: "totalProjects",
      label: "Projects",
      icon: FolderOpen,
      value: stats.totalProjects,
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      key: "totalTasks",
      label: "Total Tasks",
      icon: CheckCircle2,
      value: stats.totalTasks,
      gradient: "from-emerald-500 to-green-500",
    },
    {
      key: "myTasks",
      label: "My Tasks",
      icon: ClipboardList,
      value: stats.myTasks,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      key: "overdueTasks",
      label: "Overdue",
      icon: AlertTriangle,
      value: stats.overdueTasks,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const memberStatConfig = [
    {
      key: "totalProjects",
      label: "My Projects",
      icon: Layers3,
      value: stats.totalProjects,
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      key: "myTasks",
      label: "Assigned Tasks",
      icon: ClipboardList,
      value: stats.myTasks,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      key: "overdueTasks",
      label: "Pending",
      icon: Clock3,
      value: stats.overdueTasks,
      gradient: "from-rose-500 to-orange-500",
    },
  ];

  const statConfig = isGlobalAdmin
    ? adminStatConfig
    : memberStatConfig;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_30%)]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
                <Sparkles className="w-6 h-6 text-indigo-300" />
              </div>

              <Badge
                variant="role"
                value={user?.role || "Member"}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {getGreeting()}, {user?.name?.split(" ")[0]}
            </h1>

            <p className="text-slate-300 mt-3 max-w-2xl">
              {isGlobalAdmin
                ? "Track projects, monitor team productivity, and manage workflows from one unified dashboard."
                : "Stay on top of your assigned tasks and project activity in real-time."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-400">Completion Rate</p>

              <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold">
                  {Math.round(completionRate)}%
                </span>

                <span className="text-emerald-400 text-sm mb-1">
                  completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className={`grid gap-5 ${
          isGlobalAdmin
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {statConfig.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`}
              />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>

                  <h3 className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Activity className="w-4 h-4" />
                Live project insights
              </div>
            </div>
          );
        })}
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* TASK STATUS */}
        <Card className="xl:col-span-2 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Task Analytics
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Overview of current task distribution
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-medium">
              {stats.totalTasks} Tasks
            </div>
          </div>

          {/* MAIN BAR */}
          <div className="flex h-5 overflow-hidden rounded-full mb-8 bg-slate-100 dark:bg-slate-800">
            {Object.entries(stats.tasksByStatus).map(([status, count]) => (
              <div
                key={status}
                className={`${statusConfig[status]?.color} transition-all duration-700`}
                style={{
                  width: `${
                    stats.totalTasks
                      ? (count / stats.totalTasks) * 100
                      : 0
                  }%`,
                }}
              />
            ))}
          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stats.tasksByStatus).map(
              ([status, count]) => (
                <div
                  key={status}
                  className={`rounded-2xl border p-5 ${statusConfig[status]?.light}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{status}</p>

                      <h3 className="text-3xl font-bold mt-2">
                        {count}
                      </h3>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full ${statusConfig[status]?.color}`}
                    />
                  </div>

                  <div className="mt-4 w-full h-2 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className={`h-full ${statusConfig[status]?.color}`}
                      style={{
                        width: `${
                          stats.totalTasks
                            ? (count / stats.totalTasks) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </Card>

        {/* PROGRESS */}
        <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Productivity
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Team completion metrics
              </p>
            </div>
          </div>

          <ProgressRing
            percentage={completionRate}
            size={170}
            strokeWidth={10}
          />

          <div className="text-center mt-6">
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
              {Math.round(completionRate)}%
            </h3>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {stats.tasksByStatus["Done"] || 0} completed out of{" "}
              {stats.totalTasks} tasks
            </p>
          </div>
        </Card>
      </div>

      {/* MEMBER BANNER */}
      {!isGlobalAdmin && (
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Member Workspace
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
                You can manage assigned tasks, update progress,
                and collaborate with your team members. Contact
                your admin for project management permissions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isGlobalAdmin
                  ? "Recent Projects"
                  : "My Projects"}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Latest active workspace activity
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
              >
                <div className="group relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-cyan-500/5" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg mb-5">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <User className="w-4 h-4" />

                        {project.members.length} member
                        {project.members.length !== 1 && "s"}
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}