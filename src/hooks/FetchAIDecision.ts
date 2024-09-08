/**
 * @brief Generates a love letter based on user input.
 * @details This function is an asynchronous handler for the `/generate` endpoint.
 *          It takes user information from the request body and constructs a prompt
 *          for OpenAI. The prompt includes details about the user's city, name,
 *          preferences, and desired language. The function then calls the OpenAI
 *          API with the prompt and returns the generated love letter in the response.
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 *
 * @return A Promise that resolves to a JSON object with either a `result`
 *         property containing the generated love letter or an `error` property
 *         indicating an issue.
 *
 * @throws An error if the OpenAI API call fails or an internal error occurs.
 */
export default async function handleGenerateClick(req, res) {
  const {
    userCity,
    userName,
    userGender,
    userOrientation,
    userTaste,
    userTarget,
    isQueer,
    isHot,
  } = req.body;

  // Update the prompt to include specific details about the city and the user's name
  let loveRequest = `Write a love letter (around 150 words) in ${userTarget}: a young ${userOrientation} (write at first person, invent a name) write to ${userName} (a ${userGender} who likes ${userTaste}) personalize the story with really specific details about "${userCity}" (known places, local events...).`;

  if (isQueer) {
    loveRequest += ` Include queer elements in the story.`;
  }
  if (isHot) {
    loveRequest += ` and Make it really hot (sexually).`;
  }

  console.log("Prompt sent to OpenAI:", loveRequest);

  const messages = [{ role: "user", content: loveRequest }];

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
        temperature: 0.9,
      }),
    });

    // Check for successful response and handle accordingly
    if (response.ok) {
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const loveStory = data.choices[0].message.content;
        res.status(200).json({ result: loveStory });
      } else {
        res.status(404).json({ error: "No story found from OpenAI." });
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
