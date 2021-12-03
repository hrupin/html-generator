(function ( global, factory ) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      ( global = global || self, global.HtmlGenerator = factory());
}( this, function () {

  function _gernerateHtml( listObjectDOM, parentElement ) {
    parentElement = parentElement || document.body
    if (typeof listObjectDOM === 'object' ? Array.isArray(listObjectDOM) : null) {
      listObjectDOM.forEach(e => {
        let tag = document.createElement(e.tag)
        _setAtt(tag, e.att)
        if (e.val !== undefined) _setValue(tag, e.val)
        if (e.tag == "select" && e.items !== undefined) _setOptions(tag, e.items)
        if (e.childs !== undefined) new HtmlGenerator(e.childs, tag)
        parentElement.appendChild(tag)
      });
    }
  }

  function _setAtt( tag, attributes ) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        tag.setAttribute(key, attributes[key])
      }
    }
  }

  function _setValue( tag, value ) {
    tag.textContent = value
  }


  function _initFunctios( hg ) {
    hg.setAttributes = function( tag, attributes ) { _setAtt( tag, attributes ) }
    hg.setValue = function( tag, value ) { _setValue( tag, value ) } 
  }

  function init( HtmlGenerator ) {
    HtmlGenerator.prototype.generate = function ( listObjectDOM, parentElement ) {
      let hg = this
      _gernerateHtml( listObjectDOM, parentElement )
      _initFunctios(hg)
    }
  }

  function _setOptions(tag, items){
    for (const key in items) {
        option = document.createElement("option")
        option.value = key
        option.textContent = items[key]
        tag.appendChild(option)
    }
  }

  init(HtmlGenerator)

  function HtmlGenerator( listObjectDOM, parentElement = null ) {
    if (this instanceof HtmlGenerator && listObjectDOM != null){
      this.generate( listObjectDOM, parentElement )
    }
  }

  return HtmlGenerator

}))
