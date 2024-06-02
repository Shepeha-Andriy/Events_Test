import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'

export default function HomeLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
