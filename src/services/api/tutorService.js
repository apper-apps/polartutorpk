import tutorsData from "@/services/mockData/tutors.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tutorService = {
  async getAll() {
    await delay(400);
    return [...tutorsData];
  },

  async getById(id) {
    await delay(300);
    const tutor = tutorsData.find(t => t.Id === id);
    if (!tutor) {
      throw new Error("Tutor not found");
    }
    return { ...tutor };
  },

  async getFeatured() {
    await delay(350);
    return tutorsData.filter(t => t.featured).slice(0, 6);
  },

  async getSavedTutors() {
    await delay(300);
    // Simulate saved tutors for student
    return tutorsData.slice(0, 4).map(tutor => ({ ...tutor }));
  },

  async getPendingApprovals() {
    await delay(400);
    // Simulate pending tutor approvals for admin
    return tutorsData.slice(0, 3).map(tutor => ({ 
      ...tutor, 
      status: "pending",
      appliedAt: new Date().toISOString()
    }));
  },

  async getStats() {
    await delay(250);
    return {
      totalTutors: tutorsData.length,
      activeTutors: Math.floor(tutorsData.length * 0.85),
      totalBookings: 1247,
      monthlyGrowth: 12
    };
  },

  async create(tutorData) {
    await delay(500);
    const newId = Math.max(...tutorsData.map(t => t.Id)) + 1;
    const newTutor = {
      Id: newId,
      ...tutorData,
      rating: 0,
      reviewCount: 0,
      verified: false,
      featured: false,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    tutorsData.push(newTutor);
    return { ...newTutor };
  },

  async update(id, updateData) {
    await delay(350);
    const index = tutorsData.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Tutor not found");
    }
    tutorsData[index] = { ...tutorsData[index], ...updateData };
    return { ...tutorsData[index] };
  },

  async approve(id) {
    await delay(300);
    return this.update(id, { verified: true, status: "approved" });
  },

  async reject(id) {
    await delay(300);
    return this.update(id, { status: "rejected" });
  },

  async delete(id) {
    await delay(300);
    const index = tutorsData.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Tutor not found");
    }
    const deleted = tutorsData.splice(index, 1)[0];
    return { ...deleted };
  }
};