"use client";

import { useState, useEffect } from "react";
import {
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategoryById,
} from "@/apis/all-apis";
import { Button } from "@mui/material";
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
      });
      setCategories([...categories, response.category]);
      setNewCategoryName("");
      setNewCategoryDescription("");
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
        { name: editCategoryName, description: editCategoryDescription },
        editingCategoryId
      );
      const updatedCategories = categories.map((category) =>
        category._id === editingCategoryId ? response.category : category
      );
      setCategories(updatedCategories);
      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryDescription("");
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
          <h2 className="text-2xl font-bold text-gray-900">
            Manage Categories
          </h2>
          {/* <button
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            onClick={() => setEditingCategoryId(null)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Category Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCategoryId ? "Edit Category" : "Add New Category"}
            </h3>
            <form
              className="space-y-4"
              onSubmit={
                editingCategoryId ? handleUpdateCategory : handleAddCategory
              }
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter category name"
                  value={editingCategoryId ? editCategoryName : newCategoryName}
                  onChange={(e) =>
                    editingCategoryId
                      ? setEditCategoryName(e.target.value)
                      : setNewCategoryName(e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter category description"
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
                ></textarea>
              </div>
              <Button
                type="submit"
                variant="outlined"
                disabled={
                  loading || !newCategoryName || !newCategoryDescription
                }
                className="w-full"
              >
                {loading
                  ? "Processing..."
                  : editingCategoryId
                  ? "Update Category"
                  : "Add Category"}
              </Button>
            </form>
          </div>

          {/* Categories List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Existing Categories
            </h3>
            <div className="space-y-3">
              {categories.map((category: any) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${category.color}`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      className="action-btn"
                      onClick={() => {
                        setEditingCategoryId(category._id);
                        setEditCategoryName(category.name);
                        setEditCategoryDescription(category.description);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      className="action-btn hover:text-red-700"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;
