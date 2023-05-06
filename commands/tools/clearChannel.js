const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearchannel")
    .setDescription("Clears the channel of all messages"),
  async execute(interaction, client) {
    const messages = await interaction.channel.messages.fetch();
    // check if user has Manage Messages permission
    

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
    await interaction.reply({
      content: "Clearing channel...",
      ephemeral: true,
    });

    for (const message of messages.values()) {
      await message.delete();
    }

    interaction.editReply({ content: "Cleared the channel.", ephemeral: true });
  },
};
