"use client";

import { useState, useEffect } from "react";
import {
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategoryById,
} from "@/apis/all-apis";
import { Button, TextField, Paper, Typography, Chip, Stack, IconButton, Avatar, Box } from "@mui/material";
import { Edit, Plus, Trash2 } from "lucide-react";
import { handleError, handleSuccess } from "@/utils/response-handler";

function CategoryManagement({ categoryData }: any) {
  const [categories, setCategories] = useState<any[]>(
    categoryData?.categories || []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDescription, setEditCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!categoryData?.categories) {
      const fetchCategories = async () => {
        try {
          const response = await getCategoryById("");
          setCategories(response.categories);
        } catch (err) {
          // console.error("Failed to fetch categories:", err);
        }
      };

      fetchCategories();
    }
  }, [categoryData]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!newCategoryName || !newCategoryDescription) return;

    try {
      const response = await addCategory({
        name: newCategoryName,
        description: newCategoryDescription,
        categoryImage: selectedFile as any,
      });
      setCategories([...categories, response.category]);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setSelectedFile(null);
      setPreviewUrl("");
      handleSuccess(response?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!editingCategoryId || !editCategoryName || !editCategoryDescription)
      return;

    try {
      const response = await updateCategory(
        {
          name: editCategoryName,
          description: editCategoryDescription,
          ...(selectedFile ? { categoryImage: selectedFile as any } : {}),
        },
        editingCategoryId
      );
      const updatedCategories = categories.map((category) =>
        category._id === editingCategoryId ? response.category : category
      );
      setCategories(updatedCategories);
      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryDescription("");
      setSelectedFile(null);
      setPreviewUrl("");
      handleSuccess(response?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteCategoryById(id);
      if (response.success === true) {
        setCategories(categories.filter((category) => category._id !== id));
        handleSuccess(response?.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Typography variant="h5" fontWeight={700} color="primary.main">
            Manage Categories
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Category Form */}
          <Paper variant="outlined" className="p-6" sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6" mb={2} color="primary.main">
              {editingCategoryId ? "Edit Category" : "Add New Category"}
            </Typography>
            <form
              className="space-y-4"
              onSubmit={
                editingCategoryId ? handleUpdateCategory : handleAddCategory
              }
            >
              {/* Image Uploader */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Category Image
                </Typography>
                <Box
                  sx={{
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    bgcolor: 'grey.50',
                  }}
                  onClick={() => document.getElementById('catFileInput')?.click()}
                >
                  <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                    {previewUrl ? (
                      <img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </Avatar>
                  <div>
                    <Typography variant="body2" color="text.primary" fontWeight={600}>
                      {selectedFile ? selectedFile.name : 'Click to upload'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      JPG or PNG up to 5MB
                    </Typography>
                  </div>
                  <input
                    id="catFileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedFile(file);
                      setPreviewUrl(file ? URL.createObjectURL(file) : "");
                    }}
                  />
                </Box>
              </Box>
              <TextField
                fullWidth
                label="Category Name"
                value={editingCategoryId ? editCategoryName : newCategoryName}
                onChange={(e) =>
                  editingCategoryId
                    ? setEditCategoryName(e.target.value)
                    : setNewCategoryName(e.target.value)
                }
                variant="outlined"
                size="small"
                margin="dense"
                color="primary"
                
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                size="small"
                margin="dense"
                color="primary"
                multiline
                rows={3}
                value={
                  editingCategoryId
                    ? editCategoryDescription
                    : newCategoryDescription
                }
                onChange={(e) =>
                  editingCategoryId
                    ? setEditCategoryDescription(e.target.value)
                    : setNewCategoryDescription(e.target.value)
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || (!editingCategoryId && (!newCategoryName || !newCategoryDescription))}
                className="btn primary_button w-full"
              >
                {loading
                  ? "Processing..."
                  : editingCategoryId
                  ? "Update Category"
                  : "Add Category"}
              </Button>
            </form>
          </Paper>

          {/* Categories List */}
          <Paper variant="outlined" className="p-6" sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6" mb={2} color="primary.main">
              Existing Categories
            </Typography>
            <Stack spacing={1.5}>
              {categories.map((category: any) => (
                <Paper key={category._id} variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar variant="rounded" sx={{ width: 36, height: 36 }}>
                        {category?.categoryImage?.url ? (
                          <img src={category.categoryImage.url} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          category.name.charAt(0)
                        )}
                      </Avatar>
                      <Chip label={category.name} size="small" color="primary" variant="outlined" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditingCategoryId(category._id);
                          setEditCategoryName(category.name);
                          setEditCategoryDescription(category.description);
                          setSelectedFile(null);
                          setPreviewUrl(category?.categoryImage?.url || "");
                        }}
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </div>
                  </div>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;
