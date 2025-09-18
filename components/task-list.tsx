"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskForm } from "./task-form"
import { AITaskOptimizer } from "./ai-task-optimizer"
import { Clock, Calendar, MoreVertical, Edit, Trash2, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

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

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: number) => void
  title: string
  showCompleted?: boolean
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask, title, showCompleted = true }: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "created">("priority")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return showCompleted || !task.completed
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    if (sortBy === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.getTime() - b.dueDate.getTime()
    }
    return b.id - a.id // Default to creation order
  })

  const handleToggleComplete = (task: Task) => {
    onUpdateTask({ ...task, completed: !task.completed })
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
    <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "pending" | "completed")}
              className="text-sm border rounded px-2 py-1 bg-background"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "priority" | "dueDate" | "created")}
              className="text-sm border rounded px-2 py-1 bg-background"
            >
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="created">Created</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks found</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-4 rounded-lg border transition-all hover:shadow-sm ${
                task.completed ? "bg-slate-50 dark:bg-slate-700/50 opacity-75" : "bg-white dark:bg-slate-700"
              }`}
            >
              <Checkbox checked={task.completed} onCheckedChange={() => handleToggleComplete(task)} className="mt-1" />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        task.completed
                          ? "line-through text-slate-500 dark:text-slate-400"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{task.description}</p>
                    )}

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>

                      {task.category && (
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      )}

                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime}m
                      </span>

                      {task.dueDate && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(task.dueDate, "MMM d")}
                        </span>
                      )}
                    </div>

                    {!task.completed && (
                      <div className="mt-3">
                        <AITaskOptimizer
                          task={task}
                          onApplyOptimization={(optimizedData) => onUpdateTask({ ...task, ...optimizedData })}
                        />
                      </div>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <TaskForm
                        task={task}
                        onSubmit={(updatedTask) => onUpdateTask(updatedTask as Task)}
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuItem
                        onClick={() => onDeleteTask(task.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
