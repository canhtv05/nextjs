import { ROUTES_CONFIG } from './routes'

export const VerticalItems = [
  {
    title: 'Hệ thống',
    icon: 'eos-icons:file-system-outlined',
    children: [
      {
        title: 'Người dùng',
        icon: 'iconoir:group',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.SYSTEM.USER
      },
      {
        title: 'Nhóm vai trò',
        icon: 'icon-park-outline:permissions',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.SYSTEM.ROLE
      }
    ]
  },
  {
    title: 'Quản trị sản phẩm',
    icon: 'eos-icons:products-outlined',
    children: [
      {
        title: 'Danh sách sản phẩm',
        icon: 'icon-park-outline:ad-product',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_PRODUCT
      },
      {
        title: 'Danh mục sản phẩm',
        icon: 'material-symbols-light:category-outline',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_TYPE_PRODUCT
      },
      {
        title: 'Danh sách đơn hàng',
        icon: 'lets-icons:order-light',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_ORDER
      },
      {
        title: 'Danh sách đánh giá',
        icon: 'carbon:review',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_REVIEW
      }
    ]
  },
  {
    title: 'Cài đặt',
    icon: 'ant-design:setting-outlined',
    children: [
      {
        title: 'Thành phố',
        icon: 'solar:city-outline',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.SETTINGS.CITY
      },
      {
        title: 'Phương thức giao hàng',
        icon: 'carbon:delivery',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.SETTINGS.DELIVERY_TYPE
      },
      {
        title: 'Phương thức thanh toán',
        icon: 'streamline:payment-10',
        path: ROUTES_CONFIG.MANAGE_SYSTEM.SETTINGS.PAYMENT_TYPE
      }
    ]
  }
]
