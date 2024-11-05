import { BookingDetails } from "@/components/bookings/BookingDetails"

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BookingPage({ params, searchParams }: PageProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Booking {params.id}</h1>
      {/* <BookingDetails id={params.id} /> */}
    </div>
  );
} 