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
    let title = ""
    let titleArray = article.title.split(' ').filter(word => {
        if(word == "-"){
            dashFound = true
        }
        return !dashFound
    })
    let maxChar = 50
    let curChar = 0
    for(let i = 0; i < titleArray.length; i++){
        curChar += titleArray[i].length
        title += `${titleArray[i]} `
        if(curChar >= maxChar){
            title += "..."
            break
        }
    }
    return title
}