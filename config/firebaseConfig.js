const serviceAccount = {
    "type": "service_account",
    "project_id": "videothumbnail-e09d6",
    "private_key_id": "fd1b98fff6e0f4e9b30a1878dae4e34db35742f7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDkzafAuS2c+787\nigC8K6iO3gF1K/QEbQF6NYWacSxgI97L948omXiZOLMtp9XBX0y9tpDXsmFwUIVw\nmdHP/jBcpaXnYiPo4pz3F6/qUxvg3f2l6TT+t9TpmZynPLW1zZY2rCusHbye4YEr\nYNw+Ci8i5QYDr9up28qR8aoW+A5fuV+yaxC8UNjEuqIw4ypI+HAkk0uCcuVBvbk+\nEqlNOfQrkDYbmY1pMmSm1i4KjxJ+prekmCEIOMnEGgoFNCo+2UXUmLiCr3F1IAg5\n1RLh3Ax/1vc5zdAsMuI3lZOyE4xjE3oEPawh715HIus3IZRgir4GhCfh/UTHO0CJ\n2RV78WVZAgMBAAECggEAD+9x2Pact75XLTSj70xuyX/VTqhAbxl6HPKYKu+UarVn\nhEGqPxE3SMad62wGc24UKHIMEvW/Gw/Z8gPIjN7+1nO0AxI+/tk08PGoTx6O28G3\nni6d7K/4Jx/g0ktPEDSGGynbwyRGuYhqUw+EhK6iu0sDo6NDyN1VtbCaNc4neXZM\nPC3RhHsv5CM+6XwJPywTtCl2soCpCCIAZZHLz/69hWlWXNxxipUVMNjkEiwIC5yD\n0V4iLNT/DgNpYY1hgH/smzj72Btci1A5j8fAWNWUQ27HUy2EdcYuiyC2oIdUOLZK\n/wIwPONVqNpMnrxZF5sFLnjz4dU0Cio0mDNaNF05LQKBgQD3+QBvMR6givfTRB0t\n21Um5lm7DDdWJ7Rl9o7u571/vI6MVr5abewMCYQMR28EVYT/WgqKK80ituAdZ4qt\nHI5kEHTMAS1Czr60KLZTcnT/RJqGzMGExZVhHybrxiDDZ2NrSPk2/QziLPM0qedB\nHSq9vis3zSXyJAZhnvGnYefoLQKBgQDsNcssDzYRlTTLskYdmc+QSmjVgqPsfx2Y\nFWVC5e32clBs3y0XGJKhlh0mMbPSCaxlhP4mzGOVH0559GYAEGtSXCgNQUrh3O6g\nHVRNhQchN07GMXvx2jzszijyBpneumvljCZDyx6gAWrX41+CtbuXmTOw2g2w+0tp\ngu2dPT1hXQKBgQCs1vJmjmY6oKJ8r01nWSnRI14H8kvf0Wz8ZQ7blsuO7W6ugwfL\nIDMXcMqJhIDtFG7PTYNrK3ygZbdwx2rxnqXhOVcvmuJhXpmuGXJ8V5sVEkxjCPUa\nBl5Ig94tGLxddwLlFMgge+EvBQW//20hBaN0/chB7Mw2KsYH5TGq6aMrQQKBgQDa\n1J9MSy9RLMTDrX4tsDBOQdFLdIM+9yjIm5G7X16Mwazmn/+a9QXrMzIAD23DOXkA\neCwob5QWM/G1JAlXJ971ZzEnzoR8KPzdUy6lvocza5TMIk3sar2kuP3P8vOcF2Mc\nPzG3/rZ5j7aXGSuD4a9QK/tqbSjf/H8J2eUelfyGdQKBgQDPSNipL1JYE1Wdjl3E\nEc1S1B3OgNQVAIB2p1Z+mA2HZ1Ig/MQiKHFJwuIzuw+LZtwR8d04rhohE52xw0Bu\nYprM9orcIkE7P00+yL2Q1KK5R3k5TcwpaLq7HbY+8L4DkFkPPMWvNCqAnVp6Bez4\nNokT5QAhRnSgAHzwdSLmhcjBZw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-5t531@videothumbnail-e09d6.iam.gserviceaccount.com",
    "client_id": "104311304263787726347",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5t531%40videothumbnail-e09d6.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

const path = require('path')
const admin = require('firebase-admin');
const upload2 = require('../middleware/multerFiles');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://videothumbnail-e09d6.appspot.com"
});

const bucket = admin.storage().bucket();

exports.uploadImage = async (image) => {
    let imageUrl = "";
    try {
        const filePath = image.path;
        console.log(filePath)
        const destination = `images/${image.filename}`;
        console.log("destination>>>>>>>>>>>>", destination)
        let resp = await bucket.upload(filePath, {
            destination: destination
        })
        if (resp) {
            console.log("====== image upload in firebase ========")
            imageUrl = `https://firebasestorage.googleapis.com/v0/b/videothumbnail-e09d6.appspot.com/o/images%2F${image.filename}?alt=media`
        }
        else {
            console.log("======== image not uploaded ========")
        };
        return imageUrl;
    } catch (error) {
        console.log("====== catch error from image upload function ======", error.message);
        return imageUrl;
    }
}
exports.uploadVideos = async (video) => {
    let videoUrl = "";
    try {
        const filePath = `${video.path}`;
        const destination = `videos/${video.filename}`;
        let resp = await bucket.upload(filePath, {
            destination: destination
        })
        if (resp) {
            console.log("====== image upload in firebase ========")
            videoUrl = `https://firebasestorage.googleapis.com/v0/b/videothumbnail-e09d6.appspot.com/o/videos%2F${video.filename}?alt=media`
        }
        else {
            console.log("======== video not uploaded ========")
        };
        return videoUrl;
    } catch (error) {
        console.log("====== catch error from video upload function ======", error.message);
        return videoUrl;
    }
}

exports.uploadThumbnails = async (video) => {
    let videoUrl = "";
    try {
        console.log(typeof (video))
        const filePath = `${video.slice(26)}`;
        const destination = `videos/${video.slice(49)}`;
        let resp = await bucket.upload(filePath, {
            destination: destination
        })
        if (resp) {
            console.log("====== image upload in firebase ========")
            videoUrl = `https://firebasestorage.googleapis.com/v0/b/videothumbnail-e09d6.appspot.com/o/videos%2F${video}?alt=media`
        }
        else {
            console.log("======== video not uploaded ========")
        };
        return videoUrl;
    } catch (error) {
        console.log("====== catch error from thumbnail upload function ======", error.message);
    }
}
