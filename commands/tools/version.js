const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Displays the latest public version of the bot along with the updates that came with the update."),
  async execute(interaction, client) {
    const read = fs.readFileSync('./package.json', 'utf-8');
    const json = JSON.parse(read);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Version ${json.version}`)
          .setDescription(
              "This update includes the following changes:\n"
            + "\n"
            + "***General***\n"
            + "+ Created the bot\n"
            + "\n"
            + "***Commands***\n"
            + "+ Added the \"version\" command\n"
            + "+ Added the \"clearChannel\" command\n"
            + "***Site***\n"
            + "+ Basic setup\n"
            + "~ Made site unavailable to public"
          )
      ]
    })
  },
};
