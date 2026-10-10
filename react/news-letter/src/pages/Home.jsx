import TopStory from "../components/TopStory";

function Home({ setShowComment }) {
  return (
    <div>
      <TopStory setShowComment={setShowComment} />
    </div>
  )
}
export default Home