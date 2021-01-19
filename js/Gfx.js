function getImage(imageId, atlasUrl) {
  const filtered = this.images.filter((i) => i.id === imageId);
  if (filtered && filtered.length > 0) {
    if (!filtered[0].path) {
      const name = filtered[0].hash
        .map((b) => {
          return `00${b.toString(16)}`.slice(-2);
        })
        .join('');
      filtered[0].path = `${atlasUrl}/gfx/${name}.png`;
    }

    return filtered[0];
  }
  return undefined;
}

class Gfx {
  constructor(atlasUrl) {
    this.atlasUrl = atlasUrl;
    this.tables = [];
  }

  loadTable(tableId) {
    this.tables[tableId] = 'loading';
    const paddedId = `000${tableId}`.slice(-3);
    const gfxTableUrl = `${this.atlasUrl.trim('/')}/gfx${paddedId}.table`;
    return new Promise((resolve) => {
      fetch(gfxTableUrl)
        .then((r) => {
          return r.arrayBuffer();
        })
        .then((r) => {
          import('../pkg').then((eo) => {
            const table = eo.get_table_file(new Uint8Array(r));
            table.getImage = getImage.bind(table);
            this.tables[tableId] = table;
            resolve();
          });
        });
    });
  }

  getImage(tableId, imageId) {
    return new Promise((resolve) => {
      if (
        this.tables[tableId] === undefined &&
        this.tables[tableId] !== 'loading'
      ) {
        this.loadTable(tableId).then(() => {
          resolve(this.tables[tableId].getImage(imageId, this.atlasUrl));
        });
      } else if (this.tables[tableId] === 'loading') {
        setTimeout(() => {
          this.getImage(tableId, imageId).then((image) => resolve(image));
        }, 1000);
      } else {
        resolve(this.tables[tableId].getImage(imageId, this.atlasUrl));
      }
    });
  }
}

export default Gfx;
