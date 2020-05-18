import request from '../utils/request.js'
export function getFiles(options) {
	return request(options).then(res => res)
}