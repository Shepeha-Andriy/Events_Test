'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'
import { Button } from '@mui/material'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<div className='absolute top-1 right-1'>
			<Button
				variant='contained'
				onClick={() => mutate()}
			>
				Logout
			</Button>
		</div>
	)
}
