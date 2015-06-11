exports.update = function(viewController, currCity, location, usingCategory, loading, ajax, ajaxCache, Pagination, route, tplFn, routeName, api, successCb, errorCb){
	if(!location) return

	var data = {
		// 城市ID
		zone_id: currCity.id,
		// 根据使用的位置来排序
		lng: location.lng,
		lat: location.lat
	}
	if(usingCategory){
		// 分类 ID
		data.category_id = usingCategory.id
	}
	if(viewController.lastId){
		// 上次取得的最后一个
		data.last_id = parseInt(viewController.lastId)
	}

	loading.show()
	viewController.xhr = ajax.getJSON(api, data, success, error, {
		useCache: true,
		cacheType: ajaxCache.TYPE_STILL_LOAD,
		cacheKey: ajaxCache[routeName],
		complete: function(xhr, status, args){
			loading.hide()
		}
	})

	function success(data, status, xhr, code, args){
		var dataPagination = data.pagination
		var sc_diff_milli = data.status.server_time * 1000 - Date.now()

		viewController.pagination = new Pagination({
			hasMore: dataPagination.has_more,
			routeName: routeName,
			routeParamsObj: {
				last_id: dataPagination.last_id
			},
			viewController: viewController
		})

		var items = data.data
		var html = tplFn({
			items: items,
			route: route,
			currentPosition: location.address,
			paginationHTML: viewController.pagination.html,
			serverNowSec: (Date.now() + sc_diff_milli) / 1000
		})

		viewController.node = $(html)

		viewController.pagination.setNodeByParentNode(viewController.node)

		viewController.onDomReady(args.execute_time)

		successCb && successCb(items, sc_diff_milli)
	}
	function error(xhr, errorType, error, code){
		errorCb && errorCb()
	}

	return viewController
}