const sampleEmails = [
    {
        subject: "Urgent: Production Server Down",
        from: "DevOps Team",
        content: "The primary production server is currently experiencing an outage. We are investigating the issue and will provide updates as soon as possible. Please refrain from deploying any code changes until further notice."
    },
    {
        subject: "Code Review Request: New Feature Implementation",
        from: "John Doe",
        content: "Hi, I've just finished implementing the new user profile feature. Could you please take a look at my code changes and provide feedback? Thanks!"
    },
    {
        subject: "Welcome to the Team!",
        from: "HR Department",
        content: "Congratulations on joining our team! We're excited to have you on board. Please find attached your onboarding documents and schedule for your first week."
    },
    {
        subject: "Upcoming Sprint Planning Meeting",
        from: "Scrum Master",
        content: "The next sprint planning meeting is scheduled for Friday at 10 AM. Please come prepared with your task estimates and any blockers you anticipate."
    },
    {
        subject: "Security Alert: Critical Vulnerability Discovered",
        from: "Security Team",
        content: "A critical vulnerability has been discovered in one of our third-party dependencies. Please update your project dependencies to the latest versions immediately."
    },
    {
        subject: "Lunch and Learn: Machine Learning Basics",
        from: "Data Science Team",
        content: "Join us for a lunch and learn session on the basics of machine learning next Wednesday. We'll cover key concepts and provide hands-on examples."
    },
    {
        subject: "Bug Report: Login Page Not Working",
        from: "QA Team",
        content: "The login page is currently not functioning as expected. Users are unable to log in with their credentials. Please investigate and fix this issue ASAP."
    },
    {
        subject: "New Company-Wide Policy: Remote Work Guidelines",
        from: "Management",
        content: "Please review the attached document outlining our new remote work guidelines. These guidelines will be effective starting next month."
    },
    {
        subject: "Team Building Event: Escape Room Challenge",
        from: "Social Committee",
        content: "We're organizing an escape room challenge next Friday evening. Sign up if you're interested in participating!"
    },
    {
        subject: "Performance Review Reminder",
        from: "Your Manager",
        content: "This is a friendly reminder that your performance review is scheduled for next week. Please come prepared to discuss your accomplishments and goals."
    }
];
module.exports = sampleEmails