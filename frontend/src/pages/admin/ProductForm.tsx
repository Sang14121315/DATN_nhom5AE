// import React, { useState, useEffect } from 'react';
// import { Form, Input, InputNumber, Select, Upload, Button, Modal, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { createProduct, updateProduct } from '../../api/productAPI';

// const { Option } = Select;

// interface ProductFormProps {
//   visible: boolean;
//   onCancel: () => void;
//   onSuccess: () => void;
//   product?: any;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ visible, onCancel, onSuccess, product }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState<any[]>([]);

//   useEffect(() => {
//     if (product) {
//       form.setFieldsValue({
//         ...product,
//         category_id: product.category_id?._id,
//         brand_id: product.brand_id?._id,
//         product_type_id: product.product_type_id?._id
//       });
//       if (product.img_url) {
//         setFileList([{
//           uid: '-1',
//           name: 'product_image',
//           status: 'done',
//           url: product.img_url
//         }]);
//       }
//     } else {
//       form.resetFields();
//       setFileList([]);
//     }
//   }, [product, form]);

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       Object.keys(values).forEach(key => {
//         if (key !== 'image' && values[key] !== undefined) {
//           formData.append(key, values[key]);
//         }
//       });

//       if (fileList.length > 0 && fileList[0].originFileObj) {
//         formData.append('image', fileList[0].originFileObj);
//       }

//       if (product) {
//         await updateProduct(product._id, formData);
//         message.success('Product updated successfully');
//       } else {
//         await createProduct(formData);
//         message.success('Product created successfully');
//       }
//       onSuccess();
//     } catch (error) {
//       message.error('Error saving product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadProps = {
//     onRemove: () => {
//       setFileList([]);
//     },
//     beforeUpload: (file: any) => {
//       setFileList([file]);
//       return false;
//     },
//     fileList
//   };

//   return (
//     <Modal
//       visible={visible}
//       title={product ? 'Edit Product' : 'Add Product'}
//       onCancel={onCancel}
//       onOk={() => form.submit()}
//       confirmLoading={loading}
//       width={800}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//       >
//         <Form.Item
//           name="name"
//           label="Product Name"
//           rules={[{ required: true, message: 'Please input product name!' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="description"
//           label="Description"
//         >
//           <Input.TextArea rows={4} />
//         </Form.Item>

//         <Form.Item
//           name="price"
//           label="Price"
//           rules={[{ required: true, message: 'Please input price!' }]}
//         >
//           <InputNumber style={{ width: '100%' }} min={0} />
//         </Form.Item>

//         <Form.Item
//           name="stock"
//           label="Stock"
//           rules={[{ required: true, message: 'Please input stock quantity!' }]}
//         >
//           <InputNumber style={{ width: '100%' }} min={0} />
//         </Form.Item>

//         <Form.Item
//           name="category_id"
//           label="Category"
//           rules={[{ required: true, message: 'Please select category!' }]}
//         >
//           <Select placeholder="Select category">
//             {/* Categories should be fetched from API */}
//             <Option value="cat1">Category 1</Option>
//             <Option value="cat2">Category 2</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="brand_id"
//           label="Brand"
//         >
//           <Select placeholder="Select brand">
//             {/* Brands should be fetched from API */}
//             <Option value="brand1">Brand 1</Option>
//             <Option value="brand2">Brand 2</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="product_type_id"
//           label="Product Type"
//         >
//           <Select placeholder="Select product type">
//             {/* Product types should be fetched from API */}
//             <Option value="type1">Type 1</Option>
//             <Option value="type2">Type 2</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="status"
//           label="Status"
//         >
//           <Select>
//             <Option value="Pending">Pending</Option>
//             <Option value="Approved">Approved</Option>
//             <Option value="Rejected">Rejected</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Product Image"
//         >
//           <Upload {...uploadProps}>
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//           </Upload>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default ProductForm;