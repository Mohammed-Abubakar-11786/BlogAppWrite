import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DbServices from "../appwrite/DBConfig";
import { Container, Button } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { updateStorePosts } from "../store/postSlice";

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); /* 
  const [userData, setUserData] = useState(null); */
  const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const isAuthor = post && userStatus ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      DbServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  let DeletePost = async () => {
    let fileID = post.featuredImage;
    let status = DbServices.deletePost(post.$id);
    if (status) {
      DbServices.deleteFile(fileID).then(() => {
        DbServices.getPosts().then((posts) => {
          if (posts) {
            dispatch(updateStorePosts({ posts: posts.documents }));
          }
        });
        navigate("/");
      });
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={DbServices.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor ? (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={DeletePost}>
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <div className="w-full mb-6">
          <h1>{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : (
    <div>Post Not Present</div>
  );
}

export default Post;
