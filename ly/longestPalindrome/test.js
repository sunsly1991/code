const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: ['babad'],
        result: ['bab', 'aba']
    },
    {
        args: ['bb'],
        result: ['bb']
    },
    {
        args: ['ab'],
        result: ['a', 'b']
    },
    {
        args: [''],
        result: ['']
    },
    {
        args: ['baabad'],
        result: ['baab']
    },
    {
        args: ['aaaaaaa'],
        result: ['aaaaaaa']
    },
    {
        args: ['abcda'],
        result: ['a']
    },
    {
        args: ['cbbd'],
        result: ['bb']
    },
    {
        args: ['civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth'],
        result: ['ranynar']
    },
]

describe('最长回文子串', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args[0]}"：${result}`, () => {
            should(fn(...args))
                .be.a.String()
                .and.equalOneOf(result)
        })
    })
})
