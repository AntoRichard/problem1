const fs = require('fs');

const readFile = async filename => {
  try {
    let data = await fs.readFileSync(filename);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};

const process = async () => {
  let store = null;

  try {
    const files = await fs.readdirSync('./data');

    for (let i = 0; i < files.length; i++) {
      let data = await readFile(`./data/${files[i]}`);
      if (store === null) {
        store = data;
      } else {
        const { strikers } = data;
        for (let itr = 0; itr < strikers.length; itr++) {
          store = {
            strikers: [...store.strikers, strikers[itr]]
          };
        }
      }
    }
  } catch (err) {
    if (err) console.log(err);
  }

  store = JSON.stringify(store);
  fs.writeFileSync('./merge.json', store, err => {
    if (err) throw err;
    console.log('File written successfully');
  });
};

process();
