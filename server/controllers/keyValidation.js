 import crypto from 'crypto';

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzVp0cL7N3zDHLJ+SKX4X
pqhojbVijcEdRn7ZopEmAFoH60sW8dXC0uYHn45+SZkCInlIoekX+Xdc7Jp/hlsG
6oWw9V0kKNciHrxt7KSDGzPsCl1EyBJwsPwegXzikDu2JNPkv2zrjlfLmAtbdECg
6qRt34vduSZ4VlBgcYWinylEFt/mc7PYpyiQOVTbfntqUn/pQ73DZbnJto7ALXJ+
nGFlMXpsI4guUuYW83i4M3MRuYaW4VrrP1bzn67SA57fGNhyBWcTQN/i1VXsb1AN
Z3CXe+HIJijVTfFZdJDB+3ViU8ucZIhQWLjhLEsVDC3wHwQOMAOif5TFNCsgexSx
NwIDAQAB
-----END PUBLIC KEY-----`

const keyvalidator=((req,res)=>{
   const { signature, challenge } = req.body;

  if (!signature || !challenge) {
    return res.status(400).json({ status: "Invalid request" });
  }

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(challenge);
  verifier.end();

  try {
    // Verify the signature
    const isValid = verifier.verify(publicKeyPem, Buffer.from(signature, 'base64'));

    if (isValid) {
      return res.json({ loggedIn: true });
    } else {
      return res.json({ loggedIn: false, status: "Wrong key" });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({ status: "Error during verification" });
  }

})

export default keyvalidator;