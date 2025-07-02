import blogData from "@/services/mockData/blog.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
  async getAll() {
    await delay(350);
    return [...blogData];
  },

  async getById(id) {
    await delay(250);
    const post = blogData.find(p => p.Id === id);
    if (!post) {
      throw new Error("Blog post not found");
    }
    return { ...post };
  },

  async getFeatured() {
    await delay(300);
    return blogData.filter(p => p.featured).slice(0, 3);
  },

  async getByCategory(category) {
    await delay(300);
    return blogData.filter(p => p.category === category);
  },

  async getCategories() {
    await delay(200);
    const categories = [...new Set(blogData.map(p => p.category))];
    return categories;
  },

  async create(postData) {
    await delay(400);
    const newId = Math.max(...blogData.map(p => p.Id)) + 1;
    const newPost = {
      Id: newId,
      ...postData,
      publishedAt: new Date().toISOString(),
      featured: false
    };
    blogData.push(newPost);
    return { ...newPost };
  },

  async update(id, updateData) {
    await delay(300);
    const index = blogData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Blog post not found");
    }
    blogData[index] = { ...blogData[index], ...updateData };
    return { ...blogData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = blogData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Blog post not found");
    }
    const deleted = blogData.splice(index, 1)[0];
    return { ...deleted };
  }
};