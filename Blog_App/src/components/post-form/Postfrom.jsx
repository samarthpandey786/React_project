import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, styleEffect } from "framer-motion"; 
import { Input, Select, RTE } from "../index";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/conf";

function Postform({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userData);

  // 🖼️ Local preview state
  const [preview, setPreview] = useState(null);
  const imageFile = watch("image");

  // Generate preview when file is selected
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }
      const DBpost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (DBpost) {
        navigate(`/post/${DBpost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const DBPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userdata.$id,
        });
        if (DBPost) {
          navigate(`/post/${DBPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, { shouldValidate: true })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <motion.form
      onSubmit={handleSubmit(submit)}
      className="max-w-5xl mx-auto bg-gradient-to-br from-gray-400 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-8 flex flex-wrap gap-6 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left section */}
      <div className="w-full md:w-2/3 space-y-6">
        <Input
          label="Title"
          placeholder="Enter post title..."
          className="rounded-xl bg-gray-800 border border-gray-600 text-black"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Unique slug..."
          className="rounded-xl bg-gray-800 border border-gray-600 text-black"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="rounded-xl bg-gray-800 border border-gray-600 text-black"
        />
      </div>

      {/* Right section */}
      <div className="w-full md:w-1/3 space-y-6">
        <div>
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="rounded-xl bg-gray-800 border border-gray-600 text-black"
            {...register("image", { required: !post })}
          />

          {/* Show preview beside input */}
          {preview && (
            <motion.img
              src={preview}
              alt="Preview"
              className="mt-3 w-28 h-28 object-cover rounded-lg border border-gray-600 shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Existing post image */}
        {post && !preview && (
          <div className="w-full">
            <img
              src={appwriteService.previewfile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl shadow-md w-28 h-28 object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="rounded-xl bg-gray-800 border border-gray-600 text-black"
          {...register("status", { required: true })}
        />

        {/* Animated Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: "#4ade80" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full py-3 rounded-xl font-semibold text-white 
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
          shadow-lg shadow-purple-800/30"
        >
          {post ? "Update Post" : "Submit Post"}
        </motion.button>
      </div>
    </motion.form>
  );
}

export default Postform;
