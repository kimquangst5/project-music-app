import express, { Request, Response, NextFunction } from 'express'
import streamUpload from "../../util/streamUpload.util";
import { v2 as cloudinary } from 'cloudinary'

export const deleteSingle = (nameImage: any) => {
	cloudinary.uploader.destroy(nameImage, { invalidate: true }, (result: any) => {

	});
}

export const deleteMulti = (nameImage: any) => {
	cloudinary.api.delete_resources(nameImage, (result: any) => {

	});
}



export const uploadMulti = async (req: Request, res: Response, next: NextFunction) => {
	const result = req['files']
	if (!result.avatar && !result.audio) {
		next();
	}
	else {
		if (result.avatar && !result.audio) {
			if (result.avatar.length > 0) {
				req.body.avatar = []
				Promise.all(result.avatar.map(avatar => {
					if (avatar.buffer) {
						const uploadToCloudinary = async (buffer: any) => {
							let kq = await streamUpload(buffer);
							req.body.avatar.push(kq['url'])
							next();
						};
						uploadToCloudinary(avatar.buffer)
					}
				}))
			}
		}
		else if (!result.avatar && result.audio) {
			if (result.audio.length > 0) {
				req.body.audio = []
				Promise.all(result.audio.map(avatar => {
					if (avatar.buffer) {
						const uploadToCloudinary = async (buffer: any) => {
							let kq = await streamUpload(buffer);
							req.body.audio.push(kq['url'])
							next();
						};
						uploadToCloudinary(avatar.buffer)
					}
				}))
			}
		}
		else {
			if (result.avatar.length > 0 && result.audio.length > 0){
				req.body.avatar = []
				Promise.all(result.avatar.map(avatar => {
					if (avatar.buffer) {
						const uploadToCloudinary = async (buffer: any) => {
							let kq = await streamUpload(buffer);
							req.body.avatar.push(kq['url'])
						};
						uploadToCloudinary(avatar.buffer)
					}
				}))
				req.body.audio = []
				Promise.all(result.audio.map(avatar => {
					if (avatar.buffer) {
						const uploadToCloudinary = async (buffer: any) => {
							let kq = await streamUpload(buffer);
							req.body.audio.push(kq['url'])
							next();
						};
						uploadToCloudinary(avatar.buffer)
					}
				}))
			}
		}

	}
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
	if (req['file']) {
		(req['file'].buffer)
		const uploadToCloudinary = async (buffer) => {
			let result = await streamUpload(buffer);
			req.body[req['file'].fieldname] = result['url'];
			req.body.nameImage = result['public_id'];

			next();
		};
		uploadToCloudinary(req['file'].buffer)
	}
	else {
		next();
	}
}