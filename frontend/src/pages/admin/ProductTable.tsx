// import React, { useState, useEffect } from 'react';
// import { getProducts, deleteProduct } from '../../api/productAPI';
// import { Table, Button, Space, Modal, message, Pagination, Tag } from 'antd';
// import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
// import ProductForm from './ProductForm';
// import { formatPrice } from '../../utils/format';

// const ProductTable: React.FC = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const result = await getProducts(pagination.current, pagination.pageSize);
//       setData(result.data);
//       setPagination({
//         ...pagination,
//         total: result.pagination.total
//       });
//     } catch (error) {
//       message.error('Error fetching products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [pagination.current, pagination.pageSize]);

//   const handleDelete = (id: string) => {
//     Modal.confirm({
//       title: 'Confirm Delete',
//       content: 'Are you sure you want to delete this product?',
//       onOk: async () => {
//         try {
//           await deleteProduct(id);
//           message.success('Product deleted successfully');
//           fetchData();
//         } catch (error) {
//           message.error('Error deleting product');
//         }
//       }
//     });
//   };

//   const columns = [
//     {
//       title: 'Product Name',
//       dataIndex: 'name',
//       key: 'name'
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//       render: (price: number) => formatPrice(price)
//     },
//     {
//       title: 'Stock',
//       dataIndex: 'stock',
//       key: 'stock'
//     },
//     {
//       title: 'Category',
//       dataIndex: ['category_id', 'name'],
//       key: 'category'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status: string) => (
//         <Tag color={status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
//           {status}
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_: any, record: any) => (
//         <Space size="middle">
//           <Button 
//             icon={<EyeOutlined />} 
//             onClick={() => {
//               setSelectedProduct(record);
//               setModalVisible(true);
//             }}
//           />
//           <Button 
//             icon={<EditOutlined />} 
//             onClick={() => {
//               setSelectedProduct(record);
//               setModalVisible(true);
//             }}
//           />
//           <Button 
//             icon={<DeleteOutlined />} 
//             danger 
//             onClick={() => handleDelete(record._id)}
//           />
//         </Space>
//       )
//     }
//   ];

//   return (
//     <div className="product-management">
//       <div style={{ marginBottom: 16 }}>
//         <Button 
//           type="primary" 
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setSelectedProduct(null);
//             setModalVisible(true);
//           }}
//         >
//           Add Product
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={data}
//         rowKey="_id"
//         pagination={{
//           ...pagination,
//           showSizeChanger: true,
//           pageSizeOptions: ['10', '20', '50', '100']
//         }}
//         loading={loading}
//         onChange={(pagination) => setPagination(pagination)}
//       />

//       <ProductForm
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         onSuccess={() => {
//           setModalVisible(false);
//           fetchData();
//         }}
//         product={selectedProduct}
//       />
//     </div>
//   );
// };

// export default ProductTable;