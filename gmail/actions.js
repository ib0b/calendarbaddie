const {google} = require('googleapis');
const authorize = require('./auth')

/**
 * Lists the labels in the user's account.
 */
const listLabels = async () => {
    authorize().then(async (auth) => {
        const gmail = google.gmail({version: 'v1', auth});
        const res = await gmail.users.labels.list({
            userId: 'me',
        });
        const labels = res.data.labels;
        if (!labels || labels.length === 0) {
            console.log('No labels found.');
            return;
        }
        console.log('Labels:');
        labels.forEach((label) => {
            console.log(`- ${label.name}`);
        });
    })
};

const listEmails = async () => {
    authorize().then(async (auth) => {
        const gmail = google.gmail({version: 'v1', auth});
        const res = await gmail.users.messages.list({
            userId: 'me',
        });
        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.log('No messages found.');
            return;
        }
        console.log('Messages:');
        messages.forEach((message) => {
            console.log(`- ${message.id}`);
        });
    })
}

module.exports = {
    listLabels,
    listEmails
}



