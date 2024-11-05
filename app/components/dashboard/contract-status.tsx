"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { CompactProps } from "@/types/layout"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Contract {
  id: string
  venue: string
  type: string
  amount: number
  dueDate: string
  status: 'pending_signature' | 'under_review' | 'awaiting_payment'
}

export function ContractStatus({ isCompact }: CompactProps) {
  const contracts: Contract[] = [
    {
      id: '1',
      venue: 'The Blue Note',
      type: 'Performance',
      amount: 2400,
      dueDate: '2024-03-17',
      status: 'pending_signature'
    },
    {
      id: '2',
      venue: 'Jazz Corner',
      type: 'Residency',
      amount: 4800,
      dueDate: '2024-03-19',
      status: 'under_review'
    },
    {
      id: '3',
      venue: 'Village Vanguard',
      type: 'Special Event',
      amount: 3200,
      dueDate: '2024-03-24',
      status: 'awaiting_payment'
    }
  ]

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'pending_signature':
        return <Badge variant="outline">Pending Signature</Badge>
      case 'under_review':
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Under Review</Badge>
      case 'awaiting_payment':
        return <Badge variant="outline">Awaiting Payment</Badge>
    }
  }

  return (
    <ScrollArea className="h-full px-4">
      <div className="space-y-4">
        {contracts.map((contract, index) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{contract.venue}</h3>
                {getStatusBadge(contract.status)}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{contract.type}</span>
                <span>${contract.amount.toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Due: {format(new Date(contract.dueDate), 'MM/dd/yyyy')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
} 