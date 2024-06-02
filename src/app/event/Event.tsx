'use client'

import { useParams, useRouter } from "next/navigation"
import { Button, Input, Box, Typography, Stack, Tooltip } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { IEventForm } from "@/types/event.type"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"
import { eventService } from "@/services/event.service"
import { useEffect, useState } from "react"
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import GMap from '@/components/maps/Map'



export default function Event () {
    
    const { id } = useParams<{id: string}>()

    const { push } = useRouter()
    
    const { register, handleSubmit, reset, control } = useForm<IEventForm>({
      mode: 'onChange'
    })

    const [date, setDate] = useState<Dayjs | null>(null);
    const [selectedLocation, setSelectedLocation] = useState({
      lat: 49.8241,
      lng: 24.0025,
    });


    const { mutate } = useMutation({
      mutationKey: ['event'],
      mutationFn: (data: IEventForm) =>
        eventService.createEvent(data),
      onSuccess() {
        toast.success('Event successfully created!')
        reset()
      }
    })

    const { mutate: update } = useMutation({
      mutationKey: ['event update',],
      mutationFn: ({ id, data }: { id: string, data: IEventForm }) =>
        eventService.updateEvent(id, data),
      onSuccess() {
        toast.success('Event successfully updated!')
      }
    })

    const { data, isLoading, isSuccess } = useQuery({
      queryKey: ['event get one'],
      queryFn: () => eventService.getEvent(id, true),
      enabled: !!id
    })
    
    useEffect(() => {
      if(id && data?.data) {
        reset({ 
          name: data.data.name,
          description: data.data.description,
        })
        setDate(dayjs(data.data.time))
        setSelectedLocation({ lat: data.data.lat, lng: data.data.lng })
      }
    }, [data])

    const onSubmit: SubmitHandler<IEventForm & any> = data => {
      if(!date) return
      id ? update({ id, data: {...data, time: date?.toISOString(), lat: selectedLocation.lat, lng: selectedLocation.lng } }) 
      : mutate({ ...data, time: date?.toISOString(), lat: selectedLocation.lat, lng: selectedLocation.lng})
    }

    if(id && !data) return <div>Loading </div>

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '10%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '400px' }}>
          <Typography>{id ? 'Update' : 'Create'} Event</Typography>

          <Input 
            placeholder="Name" 
            sx={{ marginTop: 2 }}
            {...register('name', {
              required: 'Name is required!'
            })}
            fullWidth
          ></Input>

          <Input 
            placeholder="Description" 
            sx={{ marginTop: 2 }}
            {...register('description', {
              required: 'Description is required!'
            })}
            fullWidth
          ></Input>

          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker value={date} onChange={(newDate) => {setDate(newDate)}}/>
            </LocalizationProvider>
          </Box>

          <GMap selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}></GMap>

          <Box>
            <Button style={{ marginTop: 15, color: 'red' }} onClick={() => push('/home')}>Cancel</Button>
            <Button style={{ marginTop: 15 }} onClick={handleSubmit(onSubmit)}>Save</Button>
          </Box>
      </Box>

    </div>
}
