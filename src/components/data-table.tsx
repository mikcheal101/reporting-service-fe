import React, { useState, useMemo } from 'react';
import { MdViewList, MdGridView, MdDashboard } from 'react-icons/md'; // Icons for view switcher
import { BsThreeDotsVertical } from 'react-icons/bs'; // Icon for context menu
import { FaEdit, FaTrash, FaPlus, FaList, FaThLarge } from "react-icons/fa";

type Column = {
  key: string;
  label: string;
  searchable?: boolean;
};

type DataTableProps = {
  data: any[];
  columns: Column[];
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  theme?: 'dark' | 'light';
};

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  theme = 'light',
}) => {
  const [viewType, setViewType] = useState<'list' | 'grid' | 'kanban'>('list');
  const [searchValues, setSearchValues] = useState<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col.key, '']))
  );

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.every((col) =>
        col.searchable
          ? item[col.key]
              ?.toString()
              .toLowerCase()
              .includes(searchValues[col.key]?.toLowerCase())
          : true
      )
    );
  }, [data, columns, searchValues]);

  const baseThemeClasses =
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardThemeClasses =
    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const hoverThemeClasses =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${baseThemeClasses}`}>
      {/* View Switcher */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <MdViewList
            size={30}
            className={`cursor-pointer ${
              viewType === 'list' ? 'text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setViewType('list')}
          />
          <MdGridView
            size={30}
            className={`cursor-pointer ${
              viewType === 'grid' ? 'text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setViewType('grid')}
          />
          <MdDashboard
            size={30}
            className={`cursor-pointer ${
              viewType === 'kanban' ? 'text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setViewType('kanban')}
          />
        </div>
      </div>

      {/* Global Search */}
      <div className="mb-4">
        {columns.map(
          (col) =>
            col.searchable && (
              <div key={col.key} className="flex mb-2">
                <label className="mr-2">{col.label}:</label>
                <input
                  type="text"
                  className="px-2 py-1 border rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  value={searchValues[col.key]}
                  onChange={(e) => handleSearchChange(col.key, e.target.value)}
                />
              </div>
            )
        )}
      </div>

      {/* List View */}
      {viewType === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className={`${hoverThemeClasses} border-b`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                      {item[col.key]}
                    </td>
                  ))}
                  <td className="px-2 sm:px-4 py-2">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => onView?.(item)}
                        className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs whitespace-nowrap"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit?.(item)}
                        className="flex items-center justify-center px-2 sm:px-3 py-1 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition whitespace-nowrap">                                            
                          <FaEdit className="mr-1" />                  
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(item)}
                        className="flex items-center justify-center px-2 sm:px-3 py-1 bg-[#FFA500] text-white text-xs font-medium rounded transition whitespace-nowrap">                                                    
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewType === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md ${cardThemeClasses}`}
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-2 text-sm">
                  <strong className="text-xs sm:text-sm">{col.label}:</strong> 
                  <span className="text-xs sm:text-sm ml-1">{item[col.key]}</span>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => onView?.(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs sm:text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit?.(item)}
                  className="flex items-center justify-center px-3 py-1 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition">                                            
                      <FaEdit className="mr-1" />  
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(item)}
                  className="flex items-center justify-center px-3 py-1 bg-[#FFA500] text-white text-xs font-medium rounded transition">                                                    
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kanban View */}
      {viewType === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md relative ${cardThemeClasses}`}
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-2 text-sm">
                  <strong className="text-xs sm:text-sm">{col.label}:</strong> 
                  <span className="text-xs sm:text-sm ml-1">{item[col.key]}</span>
                </div>
              ))}
              <BsThreeDotsVertical
                size={24}
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => console.log('Show context menu for actions')}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataTable;
