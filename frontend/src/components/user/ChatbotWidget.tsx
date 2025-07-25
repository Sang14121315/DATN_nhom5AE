import React, { useEffect, useRef, useState } from "react";
import { fetchConversation, sendMessage, Message } from "@/api/user/messageAPI";
import { User } from "@/api/user/userAPI";

// Giả sử bạn đã có user hiện tại từ localStorage hoặc context
const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

const adminId = "admin"; // Nếu muốn lấy động, có thể fetch từ API /api/admins

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  // Lấy lịch sử chat khi mở chat
  useEffect(() => {
    if (open && currentUser) {
      setLoading(true);
      fetchConversation(adminId)
        .then(setMessages)
        .finally(() => setLoading(false));
    }
  }, [open, currentUser]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || !currentUser) return;
    setLoading(true);
    try {
      const msg = await sendMessage(adminId, input);
      setMessages((prev) => [...prev, msg]);
      setInput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Icon Chatbot */}
      {!open && (
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          <img
            src="/assets/robot_icon.png"
            alt="Chatbot"
            style={{ width: 40, height: 40 }}
          />
        </div>
      )}

      {/* Chatbox */}
      {open && (
        <div
          style={{
            width: 350,
            height: 450,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#f5ba09",
              color: "#fff",
              padding: "12px 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>5AE</span>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
              <img
                src="/assets/robot_icon.png"
                alt="Chatbot"
                style={{ width: 32, height: 32, marginRight: 8 }}
              />
              <div
                style={{
                  background: "#f1f1f1",
                  borderRadius: 8,
                  padding: "8px 12px",
                  maxWidth: "80%",
                }}
              >
                Xin chào!. Bạn cần tìm hiểu về sản phẩm, giá cả hay cần tư vấn chọn máy? Hãy nhắn cho tôi, tôi luôn sẵn sàng hỗ trợ bạn!
              </div>
            </div>
            {/* Lịch sử chat */}
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              {loading && <div>Đang tải...</div>}
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: m.sender_id === (currentUser?._id || "") ? "right" : "left",
                    margin: "8px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: m.sender_id === (currentUser?._id || "") ? "#f5ba09" : "#f1f1f1",
                      color: m.sender_id === (currentUser?._id || "") ? "#fff" : "#333",
                      borderRadius: 8,
                      padding: "8px 12px",
                      maxWidth: "70%",
                    }}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div style={{ padding: 12, borderTop: "1px solid #eee" }}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              style={{
                width: "80%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
                marginRight: 8,
              }}
              disabled={loading}
            />
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: "#f5ba09",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget; 