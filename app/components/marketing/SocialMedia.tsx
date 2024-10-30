'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Facebook, Instagram, Twitter, Globe, Share2, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SocialPost {
  title: string
  date: string
  time: string
  description: string
  hashtags: string
  image?: File
}

export function SocialMedia() {
  const [platforms, setPlatforms] = useState({
    facebook: true,
    instagram: true,
    twitter: false,
  })

  const [postData, setPostData] = useState<SocialPost>({
    title: "Live Jazz at The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    description: "Join us for an evening of classic jazz standards",
    hashtags: "#LiveJazz #BlueNote #LiveMusic",
  })

  const [scheduledPosts] = useState([
    {
      id: "1",
      platform: "facebook",
      date: "2024-03-19",
      time: "18:00",
      status: "scheduled",
    },
    {
      id: "2",
      platform: "instagram",
      date: "2024-03-19",
      time: "19:00",
      status: "scheduled",
    },
  ])

  const [insights] = useState({
    engagement: {
      likes: 1250,
      shares: 320,
      comments: 85,
      trend: "+12%",
    },
    reach: {
      total: 15000,
      organic: 12000,
      paid: 3000,
      trend: "+8%",
    },
    topPlatforms: [
      { name: "Instagram", percentage: 45 },
      { name: "Facebook", percentage: 35 },
      { name: "Twitter", percentage: 20 },
    ],
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={postData.date}
                onChange={(e) =>
                  setPostData({ ...postData, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={postData.time}
                onChange={(e) =>
                  setPostData({ ...postData, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Hashtags</Label>
            <Input
              value={postData.hashtags}
              onChange={(e) =>
                setPostData({ ...postData, hashtags: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
              {postData.image && (
                <span className="text-sm text-muted-foreground">
                  {postData.image.name}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Platforms</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </div>
                <Switch
                  checked={platforms.facebook}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, facebook: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </div>
                <Switch
                  checked={platforms.instagram}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, instagram: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </div>
                <Switch
                  checked={platforms.twitter}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, twitter: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Schedule Posts
        </Button>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Social Preview</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{postData.title}</h3>
                <p className="text-sm">
                  {new Date(postData.date).toLocaleDateString()} at{" "}
                  {postData.time}
                </p>
                <p className="text-sm">{postData.description}</p>
                <p className="text-sm text-blue-500">{postData.hashtags}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {post.platform === "facebook" && (
                      <Facebook className="h-4 w-4" />
                    )}
                    {post.platform === "instagram" && (
                      <Instagram className="h-4 w-4" />
                    )}
                    <div>
                      <p className="font-medium capitalize">{post.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.date} at {post.time}
                      </p>
                    </div>
                  </div>
                  <Badge>{post.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Engagement</h4>
                  <div className="space-y-1">
                    <p className="text-sm">Likes: {insights.engagement.likes}</p>
                    <p className="text-sm">
                      Shares: {insights.engagement.shares}
                    </p>
                    <p className="text-sm">
                      Comments: {insights.engagement.comments}
                    </p>
                    <p className="text-sm text-green-500">
                      Trend: {insights.engagement.trend}
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Reach</h4>
                  <div className="space-y-1">
                    <p className="text-sm">Total: {insights.reach.total}</p>
                    <p className="text-sm">Organic: {insights.reach.organic}</p>
                    <p className="text-sm">Paid: {insights.reach.paid}</p>
                    <p className="text-sm text-green-500">
                      Trend: {insights.reach.trend}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Top Platforms</h4>
                <div className="space-y-2">
                  {insights.topPlatforms.map((platform) => (
                    <div key={platform.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{platform.name}</span>
                        <span>{platform.percentage}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${platform.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
} 