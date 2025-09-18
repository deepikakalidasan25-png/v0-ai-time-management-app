import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      type: z.enum(["task", "schedule", "break", "focus"]),
      title: z.string(),
      description: z.string(),
      estimatedTime: z.number().optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { currentTime, tasks, recentActivity } = await req.json()

    const prompt = `
    Based on the current context, suggest 2-3 smart actions:
    
    Current Time: ${currentTime}
    Current Tasks: ${JSON.stringify(tasks)}
    Recent Activity: ${JSON.stringify(recentActivity)}
    
    Generate contextual suggestions such as:
    1. New tasks to add based on patterns
    2. Schedule optimizations
    3. Break recommendations
    4. Focus session suggestions
    
    Consider the time of day and current workload.
    `

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: suggestionsSchema,
      prompt,
      maxOutputTokens: 600,
    })

    return Response.json(object)
  } catch (error) {
    console.error("AI Suggestions Error:", error)
    return Response.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
