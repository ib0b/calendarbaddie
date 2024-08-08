/**
 * Append JSON data to prompt
 * @param {*} emails 
 * @returns 
 */
function createPrompt(emails){
    const todaysDate = new Date().toISOString() 
    const prompt =`

You are an AI designed to process email data represented in JSON format and extract actionable tasks from them.

Input:

An array of JSON objects, each containing the following keys:
subject (string): The subject line of the email.
textContent (string): The body of the email.
from (string): The sender of the email.
Processing:

Analyze each JSON object, carefully examining the subject and textContent to identify potential tasks.
Not all emails will contain tasks. Use your understanding of natural language and context to determine if an email warrants task creation.
Some emails may contain multiple tasks. Extract all relevant tasks from such emails.
For each identified task, estimate its duration in hours. Consider the complexity of the task implied in the email content.
If a task's duration cannot be confidently estimated, assign a default duration of 1hr. Some tasks may have a preferred deadline,
example if the email says submit this by 23rd January 2025, that is deadline for the task.
For tasks that do not neccessarily have a deadline output null.

Output:

An array of JSON objects, each representing a task, with the following keys:
title (string): A concise and descriptive title for the task.
duration (number): The estimated duration of the task in hours.
deadline (date ISOString): Deadline for the task. If no appropiate deadline value is null
Example:

Input:
Todays Date (ISO String): '2024-08-05T08:55:50.235Z'
[
    {
        "subject": "Review Code",
        "textContent": "Hi, can you please review the code uploaded",
        "from": "john.doe@example.com"
    },
    {
        "subject": "Re: Urgent: Client feedback",
        "textContent": "Please review the attached document and address the client's concerns by Friday.",
        "from": "jane.smith@example.com"
    },
    {
        "subject": "Weekend plans",
        "textContent": "Hey, what are you up to this weekend?",
        "from": "friend@example.com"
    }
]

Output only JSON:

[
    {
        "title": "Review code uploaded",
        "duration": 1,
        "deadline":null

    },
    {
        "title": "Review client feedback and address concerns",
        "duration": 3,
        "deadline": "2024-08-09T00:00:00.000Z" 
    }
]


Here is the input which has todays date and emails in JSON. Only output valid JSON based on the above instructions. Do not ouput place holders such as [date] or [topic] etc
The output you give will be used as input for JSON.parse, hence do not format as markdown. Do not add \`\`\`json at the beginning.

INPUT:

Todays Date (ISO String): '${todaysDate}'

${emails}

`
    return prompt
}
module.exports = createPrompt