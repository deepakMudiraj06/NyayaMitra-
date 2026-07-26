export async function sendMessageToAI(
  message: string
): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return `You asked: "${message}"

This is a mock AI response. Later, this function will call our FastAPI backend and return a real legal answer.`;
}