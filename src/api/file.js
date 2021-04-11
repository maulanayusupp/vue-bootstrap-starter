import axios from 'axios';
import client from '../lib/http-client';

const CancelToken = axios.CancelToken;

export default {
	/**
	 * Upload
	 */
	upload(params, cb, errorCb, progressCallback, cancelCallback) {
		const url = '/upload';
		const config = {
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
				if (progressCallback) progressCallback(percentCompleted);
			},
			cancelToken: new CancelToken(((c) => {
				// An executor function receives a cancel function as a parameter
				if (cancelCallback) {
					// eslint-disable-next-line no-param-reassign
					cancelCallback(c);
				}
			})),
		};
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		client.post(url, params, config)
			.then(responseHandler)
			.catch(errorHandler);
	},

	/*
	 * Upload Video
	 */
	uploadVideo(params, cb, errorCb, progressCallback, cancelCallback) {
		const url = '/uploadVideo';
		const config = {
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
				if (progressCallback) progressCallback(percentCompleted);
			},
			cancelToken: new CancelToken(((c) => {
				// An executor function receives a cancel function as a parameter
				if (cancelCallback) {
					// eslint-disable-next-line no-param-reassign
					cancelCallback(c);
				}
			})),
		};
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		client.post(url, params, config)
			.then(responseHandler)
			.catch(errorHandler);
	},
};
