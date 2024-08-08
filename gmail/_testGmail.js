const { listLabels, getEmails } = require('./actions')

//listLabels().catch(console.error);
getEmails()
    .then(emails => {{
        emails.forEach(email => console.log(`${JSON.stringify(email, 0, 2)}\n------------`))
    }})
    .catch(console.error);