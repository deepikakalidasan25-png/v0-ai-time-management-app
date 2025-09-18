"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Zap, Clock, Target, Lightbulb, Loader2 } from "lucide-react"

interface Task {
  id: number
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  estimatedTime: number
  completed: boolean
  category?: string
}

interface OptimizedTask {
  title: string
  description: string
  estimatedTime: number
  priority: "low" | "medium" | "high"
  subtasks?: string[]
  tips: string[]
  bestTimeToWork?: string
}

interface AITaskOptimizerProps {
  task: Task
  onApplyOptimization: (optimizedData: Partial<Task>) => void
}

export function AITaskOptimizer({ task, onApplyOptimization }: AITaskOptimizerProps) {
  const [open, setOpen] = useState(false)
  const [optimizedTask, setOptimizedTask] = useState<OptimizedTask | null>(null)
  const [loading, setLoading] = useState(false)

  const optimizeTask = async () => {
    setLoading(true)
    try {
      const userPreferences = {
        workingHours: "9-17",
        preferredBreakTime: 15,
        focusSessionLength: 45,
      }

      const response = await fetch("/api/ai-optimize-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, userPreferences }),
      })

      if (response.ok) {
        const data = await response.json()
        setOptimizedTask(data.optimizedTask)
      }
    } catch (error) {
      console.error("Failed to optimize task:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyOptimization = () => {
    if (optimizedTask) {
      onApplyOptimization({
        title: optimizedTask.title,
        description: optimizedTask.description,
        estimatedTime: optimizedTask.estimatedTime,
        priority: optimizedTask.priority,
      })
      setOpen(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={optimizeTask}>
          <Zap className="w-4 h-4 mr-2" />
          AI Optimize
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI Task Optimization
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-3 text-slate-600 dark:text-slate-400">Optimizing your task...</span>
          </div>
        ) : optimizedTask ? (
          <div className="space-y-6">
            {/* Original vs Optimized Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Original Task</h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{task.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedTime}m
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">AI Optimized</h4>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg space-y-2">
                  <p className="font-medium">{optimizedTask.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{optimizedTask.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(optimizedTask.priority)}>{optimizedTask.priority}</Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {optimizedTask.estimatedTime}m
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Subtasks */}
            {optimizedTask.subtasks && optimizedTask.subtasks.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Suggested Subtasks
                </h4>
                <ul className="space-y-2">
                  {optimizedTask.subtasks.map((subtask, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                      {subtask}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Productivity Tips
              </h4>
              <ul className="space-y-2">
                {optimizedTask.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Time to Work */}
            {optimizedTask.bestTimeToWork && (
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-teal-800 dark:text-teal-300">Best time to work:</span>{" "}
                  <span className="text-teal-700 dark:text-teal-400">{optimizedTask.bestTimeToWork}</span>
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyOptimization} className="bg-purple-600 hover:bg-purple-700">
                Apply Optimization
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <p>Click "AI Optimize" to get started</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
