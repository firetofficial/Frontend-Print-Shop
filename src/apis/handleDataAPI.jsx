import axiosClient from "./axiosClient";

const END_POINT = {
  LOGIN: "login.php",
  CHECK_TOKEN: "check_token.php",

  CUSTOMER_ALL: "customer/get_customers.php",
  CUSTOMER_ADD: "customer/create_customer.php",
  CUSTOMER_UPDATE: "customer/update_customer.php",
  CUSTOMER_BY_ID: "customer/get_customer_by_id.php",
  CUSTOMER_DELETE_BY_ID: "customer/delete_customer.php",

  PRINT_ALL: "nhain/get_printers.php",
  PRINT_ADD: "nhain/add_printer.php",
  PRINT_UPDATE: "nhain/update_printer.php",
  PRINT_BY_ID: "nhain/get_printer_by_id.php",
  PRINT_DELETE_BY_ID: "nhain/delete_printer.php",

  CATEGORY: "cate/categories.php",

  CLASSIFY_LV2: "classifylv2/classifylv2.php",

  ADD_STAFF: "register.php",
  ALL_STAFF: "get_all_accounts.php",
  STAFF_BY_ID: "get_account_by_id.php",
  UPDATE_STAFF: "update_account.php",
  CATE_STAFF: "get_all_cate_account.php",

  PRODUCT: "product/qlsp.php",
  PRODUCT_ALL: "product/show_products.php",
  PRODUCT_BY_ID: "product/show_product_by_id.php",
  PRODUCT_BY_CATE: "product/show_product_by_cate.php",
  PRODUCT_BY_CLASSIFY: "product/show_product_by_classify.php",
  PRODUCT_ORDER: "product/check_product_order.php",

  ORDER_ALL: "order/get_orders.php",
  ORDER_ID: "order/get_order.php",
  ORDER_ADD: "order/create_order.php",
  ORDER_UPDATE: "order/update_order.php",
  ORDER_UPDATE_DETAIL: "order/update_detail_order.php",
  ORDER_UPDATE_STATUS: "order/update_order_status.php",
  ORDER_UPDATE_SHIP: "order/update_ship_order.php",

  GET_QUANTITY: "product/get_quatity_product.php",

  REPORT_API: "report/report.php",
};

export const getDataCateAccountAPI = () => {
  return axiosClient.get(`${END_POINT.CATE_STAFF}`);
};

export const getDataReportAPI = () => {
  return axiosClient.get(`${END_POINT.REPORT_API}`);
};

export const updateOrdersShipAPI = (
  session_token,
  order_id,
  order_status,
  price_ship,
  total
) => {
  return axiosClient.post(END_POINT.ORDER_UPDATE_SHIP, {
    session_token: session_token,
    order_id: order_id,
    order_status: order_status,
    price_ship: price_ship,
    total: total,
  });
};

export const updateOrdersStatusAPI = (
  session_token,
  order_id,
  order_status
) => {
  return axiosClient.post(END_POINT.ORDER_UPDATE_STATUS, {
    session_token: session_token,
    order_id: order_id,
    order_status: order_status,
  });
};

export const updateOrdersAPI = (data) => {
  return axiosClient.post(END_POINT.ORDER_UPDATE_DETAIL, {
    session_token: data.session_token,
    product_details: data.product_details,
    order_id: data.order_id,
    price_ship: data.price_ship,
    total_print: data.total_print,
    total: data.total,
    order_status: data.order_status,
  });
};

export const getDataStaffIdAPI = (session_token, user_id) => {
  return axiosClient.post(END_POINT.STAFF_BY_ID, {
    session_token,
    user_id,
  });
};

export const getQuantityProductAPI = (session_token, quantity, product_id) => {
  return axiosClient.post(
    `${END_POINT.GET_QUANTITY}?session_token=${session_token}&quantity=${quantity}&product_id=${product_id}`
  );
};

export const updateDataOrdersAPI = (data) => {
  return axiosClient.post(END_POINT.ORDER_UPDATE, {
    session_token: data.session_token,
    customer_id: data.customer_id,
    recipient_name: data.recipient_name,
    recipient_phone: data.recipient_phone,
    delivery_address: data.delivery_address,
    order_status: data.order_status,
    notes: data.notes,
    product_details: data.product_details,
    processing_employee_id: data.processing_employee_id,
    design_confirm_employee_id: data.design_confirm_employee_id,
    estimated_delivery_date: data.estimated_delivery_date,
    total: data.total,
    vat: data.vat,
    deposit: data.deposit,
    promotion: data.promotion,
    order_id: data.order_id,
    isVat: data.isVat,
    statusVat: data.statusVat,
  });
};

