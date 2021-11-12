const Web3 = require('web3')
// const got = require('got');
const scrapeIt = require("scrape-it")
const cheerio = require('cheerio')
// const { resolve } = require('path/posix')

// async function getContracts(){
//     const response = await got.get('https://api.github.com/yieldyak')
//     const newList = Array.from(response)
//     // newLlist.forEach(element => {
//     //     element.includes('href="/yieldyak/smart-contracts/blob/master/deployments/mainnet/')
//     //     console.log(element)
//     // });
//     console.log(response)
// }



// function getEachAddress(linkList){
//     const addressArr = []
//     const short = linkList//.slice(0,10)
//     // console.log(linkList)
//     const base = 'https://github.com'
//     short.forEach(x => {
//         // console.log(base + x)
//         scrapeIt(base + x).then(({body}) => {
//             // console.log('Status Code:' + response.statusCode)
//             const $ = cheerio.load(body)
//             const prereq = $('#LC2 > span:nth-child(1)').text()
//             // console.log(prereq)
//             if(prereq === '"address"'){
//                 const address = $('#LC2 > span:nth-child(2)').text()
//                 addressArr.push(address.slice(1,-2))
//                 // console.log(address)
//                 console.log(addressArr.length)
//             } else {
//                 console.log("somethingWentWrong")
//             }
//             // return addressArr
//         })//.then(x => {console.log(x)})
//         // return addressArr
//     })
//     // console.log(addressArr)
//     return addressArr
// }

const getLinks = scrapeIt('https://github.com/yieldyak/smart-contracts/tree/master/deployments/mainnet').then(({body, response}) => {
    console.log('Status Code:' + response.statusCode)   //-------------------------------------------
    // console.log(data)
    const $ = cheerio.load(body)
    // console.log($('span a.js-navigation-open').text())
    const linkList = []
    const base = 'https://github.com'
    $('span a.js-navigation-open.Link--primary').each((_idx, el) => {
        const link = $(el).attr('href')
        if (link.split('.')[1] === 'json'){
            linkList.push(base + link)
        }
    })
    console.log(linkList.length)    //-------------------------------------------
    console.log(linkList[2])    //-------------------------------------------
    return linkList
}).then(async function(linkList) {
    // const short = linkList.slice(0,10)
    // console.log(linkList)
    // short.forEach(x => 
    // for(i=0; i < short.length; i++){
    //    return 
    // }
    const addressArr = []
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await linkList.reduce( (p, _, i) => 
        p.then(() => delay(200))
        .then(() => scrapeIt(linkList[i]))
        .then(({body}) => {
            // console.log('Status Code:' + response.statusCode)
            const $ = cheerio.load(body)
            const prereq = $('#LC2 > span:nth-child(1)').text()
            // console.log(prereq)
            if(prereq === '"address"'){
                const address = $('#LC2 > span:nth-child(2)').text()
                addressArr.push(address.slice(1,-2))
                // console.log(address)
                console.log(addressArr.length)  //-------------------------------------------
                // console.log(addressArr) //-------------------------------------------
            } else {
                console.log("somethingWentWrong")   //-------------------------------------------
            }
            return addressArr
        })//.then(addressArr => {return addressArr})
, Promise.resolve() )//.then(addressArr => {console.log('THERESULT\n\n',addressArr)})
return addressArr
}).then(addressArr => console.log('THERESULT\n\n',addressArr))

// console.log(getLinks)
// .then(linklist => {console.log(linklist, linklist.length)})

getLinks
// getEachAddress(getLinks)
// console.log(addressArr)



// scrapeIt('https://github.com/yieldyak/smart-contracts/tree/master/deployments/mainnet', {
//     links: {
//         selector: "div div div span a.js-navigation-open.Link--primary",
//         attr: "href"
//     }
// }).then(({body, data, response}) => {
//     console.log('Status Code:' + response.statusCode)
//     console.log(data)



/*  The thing to scrape from body
<div role="rowheader" class="flex-auto min-width-0 col-md-2 mr-3">
            <span class="css-truncate css-truncate-target d-block width-fit"><a class="js-navigation-open Link--primary" title="PGL-AVAX-USDT_v3.json" data-pjax="#repo-content-pjax-container" href="/yieldyak/smart-contracts/blob/master/deployments/mainnet/PGL-AVAX-USDT_v3.json">PGL-AVAX-USDT_v3.json</a></span>
          </div>

*/

// getContracts()
// const web3 = new Web3('https://api.avax.network/ext/bc/C/rpc')

// const YAK_REINVEST_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"_name","internalType":"string"},{"type":"address","name":"_depositToken","internalType":"address"},{"type":"address","name":"_rewardController","internalType":"address"},{"type":"address","name":"_tokenDelegator","internalType":"address"},{"type":"address","name":"_rewardToken0","internalType":"address"},{"type":"address","name":"_rewardToken1","internalType":"address"},{"type":"address","name":"_swapPairToken0","internalType":"address"},{"type":"address","name":"_swapPairToken1","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"uint256","name":"_minMinting","internalType":"uint256"},{"type":"uint256","name":"_leverageLevel","internalType":"uint256"},{"type":"uint256","name":"_leverageBips","internalType":"uint256"},{"type":"uint256","name":"_minTokensToReinvest","internalType":"uint256"},{"type":"uint256","name":"_adminFeeBips","internalType":"uint256"},{"type":"uint256","name":"_devFeeBips","internalType":"uint256"},{"type":"uint256","name":"_reinvestRewardBips","internalType":"uint256"}]},{"type":"event","name":"AllowDepositor","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Reinvest","inputs":[{"type":"uint256","name":"newTotalDeposits","internalType":"uint256","indexed":false},{"type":"uint256","name":"newTotalSupply","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RemoveDepositor","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateAdminFee","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateDevAddr","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateDevFee","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMinTokensToReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateReinvestReward","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ADMIN_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"DEPOSITS_ENABLED","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DEV_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOKENS_TO_DEPOSIT_WITHOUT_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_TOKENS_TO_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"REINVEST_REWARD_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"VERSION_HASH","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"allowDepositor","inputs":[{"type":"address","name":"depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"allowedDepositors","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"checkReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"depositToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devAddr","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateDeployedBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateReinvestReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getActualLeverage","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositTokensForShares","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getDomainSeparator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getSharesForDepositTokens","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"numberOfAllowedDepositors","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverAVAX","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reinvest","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeDepositor","inputs":[{"type":"address","name":"depositor","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"rescueDeployedFunds","inputs":[{"type":"uint256","name":"minReturnAmountAccepted","internalType":"uint256"},{"type":"bool","name":"disableDeposits","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeAllowance","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAllowances","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAdminFee","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevAddr","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevFee","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateLeverage","inputs":[{"type":"uint256","name":"_leverageLevel","internalType":"uint256"},{"type":"uint256","name":"_leverageBips","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMinTokensToReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateReinvestReward","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]

// const AVAX_PNG_REINVEST_CONTRACT = "0xA544b965C2a05b97C44f3126cec916332aFb3175"
// const yakReinvestContract = new web3.eth.Contract(YAK_REINVEST_ABI, AVAX_PNG_REINVEST_CONTRACT)

// async function rewardToken(contract){   //determine reward token
//     try{
//         const tokenAddress = await contract.methods.rewardToken().call()
//         return tokenAddress
//     }
//     catch (err){
//         console.log('huh ' + err)
//         return
//     }
// }

