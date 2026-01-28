import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Tag,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import ConfirmModal from '../../components/common/ConfirmModal';
import CategoryService from '../../services/CategoryService'; 
import ActionDropdown from '../../components/types/ActionDropdown';
import { toast } from 'react-toastify';
import type { GetCategoryResponse } from '../../types/Category';

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<GetCategoryResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching categories...");
      const response = await CategoryService.getCategories();
      
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      
      // ✅ Xử lý nhiều cấu trúc response
      let categoriesData: GetCategoryResponse[] = [];
      
      if (response && response.data) {
        const data = response.data;
        
        // Trường hợp 1: { status: "SUCCESS", payload: [...] }
        if (data.payload && Array.isArray(data.payload)) {
          categoriesData = data.payload;
          console.log("Structure 1: payload array");
        }
        // Trường hợp 2: { status: "SUCCESS", data: { payload: [...] } }
        else if (data.data?.payload && Array.isArray(data.data.payload)) {
          categoriesData = data.data.payload;
          console.log("Structure 2: data.payload array");
        }
        // Trường hợp 3: { data: [...] }
        else if (data.data && Array.isArray(data.data)) {
          categoriesData = data.data;
          console.log("Structure 3: data array");
        }
        // Trường hợp 4: Direct array
        else if (Array.isArray(data)) {
          categoriesData = data;
          console.log("Structure 4: direct array");
        }
        // Trường hợp 5: Error response
        else if (data.status === "ERROR") {
          const errorMsg = data.error?.details || "Lỗi không xác định";
          console.error("Backend Error:", data.error);
          toast.error(`Lỗi: ${errorMsg}`);
          setCategories([]);
          return;
        }
      }
      
      console.log("Categories loaded:", categoriesData.length, "items");
      console.log("Categories:", categoriesData);
      
      setCategories(categoriesData);
      
      if (categoriesData.length === 0) {
        toast.info("Chưa có danh mục nào");
      }
      
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      console.error("Error Response:", error.response?.data);
      console.error("Status Code:", error.response?.status);
      
      // Xử lý lỗi chi tiết
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 401) {
          toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          // navigate('/login'); // Uncomment nếu có useNavigate
          return;
        }
        
        if (status === 403) {
          toast.error("Bạn không có quyền truy cập");
          return;
        }
        
        if (status === 500) {
          const errorMsg = errorData?.error?.details 
            || errorData?.message 
            || "Lỗi server. Vui lòng kiểm tra backend.";
          toast.error(errorMsg);
        } else {
          toast.error("Không thể tải danh sách danh mục.");
        }
      } else if (error.request) {
        toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối.");
      } else {
        toast.error(error.message || "Đã xảy ra lỗi không xác định");
      }
      
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter categories based on search term and status
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    // Add status filter logic here if your API returns status
    // const matchesStatus = statusFilter === "all" || category.status === statusFilter;
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    setSubmitting(true);
    try {
      // TODO: Implement delete API when available
      // await CategoryService.deleteCategory(selectedCategory.categoryId);
      
      toast.success("Xóa danh mục thành công!");
      
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c.categoryId !== selectedCategory.categoryId)
      );

      setShowDeleteConfirm(false);
      setSelectedCategory(null);
      
      await fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.message || "Xóa danh mục thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 from-orange-600 to-orange-700 bg-gradient-to-r text-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-white-900">Danh sách danh mục</h1>
        <p className="text-white-600 mt-1">Quản lý danh mục sản phẩm</p>
      </div>

      {/* Search, Filter & Add Button Container */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 flex-1 min-w-0">
            <Search size={20} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 min-w-[200px]">
            <Filter size={20} className="text-gray-400 flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700 cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => toast.info("Chức năng đang phát triển")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-2.5 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-md hover:shadow-lg font-medium whitespace-nowrap"
          >
            <Plus size={20} />
            Thêm danh mục
          </button>
        </div>

        {/* Stats Info */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            {/* <span>
              Tổng số: <span className="font-semibold text-gray-900">{categories.length}</span> danh mục
            </span> */}
            {searchTerm && (
              <span>
                Tìm thấy: <span className="font-semibold text-orange-600">{filteredCategories.length}</span> kết quả
              </span>
            )}
          </div>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    {/* <Tag size={18} className="text-gray-500" /> */}
                    Tên danh mục
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Mã danh mục
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mb-3"></div>
                      <p>Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="font-medium">
                        {searchTerm ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào"}
                      </p>
                      {searchTerm && (
                        <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentCategories.map((category, index) => (
                  <tr key={category.categoryId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-gray-900">
                        {category.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {category.categoryId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <ActionDropdown
                          actions={[
                            {
                              label: "Xem chi tiết",
                              icon: Eye,
                              onClick: () => {
                                setSelectedCategory(category);
                                setShowDetailModal(true);
                              },
                            },
                            {
                              label: "Chỉnh sửa",
                              icon: Edit,
                              onClick: () => {
                                setSelectedCategory(category);
                                toast.info("Chức năng đang phát triển");
                              },
                            },
                            {
                              label: "Xóa",
                              icon: Trash2,
                              onClick: () => {
                                setSelectedCategory(category);
                                setShowDeleteConfirm(true);
                              },
                              danger: true,
                              disabled: submitting,
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {currentCategories.length > 0 && totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Showing info */}
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold text-gray-900">{startIndex + 1}</span> đến{' '}
                <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredCategories.length)}</span> trong tổng số{' '}
                <span className="font-semibold text-gray-900">{filteredCategories.length}</span> danh mục
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Trang trước"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? "bg-orange-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Trang sau"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">Chi tiết danh mục</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {selectedCategory.categoryName.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Category Name */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Tag size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                    Tên danh mục
                  </p>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  {selectedCategory.categoryName}
                </p>
              </div>

              {/* Category ID */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-500 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Mã danh mục
                  </p>
                </div>
                <p className="text-xl font-mono font-bold text-gray-900">
                  {selectedCategory.categoryId}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    toast.info("Chức năng đang phát triển");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <Edit size={20} />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <Trash2 size={20} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Xác nhận xóa danh mục"
        message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.categoryName}"? Hành động này không thể hoàn tác!`}
        confirmText={submitting ? "Đang xóa..." : "Xóa"}
        cancelText="Hủy"
        onConfirm={handleDeleteCategory}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setSelectedCategory(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default CategoryPage;