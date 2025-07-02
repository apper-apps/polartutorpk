import reviewsData from "@/services/mockData/reviews.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewService = {
  async getAll() {
    await delay(300);
    return [...reviewsData];
  },

  async getById(id) {
    await delay(250);
    const review = reviewsData.find(r => r.Id === id);
    if (!review) {
      throw new Error("Review not found");
    }
    return { ...review };
  },

  async getByTutorId(tutorId) {
    await delay(350);
    return reviewsData.filter(r => r.tutorId === tutorId);
  },

  async getFeatured() {
    await delay(300);
    return reviewsData.filter(r => r.rating >= 4.5).slice(0, 6);
  },

  async create(reviewData) {
    await delay(400);
    const newId = Math.max(...reviewsData.map(r => r.Id)) + 1;
    const newReview = {
      Id: newId,
      ...reviewData,
      date: new Date().toISOString()
    };
    reviewsData.push(newReview);
    return { ...newReview };
  },

  async update(id, updateData) {
    await delay(300);
    const index = reviewsData.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Review not found");
    }
    reviewsData[index] = { ...reviewsData[index], ...updateData };
    return { ...reviewsData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = reviewsData.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Review not found");
    }
    const deleted = reviewsData.splice(index, 1)[0];
    return { ...deleted };
  }
};