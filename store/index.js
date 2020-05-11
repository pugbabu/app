import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		articles:[],
		isLoading:true,
		bannerDotColor:"#888888",
		bannerDotActiveColor:"#888888",
	},
	mutations: {
		SET_ARTICLES(state,list){
			console.log('SET_ARTICLES',list)
			state.articles = list;
		},
		
		showLoading(state,sec){
			if(sec){
				state.isLoading = true;
				setTimeout(()=>{
					state.isLoading = false;
				},sec*1000)
			}else{
				state.isLoading = true;
			}
			
		},
		hideLoading(state){
			state.isLoading = false;
		}
	},
	actions: {
		async getArticles(ctx,params){
			uni.showLoading({
			    title: '加载中'
			});
			let result = await ajax.get({
				url:'/v2/movie/top250',
				data:{
					start:0,
					count:5
				}
			});
			uni.hideLoading()
			ctx.commit("SET_ARTICLES",result.subjects)
			return result.subjects
		},
		async getDetail(ctx,params){
			// /v2/movie/subject/:id
			uni.showLoading({
			    title: '加载中'
			});
			let result = await ajax.get({
				url:'/v2/movie/subject/'+params.id,
			});
			uni.hideLoading();
			return result;
		},
		async getCategories(){
			uni.showLoading({
			    title: '加载中'
			});
			let result = await ajax.get({
				url:'https://www.gek6.cn/index.php?rest_route=/wp/v2/categories',
			});
			uni.hideLoading();
			return result;
		},
		
		async getArticlesByCate(ctx,params){
			uni.showLoading({
			    title: '加载中'
			});
			let result = await ajax.get({
				url:"http://www.gek6.cn/index.php?rest_route=%2Fwp%2Fv2%2Fposts&categories="+params.id,
			});
			uni.hideLoading();
			return result;
		}
	}
})

export default store
