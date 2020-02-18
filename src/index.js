import main from './main.vue';

export default {
 install(Vue, options) {

		options = !options ? Vue.options : options
    Vue = Vue.Vue ? Vue.Vue : Vue.Vue


	 	let filePath = function filePath(func, name) {
      return func(name, true);
    };

    // let compon_dir = require.context('./../src/components/', false, /\.*\.vue$/)

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

    if(!options.single_lang){
      Vue.prototype.$current_lang = 'ru'
      Vue.prototype.$languages = {}
      Vue.prototype.$lang = {}
      let languages = require.context('./../../../languages/', true)
      let langs = {}
      
      for (let i in options.router.options.routes){
        let router = options.router.options.routes[i]
        if(router.name)
	        try{
	          let lang = filePath(languages,router.name + '.js')["default"]
	          langs[options.router.name] = lang
	        }catch(error){
	          console.warn(`can't find language file ./languages/${router.name}.js
	            For disable multiple languages, enter single_lang in module options `)
	        }
      }
      Vue.prototype.$languages = langs
      if(!options.router.currentRoute ) options.router.currentRoute.name = 'main'
      if(langs[options.router.currentRoute.name])
        Vue.prototype.$lang = Vue.prototype.$languages[options.router.currentRoute.name][Vue.prototype.$current_lang]
    }


    let themes
    themes = options.themes || {}
    if (!Array.isArray(themes)) themes = [[themes, 0, 24]]
    Vue.prototype.$current_theme = 0
    Vue.prototype.$themes = themes



    Vue.prototype.$setCookie = function (cname, cvalue, exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays | 360) * 24 * 60 * 60 * 1000)
      let expires = "expires=" + d.toUTCString()
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    }

    Vue.prototype.$getCookie = function (cname) {
      let name = cname + "="
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(';')

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]

        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }

        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }

      return ""
    }

    Vue.component("mainUi", main)
  }
} 
