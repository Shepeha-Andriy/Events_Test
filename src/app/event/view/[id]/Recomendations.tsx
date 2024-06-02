'use client'

import { useEffect, useState } from 'react'
import { useEvents } from '@/hooks/useEvents'
import { Stack, Typography } from "@mui/material"
import { IEvent } from '@/types/event.type'
import RecCard from './RecCard'

export default function Recomendations({ event }: { event: IEvent }) {
    const [recomendations, setRecomendations] = useState<IEvent[]>([])
    const { data, isLoading } = useEvents()

    useEffect(() => {
  
        if(data?.data) {
            const nearestEvents = findNearestEvents(data.data, event);
            console.log(nearestEvents)
            setRecomendations(nearestEvents)
        }

    }, [data])

    return(<div>
            <Typography style={{ marginTop: 10 }}>Recomendations:</Typography>
            
            <Stack marginTop={2} direction={{ xs: 'column', sm: 'column', lg: 'row' }} spacing={2}>
                {
                    recomendations.map(event => <RecCard key={event.id} event={event}></RecCard>)
                }
            </Stack>
        </div>
    )
}


const haversineDistance = (coords1: IEvent, coords2: IEvent) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    
    const R = 6371; // Earth radius
    const lat1 = toRad(coords1.lat);
    const lon1 = toRad(coords1.lng);
    const lat2 = toRad(coords2.lat);
    const lon2 = toRad(coords2.lng);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  
    return R * c; // Distance in km
};

const findNearestEvents = (events: IEvent[], selectedEvent: IEvent) => {
    const distances = events.map(event => ({
      ...event,
      distance: haversineDistance(selectedEvent, event)
    }));
  
    distances.sort((a, b) => a.distance - b.distance);
  
    return distances.filter(event => event.id !== selectedEvent.id).slice(0, 3);
};
