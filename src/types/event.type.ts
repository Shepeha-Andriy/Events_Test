export interface IEventForm {
    time: string
    name: string
    description: string
}

export interface IEvent {
    id: string
    createdAt: string
    updatedAt: string
  
    user_id: string
    lng: number
    lat: number
    views: number
    time: string
    name: string
    description: string
}
