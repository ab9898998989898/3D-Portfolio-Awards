"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Greetings! I'm Nex. Ask me anything about Abdullah's work." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (chatRef.current) {
            if (isOpen) {
                gsap.fromTo(chatRef.current,
                    { scale: 0.8, opacity: 0, y: 20 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
                );
            }
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();
            if (data.reply) {
                setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: "bot", text: "I couldn't process that. Please try again." }]);
                console.error("Unknown response format:", data);
            }
        } catch (error) {
            console.error("CRASH REPORT:", error);
            setMessages(prev => [...prev, { role: "bot", text: "Connection error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-[350px] h-[500px] flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden mb-4"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/20 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500">
                                <Icon icon="lucide:bot" fontSize={18} className="text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-white">Nex AI</h3>
                                <span className="text-xs text-cyan-500 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                    Online
                                </span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                            <Icon icon="lucide:x" fontSize={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-cyan-500/20 text-white ml-auto border border-cyan-500/30 rounded-br-none" : "bg-white/10 text-gray-200 mr-auto border border-white/10 rounded-bl-none"}`}
                            >
                                {msg.text.split("**").map((part, i) =>
                                    i % 2 === 1 ? <strong key={i} className="text-cyan-500">{part}</strong> : part
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-white/10 text-gray-200 mr-auto border border-white/10 p-3 rounded-lg rounded-bl-none w-16 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/20 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask about Abdullah..."
                            className="flex-1 bg-transparent border border-white/30 rounded-full px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                        />
                        <button onClick={sendMessage} className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors w-10 h-10 p-0 flex items-center justify-center text-white cursor-pointer">
                            <Icon icon="lucide:send" fontSize={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:bg-white transition-all hover:scale-110 cursor-pointer"
                >
                    <Icon icon="lucide:message-square" fontSize={24} />
                </button>
            )}
        </div>
    );
}
