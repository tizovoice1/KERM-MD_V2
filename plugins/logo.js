const { smd, prefix, Config } = require('../lib'); // Import necessary configurations and utilities
const fetch = require('node-fetch'); // Import fetch for HTTP requests

// Function to generate a text-based logo using various online services
async function textToLogoGenerator(message, textProUrl, text1, text2 = "ser", serviceType = "textpro", retryOnFail = true) {
  let mumakerResponse = {}; // Response object for Mumaker
  let apiResponse = {}; // Response object for fallback API
  let url = /1|ephoto|ephoto360/gi.test(serviceType) ? `https://ephoto360.com/${textProUrl}.html` :
           /2|potoxy|photooxy/gi.test(serviceType) ? `https://photooxy.com/${textProUrl}.html` :
           /3|enphoto|en360/gi.test(serviceType) ? `https://en.ephoto360.com/${textProUrl}.html` :
           `https://textpro.me/${textProUrl}.html`; // Determine service URL based on serviceType

  try {
    // Try using Mumaker library for text-to-logo generation
    const { textpro } = require('mumaker'); // Import Mumaker module
    if (text1) {
      mumakerResponse = await textpro(url, [text1, text2]); // Generate logo with Mumaker
    }

    // Prepare message context and send generated image
    let captionContext = {} || { ...(await message.bot.contextInfo('Text to Logo', `Hello ${message.senderName}`)) };
    return await message.bot.sendMessage(message.jid, {
      image: { url: mumakerResponse.image }, // Send generated image
      caption: Config.caption || "Here is your generated logo!", // Default caption if not set
      contextInfo: captionContext
    }, { messageId: message.bot.messageId() });

  } catch (error) {
    // If Mumaker fails, try fetching from fallback API
    try {
      let apiUrl = `${global.api_smd || "https://default-api.com"}/api/maker?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&url=${encodeURIComponent(url)}`;
      apiResponse = await fetchJson(apiUrl); // Fetch from fallback API

      // Handle API response and send image
      if (!apiResponse || !apiResponse.status || !apiResponse.img) {
        if (retryOnFail) {
          return message.error(`Mumaker Error: ${error}\nAPI Error: ${apiResponse}\n\nfileName: textToLogoGenerator`, error);
        }
      }

      await message.bot.sendMessage(message.jid, {
        image: { url: apiResponse.img }, // Send image from API response
      }, { messageId: message.bot.messageId() });

    } catch (err) {
      // Handle complete failure
      let imageUrl = mumakerResponse?.image || apiResponse?.img || false; // Determine if any image was generated

      if (retryOnFail) {
        message.error(`Error: ${error}\n\nAPI Error: ${err}\n\nfileName: textToLogoGenerator`, error, 
          imageUrl ? `Generated image: ${imageUrl}` : "Failed to generate logo.");
      }
    }
  }
}

// Function to fetch JSON from a URL
async function fetchJson(url) {
  try {
    const response = await fetch(url); // Perform HTTP request
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`); // Check for HTTP errors
    return await response.json(); // Parse and return JSON
  } catch (error) {
    console.error(`Failed to fetch JSON: ${error.message}`); // Log error for debugging
    throw error;
  }
}

smd({
  cmdname: 'logo1',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    await textToLogoGenerator(
      message,
      'hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74',
      match,
      'ser',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo2',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    return await textToLogoGenerator(
      message,
      'tao-hieu-ung-chu-digital-glitch-truc-tuyen-941',
      match,
      'WASI',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});
smd({
  cmdname: 'logo3',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    return await textToLogoGenerator(
      message,
      'tao-hieu-ung-chu-pixel-glitch-truc-tuyen-940',
      match,
      'WASI',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo4',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    return await textToLogoGenerator(
      message,
      'tao-hieu-ung-chu-graffiti-duong-pho-an-tuong-online-795',
      match,
      'WASI',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo5',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    return await textToLogoGenerator(
      message,
      'hieu-ung-chu/chu-graffiti-online-mau-8-182',
      match,
      'WASI',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo6',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
    return await textToLogoGenerator(
      message,
      'tao-hieu-ung-chu-graffiti-sieu-ngau-online-794',
      text1,
      text2
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo7',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text1) return await message.reply(`*_Example : ${prefix + cmdName} text1_*`);
    return await textToLogoGenerator(
      message,
      'hieu-ung-chu/tao-cover-graffiti-online-181',
      text1,
      text2 || 'ser',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo8',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
    await textToLogoGenerator(message, 'tao-logo-gradient-3d-truc-tuyen-501', text1, text2, '1');
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo9',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
    await textToLogoGenerator(message, 'tao-logo-chu-truc-tuyen-499', text1, text2, '1');
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo10',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
    await textToLogoGenerator(message, 'tao-logo-phong-cach-pornhub-612', text1, text2, '1');
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo11',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
    return await textToLogoGenerator(
      message,
      'tao-logo-3d-phong-cach-avengers-445',
      text1,
      text2,
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo12',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    let text1 = match ? match.split(';')[0] : '';
    let text2 = match ? match.split(';')[1] : '';
    if (!text2 || !text1)
      return await message.reply(`*_Example : ${prefix + cmdName} text1;text2_*`);
      return await textToLogoGenerator(
        message,
        'tao-logo-phong-cach-marvel-419',
        text1,
        text2,
        '1'
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
   });
