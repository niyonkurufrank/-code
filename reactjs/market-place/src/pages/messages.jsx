import { useMemo, useState } from "react";

const starterChats = [
	{ id: 1, name: "Aline Uwase", initials: "AU", color: "#d88e74", online: true, messages: [{ text: "Muraho! Amakuru?", time: "09:40", mine: false }, { text: "Ni meza, wowe se?", time: "09:42", mine: true }, { text: "Ndi mu nzira, ndaza kuhagera vuba 😊", time: "09:44", mine: false }] },
	{ id: 2, name: "Jean Claude", initials: "JC", color: "#698c72", messages: [{ text: "Wabonye amafoto nakohereje?", time: "08:15", mine: false }, { text: "Yego, ni meza cyane!", time: "08:19", mine: true }] },
	{ id: 3, name: "Umuryango ❤️", initials: "❤️", color: "#aa7893", messages: [{ text: "Mama: Murakoze mwese!", time: "Ejo", mine: false }] },
	{ id: 4, name: "Eric N.", initials: "EN", color: "#728bad", messages: [{ text: "Tuzabonana ejo saa yine.", time: "Ejo", mine: false }] },
];

const css = `
*{box-sizing:border-box}.messages-page{min-height:100vh;padding:24px;display:grid;place-items:center;background:#dce5e2;color:#26332f;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}.messenger{width:min(1100px,100%);height:min(740px,calc(100vh - 48px));min-height:480px;display:grid;grid-template-columns:340px 1fr;overflow:hidden;background:#fff;border-radius:14px;box-shadow:0 18px 60px #253d3429}.sidebar{display:flex;flex-direction:column;border-right:1px solid #e9eeeb;min-width:0}.topbar{height:68px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;background:#f7f9f8}.brand{display:flex;align-items:center;gap:10px;font-weight:700}.brand-mark{width:34px;height:34px;display:grid;place-items:center;border-radius:50%;background:#168b70;color:white}.icon-button{width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:#64736d;cursor:pointer;font-size:19px}.icon-button:hover{background:#e9efec}.search-wrap{padding:12px 15px}.search{height:40px;padding:0 12px;display:flex;align-items:center;gap:9px;border-radius:9px;background:#f2f5f3;color:#82908a}.search input{width:100%;border:0;outline:0;background:transparent;font:inherit;font-size:12px}.chat-list{overflow-y:auto}.chat-row{width:100%;padding:13px 15px;display:flex;align-items:center;gap:12px;text-align:left;border:0;border-top:1px solid #f0f2f1;background:#fff;color:inherit;cursor:pointer}.chat-row:hover,.chat-row.selected{background:#f2f7f5}.avatar{position:relative;flex:0 0 46px;height:46px;display:grid;place-items:center;border-radius:50%;color:white;font-weight:650;font-size:14px}.online-dot{position:absolute;right:0;bottom:1px;width:11px;height:11px;border:2px solid white;border-radius:50%;background:#32b77b}.chat-copy{min-width:0;flex:1}.chat-line{display:flex;justify-content:space-between;gap:8px}.chat-name{font-size:14px;font-weight:650}.chat-time{color:#84918b;font-size:11px;white-space:nowrap}.preview{display:block;overflow:hidden;margin-top:5px;color:#77847e;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.conversation{min-width:0;display:flex;flex-direction:column}.conversation-head{height:68px;padding:0 20px;display:flex;align-items:center;gap:12px;background:#f7f9f8;border-bottom:1px solid #e9eeeb}.conversation-head .avatar{width:42px;height:42px;flex-basis:42px}.person-name{font-size:14px;font-weight:650}.person-status{margin-top:3px;color:#82908a;font-size:11px}.head-actions{display:flex;gap:6px;margin-left:auto}.thread{flex:1;overflow-y:auto;padding:24px clamp(16px,5vw,60px);background-color:#edf2ef;background-image:radial-gradient(#dce5df .7px,transparent .7px);background-size:16px 16px}.date-chip{width:max-content;margin:0 auto 20px;padding:6px 12px;border-radius:8px;background:white;color:#738079;font-size:11px}.bubble-row{display:flex;margin:9px 0}.bubble-row.mine{justify-content:flex-end}.bubble{max-width:min(75%,440px);padding:10px 12px 7px;border-radius:4px 12px 12px 12px;background:white;box-shadow:0 1px 2px #1f332b14;font-size:13px;line-height:1.45;overflow-wrap:anywhere}.mine .bubble{border-radius:12px 4px 12px 12px;background:#d8f3e5}.bubble-meta{margin-top:4px;display:flex;justify-content:flex-end;gap:5px;color:#82908a;font-size:10px}.ticks{color:#168b70;font-weight:700}.composer{padding:13px 18px;display:flex;align-items:center;gap:9px;background:#f7f9f8}.composer input{min-width:0;flex:1;height:43px;padding:0 15px;border:0;outline:0;border-radius:10px;background:white;font:inherit;font-size:13px}.send-button{width:42px;height:42px;border:0;border-radius:50%;background:#168b70;color:white;cursor:pointer;font-size:17px}.send-button:hover{background:#11785f}.empty{padding:24px;color:#82908a;text-align:center}.back-button{display:none!important}@media(max-width:680px){.messages-page{padding:0;min-height:100dvh}.messenger{height:100dvh;min-height:0;border-radius:0;grid-template-columns:1fr}.messenger.show-chat .sidebar{display:none}.messenger.show-chat .conversation{display:flex}.messenger:not(.show-chat) .conversation{display:none}.back-button{display:inline-grid!important;place-items:center}}
`;

