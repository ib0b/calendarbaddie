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

module.exports = {
    listLabels
}
// async function listLabels(auth) {
//
//     const gmail = google.gmail({version: 'v1', auth});
//     const res = await gmail.users.labels.list({
//         userId: 'me',
//     });
//     const labels = res.data.labels;
//     if (!labels || labels.length === 0) {
//         console.log('No labels found.');
//         return;
//     }
//     console.log('Labels:');
//     labels.forEach((label) => {
//         console.log(`- ${label.name}`);
//     });
// }


