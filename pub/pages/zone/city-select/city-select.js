var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var geo = require('modules/geo/geo')
var geoUtil = require('modules/geo/util')
var ajax = require('ajax')
var storage = require('storage')
var async = require('async')
var Action = require('modules/action/action')
var inherit = require('inherit')
var _ = require('_')
var tplWrap = require('templates/zone/city-select.content.html')
var tplList = require('templates/zone/city-select.list.html')
var tplHead = require('templates/zone/city-select.head.html')
var loading = require('loading')
var du = require('baiduTongji')

var pageHome = route.getPageHome()

var CitySelect = inherit({
	name: 'CitySelect',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_GEO_CITY, du.CustomScope.PAGE)

			nav.btnCenter.setText('城市选择')
			nav.btnLeft.setText('返回').actionBack()

			this.city_list = storage.get(storage.CITY_LIST) || []

			this.node = $(tplWrap())
			this.nodeHead = $('h2', this.node)
			this.nodeListWrap = $('ul', this.node)

			this.updateTitle({
				status: 'locating'
			})

			this.geoBaiduPosition
			this.cityActions
			this.titleAction

			this.onReposition = $.proxy(this._onReposition, this)
			this.onCityBeforeAction = $.proxy(this._onCityBeforeAction, this)

			this.onDomReady()
		},
		bindEvent: function(){
			// 点击重新获取城市
			this.getNodeContainer().on('click', '.re-pos', this.onReposition)
			this.__base()
		},
		unbindEvent: function(){
			this.getNodeContainer().off('click', '.re-pos', this.onReposition)
			this.__base()
		},
		onDestroy: function(){
			this.__base()
			Action.destroy(this.titleAction)
			Action.destroy(this.cityActions)
		},
		onShouldUpdate: function(){
			this._update(false)
		},
		_update: function(usePrevCityList){
			var me = this
			async.parallel([
				//  拿城市列表，自顾自就行了，不必管其他操作
				function(parallelCallback){
					if(usePrevCityList){
						parallelCallback(null, me.city_list)
					}
					else{
						loading.show()
						me.xhr = ajax.getJSON(ajax.API_ZONE, function(data){
							me.city_list = data.data
							me.updateCities(me.city_list)

							parallelCallback(null, me.city_list)
						}, function(xhr, errorType, error){
							parallelCallback(null, me.city_list)
						}, {
							complete: function(){
								loading.hide()
							}
						})
					}
				},
				// 但是定位完了之后去百度地图拿位置的信息，同时在根据上面的城市列表来对比是否已开通城市...
				function(parallelCallback){
					geoUtil.getCurrReadablePos(function(data, status, xhr){
						// {"status":0, ...OK...}
						// {"status":220,"message":"APP Referer校验失败"}
						if(data.status === 0){
							parallelCallback(null, data.result)
						}
						else{
							parallelCallback(data)
						}
					}, function(xhr, errorType, error, code){
						try{
							return parallelCallback(error)
						}
						catch(e){}
					})
				}
			], function(error, results){
				var _city_list = results[0]
				me.geoBaiduPosition = results[1]
				// 定位失败 或 百度地图api失败
				if(error){
					me.updateTitle({
						status: 'fail'
					})
				}
				else{
					var addressComponent = me.geoBaiduPosition.addressComponent
					// 定位得到的位置通过百度换算的城市
					var geoBaiduCityName = addressComponent.city
					// 去掉最后的“市”
					var cityShortName = geoBaiduCityName.substr(0, geoBaiduCityName.length - 1)
					// “市”
					var cityUnit = geoBaiduCityName.substr(geoBaiduCityName.length - 1)
					var city = _.find(_city_list, function(city){
						if(city.name === cityShortName) return true
						else if(cityUnit !== '市' && geoBaiduCityName === city.name) return true
					})

					if(city){
						me.updateTitle({
							status: 'success',
							isCityAvailable: true,
							action: 'navUtil.back()',
							city: city
						})
					}
					else{
						me.updateTitle({
							status: 'success',
							isCityAvailable: false,
							cityName: cityShortName
						})
					}

					// 存储当前城市，未开通的城市不需要存储，且不可以选择未开通城市
					if(city){
						storage.set(storage.CURR_CITY, city)
					}
					else{
						storage.remove(storage.CURR_CITY)
					}
				}
			})
			return this
		},
		updateTitle:function (params){
			this.nodeHead.html(tplHead(params))

			Action.destroy(this.titleAction)
			this.titleAction = Action.addFromParentsNode({
				nodeWrap: this.nodeHead,
				actionType: 'click',
				listeners: {
					onbeforeaction: this.onCityBeforeAction
				}
			})
			return this
		},
		updateCities: function(_city_list){
			if(_city_list.length){
				var html = tplList({
					city_list: _city_list,
					url: pageHome,
					action: 'navUtil.back()'
				})

				// 把城市列表换存起来
				storage.set(storage.CITY_LIST, this.city_list = _city_list)

				this.nodeListWrap.html(html)

				Action.destroy(this.cityActions)
				this.cityActions = Action.addFromParentsNode({
					nodeWrap: this.nodeListWrap,
					actionType: 'click',
					listeners: {
						onbeforeaction: this.onCityBeforeAction
					}
				})
			}
			return this
		},
		_onReposition: function(){
			this.updateTitle({
				status: 'locating'
			})
			this._update(true)
		},
		_onCityBeforeAction:function (e){
			var city = e.target
			var isAvailable = city.data('available')
			if(!isAvailable){
				e.preventDefault()
			}
			else{
				var clickedCityData = city.data('city')
				// 选择的城市 和 使用的位置 是【两回事】！！！妈蛋
				var usingAddr
				// <del>如果使用当前城市，默认位置则使用当前定位的位置</del>
				// 只要定位成功，usingAddr 就是用定位的位置
				if(this.geoBaiduPosition){
					usingAddr = {
						lat: this.geoBaiduPosition.location.lat,
						lng: this.geoBaiduPosition.location.lng,
						address: this.geoBaiduPosition.formatted_address
					}
				}
				// 否则，使用选择城市的默认位置
				else{
					usingAddr = {
						lat: clickedCityData.lat,
						lng: clickedCityData.lng,
						address: clickedCityData.address
					}
				}
				storage.set(storage.CURR_CITY, clickedCityData)
				storage.set(storage.USING_ADDR, usingAddr)
			}
		}
	},
	statics: {
		NAME: route.N.CITY_SELECT
	}
})