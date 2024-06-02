import type { PropsWithChildren } from 'react'

import DashboardLayout from '@/components/home-layout/HomeLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>
}
