// app/api/migrate/route.js
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Update all prompts without a tag
    await Prompt.updateMany(
      { tag: { $exists: false } },
      { $set: { tag: "general" } }
    );

    return new Response("Migration complete", { status: 200 });
  } catch (error) {
    return new Response("Migration failed", { status: 500 });
  }
};
