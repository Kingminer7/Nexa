module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const startTime = new Date();
    const etOptions = { timeZone: 'America/New_York' };
    const formattedStartTime = startTime.toLocaleString('en-US', etOptions);
    client.user.setPresence({
      activities: [{
        name: `Under Development.`
      }],
    });
    console.log("Started as " + client.user.tag + " at " + formattedStartTime + ".");
  },
};
