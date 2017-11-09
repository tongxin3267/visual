import Vue from 'vue'
import Router from 'vue-router'

// frontend
import Home from 'views/Home'
import Catelog from 'views/Catelog'
import Category from 'views/Category'
import Search from 'views/Search'
import Goods from 'views/Goods'
import Cart from 'views/Cart'
import Checkout from 'views/Checkout'
import Done from 'views/Done'
import Respond from 'views/Respond'
// activity
import Activity from 'views/activity/Activity'
import ActivityDetail from 'views/activity/ActivityDetail'
// article
import Article from 'views/article/Article'
import ArticleDetail from 'views/article/ArticleDetail'
import ArticleWechat from 'views/article/ArticleWechat'
// auction
import Auction from 'views/auction/Auction'
import AuctionDetail from 'views/auction/AuctionDetail'
import AuctionLog from 'views/auction/AuctionLog'
// brand
import Brand from 'views/brand/Brand'
import BrandDetail from 'views/brand/BrandDetail'
// chat
import Chat from 'views/chat/Chat'
// coupon
import Coupon from 'views/coupon/Coupon'
// crowd funding
import CrowdFunding from 'views/crowd-funding/CrowdFunding'
import CrowdFundingDetail from 'views/crowd-funding/CrowdFundingDetail'
import CrowdFundingCheckout from 'views/crowd-funding/CrowdFundingCheckout'
import CrowdFundingDone from 'views/crowd-funding/CrowdFundingDone'
// exchange
import Exchange from 'views/exchange/Exchange'
import ExchangeDetail from 'views/exchange/ExchangeDetail'
// forum
import Forum from 'views/forum/Forum'
import ForumList from 'views/forum/ForumList'
import ForumDetail from 'views/forum/ForumDetail'
import ForumMe from 'views/forum/ForumMe'
import ForumReply from 'views/forum/ForumReply'
import ForumNew from 'views/forum/ForumNew'
// group buy
import GroupBuy from 'views/group-buy/GroupBuy'
import GroupBuyDetail from 'views/group-buy/GroupBuyDetail'
// location
import Location from 'views/location/Location'
// located
import Located from 'views/located/Located'
// oauth
import OAuth from 'views/oauth/OAuth'
// store
import Store from 'views/store/Store'
import StoreDetail from 'views/store/StoreDetail'
import StoreMap from 'views/store/StoreMap'
// package
import Package from 'views/package/Package'
// presale
import Presale from 'views/presale/Presale'
import PresaleDetail from 'views/presale/PresaleDetail'
// shop
import Shop from 'views/shop/Shop'
import ShopDetail from 'views/shop/ShopDetail'
import ShopGoods from 'views/shop/ShopGoods'
import ShopAbout from 'views/shop/ShopAbout'
import ShopMap from 'views/shop/ShopMap'
import ShopNearby from 'views/shop/ShopNearby'
// topic
import Topic from 'views/topic/Topic'
import TopicDetail from 'views/topic/TopicDetail'
// wholesale
import Wholesale from 'views/wholesale/Wholesale'
import WholesaleDetail from 'views/wholesale/WholesaleDetail'
import WholesaleCart from 'views/wholesale/WholesaleCart'

// user auth
import Register from 'views/user/auth/Register'
import Login from 'views/user/auth/Login'
import Forgot from 'views/user/auth/Forgot'
import Reset from 'views/user/auth/Reset'
// user center
import Account from 'views/user/account/Account'
import Address from 'views/user/address/Address'
import Affiliate from 'views/user/affiliate/Affiliate'
import Booking from 'views/user/booking/Booking'
import Collection from 'views/user/collection/Collection'
import Comment from 'views/user/comment/Comment'
import Message from 'views/user/message/Message'
import Order from 'views/user/order/Order'
import OrderDetail from 'views/user/order/OrderDetail'
import Profile from 'views/user/profile/Profile'
import Refound from 'views/user/refound/Refound'

