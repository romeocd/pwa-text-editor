import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content, id) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id, content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Could not save to the database', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = id ? store.get(id) : store.getAll();
    const result = await request;
    console.log('Data retrieved from database', result);
    return id ? result?.content : result;
  } catch (error) {
    console.error('Could not get data from the database', error);
  }
};

initdb();
