import { useEffect, useState } from "react";
import { Container, Loading, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [postLength, setPostLength] = useState();
  const [loading, setloading] = useState(true);

  const Posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (Posts) {
      setPostLength(Posts.length);
      setPosts(Posts);
    }
    setloading(false);
  }, [Posts]);

  return !loading ? (
    postLength > 0 ? (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    ) : (
      /* <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-black hover:text-gray-500">
                No Posts Availabel, Create new posts ....
              </h1>
            </div>
          </div>
        </Container>
      </div> */ <Loading />
    )
  ) : null;

  /*  if (loading) {
    return <Loading />;
  }

  return !loading && postLength > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold text-black hover:text-gray-500">
              No Posts Availabel, Create new posts ....
            </h1>
          </div>
        </div>
      </Container>
    </div>
  ); */
}

export default AllPosts;
