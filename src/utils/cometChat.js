import { CometChat } from "@cometchat-pro/chat";

// Khởi tạo CometChat với thông tin động
export const initCometChat = (appID, region) => {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  return CometChat.init(appID, appSetting).then(
    () => console.log("CometChat khởi tạo thành công!"),
    (error) => console.log("Lỗi khởi tạo:", error)
  );
};

// Đăng nhập với authToken từ API
export const loginCometChat = (authToken) => {
  return CometChat.login(authToken).then(
    (user) => {
      console.log("Đăng nhập thành công:", user);
      return user;
    },
    (error) => {
      console.log("Lỗi đăng nhập:", error);
      throw error;
    }
  );
};

// Lấy danh sách người dùng
export const getUsers = (limit = 10, searchKey = "") => {
  const usersRequest = new CometChat.UsersRequestBuilder()
    .setLimit(limit)
    .setSearchKeyword(searchKey)
    .build();
  return usersRequest.fetchNext();
};

// Gửi tin nhắn
export const sendMessage = (
  receiverID,
  messageText,
  receiverType = CometChat.RECEIVER_TYPE.USER
) => {
  const textMessage = new CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );
  return CometChat.sendMessage(textMessage);
};

// Lấy tin nhắn
export const getMessages = (uid, limit = 50) => {
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(uid)
    .setLimit(limit)
    .build();
  return messagesRequest.fetchPrevious();
};

// Thêm listener để nhận tin nhắn thời gian thực
export const addMessageListener = (listenerID, onTextMessageReceived) => {
  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived,
    })
  );
};

// Xóa listener
export const removeMessageListener = (listenerID) => {
  CometChat.removeMessageListener(listenerID);
};