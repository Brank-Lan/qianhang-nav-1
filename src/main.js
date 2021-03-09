const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'J',
    logoType: 'text',
    url: 'https://juejin.cn'
}, {
    logo: 'B',
    logoType: 'image',
    url: 'https://bilibili.com',
}, {
    logo: 'V',
    logoType: 'image',
    url: 'https://cn.vuejs.org/index.html',
}, {
    logo: 'Y',
    logoType: 'image',
    url: 'https://www.yuque.com/dashboard',
}]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('cn.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {

        let $li = $(`<li>
                    <div class="site">
                        <div class="logo">
                            ${node.logo}
                        </div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>
                        </div>
                    </div>
                </li>`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥')
    if (url !== '' && url !== null) {
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        let logo = simplifyUrl(url)[0].toUpperCase()
        console.log('logo', logo)
        hashMap.push({
            logo: logo,
            logoType: 'text',
            url: url
        })
        render()
    }
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        let logo = simplifyUrl(hashMap[i].url)[0]
        if (logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})