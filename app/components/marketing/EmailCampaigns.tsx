'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Send, Users } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
}

export function EmailCampaigns() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [emailData, setEmailData] = useState({
    subject: "Join us for a night of Jazz",
    content: `
Dear music lovers,

We're excited to invite you to our upcoming performance at The Blue Note.

Date: March 20, 2024
Time: 8:00 PM

Don't miss this special evening of jazz standards and original compositions.

Reserve your spot now!

Best regards,
[Artist Name]
    `.trim(),
    audienceType: "all",
  })

  const templates: EmailTemplate[] = [
    {
      id: "1",
      name: "Event Announcement",
      subject: "Join us for a night of Jazz",
      content: "Template content here...",
    },
    {
      id: "2",
      name: "Reminder",
      subject: "Don't forget - Live Jazz Tomorrow!",
      content: "Template content here...",
    },
  ]

  const recentCampaigns = [
    {
      id: "1",
      name: "March Performance",
      sent: "2024-02-15",
      recipients: 250,
      opens: 180,
      clicks: 45,
    },
    {
      id: "2",
      name: "February Newsletter",
      sent: "2024-02-01",
      recipients: 200,
      opens: 150,
      clicks: 30,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email Template</Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Subject Line</Label>
            <Input
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Email Content</Label>
            <Textarea
              value={emailData.content}
              onChange={(e) =>
                setEmailData({ ...emailData, content: e.target.value })
              }
              rows={10}
            />
          </div>

          <div className="space-y-2">
            <Label>Target Audience</Label>
            <Select
              value={emailData.audienceType}
              onValueChange={(value) =>
                setEmailData({ ...emailData, audienceType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="recent">Recent Attendees</SelectItem>
                <SelectItem value="vip">VIP Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <Send className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
          <Button variant="outline">Preview</Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Campaign Analytics</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opens</TableHead>
                <TableHead>Clicks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    {campaign.name}
                  </TableCell>
                  <TableCell>{campaign.recipients}</TableCell>
                  <TableCell>{campaign.opens}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Audience Overview</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Subscribers</span>
              <span className="font-medium">450</span>
            </div>
            <div className="flex justify-between">
              <span>Active Subscribers</span>
              <span className="font-medium">380</span>
            </div>
            <div className="flex justify-between">
              <span>Average Open Rate</span>
              <span className="font-medium">72%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 