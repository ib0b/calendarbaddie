require('dotenv/config')
const {getEmails} = require("./gmail/actions")
const {emailsToTasks} = require("./gemini/gemini")
const {executeSchedule} = require("./gmail/actions")
/**
 * This is the main funciton in this app.
 * Assume this function is the main entry point of the application
 * It has the following parts
 * 1. Email Parsing: Get emails and conver to array of [{subject,content},..]
 * 2. Gemini Ingestion : Use the array and promptGemini to get an arry of [{tilte, duraion},...]
 * 3. Calendar Event Createor: Use the output to create calendar events 
 */
const main = async ()=>{
    console.log('[CalendarBaddie]: has started')
    const emails = await getEmails()
    console.log(`[CalendarBaddie]: The emails are of length ${emails.length}. Here is one email`,emails[0])
    const events = await emailsToTasks(emails)
    console.log("[CalendarBaddie]: events",events)
    //  await executeSchedule(events.slice(0,1))
    await executeSchedule(events)
    //  if(error){
    //     console.log(error)
    //  }
    console.log("[CalendarBaddie]: events scheduled")
}

main()