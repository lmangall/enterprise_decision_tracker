export default async function FetchAIDecision(UserInput, res) {
  const { UserDecision } = UserInput; // Adjust based on the actual structure of UserInput

  // Update the prompt to include specific details about the city and the user's name
  const Request = `Write a decision about  ${UserInput}`;

  console.log("Prompt sent to OpenAI:", Request);

  const messages = [{ role: "user", content: Request }];

  try {
    // Call OpenAI API with the prepared message
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.5,
      }),
    });

    // Check for successful response and handle accordingly
    if (response.ok) {
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const decision = data.choices[0].message.content;
        res.status(200).json({ result: decision });
      } else {
        res.status(404).json({ error: "No decision found from OpenAI." });
      }
    } else {
      const error = await response.text();
      console.error("Error calling OpenAI API:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred. Please try again later." });
  }
}
