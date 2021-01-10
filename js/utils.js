export default {
  getFileExtension: function (fileName) {
    return fileName.substr(fileName.indexOf('.') + 1);
  },
  getPubType: function (fileName) {
    const extension = this.getFileExtension(fileName);
    switch (extension) {
      case 'ecf':
        return 'class';
      case 'eif':
        return 'item';
      case 'eid':
        return 'inn';
      case 'esf':
        return fileName.indexOf('dsl') > -1 ? 'spell' : 'shop';
      case 'edf':
        return 'drop';
      case 'enf':
        return 'npc';
      case 'etf':
        return 'talk';
      case 'emf':
        return 'master';
    }
    return ''
  },
}