// backend
import Dashboard from 'views/admin/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/catelog', name: 'catelog', component: Catelog },
    { path: '/category', name: 'category', component: Category },
    { path: '/search', name: 'search', component: Search },
    { path: '/goods', name: 'goods', component: Goods },
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/checkout', name: 'checkout', component: Checkout },
    { path: '/done', name: 'done', component: Done },
    { path: '/respond', name: 'respond', component: Respond },
    // activity
    { path: '/activity', name: 'activity', component: Activity },
    { path: '/activity/detail', name: 'activity-detail', component: ActivityDetail },
    // article
    { path: '/article', name: 'article', component: Article },
    { path: '/article/detail', name: 'article-detail', component: ArticleDetail },
    { path: '/article/wechat', name: 'article-wechat', component: ArticleWechat },
    // auction
    { path: '/auction', name: 'auction', component: Auction },
    { path: '/auction/detail', name: 'auction-detail', component: AuctionDetail },
    { path: '/auction/log', name: 'auction-log', component: AuctionLog },
    // brand
    { path: '/brand', name: 'brand', component: Brand },
    { path: '/brand/detail', name: 'brand-detail', component: BrandDetail },
    // chat
    { path: '/chat', name: 'chat', component: Chat },
    // coupon
    { path: '/coupon', name: 'coupon', component: Coupon },
    // crowd funding
    { path: '/crowd-funding', name: 'crowd-funding', component: CrowdFunding },
    { path: '/crowd-funding/detail', name: 'crowd-funding-detail', component: CrowdFundingDetail },
    { path: '/crowd-funding/checkout', name: 'crowd-funding-checkout', component: CrowdFundingCheckout },
    { path: '/crowd-funding/done', name: 'crowd-funding-done', component: CrowdFundingDone },
    // exchange
    { path: '/exchange', name: 'exchange', component: Exchange },
    { path: '/exchange/detail', name: 'exchange-detail', component: ExchangeDetail },
    // forum
    { path: '/forum', name: 'forum', component: Forum },
    { path: '/forum/list', name: 'forum-list', component: ForumList },
    { path: '/forum/detail', name: 'forum-detail', component: ForumDetail },
    { path: '/forum/me', name: 'forum-me', component: ForumMe },
    { path: '/forum/reply', name: 'forum-reply', component: ForumReply },
    { path: '/forum/new', name: 'forum-new', component: ForumNew },
    // group buy
    { path: '/group-buy', name: 'group-buy', component: GroupBuy },
    { path: '/group-buy/detail', name: 'group-buy-detail', component: GroupBuyDetail },
    // location
    { path: '/location', name: 'location', component: Location },
    // located
    { path: '/located', name: 'located', component: Located },
    // oauth
    { path: '/oauth', name: 'oauth', component: OAuth },
    // store
    { path: '/store', name: 'store', component: Store },
    { path: '/store/detail', name: 'store-detail', component: StoreDetail },
    { path: '/store/map', name: 'store-map', component: StoreMap },
    // package
    { path: '/package', name: 'package', component: Package },
    // presale
    { path: '/presale', name: 'presale', component: Presale },
    { path: '/presale/detail', name: 'presale-detail', component: PresaleDetail },
    // shop
    { path: '/shop', name: 'shop', component: Shop },
    { path: '/shop/detail', name: 'shop-detail', component: ShopDetail },
    { path: '/shop/goods', name: 'shop-goods', component: ShopGoods },
    { path: '/shop/about', name: 'shop-about', component: ShopAbout },
    { path: '/shop/map', name: 'shop-map', component: ShopMap },
    { path: '/shop/nearby', name: 'shop-nearby', component: ShopNearby },
    // topic
    { path: '/topic', name: 'topic', component: Topic },
    { path: '/topic/detail', name: 'topic-detail', component: TopicDetail },
    // wholesale
    { path: '/wholesale', name: 'wholesale', component: Wholesale },
    { path: '/wholesale/detail', name: 'wholesale-detail', component: WholesaleDetail },
    { path: '/wholesale/cart', name: 'wholesale-cart', component: WholesaleCart },
    // user auth
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/forgot', name: 'forgot', component: Forgot },
    { path: '/reset', name: 'reset', component: Reset },
    // user center
    { path: '/user/account', name: 'user-account', component: Account },
    { path: '/user/address', name: 'user-address', component: Address },
    { path: '/user/affiliate', name: 'user-affiliate', component: Affiliate },
    { path: '/user/booking', name: 'user-booking', component: Booking },
    { path: '/user/collection', name: 'user-collection', component: Collection },
    { path: '/user/comment', name: 'user-comment', component: Comment },
    { path: '/user/message', name: 'user-message', component: Message },
    { path: '/user/order', name: 'user-order', component: Order },
    { path: '/user/order', name: 'user-order-detail', component: OrderDetail },
    { path: '/user/profile', name: 'user-profile', component: Profile },
    { path: '/user/refound', name: 'user-refound', component: Refound },

    // backend
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
