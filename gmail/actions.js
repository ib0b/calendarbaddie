const {google} = require('googleapis');
const simpleParser = require('mailparser').simpleParser;
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

const getEmails = async () => {
    return authorize().then(async (auth) => {
        const gmail = google.gmail({version: 'v1', auth});
        const res = await gmail.users.messages.list({userId: 'me',});
        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.log('No messages found.');
            return;
        }
        const parsed = messages.map(async (message) => {
            const { id } = message;
            const res = await gmail.users.messages.get({
                userId: 'me', id, format: 'RAW'
            });
            const { raw } = res.data;
            return simpleParser(Buffer.from(raw, 'base64'));
        });
        const emails = await Promise.all(parsed);
        return emails.map((email) => {
            return {
                from: email.from.value[0].name,
                subject: email.subject,
                content: email.text
            }
        })
    })
}

module.exports = {
    listLabels,
    getEmails
}



