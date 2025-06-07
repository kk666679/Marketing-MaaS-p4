import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { Database } from "@/lib/database"

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400,
    })
  }

  // Handle the webhook
  const { id } = evt.data
  const eventType = evt.type

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log("Webhook body:", body)

  // Handle user creation
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, first_name, last_name } = evt.data

      await Database.createUser({
        id: id,
        email: email_addresses[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        subscription_tier: "free",
        subscription_status: "inactive",
      })

      console.log("User created in database:", id)
    } catch (error) {
      console.error("Error creating user in database:", error)
    }
  }

  // Handle user updates
  if (eventType === "user.updated") {
    try {
      const { id, email_addresses, first_name, last_name } = evt.data

      // Update user in database if needed
      console.log("User updated:", id)
    } catch (error) {
      console.error("Error updating user in database:", error)
    }
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data

      // Handle user deletion in database if needed
      console.log("User deleted:", id)
    } catch (error) {
      console.error("Error deleting user from database:", error)
    }
  }

  return new Response("", { status: 200 })
}
