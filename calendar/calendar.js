const {google} = require('googleapis');
const authorize = require('../gmail/auth')
const moment = require('moment');


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @returns list of events 
 */
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const numberOfEventsToFetch = 20;
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: numberOfEventsToFetch,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log(`Upcoming ${numberOfEventsToFetch} event:`);
 

  return events;
}

async function createEvent(auth, event) {
    const calendar = google.calendar({version: 'v3', auth});

    calendar.events.insert({auth: auth, calendarId: 'primary', requestBody: event}, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
       
    });
}

/**
 * Find free slots on the calendar
 */
async function schedule(authorize, incomingTasks = [], n = 20) {
  if(incomingTasks.length == 0) return;
  /**
   * Get a list of the next n events in the calendar and use them to determine where to place the next
   * event on the calendar.
   */
  let existingCalendarEvents = [];
  await authorize().then(listEvents).then(events => existingCalendarEvents.push(...events)).catch(console.error);

  const formatedEvents = formatExistingEventsList(existingCalendarEvents);

  /**
   * Space out the tasks accordingly. Don't overcrowd a day with many events. Probably at most 4.
   * Sort a task by deadline.
   */
  const sortedTasks = sortTasksByDeadline(incomingTasks);

  const eventEntries = createCalendarEventEntries(formatedEvents, sortedTasks);

  for(let newEvent of eventEntries){
    await authorize().then((auth) => createEvent(auth, newEvent)).catch(console.error);
  }
}


/**
 * Retrieve the list of exisitng events
 * @param {*} events
 * @return a formatted list of existing events
 */
function formatExistingEventsList(events = []) {
  return events.map(e => {
    return {
    "title": e["summary"],
    "start" : e["start"]["dateTime"],
    "end": e["end"]["dateTime"],
  }});
}

/**
 * 
 * @param {*} tasks 
 * @returns task array sorted by the deadline. Early tasks first, late tasks later.
 * 
 */
function sortTasksByDeadline(tasks = []) {
  // Separate tasks with a deadline and those without
  let tasksWithDeadline = [], tasksWithoutDeadline = [];

  for(let task of tasks){
    if(task.deadline){
      tasksWithDeadline.push(task);
    } else {
      tasksWithoutDeadline.push(task);
    }
  }

  // Sort tasks by deadline
  tasksWithDeadline.sort((tA, tB) => new Date(tA.deadline).getTime() - new Date(tB.deadline).getTime());

  // Combine the task arrays
  const sortedTaskList = [...tasksWithDeadline, ...tasksWithoutDeadline];

  return sortedTaskList;
}


/**
 * This is just a greedy heuristic of used to get slots to create events
 * @param {*} existingEvents 
 * @param {*} myTaskList
 */
function createCalendarEventEntries(existingEvents = [], myTaskList = []) {
  let initialStartDate = moment();
  const timeFormat = "hh:mm:ss";
  const _eightPM = moment('20:00:00', timeFormat);
  const tasksToCreate = [];

  for(let task of myTaskList){
    for(let existingEvent of existingEvents){
      let startTime = moment(initialStartDate, timeFormat);

      if(initialStartDate.isBetween(existingEvent.start, existingEvent.end) ||
        initialStartDate.add(task.duration, 'hour').isBetween(existingEvent.start, existingEvent.end)){
        initialStartDate = moment(existingEvent.end);
      } else if(initialStartDate.isBefore(moment(existingEvents.start).add(task.duration + 1, 'hour'))){
        break;
      }
    }

    let endDate = initialStartDate.clone().add(task.duration, 'hour');

    tasksToCreate.push({
      'summary': task.title,
      'start': {
          'dateTime': initialStartDate.clone().toISOString(),
          'timeZone': 'Africa/Nairobi',
        },
        'end': {
          'dateTime': endDate.clone().toISOString(),
          'timeZone': 'Africa/Nairobi',
        },
    })

    initialStartDate = endDate;
  }

  return tasksToCreate
}


// schedule(incomingTasks=tasks)

module.exports = schedule

/**
 * 
 *     tasksToCreate.push({
      'summary': task.title,
      'start': {
          'dateTime': initialStartDate,
          'timeZone': 'Africa/Nairobi',
        },
        'end': {
          'dateTime': endDate.clone(),
          'timeZone': 'Africa/Nairobi',
        },
    })
 */