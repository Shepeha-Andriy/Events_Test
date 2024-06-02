import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'
import { eventService } from '@/services/event.service'

export function useEvents() {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['event'],
		queryFn: () => eventService.getEvents()
	})

	return { data, isLoading, isSuccess }
}
