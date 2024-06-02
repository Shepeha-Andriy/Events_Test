'use client'

import { Typography, Box, Button, CardContent, Grid } from '@mui/material'
import { toast } from "sonner"
import { IEvent } from '@/types/event.type'
import { IUser } from '@/types/auth.types'
import { eventService } from '@/services/event.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function EventCard({ setEvents, event, me}: { setEvents:  React.Dispatch<React.SetStateAction<IEvent[]>>, event: IEvent, me: IUser | null }) {
    
    const { push } = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['event delete'],
        mutationFn: (id: string) =>
          eventService.deleteEvent(id),
        onSuccess({ data }) {
          toast.success('Event successfully deleted!')
            setEvents(prev => prev.filter(event => event.id !== data.id))
        }
    })
    
    const onDelete = (id: string) => {
    mutate(id)
    }

    const handleEdit = (id: string) => {
        push(`event/${id}`)
    }
   
    const handleView = (id: string) => {
        push(`event/view/${id}`)
    }

    return (
		<Grid item xs={12} sm={6}>
            <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;', padding: 2, marginTop: 3, }}>
                <Typography onClick={() => handleView(event.id)} sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer'}}  variant="h4" component="div">
                    { event.name }
                </Typography>
                <Typography>Views:{ event.views }</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Typography>{me?.id === event.user_id ? <Button onClick={() => handleEdit(event.id)}>Edit</Button> : ''}</Typography>
                    <Button variant='contained' color='error' onClick={() => onDelete(event.id)}>{me?.id === event.user_id && 'delete'}</Button>
                </Box>
            </Box>
		</Grid>
	)
}
