import { useState } from "react"

function CommentSmall({ isClosed }) {
  const [text, setText] = useState("")
  const [comments, setComments] = useState([
    { name: "Sara", time: "2h ago", avatar: "👩‍🦱", msg: "Great point — this really clarifies the update!" },
    { name: "Leo", time: "4h ago", avatar: "👦", msg: "Thanks for the details, very helpful." },
  ])

  const add = () => {
    if (!text.trim()) return
    setComments([...comments, { name: "You", time: "now", avatar: "😊", msg: text }])
    setText("")
  }

  return (
    <div onClick={isClosed} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[999] p-4">
      <div onClick={e => e.stopPropagation()} className="bg-white w-[360px] rounded-[24px] border border-gray-200 shadow-xl p-5">

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-[16px]">
            <span className="text-blue-500">💬</span> Comments
          </div>
          <span className="text-gray-400 text-sm">({comments.length})</span>
        </div>

        <div className="py-4 flex flex-col gap-5 max-h-[300px] overflow-y-auto">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xl">{c.avatar}</span>
                  <span className="font-bold text-[14px]">{c.name}</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="text-gray-500 text-[13px]">{c.time}</span>
                </div>
                <p className="text-[14px] mt-1 leading-snug text-gray-800">{c.msg}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 items-center pt-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <span className="text-gray-400 text-xl">☺</span>
            <input value={text} onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && add()}
              placeholder="Add a comment..."
              className="bg-transparent flex-1 outline-none text-[14px]"
            />
          </div>
          <button onClick={add} className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center text-white transition">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentSmall