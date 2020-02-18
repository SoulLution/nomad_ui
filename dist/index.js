/*!
 * new_nomad_ui v0.6.29
 * (c) SoulLution <faun1605@gmail.com>
 * Released under the ISC License.
 */
'use strict';

//
//
//
//
var script = {};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

//
//
//
//
var checkMedia = function checkMedia(index, type) {
  var end = type ? '@media screen and (min-width: ' : '@media screen and (max-width: ',
      px = 0;

  switch (parseInt(index)) {
    case 3:
      px = 600;
      break;

    case 2:
      px = 960;
      break;

    case 1:
      px = 1264;
      break;

    case 0:
      px = 1904;
      break;
  }

  if (parseInt(index) !== 4) {
    px += type ? 1 : 0;
    end += px + 'px)';
    return end;
  } else return '';
};

var script$1 = {
  data: function data() {
    return {};
  },
  created: function created() {
    this.checkTheme(); // this.checkLanguage()

    this.createGreed();
  },
  methods: {
    createGreed: function createGreed() {
      var col = ['xl', 'lg', 'md', 'sm', 'xs'],
          index = [],
          all = '',
          type = [];

      for (var i = 1; i < 13; i++) {
        for (var j in col) {
          if (!type[j]) type[j] = '';
          if (j != col.length - 1) type[j] += (i === 1 && j != col.length - 1 ? checkMedia(j) + '{' : ',') + '.' + col[j] + '-' + i + (i === 12 ? '{width: 100%}}' : '');
          all += '.' + col[j] + '-' + i + (j == col.length - 1 && i === 12 ? '{max-width: 100%}' : ',');
          if (!index[j]) index[j] = '';
          index[j] += (i === 1 ? checkMedia(j, true) + '{' : "") + '.' + col[j] + '-' + i + "{flex: 0 0 ".concat(100 / 12 * i, "%;width: ").concat(100 / 12 * i, "%;}") + (i === 12 ? '}' : '');
        }
      }

      var style = document.createElement('style');
      style.setAttribute('grid', '');
      style.innerHTML = all;

      for (var _i = type.length - 1; _i >= 0; _i--) {
        style.innerHTML += type[_i];
      }

      for (var _i2 = index.length - 1; _i2 >= 0; _i2--) {
        style.innerHTML += index[_i2];
      }

      document.getElementsByTagName('head')[0].appendChild(style);
    },
    checkLanguage: function checkLanguage() {// if(!this.$getCookie('language')){
      // 	this.$lang = 'ru'
      // 	this.$setCookie('language', 'ru', 360)
      // }else{
      // 	this.$lang = this.$getCookie('language')
      // }
      // console.log(this.$route.name)
    },
    checkTheme: function checkTheme(check) {
      var _this = this;

      var dt = new Date().getHours(),
          timer = new Date().getMinutes();

      for (var i in this.$themes) {
        if (this.$themes[i][1] <= dt && this.$themes[i][2] >= dt) {
          this.$current_theme = i;
          break;
        }
      }

      var cur_style = document.getElementById('time');
      var gl = ' :root{';
      var style = document.createElement('style');
      style.setAttribute('id', 'time');
      style.setAttribute('time_s', this.$themes[this.$current_theme][1]);
      style.setAttribute('time_f', this.$themes[this.$current_theme][2]);

      for (var item in this.$themes[this.$current_theme]) {
        for (var color in this.$themes[this.$current_theme][item]) {
          if (_typeof(this.$themes[this.$current_theme][item][color]) == 'object') {
            var gradient = 'background: linear-gradient(90deg, ';

            for (var grad in this.$themes[this.$current_theme][item][color]) {
              gradient += this.$themes[this.$current_theme][item][color][grad].color + ' ' + this.$themes[this.$current_theme][item][color][grad].position + '%' + (grad != this.$themes[this.$current_theme][item][color].length - 1 ? ', ' : '');
            }

            gradient += ');';
            style.innerHTML += ".".concat(color, " { ").concat(gradient, " }");
          } else {
            gl += "--".concat(color, ": ").concat(this.$themes[this.$current_theme][item][color], ";");
            style.innerHTML += ".".concat(color, " { color: ").concat(this.$themes[this.$current_theme][item][color], "; }");
          }
        }
      }

      style.innerHTML += gl + "}";
      document.getElementsByTagName('head')[0].appendChild(style);
      if (cur_style) document.getElementsByTagName('head')[0].removeChild(cur_style);
      setTimeout(function () {
        return _this.checkTheme(true);
      }, check ? 60 - timer * 60000 : 3600000);
    }
  }
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "sm-1 md-1"
  });
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-d3f6cb84_0", {
    source: "div{display:flex}.j-center{justify-content:center!important}.j-end{justify-content:flex-end!important}.j-start{justify-content:flex-start!important}.j-sb{justify-content:space-between!important}.j-arround{justify-content:space-around!important}.a-center{align-items:center!important}.a-end{align-items:flex-end!important}.a-start{align-items:flex-start!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    Vue.component('VButton', __vue_component__);

    var filePath = function filePath(func, name) {
      return func(name, true);
    }; // let compon_dir = require.context('./../src/components/', false, /\.*\.vue$/)
    // function importAll (directory) {
    //   let files = []
    //   directory.keys().forEach(file => {
    //     files.push(file)
    //   });
    //   return files;
    // }
    // let components = importAll(compon_dir)
    // compon_dir = require.context('./../src/components/', true);
    // for(let i in components){
    //   let file = filePath(compon_dir, components[i])
    //   let comp = file["default"]
    //   comp.name = comp.__file.split('components/')[1].split('.vue')[0]
    //   comp.name = comp.name.split('-')
    //   let name = ''
    //   for(let j in comp.name)
    //     name += comp.name[j][0].toUpperCase() + comp.name[j].slice(1)
    //   Vue.component("V" + name, comp)
    // }


    if (!options.single_lang) {
      Vue.prototype.$current_lang = 'ru';
      Vue.prototype.$languages = {};
      Vue.prototype.$lang = {};

      var languages = require.context('./../../../languages/', true);

      var langs = {};

      for (var i in options.router.options.routes) {
        var router = options.router.options.routes[i];
        if (router.name) try {
          var lang = filePath(languages, router.name + '.js')["default"];
          langs[options.router.name] = lang;
        } catch (error) {
          console.warn("can't find language file ./languages/".concat(router.name, ".js\n\t            For disable multiple languages, enter single_lang in module options "));
        }
      }

      Vue.prototype.$languages = langs;
      if (!options.router.currentRoute) options.router.currentRoute.name = 'main';
      if (langs[options.router.currentRoute.name]) Vue.prototype.$lang = Vue.prototype.$languages[options.router.currentRoute.name][Vue.prototype.$current_lang];
    }

    var themes;
    themes = options.themes || {};
    if (!Array.isArray(themes)) themes = [[themes, 0, 24]];
    Vue.prototype.$current_theme = 0;
    Vue.prototype.$themes = themes;

    Vue.prototype.$setCookie = function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays | 360) * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    Vue.prototype.$getCookie = function (cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');

      for (var _i = 0; _i < ca.length; _i++) {
        var c = ca[_i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    };

    Vue.component("mainUi", __vue_component__$1);
  }
};

module.exports = index;
