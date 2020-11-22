const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap =xObject || [
    {
        logo:'https://www.google.com/s2/favicons?sz=64&domain_url=acfun.cn',
        logoType:'text',
        url:'https://www.acfun.cn'
    },{
        logo:'https://www.google.com/s2/favicons?sz=64&domain_url=bilibili.com',
        logoType:'image',
        url:'https://bilibili.com',
    }
]

const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //删除/开头的内容
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{

        let $li = $(`<li>
                    <div class="site">
                        <div class="logo">
                            <img src="${node.logo}" alt="" sizes="64x64">
                        </div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>
                        </div>
                    </div>
                </li>`).insertBefore($lastLi)
        $li.on('click',(e)=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()     //阻止冒泡
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton').on('click',()=>{
    let url = window.prompt('请问你要添加的网址是啥')
    if(url !== '' && url !== null){
        if(url.indexOf('http') !== 0){
            url = 'https://'+url
        }
        let logo = `https://www.google.com/s2/favicons?sz=64&domain_url=${simplifyUrl(url)}`
        hashMap.push({
            logo:logo,
            logoType:'text',
            url:url
        })
    }
    render()
})

window.onbeforeunload=()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})