import React, { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { GetCategoryResponse } from '../../types/Category'

interface Props {
    open: boolean
    onClose: () => void
    onUpdate: (categoryId: number, data: { categoryName: string }) => Promise<void> | void
    category: GetCategoryResponse | null
}

const CategoryEditModal: React.FC<Props> = ({ open, onClose, onUpdate, category }) => {
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const firstRef = useRef<HTMLInputElement | null>(null)

    // Sync category data khi modal mở
    useEffect(() => {
        if (open && category) {
            setCategoryName(category.categoryName)
            setError('')
            setTimeout(() => firstRef.current?.focus(), 100)
        }
    }, [open, category])

    // ESC key để đóng modal
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (open) window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!categoryName.trim()) {
            setError('Tên danh mục không được để trống')
            return
        }

        if (!category) {
            setError('Không tìm thấy danh mục')
            return
        }

        setIsSubmitting(true)
        try {
            await onUpdate(category.categoryId, { categoryName: categoryName.trim() })
            setCategoryName('')
            setError('')
            onClose()
        } catch (err: any) {
            setError(err.response?.data?.message || 'Cập nhật danh mục thất bại')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Chỉnh sửa danh mục</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        type="button"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Category ID (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã danh mục
                        </label>
                        <input
                            type="text"
                            value={category?.categoryId || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Category Name */}
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên danh mục <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={firstRef}
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value)
                                setError('')
                            }}
                            placeholder="Nhập tên danh mục..."
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                error
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            disabled={isSubmitting}
                        />
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !categoryName.trim()}
                            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryEditModal