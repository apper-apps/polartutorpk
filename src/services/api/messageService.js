import messagesData from "@/services/mockData/messages.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const messageService = {
  async getStudentMessages() {
    await delay(350);
    // Return conversation threads for the current student
    return [...messagesData];
  },

  async getConversationWithTutor(tutorId) {
    await delay(300);
    const conversation = messagesData.find(msg => msg.tutorId === tutorId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return { ...conversation };
  },

  async sendMessage(conversationId, messageContent) {
    await delay(400);
    const conversation = messagesData.find(msg => msg.conversationId === conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    
    // Update the conversation with new message
    conversation.lastMessage = messageContent;
    conversation.lastMessageAt = new Date().toISOString();
    conversation.messageCount += 1;
    
    return { ...conversation };
  },

  async markAsRead(messageId) {
    await delay(250);
    const message = messagesData.find(msg => msg.Id === messageId);
    if (!message) {
      throw new Error("Message not found");
    }
    
    message.isRead = true;
    message.hasUnread = false;
    return { ...message };
  },

  async getUnreadCount() {
    await delay(200);
    return messagesData.filter(msg => !msg.isRead).length;
  },

  async createConversation(tutorId, subject, initialMessage) {
    await delay(450);
    const newId = Math.max(...messagesData.map(m => m.Id)) + 1;
    const conversationId = `conv_${Date.now()}`;
    
    const newConversation = {
      Id: newId,
      conversationId,
      tutorId,
      tutorName: "New Tutor", // This would be fetched from tutor service
      tutorPhoto: "",
      subject,
      lastMessage: initialMessage,
      lastMessageAt: new Date().toISOString(),
      messageCount: 1,
      isRead: true,
      hasUnread: false
    };
    
    messagesData.push(newConversation);
    return { ...newConversation };
  }
};