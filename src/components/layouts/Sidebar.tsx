import { Layers, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const adminMenuItems: MenuItem[] = [
  {
    id: 'category',
    label: 'Category',
    icon: <Layers size={16} />,
    path: '/admin/category',
  },
  {
    id: 'product',
    label: 'Product',
    icon: <Package size={16} />,
    path: '/admin/product',
  }
];

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const menuItems = userRole === 'admin' ? adminMenuItems : [];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-fpt-blue mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path || '#'}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-fpt-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
