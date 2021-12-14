//IMPORTS
import "../../scss/index/index.scss"
import "../../pug/index/index.pug"
function importAll(r) {
    return r.keys().map(r);
  }
importAll(require.context('../../images/common', false, /\.(png|jpe?g)$/));
importAll(require.context('../../images/index', false, /\.(png|jpe?g)$/));