'use client'

import { GlobalLoader } from './GlobalLoader'
import Loader from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'
import { LogoutButton } from './LogoutButton'
import Link from 'next/link'
import { Typography, Box } from '@mui/material'

export function Header() {
	const { data, isLoading } = useProfile()

	return (
		<header>
			<GlobalLoader />
			<Box>
				{isLoading ? (
					<Loader />
				) : (
					<Box sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'flex-end', padding: 4 }}>
						<Typography>{data?.user && <Link style={{ textDecoration: 'none', color: 'blue' }} href="/event">Create new Event</Link>}</Typography>
						<Typography>{data?.user.email}</Typography>
						<Typography>{data?.user && <LogoutButton></LogoutButton>}</Typography>
					</Box>
				)}
			</Box>
		</header>
	)
}
