'use client'

import { IEvent } from "@/types/event.type"
import { Box, Typography } from "@mui/material"
import { useRouter } from 'next/navigation'

export default function RecCard({ event }: { event: IEvent & any }) {

    const { push } = useRouter()

    const handleView = (id: string) => {
        push(`event/view/${id}`)
    }

    return(
        <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;',
            padding: 2, marginTop: 3, minWidth: 300
        }}>
            <Typography onClick={() => handleView(event.id)} sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer'}}  variant="h4" component="div">
                { event.name }
            </Typography>
            <Typography>Views:{ event.views }</Typography>
            <Typography>Distance: { event.distance.toFixed(0) }km</Typography>
        </Box>
    )
}