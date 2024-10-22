import crypto from 'crypto';
import pool from '../db.js';

const keyvalidator = async (req, res) => {
  const { signature, challenge, username } = req.body;
  function formatPublicKey(publicKeyPem) {
    // Remove any extra spaces or newlines
    let cleanKey = publicKeyPem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\s+)/g, '');
  
    // Insert newlines every 64 characters
    let formattedKey = cleanKey.match(/.{1,64}/g).join('\n');
  
    // Wrap the key with the correct headers
    return `-----BEGIN PUBLIC KEY-----\n${formattedKey}\n-----END PUBLIC KEY-----`;
  }
  


  const publick = await pool.query("SELECT publickey FROM users u WHERE u.username=$1", [username]);
  let initialKey = publick.rows[0].publickey.trim();  // Trim any extra whitespace
  
  const publicKeyPem = formatPublicKey(initialKey);
  
  if (!signature || !challenge) {
    return res.status(400).json({ status: "Invalid request" });
  }

  // Ensure signature is in base64 format
  try {
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(challenge);
    verifier.end();

    const isValid = verifier.verify(publicKeyPem, Buffer.from(signature, 'base64'));

    if (isValid) {
      return res.json({ loggedIn: true });
    } else {
      return res.json({ loggedIn: false, status: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({ status: "Error during verification", error: error.message });
  }
};

export default keyvalidator;
