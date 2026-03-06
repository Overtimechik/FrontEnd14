export const baseUrl = "https://69ab01dbe051e9456fa31334.mockapi.io/api/v1/"

// Конфигурация API resources
export const API_ENDPOINTS = {
    NOTES: "notes"
}
export interface INote {
    id: string;
    title: string;
    description: string;
    time: string;
    createdAt?: string;
}

// типизация запроса на сервер
interface RequestOptions {
    url: string,
    dto?: any,
    headers?: HeadersInit
}
// тип для ответа от сервера
interface RequestResponse<T> extends Pick<Response, "status"> {
    data: T
}
// типы запросов на сервер
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"


class ApiService {

    private _checkUrl(url: string) {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return baseUrl + url;
    }

    private _serverRequest<T>(
        options: RequestOptions,
        method: RequestMethod
    ): Promise<RequestResponse<T>> {

        const url = this._checkUrl(options.url)
        const fetchOptions: RequestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }

        // Не отправляем body для GET запросов
        if (method !== "GET" && options.dto) {
            fetchOptions.body = JSON.stringify(options.dto)
        }

        console.log(`📡 API Request: ${method} ${url}`, { options: options.dto })

        return fetch(url, fetchOptions).then(async response => {
            const data = await response.json()

            console.log(`✅ API Response: ${response.status} ${url}`, data)

            return {
                status: response.status,
                data
            }
        }).catch(err => {
            console.error(`❌ API Error: ${method} ${url}`, err)
            throw err
        })
    }

    async get<T>(options: RequestOptions) {
        return this._serverRequest<T>(options, "GET")
    }
    async patch<T>(options: RequestOptions) {
        return this._serverRequest<T>(options, "PATCH")
    }
    async post<T>(options: RequestOptions) {
        return this._serverRequest<T>(options, "POST")
    }
    async delete<T>(options: RequestOptions) {
        return this._serverRequest<T>(options, "DELETE")
    }
    async put<T>(options: RequestOptions) {
        return this._serverRequest<T>(options, "PUT")
    }

    // Методы для работы с заметками
    async getNotes() {
        return this.get<INote[]>({ url: API_ENDPOINTS.NOTES })
    }

    async getNoteById(id: string) {
        return this.get<INote>({ url: `${API_ENDPOINTS.NOTES}/${id}` })
    }

    async createNote(note: Omit<INote, "id" | "createdAt">) {
        return this.post<INote>({ url: API_ENDPOINTS.NOTES, dto: note })
    }

    async updateNote(id: string, note: Partial<INote>) {
        return this.put<INote>({ url: `${API_ENDPOINTS.NOTES}/${id}`, dto: note })
    }

    async deleteNote(id: string) {
        return this.delete<{ id: string }>({ url: `${API_ENDPOINTS.NOTES}/${id}` })
    }
}

export const apiService = new ApiService()
