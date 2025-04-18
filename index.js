const fs = require('fs')
const path = require('path')
const shop = require('./shop.json')
const shopExceptions = require('./shopExceptions.json')
const writeTo = path.join(__dirname, './descriptions')
for (const c in shopExceptions) {
    if (!shop.hasOwnProperty(c)) shop[c] = []
    shop[c] = shop[c].concat(shopExceptions[c])
}
if (!fs.existsSync(writeTo)) fs.mkdirSync(writeTo)
try {
    console.log(`⏳ Creating Descriptions...`)
    for (const c in shop) {
        for (const i of shop[c]) {
            if (!i.desc) continue
            const obj = {
                title: i.title,
                conditions: {},
                desc: i.desc,
                icon: `https://cdn.discordapp.com/emojis/${i.emoji}.png`
            }
            if (i.conditions.consumable) obj.conditions.consumable = true
            if (i.conditions.trade) obj.conditions.trade = true
            if (i.conditions.singleUse) obj.conditions.singleUse = true
            if (i.conditions.fling) obj.conditions.fling = i.conditions.fling
            fs.writeFileSync(path.join(writeTo, `./${i.name}.json`), JSON.stringify(obj, null, 4))
        }
    }
    console.log(' ✅ Successfully Created Descriptions.')
} catch (e) {
    console.log('❌ Write Error')
    console.log(e)
}