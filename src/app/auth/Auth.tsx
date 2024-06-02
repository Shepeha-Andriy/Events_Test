'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'


import { IAuthForm } from '@/types/auth.types'

import { PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'
import { Button, Input, Typography, Box } from '@mui/material'

export default function Auth () {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')
			reset()
			push(PAGES.HOME)
		}
	})
	
	const onLogin: SubmitHandler<IAuthForm> = data => {
		setIsLoginForm(true)
		mutate(data)
	}
	const onRegister: SubmitHandler<IAuthForm> = data => {
		setIsLoginForm(false)
		mutate(data)
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
			<Box
				style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '50%' }}
			>
				<Typography style={{ marginBottom: 10 }} variant='h4'>Auth</Typography>

				<Input
					id='email'
					placeholder='Enter email:'
					type='email'
					{...register('email', {
						required: 'Email is required!'
					})}
					fullWidth
				/>

				<Input
					id='password'
					placeholder='Enter password: '
					type='password'
					{...register('password', {
						required: 'Password is required!'
					})}
					fullWidth
				/>

				<Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button onClick={handleSubmit(onLogin)}>Login</Button>
					<Button onClick={handleSubmit(onRegister)}>Register</Button>
				</Box>
			</Box>
		</div>
	)
}
