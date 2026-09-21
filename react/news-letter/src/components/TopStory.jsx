import { FaRegThumbsUp, FaRegThumbsDown, FaRegComment, FaDownload } from "react-icons/fa";

function TopStory() {

    const mainStories = [
        { id: 1,
          title: "Top Story 1", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnvtH_D3zLOSBZ7oCfCPMtHSRdg6AYGFKqk73BpYRKpA&s" },
        { id: 2, 
          title: "Top Story 2", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SbAlIQRyrITHyH50h6KfbSeGvDl7S5GkvOhVYbZL5A&s=10"},
        { id: 3, 
          title: "Top Story 3", 
          image: "https://storiesfromthetop.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-24-at-2.58.43-PM.png" },
    ];


  const smallStories = [
    {
      id: 1,
      title: "i like to eat apples and bananas",
      likes: 100, dislikes: 10, comments: 20,
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400"
    },
    {
      id: 2,
      title: "i like to eat apples and bananas",
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"
    },
    {
      id: 3,
      title: "i like to eat apples and bananas",
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400"
    },
    {
      id: 4,
      title: "i like to eat apples and bananas",
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400"
    },
    {
      id: 5,
      title: "i like to eat apples and bananas",
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400"
    },
    {
      id: 6,
      title: "i like to eat apples and bananas",
      description: "my name is niyonkuru frank and i wanna tell you something from wwhat i know in the days spend in this world",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex bg-white rounded-lg shadow-md p-6">
        
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <h2 className="text-gray-500 font-bold text-sm mb-4">TOP STORY</h2>
          {mainStories.map((story) => (
            <div key={story.id} className="flex-col cursor-pointer">
              <img src={story.image} className="w-80 h-46 rounded-md object-cover mb-2"/>
              <h3 className="font-bold text-lg text-gray-900">{story.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 border-t pt-4">
          {smallStories.map((story) => (
            <div key={story.id} className="gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <img src={story.image} className="w-44 h-26 rounded-md object-cover"/>
              <h1 className="font-bold text-lg text-gray-900">{story.title}</h1>
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                <span className="flex items-center gap-1"><FaRegThumbsUp /> {story.likes}</span>
                <span className="flex items-center gap-1"><FaRegThumbsDown /> {story.dislikes}</span>
                <span className="flex items-center gap-1"><FaRegComment /> {story.comments}</span>
                <FaDownload className="flex items-center gap-1 cursor-pointer hover:text-blue-600" title="Download" />
              </div>
              <p className="text-sm text-gray-700 font-semibold">{story.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
export default TopStory