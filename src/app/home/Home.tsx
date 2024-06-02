'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'
import { useEvents } from '@/hooks/useEvents'
import { EventCard } from './EventCard'
import { Typography, Box, List, ListItem, Grid, Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { IEvent } from '@/types/event.type'
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export function Home() {
	const [events, setEvents] = useState<IEvent[]>([])
	const [topEvents, setTopEvents] = useState<IEvent[]>([])
	const { data: me } = useProfile()
	const [sortByViews, setSortByViews] = useState<boolean>(false)
	const { data, isLoading } = useEvents()

	const [date, setDate] = useState<DateRange<Dayjs | null>>([
        dayjs(dayjs().format('YYYY-MM-DD')),
        null,
    ]);
	
	useEffect(() => {
		setEvents(data?.data || [])
	}, [data])

	useEffect(() => {
		if(sortByViews && data?.data) {
			setEvents(prev => [...prev].sort((p, c) => c.views - p.views))
		} else {
			setEvents(prev => [...prev].sort((p, c) => p.views - c.views))
		}
	}, [sortByViews])

	useEffect(() => {
		if(date && data?.data) {
			const events = data.data
			console.log(events.filter(e => dayjs(e.time).isAfter(date[0]) && dayjs(e.time).isBefore(date[1])))
			setEvents(events.filter(e => dayjs(e.time).isAfter(date[0]) && dayjs(e.time).isBefore(date[1])))
		} else {
			setEvents(prev => [...prev].sort((p, c) => p.views - c.views))
		}
	}, [date])
	
	return isLoading ? (
		<Loader />
	) : (
		<Box sx={{ }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography>Events</Typography>
				
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer sx={{ width: '60%', marginRight: 2 }} components={['DateRangePicker']}>
							<DateRangePicker value={date} onChange={(newValue) => setDate(newValue)} localeText={{ start: 'date-start', end: 'date-end' }} />
						</DemoContainer>
					</LocalizationProvider>

					Sort by views: <Switch value={sortByViews} onChange={(e) => setSortByViews(e.target.checked)}></Switch>
				</Box>
			</Box>

			<Grid container spacing={2} sx={{ height: '100%' }}>
				{
					events?.map(event => <EventCard key={event.id} setEvents={setEvents} event={event} me={me?.user || null}></EventCard>)
				}
			</Grid>
		</Box>
	)
}
