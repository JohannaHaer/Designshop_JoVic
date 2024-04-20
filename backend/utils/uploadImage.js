import cloudinary from 'cloudinary'

export const uploadImage = async (buffer) => {
    const uploadResult = await new Promise((resolve) => {
        cloudinary.v2.uploader.upload_stream((error, result) => { return resolve(result) }).end(buffer)
    })
    return uploadResult
}

