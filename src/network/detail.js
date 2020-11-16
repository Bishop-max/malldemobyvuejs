import {request} from './request.js'

//发送网络请求详情页数据
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//请求推荐的数据
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//详情页商品信息类
export class Goods {
  constructor(itemInfo, columns, services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.nowPrice = itemInfo.highNowPrice;
			this.realPrice = itemInfo.lowNowPrice;
      this.columns = columns;
      this.services = services;

  }
}

//详情页店铺信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//详情页商品参数信息类
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}