import _ from 'lodash'
import './style.css';
import './a.scss'
function createDomElement(){
    let dom = document.createElement('div')
    dom.innerHTML = _.join(['wepack', 'difficult', 'simple'])
    dom.className = 'hello';
    return dom
}
let d = createDomElement()
document.body.appendChild(d)