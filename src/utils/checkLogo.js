export default async function checkLogo(logo) {
  const fallBackImg = 'https://cdn.discordapp.com/attachments/376089859372089355/1138842160096084038/image_2.png';

  try {
    await fetch(logo);
    return logo;
  } catch (error) {
    return fallBackImg;
  }
}