export default function Messages() {
	const [chats, setChats] = useState(starterChats);
	const [activeId, setActiveId] = useState(starterChats[0].id);
	const [query, setQuery] = useState("");
	const [draft, setDraft] = useState("");
	const [mobileChatOpen, setMobileChatOpen] = useState(false);
	const activeChat = chats.find((chat) => chat.id === activeId);
	const visibleChats = useMemo(() => chats.filter((chat) => chat.name.toLowerCase().includes(query.toLowerCase())), [chats, query]);

	function sendMessage(event) {
		event.preventDefault();
		const text = draft.trim();
		if (!text || !activeChat) return;
		const time = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit" }).format(new Date());
		setChats((current) => current.map((chat) => chat.id === activeId ? { ...chat, messages: [...chat.messages, { text, time, mine: true }] } : chat));
		setDraft("");
	}

	return <>
		<style>{css}</style>
		<main className="messages-page"><section className={`messenger${mobileChatOpen ? " show-chat" : ""}`} aria-label="Ubutumwa">
			<aside className="sidebar">
				<div className="sidebar-content">
				<header className="topbar"><div className="brand"><span className="brand-mark">✉</span> Ubutumwa</div><button className="icon-button" type="button" aria-label="Ikiganiro gishya" onClick={() => { setActiveId(starterChats[0].id); setMobileChatOpen(true); }}>＋</button></header>
				<div className="search-wrap"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Shakisha ikiganiro..." /></label></div>
				<div className="chat-list">{visibleChats.map((chat) => {
					const last = chat.messages[chat.messages.length - 1];
					return <button className={`chat-row${activeId === chat.id ? " selected" : ""}`} key={chat.id} type="button" onClick={() => { setActiveId(chat.id); setMobileChatOpen(true); }}>
						<span className="avatar" style={{ background: chat.color }}>{chat.initials}{chat.online && <i className="online-dot" />}</span>
						<span className="chat-copy"><span className="chat-line"><span className="chat-name">{chat.name}</span><span className="chat-time">{last?.time}</span></span><span className="preview">{last?.mine ? "Wowe: " : ""}{last?.text}</span></span>
					</button>;
				})}{visibleChats.length === 0 && <div className="empty">Nta biganiro bihari.</div>}</div>
				</div>
			</aside>
			<section className="conversation" aria-label={activeChat ? `Ikiganiro na ${activeChat.name}` : "Ikiganiro"}>
				{activeChat ? <>
					<header className="conversation-head"><button className="icon-button back-button" type="button" aria-label="Subira" onClick={() => setMobileChatOpen(false)}>‹</button><span className="avatar" style={{ background: activeChat.color }}>{activeChat.initials}{activeChat.online && <i className="online-dot" />}</span><div><div className="person-name">{activeChat.name}</div><div className="person-status">{activeChat.online ? "Ari kuri murandasi" : "Ubutumwa bwite"}</div></div><div className="head-actions"><button className="icon-button" type="button" aria-label="Hamagara">☎</button><button className="icon-button" type="button" aria-label="Ibindi">⋮</button></div></header>
					<div className="thread"><div className="date-chip">UYU MUNSI</div>{activeChat.messages.map((message, index) => <div className={`bubble-row${message.mine ? " mine" : ""}`} key={`${index}-${message.time}`}><div className="bubble">{message.text}<div className="bubble-meta">{message.time}{message.mine && <span className="ticks">✓✓</span>}</div></div></div>)}</div>
					<form className="composer" onSubmit={sendMessage}><button className="icon-button" type="button" aria-label="Emoji">☺</button><input aria-label="Andika ubutumwa" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Andika ubutumwa..." /><button className="send-button" type="submit" aria-label="Ohereza">➤</button></form>
				</> : <div className="empty">Hitamo ikiganiro kugira ngo utangire kuganira.</div>}
			</section>
		</section></main>
	</>;
}
