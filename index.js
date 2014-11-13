"use strict";


// Varibles

var body = null;


// Exports

module.exports = {
  body: function() {
    if (! body) {
      body = document.getElementsByTagName('BODY');
    }
    return body ? body[0]: null;
  },
  get: function(id) {
    return document.getElementById(id);
  },
  query: function(node, selector) {
    if (!this.isNode(node)) {
      throw Error('node is wrong.');
    }
    return node.querySelector(selector);
  },
  removeChildNodes: function(node) {
    if (! this.isNode(node)) {
      throw Error('node is wrong.');
    }

    while (node.firstChild) {
      node.removeChild(node.firstChild);  
    }
  },
  replaceNode: function(oldNode, newNode) {
    if (!this.isNode(oldNode) || !this.isNode(newNode) || !oldNode.parentNode) {
      throw Error('node is wrong.');
    }
    return oldNode.parentNode.replaceChild(newNode, oldNode);
  },
  replaceHtml: function(node, html) {
    this.removeChildNodes(node);
    this.html(node, html);
  },
  appendHtml: function(node, html) {
    this.html(node, html, 'beforeend');
  },
  html: function(node, html, pos) {
    pos = pos || 'beforeend';

    if (! html instanceof String) {
      throw Error('html is not string.');
    }

    if (! node) {
      throw Error('node is wrong.');
    }

    node.insertAdjacentHTML(pos, html);
  },
  isNode: function(obj) {
    return (
      typeof Node === "object" ? obj instanceof Node : 
      obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
    );
  },
  addListener: function(el, eventName, handlerFn) {
    if (typeof el.addEventListener !== 'undefined') {
      el.addEventListener(eventName, handlerFn, false);
    } else if (typeof el.attachEvent !== 'undefined') {
      el.attachEvent('on' + eventName, handlerFn);
    } else {
      el['on' + eventName] = handlerFn;
    }
  },
  findParentNode: function(node, attrName) {
    if (! this.isNode(node)) {
      throw Error('node is wrong.');
    }
    while (node) {
      if (node.getAttribute && node.getAttribute(attrName) !== null) {
        break;
      }
      node = node.parentNode;
    }
    return node;
  }
};
