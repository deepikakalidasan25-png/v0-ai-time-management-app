"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Clock, Target, BarChart3, PieChartIcon, Activity, Award } from "lucide-react"

interface Task {
  id: number
  title: string
  priority: "low" | "medium" | "high"
  estimatedTime: number
  completed: boolean
  category?: string
  completedAt?: Date
  createdAt?: Date
}

interface AnalyticsDashboardProps {
  tasks: Task[]
}

export function AnalyticsDashboard({ tasks }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week")

  // Generate mock data for charts
  const weeklyProductivity = [
    { day: "Mon", completed: 8, planned: 10, focusTime: 6.5 },
    { day: "Tue", completed: 12, planned: 14, focusTime: 7.2 },
    { day: "Wed", completed: 6, planned: 8, focusTime: 4.8 },
    { day: "Thu", completed: 15, planned: 16, focusTime: 8.1 },
    { day: "Fri", completed: 11, planned: 12, focusTime: 6.9 },
    { day: "Sat", completed: 4, planned: 6, focusTime: 3.2 },
    { day: "Sun", completed: 2, planned: 4, focusTime: 2.1 },
  ]

  const categoryDistribution = [
    { name: "Work", value: 65, color: "#0891b2" },
    { name: "Personal", value: 20, color: "#7c3aed" },
    { name: "Learning", value: 10, color: "#059669" },
    { name: "Health", value: 5, color: "#dc2626" },
  ]

  const priorityBreakdown = [
    { priority: "High", completed: 18, pending: 5 },
    { priority: "Medium", completed: 24, pending: 8 },
    { priority: "Low", completed: 12, pending: 15 },
  ]

  const timeSpentTrend = [
    { week: "W1", planned: 40, actual: 38, efficiency: 95 },
    { week: "W2", planned: 42, actual: 45, efficiency: 107 },
    { week: "W3", planned: 38, actual: 35, efficiency: 92 },
    { week: "W4", planned: 44, actual: 41, efficiency: 93 },
  ]

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length
  const completedHighPriority = tasks.filter((t) => t.priority === "high" && t.completed).length
  const highPriorityRate = highPriorityTasks > 0 ? (completedHighPriority / highPriorityTasks) * 100 : 0

  const totalEstimatedTime = tasks.reduce((acc, task) => acc + task.estimatedTime, 0)
  const completedTime = tasks.filter((t) => t.completed).reduce((acc, task) => acc + task.estimatedTime, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics & Insights</h2>
          <p className="text-slate-600 dark:text-slate-400">Track your productivity patterns and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            variant={timeRange === "quarter" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("quarter")}
          >
            Quarter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{completionRate.toFixed(0)}%</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+12% from last week</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <Progress value={completionRate} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">High Priority Success</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{highPriorityRate.toFixed(0)}%</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+8% from last week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <Progress value={highPriorityRate} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Time Efficiency</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">94%</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">-3% from last week</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <Progress value={94} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Productivity Score</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">8.7</p>
                <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">+0.4 from last week</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: "87%" }} />
              </div>
              <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">10</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="productivity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Weekly Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#0891b2" name="Completed" />
                    <Bar dataKey="planned" fill="#e2e8f0" name="Planned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Focus Time Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="focusTime" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Priority Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityBreakdown} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" />
                  <YAxis dataKey="priority" type="category" />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#059669" name="Completed" />
                  <Bar dataKey="pending" fill="#dc2626" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Task Distribution by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryDistribution.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{category.value}%</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.floor(Math.random() * 20) + 80}% complete
                        </Badge>
                      </div>
                    </div>
                    <Progress value={category.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Time Management Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeSpentTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="planned" stroke="#64748b" strokeWidth={2} name="Planned Hours" />
                  <Line type="monotone" dataKey="actual" stroke="#0891b2" strokeWidth={2} name="Actual Hours" />
                  <Line type="monotone" dataKey="efficiency" stroke="#059669" strokeWidth={2} name="Efficiency %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Productivity Trend</h3>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">+15%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">vs last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Average Focus</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">2.3h</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">per session</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Goal Achievement</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">87%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Peak Performance Window</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your most productive hours are between 9:00 AM - 11:30 AM with 94% task completion rate.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Task Estimation Accuracy</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You tend to underestimate high-priority tasks by 23% on average. Consider adding buffer time.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Weekly Pattern</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Thursday is your most productive day with 15% higher completion rates than average.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Schedule Optimization</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Move 2-3 high-priority tasks to your 9-11 AM peak window for better results.
                  </p>
                </div>

                <div className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Break Scheduling</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Take a 15-minute break every 90 minutes to maintain focus and prevent burnout.
                  </p>
                </div>

                <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Task Batching</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Group similar tasks together on Tuesdays and Thursdays for 20% efficiency gain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
