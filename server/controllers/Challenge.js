import crypto from 'crypto';

const challengeCreation=async (req,res)=>{
    const challenge=crypto.randomBytes(32).toString('base64');
    console.log(challenge); 
    res.json({challenge});

}

export default challengeCreation;