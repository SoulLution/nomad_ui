<template>
  	<div class="sm-1 md-1"></div>
</template>

<script>
	const checkMedia = (index, type) =>{
		let end = type ? '@media screen and (min-width: ' : '@media screen and (max-width: ', px = 0
		switch(parseInt(index)){
			case 3: px = 600;break;
			case 2: px = 960;break;
			case 1: px = 1264;break;
			case 0: px = 1904;break;
		}
		if(parseInt(index) !== 4){
			px += type ? 1 : 0
			end += px + 'px)'
			return end;
		}
		else return ''
	}
  export default {
  	data(){
  		return{

  		}
  	},
  	created(){
  		this.checkTheme()
  		// this.checkLanguage()
  		this.createGreed()
  	},
  	methods: {
  		createGreed(){
  			let col = ['xl','lg','md','sm','xs'], index = [], all = '', type = []
  			for(let i = 1; i < 13; i++)
	  			for(let j in col){

          if (!type[j]) type[j] = '';
          if(j != col.length-1)type[j] += (i === 1 && j != col.length-1 ? checkMedia(j) + '{' : ',') + '.' + col[j] + '-' + i + (i === 12 ? '{width: 100%}}' : '');


	  				all += '.' + col[j] + '-' + i + (j == col.length - 1 && i === 12 ? '{max-width: 100%}' : ',')

	  				if(!index[j]) index[j] = ''
	  					index[j] += ( i === 1 ? checkMedia(j, true) + '{' : ``) + '.' + col[j] + '-' + i + `{flex: 0 0 ${100 / 12 * i}%;width: ${100 / 12 * i}%;}` + (i === 12 ? '}' : '')
	  			}

  			let style = document.createElement('style')
  			style.setAttribute('grid', '')
  			style.innerHTML = all
  			for(let i = type.length - 1; i >= 0 ; i--){
	        style.innerHTML += type[i];
	      }
	      for(let i = index.length - 1; i >= 0 ; i--){
	        style.innerHTML += index[i];
	      }
  			document.getElementsByTagName('head')[0].appendChild(style);
  		},
  		checkLanguage(){
  			// if(!this.$getCookie('language')){
  			// 	this.$lang = 'ru'
  			// 	this.$setCookie('language', 'ru', 360)
  			// }else{
  			// 	this.$lang = this.$getCookie('language')
  			// }
  			// console.log(this.$route.name)
  		},
  		checkTheme(check) {
	      let dt = new Date().getHours(),
	          timer = new Date().getMinutes();
	        
	      for(let i in this.$themes)
	        if (this.$themes[i][1] <= dt && this.$themes[i][2] >= dt){
	          this.$current_theme = i 
	          break
	        }
	      let cur_style = document.getElementById('time')
	      let gl = ' :root{'
	      let style = document.createElement('style');
	      style.setAttribute('id', 'time');
	      style.setAttribute('time_s', this.$themes[this.$current_theme][1]);
	      style.setAttribute('time_f', this.$themes[this.$current_theme][2]);

	      for (let item in this.$themes[this.$current_theme]) {
	        for (let color in this.$themes[this.$current_theme][item]) {
	          if (typeof(this.$themes[this.$current_theme][item][color]) == 'object') {
	            let gradient = 'background: linear-gradient(90deg, ';
	            for (let grad in this.$themes[this.$current_theme][item][color]) {
	              gradient += this.$themes[this.$current_theme][item][color][grad].color + ' ' + this.$themes[this.$current_theme][item][color][grad].position + '%' + (grad != this.$themes[this.$current_theme][item][color].length - 1 ? ', ' : '');
	            }
	            gradient += ');';
	            style.innerHTML += ".".concat(color, " { ").concat(gradient, " }");
	          } else {
	            gl += `--${color}: ${this.$themes[this.$current_theme][item][color]};`
	            style.innerHTML += ".".concat(color, " { color: ").concat(this.$themes[this.$current_theme][item][color], "; }");
	          }
	        }
	      }
	      style.innerHTML += gl + "}"
	      document.getElementsByTagName('head')[0].appendChild(style);
	      if(cur_style)document.getElementsByTagName('head')[0].removeChild(cur_style);

	      setTimeout(()=>this.checkTheme(true), check ? 60 - timer *  60000 : 3600000)
	    }
  	}
  }
</script>

<style lang="scss">
	div{
		display: flex;
	}
	.j-center{justify-content: center !important}
	.j-end{justify-content: flex-end !important}
	.j-start{justify-content: flex-start !important}
	.j-sb{justify-content: space-between !important}
	.j-arround{justify-content: space-around !important}

	.a-center{align-items: center !important}
	.a-end{align-items: flex-end !important}
	.a-start{align-items: flex-start !important}
	
</style>