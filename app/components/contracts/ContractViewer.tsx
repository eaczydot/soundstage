'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Send, Edit } from "lucide-react"
import { ContractComments } from "./ContractComments"

interface ContractViewerProps {
  bookingId: string
}

export function ContractViewer({ bookingId }: ContractViewerProps) {
  const [showComments, setShowComments] = useState(false)

  const contract = {
    status: 'pending',
    lastUpdated: '2024-03-15',
    version: '1.0',
    sections: [
      {
        title: 'Performance Details',
        content: 'The Artist agrees to perform at The Blue Note...'
      },
      {
        title: 'Payment Terms',
        content: 'Payment of $500 will be made...'
      },
      {
        title: 'Technical Requirements',
        content: 'The Venue will provide the following equipment...'
      }
    ]
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Performance Contract</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(contract.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <Badge variant={contract.status === 'signed' ? 'success' : 'warning'}>
              {contract.status}
            </Badge>
          </div>

          <div className="space-y-6">
            {contract.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium">{section.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Sign Contract
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Request Changes
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Contract Details</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-medium">{contract.version}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={contract.status === 'signed' ? 'success' : 'warning'}>
                {contract.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(contract.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowComments(!showComments)}
          >
            View Comments
          </Button>
        </div>
      </Card>
    </div>
  )
} 