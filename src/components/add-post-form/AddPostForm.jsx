/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { Input, RTE, Select, Button } from "../index";
import DbServices from "../../appwrite/DBConfig";
import { updateStorePosts } from "../../store/postSlice";

function AddPostForm({ post }) {
  let dispatch = useDispatch();
  let ActualUserData = useSelector((state) => state.auth.userData);

  let navigate = useNavigate();
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        status: post?.status || "active",
        content: post?.content || "",
      },
    });

  let prevSlug = post?.$id;
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await DbServices.uploadFile(data.image[0])
        : null;

      if (file) {
        await DbServices.deleteFile(post.featuredImage);
      }
      const updatedPost = await DbServices.updatePost(prevSlug, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (updatedPost) {
        DbServices.getPosts().then((posts) => {
          if (posts) {
            dispatch(updateStorePosts({ posts: posts.documents }));
          }
        });
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await DbServices.uploadFile(data.image[0])
        : null;

      if (file && ActualUserData) {
        data.featuredImage = file.$id;
        const newPost = await DbServices.creatPost({
          ...data,
          userID: ActualUserData.$id,
        });

        if (newPost) {
          DbServices.getPosts().then((posts) => {
            if (posts) {
              dispatch(updateStorePosts({ posts: posts.documents }));
            }
          });
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && (post?.$id ? false : true)) {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Enter Title"
            className="mb-4"
            required={true}
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Enter Slug"
            className="mb-4"
            disabled={post?.$id ? true : false}
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.target.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            name="content"
            label="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="FeaturedImage"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="mb-4"
            {...register("image", { required: !post })}
            required={!post}
          />
          {post && (
            <img
              className="rounded-lg"
              src={DbServices.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          )}

          <Select
            label="Select Status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            className="w-full"
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
          >
            {post ? "Update" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddPostForm;
