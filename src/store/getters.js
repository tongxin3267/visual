export default{
    customPageList({customPageListSearch,pageList},getters){
        return pageList.filter(item => {
            return item.default == customPageListSearch.default && item.title.toLowerCase().includes(customPageListSearch.title.toLowerCase())
        })
    }
}