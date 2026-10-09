function Dashboard() {
  const cardData =[
    {title: "Total Products", number: "24", bottom: "+4 this week", arrow: "⌃"},
    {title: "In Stock", number: "18", bottom: "75% available"},
    {title: "Low Stock", number: "3", bottom: "-2 from last week"}
  ]
  return (
    <div className="min-h-screen bg-[#121216] text-white">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[27px] font-bold tracking-tight">Product Dashboard</h1>
        </div>

        <div className="flex w-[300px] flex-col gap-2">
          <label className="flex h-[30px] items-center rounded-md border border-[#8b6d2c] bg-[#17171c] px-3">
            <span className="mr-2 text-[13px] text-yellow-300">⌕</span>
            <input
              aria-label="Search products"
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent text-[11px] text-white placeholder:text-gray-400 outline-none"
            />
          </label>

          <select
            aria-label="Filter products by category"
            className="h-[30px] rounded-md border border-[#777777] bg-[#19191e] px-3 text-[11px] text-gray-300 outline-none"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Accessories</option>
          </select>

          <button className="flex h-[30px] items-center justify-center rounded-md bg-yellow-300 text-[12px] font-bold text-black hover:shadow-[0_0_18px_rgba(255,224,80,0.25)]">
            ＋ Add Product
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            number={card.number}
            bottom={card.bottom}
            arrow={card.arrow}
          />
        ))}
      </div>
    </div>
  );
}

function DashboardCard({ title, number, bottom, arrow }) {
  return (
    <div className="relative h-[102px] rounded-lg border border-[#383841] border-t-2 border-t-[#d4a934] bg-[#1b1b20] px-4 py-3 shadow-[0_5px_15px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
      <p className="text-[12px] font-medium text-gray-300">{title}</p>
      <p className="mt-1 text-[27px] font-bold leading-none text-white">{number}</p>
      <p className="mt-2 text-[12px] font-semibold text-yellow-300">
        {bottom}
        {arrow && <span className="ml-1 text-[16px]">{arrow}</span>}
      </p>
    </div>
  );
}

export default Dashboard;
