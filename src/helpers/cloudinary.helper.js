const cloudinary = require('cloudinary');



cloudinary.config({

    cloud_name: process.env.CLOUDINARY_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET,

});





 const imageUpload = async (imageFile) => {

    return new Promise((resolve, reject) => {

        cloudinary.v2.uploader.upload(imageFile.path, (error, result) => {

            if (error) {

                console.log(error)

                reject(error);

            } else {

                // console.log(result)

                resolve(result);

            }

        })




    })

}
module.exports = {
	imageUpload
};