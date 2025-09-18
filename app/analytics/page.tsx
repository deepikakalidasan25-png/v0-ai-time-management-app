"use client"

import { useState } from "react"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain } from "lucide-react"
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
  completedAt?: Date
  createdAt?: Date
}

export default function AnalyticsPage() {
  // Mock task data for analytics
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review project proposal",
      description: "Go through the Q4 project proposal and provide feedback",
      priority: "high",
      completed: true,
      estimatedTime: 45,
      category: "Work",
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: "Team standup meeting",
      description: "Daily standup with the development team",
      priority: "medium",
      completed: true,
      estimatedTime: 30,
      category: "Work",
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      priority: "low",
      completed: false,
      estimatedTime: 60,
      category: "Work",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      title: "Code review session",
      description: "Review pull requests from team members",
      priority: "high",
      completed: false,
      estimatedTime: 90,
      category: "Work",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 5,
      title: "Workout session",
      priority: "medium",
      completed: true,
      estimatedTime: 60,
      category: "Health",
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      title: "Learn React patterns",
      priority: "low",
      completed: false,
      estimatedTime: 120,
      category: "Learning",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">AI Time Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <AnalyticsDashboard tasks={tasks} />
      </main>
    </div>
  )
}