export const postDataOrdersAPI = (data) => {
  return axiosClient.post(END_POINT.ORDER_ADD, {
    session_token: data.session_token,
    customer_id: data.customer_id,

    recipient_name:
      data.recipient_name !== undefined ? data.recipient_name : "",
    recipient_phone:
      data.recipient_phone !== undefined ? data.recipient_phone : "",

    delivery_address:
      data.delivery_address !== undefined ? data.delivery_address : "",
    order_status: data.order_status,
    notes: data.notes,
    product_details: data.product_details,
    processing_employee_id:
      data.processing_employee_id !== undefined
        ? data.processing_employee_id
        : "",
    design_confirm_employee_id:
      data.design_confirm_employee_id !== undefined
        ? data.design_confirm_employee_id
        : "",
    estimated_delivery_date: data.estimated_delivery_date,
    total: data.total,
    vat: data.vat,
    deposit: data.deposit,
    promotion: data.promotion,
    isVat: data.isVat,
    statusVat: data.statusVat,
  });
};

export const getDataOrdersByIdAPI = (session_token, id) => {
  return axiosClient.post(END_POINT.ORDER_ID, {
    session_token: session_token,
    order_id: id,
  });
};

export const getDataOrdersAPI = (session_token, page, limit) => {
  return axiosClient.post(END_POINT.ORDER_ALL, {
    session_token: session_token,
    page: page,
    limit: limit,
  });
};

export const deleteProductAPI = (token, productId) => {
  return axiosClient.delete(END_POINT.PRODUCT, {
    data: {
      session_token: token,
      id: productId,
    },
  });
};

export const getProductOrderAPI = (session_token, product_name) => {
  return axiosClient.post(END_POINT.PRODUCT_ORDER, {
    product_name: product_name,
    session_token: session_token,
  });
};

export const postAddProductAPI = (data) => {
  return axiosClient.post(END_POINT.PRODUCT, {
    category_id: data.category_id,
    product_name: data.product_name,
    classifyLevel2: data.classifyLevel2,
    rules: data.rules,
    notes: data.notes,
    nhieuquycach: data.nhieuquycach,
    pricing: data.pricing,
    session_token: data.session_token,
    price: data.price,
    plusPrice: data.plusPrice,
  });
};

export const postEditProductAPI = (data) => {
  return axiosClient.put(END_POINT.PRODUCT, {
    id: data.id,
    category_id: data.category_id,
    product_name: data.product_name,
    classifyLevel2: data.classifyLevel2,
    rules: data.rules,
    notes: data.notes,
    price: data.price,
    plusPrice: data.plusPrice,
    nhieuquycach: data.nhieuquycach,
    pricing: data.pricing,
    session_token: data.session_token,
  });
};

export const getDataProductByIdAPI = (session_token, product_id) => {
  return axiosClient.get(
    `${END_POINT.PRODUCT_BY_ID}?session_token=${session_token}&product_id=${product_id}`
  );
};

export const getDataProductByCateAPI = (session_token, category_id) => {
  return axiosClient.get(
    `${END_POINT.PRODUCT_BY_CATE}?session_token=${session_token}&category_id=${category_id}`
  );
};

export const getDataProductByClasifyAPI = (
  session_token,
  classifyLevel2,
  category_id
) => {
  return axiosClient.get(
    `${END_POINT.PRODUCT_BY_CLASSIFY}?session_token=${session_token}&classifyLevel2=${classifyLevel2}&category_id=${category_id}`
  );
};

export const getDataProductAPI = (session_token) => {
  return axiosClient.get(
    `${END_POINT.PRODUCT_ALL}?session_token=${session_token}`
  );
};

export const getAllStaffAPI = (session_token) => {
  return axiosClient.get(
    `${END_POINT.ALL_STAFF}?session_token=${session_token}`
  );
};

export const deleteStaffAPI = (data) => {
  return axiosClient.delete(END_POINT.CATEGORY, {
    data: {
      session_token: data.session_token,
      id: data.id,
    },
  });
};

export const postUpdateStaffAPI = (data) => {
  return axiosClient.put(END_POINT.UPDATE_STAFF, {
    session_token: data.session_token,
    user_id: data.id,
    username: data.username,
    password: data.password,
    permissions: data.permissions,
    cate_account: data.cate,
  });
};

export const postAddStaffAPI = (data) => {
  return axiosClient.post(END_POINT.ADD_STAFF, {
    username: data.username,
    password: data.password,
    permissions: data.permissions,
    session_token: data.session_token,
    cate_account: data.cate,
  });
};

export const getAllCategoryAPI = (session_token) => {
  return axiosClient.get(
    `${END_POINT.CATEGORY}?session_token=${session_token}`
  );
};

export const postAddCategoryAPI = (data) => {
  return axiosClient.post(END_POINT.CATEGORY, {
    session_token: data.session_token,
    category_name: data.category_name,
    description: data.description,
  });
};

