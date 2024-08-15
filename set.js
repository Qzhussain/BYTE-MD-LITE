 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUtOS3o1YkhrbGhtZTNEYU9IcDhLK3J2K0w0SGE1RFdRK2I4bXF1dUhtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTElEa3hhZ1JaSkw5NkJMQ1p0QUprWTVyVDJRQXJUc3UyL3JUTVFrd0hsRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQngycktWekJLRFBvV3phcHJVNHpCNUIyaExWbThWLzE2cjRIM28yamtjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQ3RuUHpXYmNtaDk3TVhuUFhNeVlTc3VQR21YTXNnNE1qQnZ3ajdoejFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFOdm5qUllYVEU1M0xDVHIwMjhqQnVrZFdlWlU1STlXeXRLZnl6azlqM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImgwK0VtMkRjaTR4b2Y3bVU1MWlpL2paZ3Q3LzU5MG9GdW5vUUhpK0tpV3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0tNdkJIOHBFeVg5dmU2akRMc05naXNScGpDT21IL2FZU20vaFFMbDdrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmRQMDVxckgxWjNkbS9KV3pjeGZlQXRtYlpVOVZ5QTNVRHZLT2hPQTRpaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF4ckFaeTUwZzdRd1Y0eXlvaWFOT3FjNkdONGFycytXVFZUcms0Q0wzN3hZdFRYRDV5Tm5TNW9rZXZhcXVHM09iY2lFQmtJckFTSGx1MjdFMlh0dUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk4LCJhZHZTZWNyZXRLZXkiOiJ5NVJ0OHJLMHUrMFkwbmZuODhwY2RSRHhqM1YxdWVpSzNYYnRFNHdrdzBFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCTk9rZEd4eVQ5Qzd0NXY1ZXdLZW13IiwicGhvbmVJZCI6IjQ3ZTUwYmY3LWRjMWItNDFmYi1hNjdkLWI3OGQyZDk4OGY1ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1cVVWL1ZsRzFtai85VStzaHVTWHE5TWdRcmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjV1NjhOcmhyclUrcCtINDRqY1VWd1Q1MzJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJUM0VONVpBIiwibWUiOnsiaWQiOiI2MjgyMzI3MzA1MDQ3OjUxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuGlrPCdkJDwnZCU8J2atfCdmrXwnZq08J2arfCdkJbDl82cw5figIvhrYQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0piM3c4QUJFUFNVOXJVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFkODhna3FodkNYM2JWeDJsN012RkNwMy9xWXo4VWwwSDdzSlllQkFvVFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpseXhJR2w0aHNLam5QTUFTai9PNE8vUHpVSXNvK1BmRTRua3RkR1d6VDIxNkg3dk9CbUJxK2F2YTltTHJOWE1EMk4xdW1FWGJ0a25tejJ3d01aeURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQNEZkVUFhbXFCYjNkMWs2ZkgxMWE5MFZxY3l0aVhrY3ZRTXlTYlUyQ21ZY2dMY21ObEdvRVEvaC9ZMmo0TEtYZWRhQWg4NkxpeDlOUjhiVmREQWdDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYyODIzMjczMDUwNDc6NTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV25mUElKS29id2w5MjFjZHBlekx4UXFkLzZtTS9GSmRCKzdDV0hnUUtFMSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzY5Nzc5MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEdW8ifQ==',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "QUEENZW",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "6282327305047",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
