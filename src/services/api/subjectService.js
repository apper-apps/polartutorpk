import subjectsData from "@/services/mockData/subjects.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const subjectService = {
  async getAll() {
    await delay(300);
    return [...subjectsData];
  },

  async getById(id) {
    await delay(250);
    const subject = subjectsData.find(s => s.Id === id);
    if (!subject) {
      throw new Error("Subject not found");
    }
    return { ...subject };
  },

  async getPopular() {
    await delay(300);
    return subjectsData.sort((a, b) => b.tutorCount - a.tutorCount).slice(0, 10);
  },

  async create(subjectData) {
    await delay(350);
    const newId = Math.max(...subjectsData.map(s => s.Id)) + 1;
    const newSubject = {
      Id: newId,
      ...subjectData,
      tutorCount: 0,
      createdAt: new Date().toISOString()
    };
    subjectsData.push(newSubject);
    return { ...newSubject };
  },

  async update(id, updateData) {
    await delay(300);
    const index = subjectsData.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Subject not found");
    }
    subjectsData[index] = { ...subjectsData[index], ...updateData };
    return { ...subjectsData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = subjectsData.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Subject not found");
    }
    const deleted = subjectsData.splice(index, 1)[0];
    return { ...deleted };
  }
};