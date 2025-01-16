
const db = require('../config/database');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const {authMiddleware} = require('../middleware/authorization');

const getCloudinaryUrl = async (file)=>{
    const name = file.originalname.split(".")[0]
    const result = await cloudinary.uploader.upload(file.path,{public_id:`${name}`}).catch((err)=>{console.log(err);
    })
    console.log(result);
    return result.url

}

exports.postSubmit = [upload.array('images'), async (req, res) => {
    const { name, handle } = req.body;
   
    const files = req.files;
    const urls = await Promise.all(
        files.map(async (file) => {
            const url = await getCloudinaryUrl(file);
            return { url };
        })
    );

    try {
        const user = await db.user.create({
            data: {
                name,
                handle,
                images:urls,
                },
        });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving submission');
    }
}
]

exports.getSubmissions= [authMiddleware, async (req, res) => {
    try {
        const users = await db.user.findMany({
        });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching submissions');
    }
}
]

