'use client'

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText } from "lucide-react"
import { ContractComments } from "./ContractComments"
import { useState } from "react"

interface Contract {
  id: string
  bookingId: string
  venue: string
  date: string
  status: 'draft' | 'pending' | 'negotiating' | 'signed'
  lastUpdated: string
  comments: number
}

export function ContractsList() {
  const [selectedContract, setSelectedContract] = useState<string | null>(null)

  const contracts: Contract[] = [
    {
      id: "1",
      bookingId: "b1",
      venue: "The Blue Note",
      date: "2024-03-20",
      status: "negotiating",
      lastUpdated: "2024-02-15",
      comments: 3,
    },
    {
      id: "2",
      bookingId: "b2",
      venue: "Jazz Corner",
      date: "2024-03-25",
      status: "pending",
      lastUpdated: "2024-02-14",
      comments: 1,
    },
  ]

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'signed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'negotiating':
        return 'default'
      case 'draft':
        return 'secondary'
    }
  }

  return (
    <Card>
      <div className="flex h-[calc(100vh-12rem)]">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.venue}</TableCell>
                  <TableCell>
                    {new Date(contract.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(contract.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedContract(contract.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {contract.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedContract && (
          <div className="w-[400px] border-l">
            <ContractComments contractId={selectedContract} />
          </div>
        )}
      </div>
    </Card>
  )
} 