import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Music, Calendar } from "lucide-react"

interface VenueCardProps {
  venue: {
    id: string
    name: string
    location: string
    capacity: number
    genres: string[]
    imageUrl: string
  }
  onBook?: () => void
}

export function VenueCard({ venue, onBook }: VenueCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={venue.imageUrl} 
          alt={venue.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{venue.name}</span>
          <Button variant="outline" size="sm" onClick={onBook}>
            Book Now
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {venue.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            Capacity: {venue.capacity}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {venue.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 