  async getBooking(id: string): Promise<Booking> {
    // TODO: Replace with actual API call
    const bookings = await this.getBookings()
    const booking = bookings.find(b => b.id === id)
    if (!booking) {
      throw new Error('Booking not found')
    }
    return booking
  }, 