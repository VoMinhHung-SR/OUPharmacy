// it will return a user Id (recipient message in room chat) not current user
export const getRecipientId = (member ,currentUserId) => member.find(userId => userId !== currentUserId)

