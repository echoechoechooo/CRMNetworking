export function getCompanySite (article) {
    let nameArr = article.source.name.split('.')
    let companySite = nameArr[0].split(' ').join('').toLowerCase()
    if(nameArr.length == 1){
        companySite += '.com'
    }
    else {
        for(let j = 1; j < nameArr.length; j++){
            companySite += `.${nameArr[j]}`
        }
    }
    return companySite
}

export function getArticleTitle (article){
    let dashFound = false
    return article.title.split(' ').filter(word => {
        if(word == "-"){
            dashFound = true
        }
        return !dashFound
    }).join(' ')
}