"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, TrendingUp, Zap, RefreshCw, Loader2 } from "lucide-react"

interface Task {
  id: number
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  estimatedTime: number
  completed: boolean
  category?: string
}

interface Insight {
  type: "productivity" | "optimization" | "trend" | "suggestion"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  actionable: boolean
}

interface AIInsightsPanelProps {
  tasks: Task[]
}

export function AIInsightsPanel({ tasks }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const generateInsights = async () => {
    setLoading(true)
    try {
      const completedTasks = tasks.filter((t) => t.completed).length
      const timeData = {
        totalTasks: tasks.length,
        avgEstimatedTime: tasks.reduce((acc, t) => acc + t.estimatedTime, 0) / tasks.length || 0,
        highPriorityTasks: tasks.filter((t) => t.priority === "high").length,
      }

      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks, completedTasks, timeData }),
      })

      if (response.ok) {
        const data = await response.json()
        setInsights(data.insights)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tasks.length > 0) {
      generateInsights()
    }
  }, [tasks.length])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "productivity":
        return <TrendingUp className="w-4 h-4" />
      case "optimization":
        return <Zap className="w-4 h-4" />
      case "trend":
        return <TrendingUp className="w-4 h-4" />
      case "suggestion":
        return <Lightbulb className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "productivity":
        return "from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20"
      case "optimization":
        return "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
      case "trend":
        return "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
      case "suggestion":
        return "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
      default:
        return "from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20"
    }
  }

  return (
    <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Insights
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={generateInsights} disabled={loading} className="h-8 w-8 p-0">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          </Button>
        </div>
        {lastUpdated && (
          <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && insights.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Generating AI insights...</span>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No insights available</p>
            <p className="text-xs">Add some tasks to get AI-powered insights</p>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div key={index} className={`p-4 bg-gradient-to-r ${getInsightColor(insight.type)} rounded-lg`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{getInsightIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{insight.title}</p>
                    {insight.actionable && (
                      <Badge variant="secondary" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{insight.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
