import { axiosInstance, logout } from "../utils/utilities"
import config from '../config'
export let api = async function ({ method = "get", api, body, status = false,contentType}) {

	return await new Promise((resolve, reject) => {

		// setting token
		axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('authTokenArticleApp') === null || localStorage.getItem('authTokenArticleApp') === undefined ? '' : "Bearer "+localStorage.getItem('authTokenArticleApp')
		if(contentType){
			axiosInstance.defaults.headers.common['Content-Type'] =contentType;
		} 
		axiosInstance[method](`${config.apiEndpoint}${api}`, (body ? body : "")).then((data) => {
		
		resolve(statusHelper(status, data))

		}).catch((error) => {

			try {

				if (error.response) {

					reject(statusHelper(status, error.response))

				} else {

					reject(error)

                }
			}
			catch (err) {
				reject(err)
			}

		})

	})
}

var statusHelper = (status, data) => {

	if (data.status === 401) {
		logout()
	}

	if (status) {
		return {
			status: data.status,
			...data.data
		}
	} else {
		return data.data
	}
}