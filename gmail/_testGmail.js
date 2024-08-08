const { listLabels, listEmails } = require('./actions')

listLabels().catch(console.error);
listEmails().catch(console.error);