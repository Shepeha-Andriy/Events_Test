import { IEvent, IEventForm } from '@/types/event.type'

import { axiosWithAuth } from '@/api/interceptors'

export const eventService = {

	async createEvent(data: IEventForm) {
		const response = await axiosWithAuth.post<IEvent>('/event', data)

		return response
	},
	
    async getEvent(id: string, forUpdate: boolean) {
		const response = await axiosWithAuth.get<IEvent>(`/event/${id}?forUpdate=${forUpdate ? 1 : 0}`)

		return response
	},
    
	async getEvents() {
		const response = await axiosWithAuth.get<IEvent[]>(`/event`)

		return response
	},
	
	async updateEvent(id: string, data: IEventForm) {
		const response = await axiosWithAuth.post<IEvent[]>(`/event/${id}`, data)

		return response
	},
	
    async deleteEvent(id: string) {
		const response = await axiosWithAuth.delete<{ id: string }>(`/event/${id}`)

		return response
	},

}
