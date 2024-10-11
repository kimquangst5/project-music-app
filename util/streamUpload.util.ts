import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier';
import dotenv from 'dotenv'
dotenv.config();

// Configuration
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret
	// Click 'View API Keys' above to copy your API secret
});

export default (buffer: any) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader
			.upload_stream(
				{ resource_type: `auto` },
				(error, result) => {
					if (result) {
						resolve(result);
					} else {
						reject(error);
					}
				}
			)
			

		streamifier.createReadStream(buffer).pipe(stream);
	});
};