export const deleteCategoryAPI = (data) => {
  return axiosClient.delete(END_POINT.CATEGORY, {
    data: {
      session_token: data.session_token,
      id: data.id,
    },
  });
};

export const postUpdateCategoryAPI = (data) => {
  return axiosClient.put(END_POINT.CATEGORY, {
    session_token: data.session_token,
    id: data.id,
    category_name: data.category_name,
    description: data.description,
  });
};

export const getAllClassifylv2API = (session_token) => {
  return axiosClient.get(
    `${END_POINT.CLASSIFY_LV2}?session_token=${session_token}`
  );
};

export const postAddClassifylv2API = (data) => {
  return axiosClient.post(END_POINT.CLASSIFY_LV2, {
    session_token: data.session_token,
    title: data.title,
    description: data.description,
  });
};

export const deleteClassifylv2API = (data) => {
  return axiosClient.delete(END_POINT.CLASSIFY_LV2, {
    data: {
      session_token: data.session_token,
      id: data.id,
    },
  });
};

export const postUpdateClassifylv2API = (data) => {
  return axiosClient.put(END_POINT.CLASSIFY_LV2, {
    session_token: data.session_token,
    id: data.id,
    title: data.title,
    description: data.description,
  });
};

export const deletePrintIdAPI = (session_token, printer_id) => {
  return axiosClient.post(END_POINT.PRINT_DELETE_BY_ID, {
    session_token,
    printer_id,
  });
};

export const postUpdatePrintAPI = (
  address,
  city,
  company_name,
  district,
  email,
  note,
  phone,
  session_token,
  tax_code,
  ward,
  printer_id,
  id_city,
  id_districts,
  id_wards
) => {
  return axiosClient.post(END_POINT.PRINT_UPDATE, {
    address,
    city,
    company_name,
    district,
    email,
    note,
    phone,
    session_token,
    tax_code,
    ward,
    printer_id,
    id_city,
    id_districts,
    id_wards,
  });
};

export const getDataPrintIdAPI = (session_token, printer_id) => {
  return axiosClient.post(END_POINT.PRINT_BY_ID, {
    session_token,
    printer_id,
  });
};

export const postDataPrintAPI = (session_token, soluong, trang) => {
  return axiosClient.post(END_POINT.PRINT_ALL, {
    session_token,
    soluong,
    trang,
  });
};

export const postAddPrintAPI = (
  address,
  city,
  company_name,
  district,
  email,
  note,
  phone,
  session_token,
  tax_code,
  ward,
  id_city,
  id_districts,
  id_wards
) => {
  return axiosClient.post(END_POINT.PRINT_ADD, {
    address,
    city,
    company_name,
    district,
    email,
    note,
    phone,
    session_token,
    tax_code,
    ward,
    id_city,
    id_districts,
    id_wards,
  });
};

export const postDataCustomerAPI = (session_token) => {
  return axiosClient.post(END_POINT.CUSTOMER_ALL, {
    session_token,
  });
};

export const postAddCustomerAPI = (
  birth_year,
  customer_name,
  address,
  city,
  company_email,
  company_name,
  district,
  email,
  gender,
  note,
  phone,
  session_token,
  tax_code,
  ward,
  id_city,
  id_districts,
  id_wards
) => {
  return axiosClient.post(END_POINT.CUSTOMER_ADD, {
    birth_year,
    customer_name,
    address,
    city,
    company_email,
    company_name,
    district,
    email,
    gender,
    note,
    phone,
    session_token,
    tax_code,
    ward,
    id_city,
    id_districts,
    id_wards,
  });
};

export const postUpdateCustomerAPI = (
  birth_year,
  customer_name,
  address,
  city,
  company_email,
  company_name,
  district,
  email,
  gender,
  note,
  phone,
  session_token,
  tax_code,
  ward,
  customer_id,
  id_city,
  id_districts,
  id_wards
) => {
  return axiosClient.post(END_POINT.CUSTOMER_UPDATE, {
    birth_year,
    customer_name,
    address,
    city,
    company_email,
    company_name,
    district,
    email,
    gender,
    note,
    phone,
    session_token,
    tax_code,
    ward,
    customer_id,
    id_city,
    id_districts,
    id_wards,
  });
};

export const getDataCustomerIdAPI = (session_token, customer_id) => {
  return axiosClient.post(END_POINT.CUSTOMER_BY_ID, {
    session_token,
    customer_id,
  });
};

export const deleteCustomerIdAPI = (session_token, customer_id) => {
  return axiosClient.post(END_POINT.CUSTOMER_DELETE_BY_ID, {
    session_token,
    customer_id,
  });
};

export const postLoginAPI = (username, password) => {
  return axiosClient.post(END_POINT.LOGIN, {
    username,
    password,
  });
};

export const check_tokenAPI = (username, session_token) => {
  return axiosClient.post(END_POINT.CHECK_TOKEN, {
    username,
    session_token,
  });
};
