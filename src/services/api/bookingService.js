import bookingsData from "@/services/mockData/bookings.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  async getAll() {
    await delay(350);
    return [...bookingsData];
  },

  async getById(id) {
    await delay(250);
    const booking = bookingsData.find(b => b.Id === id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return { ...booking };
  },

  async getStudentBookings() {
    await delay(400);
    // Simulate student's bookings
    return bookingsData.slice(0, 8).map(booking => ({ ...booking }));
  },

  async getTutorBookings(tutorId) {
    await delay(350);
    return bookingsData.filter(b => b.tutorId === tutorId);
  },

  async getRecent() {
    await delay(300);
    return bookingsData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  },

  async create(bookingData) {
    await delay(450);
    const newId = Math.max(...bookingsData.map(b => b.Id)) + 1;
    const newBooking = {
      Id: newId,
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    bookingsData.push(newBooking);
    return { ...newBooking };
  },

  async update(id, updateData) {
    await delay(300);
    const index = bookingsData.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    bookingsData[index] = { ...bookingsData[index], ...updateData };
    return { ...bookingsData[index] };
  },

  async cancel(id) {
    await delay(350);
    return this.update(id, { status: "cancelled" });
  },

  async confirm(id) {
    await delay(300);
    return this.update(id, { status: "confirmed" });
  },

  async complete(id) {
    await delay(300);
    return this.update(id, { status: "completed" });
  },

  async delete(id) {
    await delay(250);
    const index = bookingsData.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    const deleted = bookingsData.splice(index, 1)[0];
    return { ...deleted };
  }
};