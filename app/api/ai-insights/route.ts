import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const insightsSchema = z.object({
  insights: z.array(
    z.object({
      type: z.enum(["productivity", "optimization", "trend", "suggestion"]),
      title: z.string(),
      description: z.string(),
      priority: z.enum(["low", "medium", "high"]),
      actionable: z.boolean(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { tasks, completedTasks, timeData } = await req.json()

    const prompt = `
    Analyze the following task and productivity data to generate AI insights:
    
    Current Tasks: ${JSON.stringify(tasks)}
    Completed Tasks: ${completedTasks}
    Time Data: ${JSON.stringify(timeData)}
    
    Generate 3-4 personalized insights focusing on:
    1. Productivity patterns and peak performance times
    2. Task optimization suggestions (breaking down large tasks, prioritization)
    3. Weekly trends and progress analysis
    4. Actionable recommendations for better time management
    
    Make insights specific, actionable, and encouraging.
    `

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: insightsSchema,
      prompt,
      maxOutputTokens: 1000,
    })

    return Response.json(object)
  } catch (error) {
    console.error("AI Insights Error:", error)
    return Response.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
