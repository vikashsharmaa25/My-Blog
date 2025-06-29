"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { addBlug, getBlogById, updateBlug } from "@/apis/all-apis";
import { useParams } from "next/navigation";
import { handleError, handleSuccess } from "@/utils/response-handler";
import JoditTextEditor from "@/components/QuillEditor";

function AddBlog({ categoryData }: any) {
  const { id } = useParams();
  const blogId = id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const response = await getBlogById(blogId);
        const blog = response?.blog;
        console.log("blog", blog);
        setTitle(blog?.title ?? "");
        setContent(blog?.content ?? "");
        setCategory(blog?.category?._id ?? "");
        setTags(blog?.tags ?? []);
        setIsPublished(!!blog?.isPublished);
        setIsFeatured(!!blog?.isfeatured);
        if (blog?.blogImage) {
          setPreviewUrl(blog?.blogImage[0]?.url);
        }
      } catch (err) {
        handleError(err);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    formData.append("isPublished", String(isPublished));
    formData.append("isfeatured", String(isFeatured));
    if (selectedFile) {
      formData.append("blogImage", selectedFile);
    }

    try {
      if (blogId) {
        const response = await updateBlug(formData, blogId);
        handleSuccess(response?.message);
      } else {
        const response = await addBlug(formData);
        handleSuccess(response?.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Add New Blog</h2>
        <FormControlLabel
          control={
            <Switch
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              color="primary"
            />
          }
          label="Feature"
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              placeholder="Enter blog title"
              value={title ?? ""}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Category"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryData?.categories?.map((cat: any) => (
                <MenuItem key={cat?._id} value={cat?._id}>
                  {cat?.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleFileUpload}
              />
              {previewUrl ? (
                <img
                  src={previewUrl || ""}
                  alt="Preview"
                  className="mx-auto h-72 object-cover rounded-lg"
                />
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Plus className="h-full w-full" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-emerald-600 hover:text-emerald-500">
                      Click to upload
                    </span>
                    or drag and drop
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <JoditTextEditor value={content} onChange={setContent} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags ?? []}
              onChange={(event, newValue) => setTags(newValue)}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.map((option, index) => (
                    <Chip
                      key={option}
                      label={option}
                      variant="outlined"
                      onDelete={() =>
                        setTags((prev) => prev.filter((_, i) => i !== index))
                      }
                    />
                  ))}
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Enter tags"
                />
              )}
            />
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Status"
              value={isPublished ? "Published" : "Draft"}
              onChange={(e) => setIsPublished(e.target.value === "Published")}
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </TextField>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              variant="outlined"
              disabled={loading || !title || !content || !category}
            >
              {loading
                ? "Processing..."
                : blogId
                ? "Update Blog"
                : "Publish Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
