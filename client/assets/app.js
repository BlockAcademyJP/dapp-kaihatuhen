let buyMode = true;
let web3, user;
let priceData;

$(document).on('click', ".dropdown-menu li a", function () {
  let element = $(this);
  let img = element[0].firstElementChild.outerHTML;
  let text = $(this).text();
  $(".input-group .btn").html(img + text);
  $(".input-group .btn").css("color", "#fff");
  $(".input-group .btn").css("font-size", "large");
});

$(document).ready(async () => {
  if(window.ethereum){
    web3 = new Web3(Web3.givenProvider);
  }
  priceData = await getPrice();
  console.dir(priceData);
});

$(".btn.login").click(async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    user = accounts[0];
    $(".btn.login").html("Connected");
    $(".btn.swap").html("Enter an amount");
    $("#username").html(user);
  } catch (error){
    alert(error.message);
  }
})

$("#swap-box").submit((e)=>{
  e.preventDefault();
})

$("#arrow-box h2").click(()=>{
  if(buyMode){
    buyMode = false;
    sellTokenDisplay();
  }else{
    buyMode = true;
    buyTokenDisplay();
  }
});

async function getPrice(){
  const daiData = await (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth")).json();

  const compData = await (
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=compound-governance-token&vs_currencies=eth"
    )
  ).json();

  const linkData = await (
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=eth"
    )
  ).json();

  return {
    daiEth: daiData.dai.eth,
    linkEth: linkData.chainlink.eth,
    compEth: compData["compound-governance-token"].eth
  }
}