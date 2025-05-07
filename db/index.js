export const openDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cart-db', 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'name' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addItem = async (item) => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  tx.objectStore('cart').put(item);
  return tx.complete;
};

export const setSetting = async (key, value) => {
  const db = await openDB();
  const tx = db.transaction('settings', 'readwrite');
  tx.objectStore('settings').put({ key, value });
  return tx.complete;
};

export const getSetting = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result?.value ?? null);
    request.onerror = () => reject(request.error);
  });
};

export const seedItems = async () => {
  const db = await openDB();

  const clearTx = db.transaction('cart', 'readwrite');
  clearTx.objectStore('cart').clear();
  await new Promise((resolve) => (clearTx.oncomplete = resolve));

  const items = [
    {
      id: 1,
      title: 'Italy Pizza',
      option: 'Extra cheese and topping',
      price: 199,
      unitPrice: 199,
      quantity: 1,
      image: '/image-1.webp',
    },
    {
      id: 2,
      title: 'Combo Plate',
      option: 'Extra cheese and topping',
      price: 234,
      unitPrice: 234,
      quantity: 1,
      image: '/image-2.webp',
    },
    {
      id: 3,
      title: 'Spanish Rice',
      option: 'Extra garlic',
      price: 245,
      unitPrice: 245,
      quantity: 1,
      image: '/image-3.webp',
    },
  ];

  for (const item of items) {
    const tx = db.transaction('cart', 'readwrite');
    tx.objectStore('cart').put(item);
    await new Promise((resolve) => (tx.oncomplete = resolve));
  }

  // const settingsTx = db.transaction('settings', 'readwrite');
  // const settingsStore = settingsTx.objectStore('settings');

  // await Promise.all([
  //   new Promise((resolve) => {
  //     settingsStore.put({ name: 'shipping', value: 30 }).onsuccess = resolve;
  //   }),
  //   new Promise((resolve) => {
  //     settingsStore.put({ name: 'taxRate', value: 0.08 }).onsuccess = resolve;
  //   }),
  // ]);
};

export const getAllItems = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cart', 'readonly');
    const store = tx.objectStore('cart');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteItem = async (id) => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  tx.objectStore('cart').delete(id);
  return tx.complete;
};

export const updateQuantity = async (id, newQuantity) => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');

  const itemRequest = store.get(id);

  return new Promise((resolve, reject) => {
    itemRequest.onsuccess = async () => {
      const item = itemRequest.result;

      if (item) {
        item.quantity = newQuantity;
        item.price = item.unitPrice * newQuantity;

        const putRequest = store.put(item);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      } else {
        reject(new Error('Item not found'));
      }
    };

    itemRequest.onerror = () => reject(itemRequest.error);
  });
};

export const calculateCartSummary = async () => {
  const items = await getAllItems();
  const shipping = (await getSetting('shipping')) || 0;
  const taxRate = (await getSetting('taxRate')) || 0;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shipping;
  const totalWithTax = total + total * taxRate;

  return {
    subtotal,
    shipping,
    total,
    totalWithTax,
  };
};
