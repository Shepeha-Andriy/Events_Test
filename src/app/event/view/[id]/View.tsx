'use client'

import { useParams } from "next/navigation"
import { Button, Input, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { IEventForm } from "@/types/event.type"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"
import { eventService } from "@/services/event.service"
import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from 'next/navigation'
import GMap from '@/components/maps/Map'
import dayjs, { Dayjs } from 'dayjs';
import Recomendations from './Recomendations'

export default function View () {
    
    const { id } = useParams<{id: string}>()
    const { push } = useRouter()

    const [selectedLocation, setSelectedLocation] = useState({
      lat: 49.8241,
      lng: 24.0025,
    });

    const { data, isLoading, isSuccess } = useQuery({
      queryKey: ['event get one'],
      queryFn: () => eventService.getEvent(id, false),
    })

    useEffect(() => {
      if(id && data?.data) {
        setSelectedLocation({ lat: data.data.lat, lng: data.data.lng })
      }
    }, [data])

    if(id && !data) return <div>Loading </div>

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '10%' }}>
      <Button style={{ position: 'absolute', top: 10, left: 10 }} onClick={() => { push('/home') }}>Back</Button>

      <Typography variant='h4'>{data?.data.name}</Typography>

      <Typography>{data?.data.description}</Typography>

      <Typography>{dayjs(data?.data.time).format('MM/DD/YYYY h:mm')}</Typography>
     
     <GMap selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} showSearch={false}></GMap>

     {data?.data && <Recomendations event={data.data}></Recomendations>}
    </div>
  }


