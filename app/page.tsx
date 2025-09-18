"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { AIInsightsPanel } from "@/components/ai-insights-panel"
import { CheckCircle2, TrendingUp, Brain, Timer, Target, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"

interface Task {
  id: number
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  estimatedTime: number
  dueDate?: Date
  completed: boolean
  category?: string
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review project proposal",
      description: "Go through the Q4 project proposal and provide feedback",
      priority: "high",
      completed: false,
      estimatedTime: 45,
      category: "Work",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      id: 2,
      title: "Team standup meeting",
      description: "Daily standup with the development team",
      priority: "medium",
      completed: true,
      estimatedTime: 30,
      category: "Work",
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      priority: "low",
      completed: false,
      estimatedTime: 60,
      category: "Work",
    },
    {
      id: 4,
      title: "Code review session",
      description: "Review pull requests from team members",
      priority: "high",
      completed: false,
      estimatedTime: 90,
      category: "Work",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    },
  ])

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  })

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const handleCreateTask = (taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
    }
    setTasks([...tasks, newTask])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">AI Time Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <Link href="/analytics">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <TaskForm onSubmit={handleCreateTask} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-balance">
            Good {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 18 ? "afternoon" : "evening"}!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Let's make today productive with AI-powered insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Today's Progress</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {completedTasks}/{totalTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <Progress value={progressPercentage} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Focus Time</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">2h 45m</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Timer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Weekly Goal</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">78%</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">AI Insights</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Management */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              title="Task Management"
              showCompleted={true}
            />
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <AIInsightsPanel tasks={tasks} />

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Tasks completed this week</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Average focus time</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">1h 32m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Productivity score</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">8.7/10</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
