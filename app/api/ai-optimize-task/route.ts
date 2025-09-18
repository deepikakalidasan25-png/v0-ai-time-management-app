import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const taskOptimizationSchema = z.object({
  optimizedTask: z.object({
    title: z.string(),
    description: z.string(),
    estimatedTime: z.number(),
    priority: z.enum(["low", "medium", "high"]),
    subtasks: z.array(z.string()).optional(),
    tips: z.array(z.string()),
    bestTimeToWork: z.string().optional(),
  }),
})

export async function POST(req: Request) {
  try {
    const { task, userPreferences } = await req.json()

    const prompt = `
    Optimize this task for better productivity:
    
    Task: ${JSON.stringify(task)}
    User Preferences: ${JSON.stringify(userPreferences)}
    
    Provide:
    1. An optimized version of the task with better title and description
    2. More accurate time estimation
    3. Appropriate priority level
    4. Break down into subtasks if the task is complex (>60 minutes)
    5. Productivity tips specific to this task
    6. Best time of day to work on this task based on typical productivity patterns
    
    Make suggestions practical and actionable.
    `

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: taskOptimizationSchema,
      prompt,
      maxOutputTokens: 800,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Task Optimization Error:", error)
    return Response.json({ error: "Failed to optimize task" }, { status: 500 })
  }
}
