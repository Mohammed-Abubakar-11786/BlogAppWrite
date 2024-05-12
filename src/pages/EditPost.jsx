import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DbServices from "../appwrite/DBConfig";
import { Container, AddPostForm } from "../components/index";

function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  let { slug } = useParams();

  useEffect(() => {
    if (slug) {
      DbServices.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <AddPostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
