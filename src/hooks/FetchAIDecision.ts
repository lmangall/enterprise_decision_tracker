export default async function FetchAIDecision(UserInput: any) {
  const { UserDecision } = UserInput;

  const Prompt = `Transform my user input into a json formatted goal:
  - title: The title of the decision
  - description: A brief description of the decision
  - measurable_goal: A goal that can be measured
  - goal_date: The date by which the goal should be met (in ISO format)

  Here is the user input:
  ${UserDecision}

  Respect this format:
  {
    "title": "string",
    "description": "string",
    "measurable_goal": "string",
    "goal_date": "string (ISO format) | null"
  }

  Please provide a JSON response following this structure.`;

  console.log("Prompt sent to OpenAI:", Prompt);

  const messages = [{ role: "user", content: Prompt }];

  try {
    const apiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
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
      }
    );

    if (apiResponse.ok) {
      const data = await apiResponse.json();

      //with OpenAI API, the data.choices array contains the possible completions or responses
      if (data.choices && data.choices.length > 0) {
        const decision = data.choices[0].message.content;
        console.log("data.choice is not null");

        try {
          const parsedDecision = JSON.parse(decision);
          return {
            status: 200,
            json: { result: parsedDecision },
          };
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          return {
            status: 500,
            json: { error: "Received an invalid JSON response from OpenAI." },
          };
        }
      } else {
        return {
          status: 404,
          json: { error: "No decision found from OpenAI." },
        };
      }
    } else {
      const error = await apiResponse.text();
      console.error("Error calling OpenAI API:", error);
      return {
        status: 500,
        json: { error: "An error occurred while processing your request." },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      json: { error: "An internal error occurred. Please try again later." },
    };
  }
}
